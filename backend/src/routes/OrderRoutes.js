const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// 📥 Enregistrer une nouvelle commande
router.post('/', auth, async (req, res) => {
    try {
      const { items, total, shippingAddress } = req.body;
  
      const newOrder = new Order({
        user: req.user.id || req.user.userId,
        items,
        total,
        shippingAddress
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Commande enregistrée', order: newOrder });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la commande', details: error.message });
    }
  });
  

// 📄 Voir toutes les commandes de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id || req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération', details: error.message });
  }
});


const isAdmin = require('../middleware/isAdmin');

// ✅ Modifier uniquement le statut de la commande (admin uniquement)
router.put('/:id/status', auth, isAdmin, async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ['en attente', 'payée', 'expédiée', 'livrée', 'annulée'];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json({ message: 'Statut mis à jour', order });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// 🔍 Recherche de commandes par prénom ou nom (admin uniquement)
router.get('/search', auth, isAdmin, async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Le nom est requis pour la recherche.' });
  }

  try {
    const regex = new RegExp(name, 'i'); // insensible à la casse
    const orders = await Order.find({
      $or: [
        { 'shippingAddress.firstName': regex },
        { 'shippingAddress.lastName': regex }
      ]
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});
// 🔍 Recherche de commandes par ID (admin uniquement)

router.get('/:id', auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
}
);
// 🗑️ Supprimer une commande (admin uniquement)

router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json({ message: 'Commande supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
}
);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🧾 Créer une session de paiement Stripe
router.post('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.name} - ${item.size} - ${item.color}`
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/confirmation`, // plus besoin de l’ID ici
      cancel_url: `${process.env.FRONTEND_URL}/panier`,
      metadata: {
        orderId: order._id.toString() // 🔐 stocké ici pour le webhook
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Stripe', details: error.message });
  }
});

module.exports = router;

module.exports = router;

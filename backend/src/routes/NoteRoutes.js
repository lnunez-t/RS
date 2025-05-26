const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/notes', async (req, res) => {
  const { name, email, rating, comment, token } = req.body;

  if (!name || !email || !rating || !comment || !token) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    // 1. Vérifie le token JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email: decodedEmail, orderId } = decoded;

    if (decodedEmail !== email) {
      return res.status(401).json({ message: 'Token invalide pour cet email.' });
    }

    // 2. Vérifie s'il y a déjà une note pour cette commande
    const existing = await Note.findOne({ orderId });
    if (existing) {
      return res.status(400).json({ message: 'Un avis a déjà été laissé pour cette commande.' });
    }

    // 3. (optionnel) Lier à un utilisateur existant
    const user = await User.findOne({ email });

    // 4. Créer la note
    const note = new Note({
      name,
      rating,
      comment,
      email,
      author: user?._id || undefined,
      orderId,
    });

    await note.save();

    res.status(201).json({ message: 'Merci pour votre avis !' });
  } catch (err) {
    console.error('Erreur lors de l’envoi de la note :', err);
    res.status(400).json({ message: 'Token invalide ou expiré.' });
  }
});



router.get('/:orderId',verifyToken,isAdmin, async (req, res) => {
  const { orderId } = req.params;

  try {
    const notes = await Note.find({ orderId });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "Aucun avis trouvé pour cette commande." });
    }

    res.json(notes);
  } catch (err) {
    console.error('Erreur récupération note par commande :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Avis non trouvé" });
    }
    res.status(200).json({ message: "Avis supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression avis :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET toutes les notes avec la note moyenne
router.get('/public', async (req, res) => {
  try {
    const notes = await Note.find();
    const moyenne =
      notes.length > 0
        ? notes.reduce((sum, n) => sum + (n.rating || 0), 0) / notes.length
        : 0;

    res.json({
      notes,
      moyenne: moyenne.toFixed(1),
    });
  } catch (err) {
    console.error('Erreur récupération notes publiques :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  console.log('✅ Webhook hit');
  const sig = req.headers['stripe-signature'];
  console.log('📩 Stripe-Signature header:', sig);
  console.log('🧾 Webhook raw body (length):', req.body.length);
  console.log('🔐 Stripe webhook secret:', process.env.STRIPE_WEBHOOK_SECRET);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Signature valid, event type:', event.type);
  } catch (err) {
    console.error('❌ Signature Stripe invalide :', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('🎯 Checkout session completed:', session);

    const successUrl = session.success_url || '';
    let orderId = null;
    try {
      const url = new URL(successUrl);
      orderId = url.searchParams.get('orderId');
    } catch (err) {
      console.warn('⚠️ Pas de success_url lisible');
    }

    if (orderId) {
      try {
        await Order.findByIdAndUpdate(orderId, { status: 'payée' });
        console.log(`✅ Commande ${orderId} mise à jour en "payée"`);
      } catch (err) {
        console.error('❌ Erreur mise à jour commande :', err.message);
      }
    } else {
      console.warn('⚠️ Aucun orderId trouvé');
    }
  }

  res.status(200).send('✅ Webhook reçu');
});

module.exports = router;

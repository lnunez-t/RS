const express = require('express');
const PromoCode = require('../models/PromoCode');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')


// 🔐 Créer un code promo
router.post('/create',verifyToken,isAdmin, async (req, res) => {
  try {
    const code = new PromoCode(req.body);
    await code.save();
    res.status(201).json(code);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📋 Liste tous les codes
router.get('/',verifyToken,isAdmin, async (req, res) => {
  const codes = await PromoCode.find();
  res.json(codes);
});

// ✅ Vérifier si un code est valide
router.post('/validate',verifyToken, async (req, res) => {
  const { code } = req.body;
  const found = await PromoCode.findOne({ code, active: true });

  if (!found) return res.status(404).json({ message: "Code invalide." });

  const now = new Date();
  if (found.expiresAt && now > found.expiresAt)
    return res.status(400).json({ message: "Code expiré." });

  if (found.usageLimit && found.usedCount >= found.usageLimit)
    return res.status(400).json({ message: "Limite d'utilisation atteinte." });

  res.json(found);
});

// ❌ Supprimer un code promo
router.delete('/:id',verifyToken,isAdmin, async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'Code supprimé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

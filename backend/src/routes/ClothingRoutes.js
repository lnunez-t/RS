const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('./AdminRoute');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
// ✅ Ajouter un vêtement (admin only)

router.post('/', verifyToken, upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path);
    const variants = JSON.parse(req.body.variants);
    const price = parseFloat(req.body.price);

    const item = new ClothingItem({
      name: req.body.name,
      description: req.body.description,
      price,
      variants,
      images: imageUrls,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('🛑 Erreur route POST /clothing :', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    res.status(500).json({ error: err.message || 'Erreur inconnue' });
  }
});

// ✅ Remplace les deux par une seule :
router.get('/all_clothing', async (req, res) => {
  try {
    const { size, color, inStock, page = 1, limit = 10, sort, search } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // insensitive, contient
    }

    if (size || color || inStock === 'true') {
      filter.variants = { $elemMatch: {} };

      if (size) filter.variants.$elemMatch.size = size;
      if (color) filter.variants.$elemMatch.color = color;
      if (inStock === 'true') filter.variants.$elemMatch.stock = { $gt: 0 };
    }


    const sortOptions = {
      new: { createdAt: -1 },
      name: { name: 1 },
      price: { price: 1 },
      '-price': { price: -1 }
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ClothingItem.countDocuments(filter);
    const items = await ClothingItem.find(filter)
      .sort(sortOptions[sort] || {}) // tri si valide
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results: items
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});



router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await ClothingItem.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Vêtement non trouvé" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ClothingItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Vêtement non trouvé" });
    }

    res.json({ message: "Vêtement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Vêtement non trouvé" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// 👇 Ne surtout le faire qu’une seule fois !
module.exports = router;

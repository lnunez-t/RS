const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary'); // ✅ cloudinary.uploader.destroy fonctionne
const { storage } = require('../config/cloudinary'); // Multer CloudinaryStorage
const upload = multer({ storage });

// ✅ Ajouter un vêtement
router.post('/', verifyToken, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path); // Cloudinary URLs
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
    console.error('🛑 Erreur route POST /clothing :', err);
    res.status(500).json({ error: err.message || 'Erreur inconnue' });
  }
});

// ✅ Liste paginée avec filtres
router.get('/all_clothing', async (req, res) => {
  try {
    const { size, color, inStock, page = 1, limit = 10, sort, search } = req.query;
    const filter = {
      visible: true, // 👈 Exclure les articles masqués
    };

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
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
      '-price': { price: -1 },
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ClothingItem.countDocuments(filter);
    const items = await ClothingItem.find(filter)
      .sort(sortOptions[sort] || {})
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results: items,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

router.get('/all_clothing/admin',verifyToken,isAdmin, async (req, res) => {
  try {
    const { size, color, inStock, page = 1, limit = 10, sort, search } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
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
      '-price': { price: -1 },
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ClothingItem.countDocuments(filter);
    const items = await ClothingItem.find(filter)
      .sort(sortOptions[sort] || {})
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results: items,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// ✅ Modifier un vêtement
router.put('/:id', verifyToken, isAdmin, upload.fields([{ name: 'newImages', maxCount: 5 }]), async (req, res) => {
  try {
    const { id } = req.params;

    const variants = JSON.parse(req.body.variants);
    const oldImages = JSON.parse(req.body.images);
    const newImages = (req.files['newImages'] || []).map(file => file.path); // Cloudinary URLs

    const updatedItem = await ClothingItem.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        variants,
        images: [...oldImages, ...newImages],
      },
      { new: true, runValidators: true }
    );

    res.json(updatedItem);
  } catch (err) {
    console.error('Erreur Cloudinary PUT:', err);
    res.status(500).json({ error: err.message });
  }
});

// Exemple dans ClothingRoutes.js
router.put('/:id/visibility', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { visible } = req.body;

    if (typeof visible !== 'boolean') {
      return res.status(400).json({ error: "'visible' doit être un booléen" });
    }

    const updated = await ClothingItem.findByIdAndUpdate(
      id,
      { visible },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json({ message: `Article mis à jour : visible = ${visible}`, item: updated });
  } catch (err) {
    console.error('Erreur mise à jour visibilité :', err);
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

// ✅ Supprimer une image Cloudinary
router.delete('/image', verifyToken, isAdmin, async (req, res) => {
  try {
    const { publicId } = req.query; // utiliser ?publicId=...
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image supprimée sur Cloudinary' });
  } catch (err) {
    console.error('Erreur suppression image Cloudinary :', err);
    res.status(500).json({ error: 'Échec suppression image', details: err.message });
  }
});


// ✅ Supprimer un vêtement
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ClothingItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Vêtement non trouvé' });
    }

    res.json({ message: 'Vêtement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// ✅ Récupérer un vêtement par ID
router.get('/:id', async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Vêtement non trouvé' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

module.exports = router;

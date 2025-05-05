const express = require('express');
const UserAdmin = require('../models/UserAdmin');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Route to add a new admin
/* router.post('/add', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const newAdmin = new UserAdmin({ email, password, name, role });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add admin', details: error.message });
  }
}); */

// Route to authenticate an admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserAdmin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await admin.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });
    res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1h
      })
    .status(200)
    .json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate admin', details: error.message });
  }
});

// Route to delete an admin by ID
router.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await UserAdmin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin removed successfully', admin: deletedAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove admin', details: error.message });
  }
});

function verifyToken(req, res, next) {
  const token = req.cookies.token; // 🔥 récupéré depuis le cookie

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Route de vérification
router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Token is valid',
    user: req.user, // contient l’id et le rôle de l’admin
  });
});

module.exports = router;
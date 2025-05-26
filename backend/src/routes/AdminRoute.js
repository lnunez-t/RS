const express = require('express');
const UserAdmin = require('../models/UserAdmin');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')
const nodemailer = require('nodemailer');
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const sendReviewEmail = require('../utils/sendReviewEmail');
const Order = require('../models/Order');
const User = require('../models/User');

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
    console.log(admin.role)
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




// Route de vérification
router.get('/verify-token', verifyToken,isAdmin, isAdmin ,(req, res) => {
  res.status(200).json({
    message: 'Token is valid',
    user: req.user, // contient l’id et le rôle de l’admin
  });
});



router.post('/send-email', verifyToken, isAdmin, async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou autre
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://res.cloudinary.com/di0ifatat/image/upload/v1747906734/rciuclqllvg5ojvyhrhg.svg" alt="Logo" style="max-width: 150px;" />
        </div>

        <h2 style="color: #333;">Bonjour,</h2>
        <p style="font-size: 16px; color: #555;">
          ${message.replace(/\n/g, '<br />')}
        </p>

        <hr style="margin: 30px 0;" />

        <footer style="text-align: center; font-size: 14px; color: #888;">
          Merci de votre confiance.<br />
          <strong>Restrospective Studio</strong> • retrospectivestudio.shop@gmail.com
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `"Restrospective Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    });

    res.json({ message: 'E-mail envoyé' });
  } catch (error) {
    console.error('Erreur envoi e-mail :', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});



router.post('/send-review-request', verifyToken, isAdmin, async (req, res) => {
  const { email, orderId } = req.body;

  if (!email || !orderId) {
    return res.status(400).json({ message: 'Email et orderId requis' });
  }

  try {
    await sendReviewEmail(email, orderId);
    res.status(200).json({ message: 'E-mail d’invitation envoyé' });
  } catch (error) {
    console.error('Erreur envoi e-mail :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l’envoi de l’e-mail' });
  }
});



router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // on ne retourne pas le mot de passe
    res.json(users);
  } catch (err) {
    console.error('Erreur récupération utilisateurs :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// routes/AdminRoute.js
router.get('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // ici, req.params.id doit exister
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur récupération utilisateur :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.put('/users/:id', verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { infosPerso } = req.body;

  if (!infosPerso) {
    return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { infosPerso },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json(user);
  } catch (err) {
    console.error('Erreur mise à jour utilisateur :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

router.post('/register', async (req, res) => {
  const { email, password,firstName,lastName } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const emailVerifyToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      isVerified: false,
      emailVerifyToken
    });
    await user.save();

    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerifyToken}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Vérifie ton adresse e-mail',
      text: `Clique ici pour activer ton compte : ${verifyLink}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered. Vérifie ton e-mail pour activer ton compte.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/verify-email', async (req, res) => {
  const { email, token } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (user.isVerified) return res.status(400).json({ message: 'Compte déjà activé' });
    if (user.emailVerifyToken !== token) return res.status(400).json({ message: 'Token invalide' });

    user.isVerified = true;
    user.emailVerifyToken = undefined;
    await user.save();

    res.json({ message: 'Compte activé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) {
      return res.status(403).json({ message: "Compte non activé. Vérifie ton e-mail." });
    }    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1h
      })
    .status(200)
    .json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const authMiddleware = require('../middleware/authMiddleware');

router.put('/update-infos', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const infosToUpdate = req.body.infosPerso;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { infosPerso: infosToUpdate },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ message: 'Infos mises à jour', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;



router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
  
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 min
    await user.save();
  
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou smtp, mailtrap, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Clique sur ce lien pour réinitialiser ton mot de passe : ${resetLink}`,
    };
  
    await transporter.sendMail(mailOptions);
  
    res.json({ message: 'Lien de réinitialisation envoyé par e-mail' });
  });



  router.post('/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;
   
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  
    if (
      user.resetPasswordToken !== tokenHash ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: 'Lien expiré ou invalide' });
    }
  
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    res.json({ message: 'Mot de passe mis à jour' });
  });


// 🔁 Renvoyer l'email de vérification
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email requis" });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    if (user.verified) return res.status(400).json({ message: "Compte déjà activé" });

    // (Re)générer un token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    user.verificationToken = hashedToken;
    user.verificationTokenExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Vérifie ton adresse e-mail',
      text: `Clique sur ce lien pour activer ton compte : ${link}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'E-mail de vérification renvoyé' });

  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

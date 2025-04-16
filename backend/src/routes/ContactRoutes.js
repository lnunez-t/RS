const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email et message sont requis.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou smtp, mailtrap, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message de ${name || 'client'} via formulaire`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message envoyé avec succès !' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l’envoi de l’email', details: error.message });
  }
});

module.exports = router;

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReviewEmail(email,orderId) {
  const token = jwt.sign({ email,orderId }, JWT_SECRET, { expiresIn: '7d' });

    const reviewLink = `${process.env.FRONTEND_URL}/leave-review?token=${token}&email=${encodeURIComponent(email)}`;

  const htmlContent = `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://res.cloudinary.com/di0ifatat/image/upload/v1747906734/rciuclqllvg5ojvyhrhg.svg" alt="Logo" style="max-width: 150px;" />
    </div>

    <h2 style="color: #333;">Bonjour,</h2>
    <p style="font-size: 16px; color: #555;">
      Nous aimerions beaucoup connaître votre avis sur votre expérience avec nous.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${reviewLink}" style="display: inline-block; padding: 12px 24px; background-color: #7C3AED; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Donner mon avis
      </a>
    </div>

    <hr style="margin: 30px 0;" />

    <footer style="text-align: center; font-size: 14px; color: #888;">
      Merci de votre confiance.<br />
      <strong>Restrospective Studio</strong> • retrospectivestudio.shop@gmail.com
    </footer>
  </div>
`;


  const mailOptions = {
    from: `"Restrospective Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Ton avis compte pour nous 💬',
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendReviewEmail;

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // ou ta clé directement

module.exports = function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Aucun token fourni' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // ✅ important
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide' });
  }
};

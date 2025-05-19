module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Utilisateur non authentifié' });
  }

  const { role } = req.user;

  if (role !== 'admin' && role !== 'superadmin') {
    return res.status(403).json({ error: 'Accès interdit : admin requis' });
  }

  next();
};

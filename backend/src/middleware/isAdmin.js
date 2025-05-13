
module.exports = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Access denied: not an admin' });
  }
  next();
  };
  
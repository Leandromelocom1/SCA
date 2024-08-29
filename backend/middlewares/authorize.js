const authorize = (module, action) => {
    return (req, res, next) => {
      const permission = req.user.permissions.find(perm => perm.module === module);
      if (!permission || !permission[`can${action}`]) {
        return res.status(403).json({ error: 'Acesso negado.' });
      }
      next();
    };
  };
  
  module.exports = authorize;
   
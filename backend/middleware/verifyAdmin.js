const jwt = require("jsonwebtoken");

const verifyAdmin =  (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Hanya admin yang bisa mengakses." });
  }
  next();
}

module.exports = verifyAdmin;

const rateLimit = require('express-rate-limit');
const User = require('../models/user');

// Store percobaan gagal di memory
const failedAttempts = new Map();

// Clear percobaan gagal setelah block period
const clearFailedAttempts = (username) => {
  setTimeout(() => {
    failedAttempts.delete(username);
  }, 5 * 60 * 1000); // 5 minutes
};

// middleware rate limit
const loginRateLimiter = async (req, res, next) => {
  const username = req.body.username;
  
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  // get percobaan gagal untuk user ini
  const attempts = failedAttempts.get(username) || 0;

  // gagal 5x, blok 5 menit
  if (attempts >= 5) {
    return res.status(429).json({ 
      message: "Terlalu banyak percobaan gagal, silakan coba lagi dalam 5 menit.",
      remainingTime: "5 menit"
    });
  }

  // tambahkan fungsi tracking ke response
  res.trackFailedAttempt = () => {
    const currentAttempts = (failedAttempts.get(username) || 0) + 1;
    failedAttempts.set(username, currentAttempts);
    
    if (currentAttempts >= 5) {
      clearFailedAttempts(username);
    }
    
    return currentAttempts;
  };

  next();
};

module.exports = loginRateLimiter; 
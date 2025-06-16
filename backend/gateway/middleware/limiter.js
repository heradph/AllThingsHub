const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 5 menit
  max: 1, 
  message: "Anda hanya bisa melakukan checkout 1 kali dalam 2 menit.",
});

const speedLimiter = slowDown({
  windowMs: 10 * 1000, 
  delayAfter: 3,
  delayMs: (used, req) => {
    const delayAfter = req.slowDown.limit;
    return (used - delayAfter) * 500; 
  },
  validate: { delayMs: false }, 
});

module.exports = { limiter, speedLimiter };

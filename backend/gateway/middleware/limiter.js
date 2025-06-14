const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: "Terlalu banyak permintaan, coba lagi nanti.",
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5, // Setelah 10 request → mulai delay
  delayMs: 500, // Tambah delay 500ms tiap request setelahnya
});

module.exports = { speedLimiter, limiter };

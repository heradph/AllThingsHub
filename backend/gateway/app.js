require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const { limiter, speedLimiter } = require("./middleware/limiter");
const app = express();

app.use(cors());

app.use(
  "/authService",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/authService": "",
    },
  })
);

app.use(
  "/cartService",
  createProxyMiddleware({
    target: process.env.CART_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/cartService": "",
    },
  })
);

app.use(
  "/itemService",
  createProxyMiddleware({
    target: process.env.ITEMS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/itemService": "",
    },
  })
);

app.use(
  "/checkoutService",
  limiter,
  speedLimiter,
  createProxyMiddleware({
    target: process.env.CHECKOUT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/checkoutService": "",
    },
  })
);

app.use(
  "/transactionService",
  createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/transactionService": "",
    },
  })
);

const PORT = process.env.GATEWAY_PORT || 300;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`API Gateway running at http://localhost:${PORT}`)
);

require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors")
const app = express();

app.use(cors());

// Auth Service
app.use("/auth", createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL, 
  changeOrigin: true,
}));

// Items Service
app.use("/items", createProxyMiddleware({
  target: process.env.ITEMS_SERVICE_URL, 
  changeOrigin: true,
}));

// Cart Service
app.use("/cart", createProxyMiddleware({
  target: process.env.CART_SERVICE_URL,
  changeOrigin: true,
}));

const PORT = process.env.GATEWAY_PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running at http://localhost:${PORT}`));

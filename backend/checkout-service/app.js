const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/dbSQL");
const checkoutRoutes = require("./routes/checkoutRoutes");
const { connectRabbitMQ } = require("./lib/rabbitMQProducer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", checkoutRoutes);

const PORT = process.env.PORT || 3003;

const startServer = async () => {
  try {
    await connectRabbitMQ(); // ⬅️ Tunggu RabbitMQ connect dulu sebelum start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

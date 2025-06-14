const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/dbSQL");
const transactionRoutes = require("./routes/transactionRoutes")
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use("/", transactionRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

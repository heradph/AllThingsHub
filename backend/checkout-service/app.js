const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/dbSQL");
const checkoutRoutes = require("./routes/checkoutRoutes");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use("/", checkoutRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

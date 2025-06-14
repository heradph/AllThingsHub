const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/dbSQL");
const cartRoutes = require("./routes/cartRoutes");
require("dotenv").config();
const cors = require("cors")
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use("/", cartRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

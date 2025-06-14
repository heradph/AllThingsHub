require("dotenv").config();
const express = require("express");
const db = require("./db/dbSQL");
const itemRoutes = require("./routes/itemRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", itemRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

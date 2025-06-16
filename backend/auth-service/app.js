const express = require("express");
const passport = require("passport");
require("./config/passport");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const db = require("./db/dbSQL");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">login</a> <br> <a href="/auth/google/reauth">Reauth</a>`);
});

app.get("/hello", auth, (req,res) =>{
    res.json({
        message: "Hello",
        user: req.user
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

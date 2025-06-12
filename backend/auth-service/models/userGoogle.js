const mongoose = require("../config/dbMongo");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      familyName: String,
      givenName: String,
    },
    photo: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

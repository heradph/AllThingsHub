const express = require("express");
const router = express.Router();
const db = require("../db/dbSQL");
const auth = require("../middleware/auth");

router.post("/checkout", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [cartItems] = await db.query("SELECT * FROM cart WHERE user_id = ?", [
      userId,
    ]);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const now = new Date();
    const [result] = await db.query(
      "INSERT INTO transactions (user_id, date, total_price) VALUES (?, ?, ?)",
      [userId, now, 0]
    );
    const transactionId = result.insertId;

    let totalPrice = 0;

    for (const item of cartItems) {
      const [itemRows] = await db.query(
        "SELECT price FROM items WHERE id = ?",
        [item.item_id]
      );

      if (itemRows.length === 0) {
        throw new Error(`Item with ID ${item.item_id} not found`);
      }

      const itemPrice = itemRows[0].price;

      await db.query(
        "INSERT INTO transaction_items (transaction_id, item_id, quantity, price) VALUES (?, ?, ?, ?)",
        [transactionId, item.item_id, item.quantity, itemPrice]
      );

      totalPrice += item.quantity * itemPrice;
    }

    await db.query("UPDATE transactions SET total_price = ? WHERE id = ?", [
      totalPrice,
      transactionId,
    ]);

    await db.query("DELETE FROM cart WHERE user_id = ?", [userId]);

    res.json({ message: "Checkout successful!", transactionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

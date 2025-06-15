const express = require("express");
const router = express.Router();
const db = require("../db/dbSQL");
const auth = require("../middleware/auth");
const { sendToQueue } = require("../lib/rabbitMQProducer.js");

router.post("/checkout", auth, async (req, res) => {
  const userId = req.user.id;
  const username = req.user.username;

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
    const itemDetails = [];

    for (const item of cartItems) {
      const [itemRows] = await db.query(
        "SELECT name, price FROM items WHERE id = ?",
        [item.item_id]
      );

      if (itemRows.length === 0) {
        throw new Error(`Item with ID ${item.item_id} not found`);
      }

      const itemPrice = itemRows[0].price;
      const itemName = itemRows[0].name;

      await db.query(
        "INSERT INTO transaction_items (transaction_id, item_id, quantity, price) VALUES (?, ?, ?, ?)",
        [transactionId, item.item_id, item.quantity, itemPrice]
      );

      totalPrice += item.quantity * itemPrice;

      itemDetails.push({
        item_id: item.item_id,
        name: itemName,
        quantity: item.quantity,
        price: itemPrice,
        total: item.quantity * itemPrice,
      });
    }

    await db.query("UPDATE transactions SET total_price = ? WHERE id = ?", [
      totalPrice,
      transactionId,
    ]);

    await db.query("DELETE FROM cart WHERE user_id = ?", [userId]);

    const payload = {
      transactionId,
      username,
      datetime: now.toISOString(),
      items: itemDetails,
      totalPrice: totalPrice * 1000,
    };

    console.log("📤 Payload to sendToQueue:", payload);
    sendToQueue(payload);

    return res.json({
      message: "Checkout Success!",
      transactionId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

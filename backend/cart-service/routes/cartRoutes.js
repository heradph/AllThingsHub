const express = require("express");
const router = express.Router();
const db = require("../../db/dbSQL");
const auth = require("../../middleware/auth");

router.post("/cart", auth, async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // Cek apakah item sudah ada di cart user
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND item_id = ?",
      [userId, itemId]
    );

    if (existing.length > 0) {
      // Kalau ada, update quantity
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?",
        [quantity, userId, itemId]
      );
    } else {
      // Kalau belum ada, insert baru
      await db.query(
        "INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)",
        [userId, itemId, quantity]
      );
    }

    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/cart", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [cartItems] = await db.query(
      `
      SELECT cart.id, items.name, items.price, items.image, cart.quantity
      FROM cart
      JOIN items ON cart.item_id = items.id
      WHERE cart.user_id = ?
      `,
      [userId]
    );

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/cart/:cartId", auth, async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const [result] = await db.query(
      `UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?`,
      [quantity, cartId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Quantity updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/cart/:cartId", auth, async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.params;

  try {
    const [result] = await db.query(
      `DELETE FROM cart WHERE id = ? AND user_id = ?`,
      [cartId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

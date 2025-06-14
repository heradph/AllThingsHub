const express = require("express");
const router = express.Router();
const db = require("../../db/dbSQL");
const auth = require("../../middleware/auth");

// Tambah item ke cart
router.post("/cart/add", async (req, res) => {
  const { user_id, item_id } = req.body;

  try {
    // Ambil detail item
    const [itemData] = await db.query("SELECT * FROM items WHERE id = ?", [item_id]);
    if (itemData.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    const item = itemData[0];

    // Cek apakah item sudah ada di cart
    const [cartCheck] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND item_id = ?",
      [user_id, item_id]
    );

    if (cartCheck.length > 0) {
      // Jika ada → increment quantity
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND item_id = ?",
        [user_id, item_id]
      );
    } else {
      // Jika belum ada → insert baru
      await db.query(
        "INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)",
        [user_id, item_id, 1]
      );
    }

    res.status(200).json({ message: "Item berhasil ditambahkan ke keranjang" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update quantity (increment atau decrement)
router.post("/cart/update/:item_id/:action", async (req, res) => {
  const { user_id } = req.body;
  const { item_id, action } = req.params;

  try {
    if (action === "increment") {
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND item_id = ?",
        [user_id, item_id]
      );
    } else if (action === "decrement") {
      // Pastikan tidak kurang dari 1
      await db.query(
        "UPDATE cart SET quantity = GREATEST(quantity - 1, 1) WHERE user_id = ? AND item_id = ?",
        [user_id, item_id]
      );
    }
    res.json({ message: "Cart berhasil diperbarui" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Hapus item dari cart
router.post("/cart/remove/:item_id", async (req, res) => {
  const { user_id } = req.body;
  const { item_id } = req.params;

  try {
    await db.query("DELETE FROM cart WHERE user_id = ? AND item_id = ?", [user_id, item_id]);
    res.json({ message: "Item berhasil dihapus dari keranjang" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ambil semua item dalam cart
router.get("/cart", async (req, res) => {
  const { user_id } = req.query;

  try {
    const [items] = await db.query(
      `SELECT c.item_id, c.quantity, i.nama, i.slug, i.description, i.price, i.image1, i.image2
       FROM cart c
       JOIN items i ON c.item_id = i.id
       WHERE c.user_id = ?`,
      [user_id]
    );
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

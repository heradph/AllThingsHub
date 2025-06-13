const express = require("express");
const router = express.Router();
const db = require("../../db/dbSQL");
const verifyAdmin = require("../../middleware/verifyAdmin");
const auth = require("../../middleware/auth");

router.get("/items", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal Mengambil Data");
  }
});

router.get("/items/:slug", async (req, res) => {
  try {
    const sql = "SELECT * FROM items WHERE slug = ?";
    const [result] = await db.query(sql, [req.params.slug]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// HANYAAA ADMINN!!
router.post("/items", auth, verifyAdmin, async (req, res) => {
  const { name, slug, price, description } = req.body;
  try {
    const sql =
      "INSERT INTO items (name, slug, price, description) VALUES (?, ?, ?, ?)";
    await db.query(sql, [name, slug, price, description]);
    res.status(201).json({ message: "Item berhasil ditambahkan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/items/:id", verifyAdmin, async (req, res) => {
  const { name, slug, price, description } = req.body;
  try {
    const sql =
      "UPDATE items SET name = ?, slug = ?, price = ?, description = ? WHERE id = ?";
    const [result] = await db.query(sql, [
      name,
      slug,
      price,
      description,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({ message: "Item berhasil diperbarui" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/items/:id", verifyAdmin, async (req, res) => {
  try {
    const sql = "DELETE FROM items WHERE id = ?";
    const [result] = await db.query(sql, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({ message: "Item berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

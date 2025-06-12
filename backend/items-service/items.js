const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/dbSQL");
const PORT = 3000;
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal Mengambil Data");
  }
});

app.get("/item/:slug", async (req, res) => {
  try {
    const sql = "SELECT * FROM items WHERE slug = ?";
    const [result] = await db.query(sql, [req.params.slug]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err); // <-- akan cetak error ke terminal agar bisa di-debug
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/cart", async (req, res) => {
  const { user_id, item_id, quantity } = req.body;
  try {
    const sql = `INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)`;
    await db.query(sql, [user_id, item_id, quantity]);
    res.status(201).json({ message: "Item berhasil ditambahkan ke cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cart/:userId", async (req, res) => {
  try {
    const sql = `
      SELECT c.id, i.name, i.price, c.quantity, (i.price * c.quantity) AS total
      FROM cart c
      JOIN items i ON c.item_id = i.id
      WHERE c.user_id = ?`;
    const [result] = await db.query(sql, [req.params.userId]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server jalan pada port
${PORT}`)
);

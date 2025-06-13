const express = require("express");
const router = express.Router();
const db = require("../../db/dbSQL");
const auth = require("../../middleware/auth");

router.post("/add-to-cart", auth, async (req, res) => {
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

router.get("/cart/:user_id", auth, async (req, res) => {
  try {
    const sql = `
      SELECT c.id, i.name, i.price, c.quantity, (i.price * c.quantity) AS total
      FROM cart c
      JOIN items i ON c.item_id = i.id
      WHERE c.user_id = ?`;
    const [result] = await db.query(sql, [req.params.user_id]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.put("/mahasiswa/:id_user/:id_item", (req, res) => {
//   const { jumlah } = req.body;
//   const sql = `UPDATE cart SET jumlah = ? WHERE id_user = ? && id_item = ?`;
//   db.query(sql, [jumlah, id_user, id_item], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Cart updated successfully", result });
//   });
// });

// // DELETE Mahasiswa by NIM (DELETE)
// router.delete("/cart/:id_user/:id_item", (req, res) => {
//   const sql = `DELETE FROM cart WHERE id_item = ? && id_user = ?`;
//   db.query(sql, [req.params.id_item, req.params.id_item], (err, result) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (result.affectedRows === 0) {
//       return res
//         .status(404)
//         .send({ message: "Item cart tidak ditemukan untuk user ini" });
//     }
//     res.status(200).send({ message: "Item cart berhasil dihapus" });
//   });
// });

module.exports = router;
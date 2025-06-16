const express = require("express");
const router = express.Router();
const db = require("../db/dbSQL");
const auth = require("../middleware/auth");

router.get("/transactions", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [transactions] = await db.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/transactions/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const transactionId = req.params.id;

  try {
    const [transaction] = await db.query(
      "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
      [transactionId, userId]
    );

    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const [items] = await db.query(
      `SELECT ti.quantity, ti.price, i.name, i.image
       FROM transaction_items ti
       JOIN items i ON ti.item_id = i.id
       WHERE ti.transaction_id = ?`,
      [transactionId]
    );

    res.json({ transaction: transaction[0], items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

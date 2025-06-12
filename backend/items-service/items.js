const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const PORT = 3002;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/:id_item', (req, res) => {
  const sql = 'SELECT * FROM items WHERE id_item = ?';
  db.query(sql, [req.params.id_item], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    res.status(200).json(result[0]);
  });
});

app.post('/add-to-cart', (req, res) => {
  const { id_user, id_item, jumlah } = req.body;

  const checkSql = 'SELECT * FROM cart WHERE id_user = ? AND id_item = ?';

  db.query(checkSql, [id_user, id_item], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      const updateSql = 'UPDATE cart SET jumlah = jumlah + ? WHERE id_user = ? AND id_item = ?';
      db.query(updateSql, [jumlah, id_user, id_item], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Jumlah item diperbarui di cart' });
      });
    } else {

    const insertSql = 'INSERT INTO cart (id_user, id_item, jumlah) VALUES (?, ?, ?)';
      db.query(insertSql, [id_user, id_item, jumlah], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Item ditambahkan ke cart' });
      });
    }
  });
});

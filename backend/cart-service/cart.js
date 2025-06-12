const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'db',    // ini nama service di docker-compose
    user: 'root',
    password: 'password',
    database: 'tokotambadb'
});

setTimeout(() => {
    db.connect(err => {
        if (err) {
            console.error('Gagal konek DB:', err);
            process.exit(1);
        }
        console.log('Connected to MySQL');
    });
}, 5000);

app.get('/cart/:id', (req, res) => {
    db.query('SELECT * FROM daftarbuku', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/cart/:id_user', (req, res) => { 
    const sql = `SELECT * FROM cart WHERE id = ?`; 
    db.query(sql, [req.params.id], (err, result) => { 
    if (err) { 
        return res.status(500).send(err); 
    } 
    if (result.length === 0) { 
        return res.status(404).send({ message: 'cart user not found' }); 
    } 
    res.status(200).send(result[0]); 
    }); 
}); 

// UPDATE Mahasiswa by NIM (PUT) 
router.put('/mahasiswa/:id_user/:id_item', (req, res) => { 
const { jumlah } = req.body; 
const sql = `UPDATE cart SET jumlah = ? WHERE id_user = ? && id_item = ?`; 
db.query(sql, [jumlah, id_user, id_item], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cart updated successfully', result });
  });
});

// DELETE Mahasiswa by NIM (DELETE) 
app.delete('/cart/:id_user/:id_item', (req, res) => { 
const sql = `DELETE FROM cart WHERE id_item = ? && id_user = ?`; 
db.query(sql, [req.params.id_item], (err, result) => { 
if (err) { 
return res.status(500).send(err); 
} 
if (result.affectedRows === 0) { 
return res.status(404).send({ message: 'Item cart tidak ditemukan untuk user ini' }); 
} 
res.status(200).send({ message: 'Item cart berhasil dihapus' }); 
}); 
});
const db = require('../config/dbSQL');

const createUser = async (username, password) => {
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

const getUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

module.exports = { createUser, getUserByUsername };

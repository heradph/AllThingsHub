const db = require("../../db/dbSQL");

async function createUser(username, passwordHash, email, displayname, photo, role = "user") {
  await db.query(`
    INSERT INTO users (username, password, email, displayname, photo, role)
    VALUES (?, ?, ?, ?, ?, ?)`, [username, passwordHash, email, displayname, photo, role]);
}

async function createUserGoogle(googleId, email, displayname, photo, familyName, givenName, role = "user") {
  await db.query(`
    INSERT INTO users (google_id, email, displayname, photo, role)
    VALUES (?, ?, ?, ?, ?)`, [googleId, email, displayname, photo, role]);
}


async function getUserByGoogleId(googleId) {
  const [rows] = await db.query('SELECT * FROM users WHERE google_id = ?', [googleId]);
  return rows[0];
}

async function getUserByUsername(username) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

module.exports = {
  createUser,
  createUserGoogle,
  getUserByUsername,
  getUserByGoogleId,
};

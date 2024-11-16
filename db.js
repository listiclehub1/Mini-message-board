const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

async function addMessage(text, username) {
  await pool.query("INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)", [text, username, new Date()]);
};

async function getMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
  return rows;
}

module.exports = {getAllMessages, addMessage, getMessage};
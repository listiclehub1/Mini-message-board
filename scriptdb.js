const { Client } = require("pg");
require('dotenv').config()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT,
  username VARCHAR (255),
  added TIMESTAMP
);`;

const value = `INSERT INTO messages (text, username, added) 
VALUES ($1, $2, $3)`;

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

async function main() {
  await client.connect();
  await client.query(SQL);
  for (let i = 0; i < messages.length; i++) {
    await client.query(value, [messages[i].text, messages[i].user, messages[i].added]);
  }
  await client.end();
}

main();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("todo.db"); // Change to a file path for persistent storage

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, password TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, userId TEXT, title TEXT, status TEXT, FOREIGN KEY (userId) REFERENCES users (id))"
  );
});

module.exports = db;

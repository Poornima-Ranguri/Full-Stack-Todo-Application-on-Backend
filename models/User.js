const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const User = {
  create: (name, email, password) => {
    const id = uuidv4();
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
        [id, name, email, password],
        function (err) {
          if (err) reject(err);
          else resolve({ id, name, email });
        }
      );
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  update: (id, name, email, password) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
};

module.exports = User;

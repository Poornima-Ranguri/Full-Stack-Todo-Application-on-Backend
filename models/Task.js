const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Task = {
  create: (userId, title, status = "pending") => {
    const id = uuidv4();
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO tasks (id, userId, title, status) VALUES (?, ?, ?, ?)",
        [id, userId, title, status],
        function (err) {
          if (err) reject(err);
          else resolve({ id, userId, title, status });
        }
      );
    });
  },
  getAll: (userId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM tasks WHERE userId = ?", [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  update: (id, title, status) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
        [title, status, id],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },
};

module.exports = Task;

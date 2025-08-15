const db = require('./dbconn.js');

module.exports = {
  init() {
    const sql = `
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount INTEGER NOT NULL,
        description TEXT,
        date TEXT NOT NULL
      )
    `;
    db.run(sql);
  },

  add(category, amount, description, date, cb) {
    db.run(
      `INSERT INTO expenses (category, amount, description, date) VALUES (?, ?, ?, ?)`,
      [category, amount, description, date],
      function (err) {
        cb(err, this?.lastID);
      }
    );
  },

  getAll(cb) {
    db.all(`SELECT * FROM expenses ORDER BY date DESC`, cb);
  },

  getByCategory(category, cb) {
    db.all(`SELECT * FROM expenses WHERE category = ? ORDER BY date DESC`, [category], cb);
  },

  delete(id, cb) {
    db.run(`DELETE FROM expenses WHERE id = ?`, [id], cb);
  }
};


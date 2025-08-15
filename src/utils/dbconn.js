// Library Area 
const sqlite3 = require('sqlite3');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Variable Area
const CfgDir = path.join(os.homedir(), 'config', 'Zentrack');
const DbPath = path.join(CfgDir, 'Zentrack-expenses.db');

// Check if CfgDir is exist 
if (!fs.existsSync(CfgDir)) {
  fs.mkdirSync(CfgDir, { recursive: true});
}

// Make db file and establish connection to the db 
const db = new sqlite3.Database(DbPath)

module.exports = db;

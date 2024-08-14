// In your server directory, create a new file named db.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'pms_user',
  password: 'your_password',
  database: 'pmsdb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = db;
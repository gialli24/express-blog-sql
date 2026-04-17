const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || "host",
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database'
});

conn.connect(err => {
    if (err) throw err;
    console.log("Connected to database!")
});

module.exports = conn;
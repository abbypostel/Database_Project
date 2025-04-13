const mysql = require('mysql2');

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Default MySQL username
    password: '',  // Password (leave empty if no password is set)
    database: 'finalproject' , // Replace with your database name
    multipleStatements: true,
    charset: 'utf8mb4'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});

module.exports = db; // Export the db connection to use in other files

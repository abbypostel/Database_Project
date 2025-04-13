import express from 'express'; // Change require to import
import mysql from 'mysql2';    // Change require to import
import fs from 'fs';           // Change require to import

const app = express();
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server!');

    // Create the database if it doesn't exist
    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS finalproject';
    db.query(createDatabaseQuery, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists.');

        // Now use the database
        db.changeUser({ database: 'finalproject' }, (err) => {
            if (err) {
                console.error('Error selecting database:', err);
                return;
            }
            console.log('Using the database!');

            // Execute the SQL script to create tables
            createTables();
        });
    });
});

// Function to execute the SQL file to create tables
function createTables() {
    const sqlFilePath = './database_tables.sql';

    // Read the SQL file and execute its contents
    fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
        if (err) {
            console.error('Error reading the SQL file:', err);
            return;
        }

        // Run the SQL script to create tables
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error creating tables:', err);
            } else {
                // Log result to ensure query completed
                console.log('Tables created successfully!');
                console.log('Result:', result); // This should be empty for CREATE TABLE but can be useful for debugging
            }
        });
    });
}

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});




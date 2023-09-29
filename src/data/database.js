const env = require('dotenv');
const mysql = require("mysql2");

env.config();

const connection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

const askFavorite = async (name, personality) => {
    if (!name || !personality) {
        throw new Error('Missing input');
    }

    try {
        const result = await connection.promise().query(
            `INSERT INTO favorites (name, personality) 
            VALUES (?, ?)`,
            [name, personality]
        )
        return result[0].insertId;
    } catch (err) {
        throw new Error('Database query failed');
    }
}

const getFavorite = async () => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT * FROM favorites 
            ORDER BY id 
            DESC LIMIT 10;`
        );
        return rows;
    } catch (err) {
        throw new Error('Failed to get favorites');
    }
}

module.exports ={
    askFavorite, 
    getFavorite
}
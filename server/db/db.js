const { Pool } = require ('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRESS_USER,
    password: process.env.POSTGRESS_PASS,
    host: 'localhost',
    database: 'todo_app',
    port: process.env.POSTGRESS_PORT
});

module.exports = pool;

const { Pool } = require('pg');
const db = new Pool({
    connectionString:process.env.DB_URL
})

console.log('Database connected');
module.exports = db
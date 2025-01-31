require('dotenv').config();
const fs = require('fs');
const db = require('./connect');
const sql = fs.readFileSync('./api/database/diary.sql').toString();

db.query(sql)
.then(data=>{
db.end();
console.log('Database setup complete')})
.catch(error=>{console.log(error);
    
});

const express = require('express');
const cors = require('cors')

const diaryRouter = require('./routers/diary');
const app = express()

app.use(express.json());
app.use(cors());
app.use('/diary', diaryRouter)

module.exports = app;
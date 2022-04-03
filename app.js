const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})
app.get('/', (req, res) => {
    res.send('Expense Tracker ')
})

app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
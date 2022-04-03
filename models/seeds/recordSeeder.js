const mongoose = require('mongoose')
const Record = require('../record')
const recordData = require('./record.json').records

mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    Record.create(recordData)
})
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Record = require('./models/record')

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


app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: '.hbs' }).engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    Record.find()
    .lean()
    .then(record => res.render('index', { record }))
    .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
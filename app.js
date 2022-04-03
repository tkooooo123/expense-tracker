const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
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
    res.render('index')
})

app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
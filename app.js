const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

require('./config/mongoose')


app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: '.hbs' }).engine)
app.set('view engine', 'hbs')

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
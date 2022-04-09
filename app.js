const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const flash = require('connect-flash')  
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const app = express()
const port = process.env.PORT

require('./config/mongoose')


app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: '.hbs' }).engine)
app.set('view engine', 'hbs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  
    res.locals.warning_msg = req.flash('warning_msg')
    next()
  })
app.use(routes)


app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
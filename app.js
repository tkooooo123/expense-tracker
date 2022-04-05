const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Record = require('./models/record')
const Category = require('./models/category')
const category = require('./models/category')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const categoryNames = []
    const recordDatas = []
    Category.find()
        .lean()
        .then(categories => {
            categories.filter(category => {
                categoryNames.push(category.name)
                //console.log(category._id)
               //console.log(category.icon)
            })
            Record.find()
                .populate('categoryId')//關聯Category資料庫
                .lean()
                .then(records => {
                    let totalAmount = 0
                    records.forEach(record => {
                        //console.log(record.categoryId)
                        totalAmount += record.amount

                        recordDatas.push({
                            id: record._id,
                            name: record.name,
                            date: record.date,
                            amount: record.amount,
                            icon: record.categoryId.icon
                        })
                    })
                    //console.log(recordDatas)
                    //console.log(categoryNames)
                    //console.log(totalAmount)
                    res.render('index', { record: recordDatas, categories: categoryNames, totalAmount})
                })
        })
        .catch(err => console.log(err))
})
app.get('/records/new', (req, res) => {
    const categoryNames = []
    Category.find()
    .lean()
    .then(categories => {
        categories.filter(category => {
            categoryNames.push(category.name)
        })
        console.log(categoryNames)
    })
    .catch(err => console.log(err))
    
    res.render('new' , {categories: categoryNames} )
})
app.post('/records',(req, res) =>{
    const { name, category, date, amount } = req.body
 
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      return Record.create({
        name,
        date,
        amount,
        categoryId: category._id
      })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})
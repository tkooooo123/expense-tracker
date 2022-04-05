const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
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

    res.render('new', { categories: categoryNames })
})
router.post('/', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .populate('categoryId')//關聯Category資料庫
        .lean()
        .then(record => {
            const categoryNames = []
            Category.find()
                .lean()
                .then(categories => {
                    categories.filter(category => {
                        if (category.name !== record.categoryId.name) {
                            categoryNames.push(category.name)
                        }
                    })
                })
            res.render('edit', { record, categories: categoryNames })
        })
        .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, date, amount, category } = req.body
    Category.findOne({ name: category })
        .lean()
        .then(category => {
            Record.findById(id)
                .then(record => {
                    console.log(record)
                    record.name = name
                    record.date = date
                    record.amount = amount
                    record.categoryId = category._id
                    return record.save()
                })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
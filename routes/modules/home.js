const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    const userId = req.user._id
    Category.find()
        .lean()
        .then(categories => {
            categories.filter(category => {
            })
            Record.find({ userId })
                .populate('categoryId')//關聯Category資料庫
                .lean()
                .then(records => {
                    let totalAmount = 0
                    records.forEach(record => {
                        totalAmount += record.amount
                        record.date = record.date.toISOString().slice(0, 10)
                        //Date.toISOString() 轉換時間格式
                    })
                    res.render('index', { records, categories, totalAmount })
                })
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const { selectedCategory } = req.body
    if (selectedCategory) {
        Category.find({ _id: { $ne: selectedCategory } })
        .lean()
        .then(notSelectedCategories => {
            Category.findById(selectedCategory)
                .lean()
                .then(selectedCategory => {
                    console.log(selectedCategory.id)
                    Record.find({ userId, categoryId: selectedCategory })
                        .populate('categoryId')//關聯Category資料庫
                        .lean()
                        .then(records => {
                            let totalAmount = 0
                            records.forEach(record => {
                                totalAmount += record.amount
                                record.date = record.date.toISOString().slice(0, 10)
                            })
                            res.render('index', { records, selectedCategory , notSelectedCategories , totalAmount })
                        })
                })
        })
    } else {
        res.redirect('/')
    }
})


module.exports = router
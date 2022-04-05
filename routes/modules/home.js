const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
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
                    res.render('index', { record: recordDatas, categories: categoryNames, totalAmount })
                })
        })
        .catch(err => console.log(err))
})

module.exports = router
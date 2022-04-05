const Category = require('../category')
const Record = require('../record')
const recordList = require('./record.json').records
const categoryList = require('./category.json').categories


const db = require('../../config/mongoose')

db.once('open', async () => {
    

    //Category.create(categoryList)
   
    
        await Promise.all(
            categoryList.map(async category => {
                const { name, icon} = category

                const categoryData = await Category.findOne({name})
                if (!categoryData) {
                    await Category.create( {name, icon} )
                }
            })
        )

      



        .then(() => {
            Category.find()
                .lean()
                .then(categoryData => {

                    recordList.forEach(record => {
                        const { name, date, amount, category_id } = record
                        const categoryName = categoryList.find(categories => categories.id === category_id).name
                        const categoryID = categoryData.find(category => categoryName === category.name)._id

                        
                        Record.create({
                            name: record.name,
                            date: record.date,
                            amount: record.amount,
                            categoryId: categoryID
                        })
                    })
                })
                .catch(err => console.log(err))
        })
        console.log('recordSeeder generated!')
})
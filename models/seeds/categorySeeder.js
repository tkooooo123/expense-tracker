const Category = require('../category')
const categoryList = require('./category.json').categories
const db = require('../../config/mongoose')

db.once('open', async () => {
    await Promise.all(
        categoryList.map(async category => {
            const { name, icon } = category
            const categoryData = await Category.findOne({ name })
            if (!categoryData) {
                await Category.create({ name, icon })
            }
        }))
        console.log('categorySeeder genegrated!')
        process.exit()
})
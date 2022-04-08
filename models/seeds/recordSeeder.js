const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const recordList = require('./record.json').records
const categoryList = require('./category.json').categories
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs/dist/bcrypt')
const user = require('../user')
const SEED_USERS = [
    {
        name:'廣志',
        email:'user1@example.com',
        password:'12345678',
        records: recordList.slice(0, 3).concat(recordList[4])
    },
    {
        name:'小新',
        email:'user2@example.com',
        password:'12345678',
        records: recordList.slice(3, 4)
    },
]

db.once('open', async () => {
        await Promise.all(
            categoryList.map(async category => {
                const { name, icon} = category

                const categoryData = await Category.findOne({name})
                if (!categoryData) {
                    await Category.create( {name, icon} )
                }
            })
        )
        Promise.all(Array.from(SEED_USERS, seedUser => {
            return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(seedUser.password, salt))
            .then(hash => User.create({
                name: seedUser.name,
                email: seedUser.email,
                password: hash
            }))
            .then((user) => {
                Category.find()
                    .lean()
                    .then(categoryData => {
                        seedUser.records.forEach(record => {
                            const { name, date, amount, category_id, userId } = record
                            const categoryName = categoryList.find(categories => categories.id === category_id).name
                            const categoryID = categoryData.find(category => categoryName === category.name)._id
                            const seedUserId = user._id
                            Record.create({
                                name: record.name,
                                date: record.date,
                                amount: record.amount,
                                categoryId: categoryID,
                                userId: seedUserId
                            })
                        })
                    })
                    .catch(err => console.log(err))
            })
        }))
        console.log('recordSeeder generated!')
})
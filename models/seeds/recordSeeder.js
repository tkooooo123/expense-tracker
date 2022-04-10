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
        name: '廣志',
        email: 'user1@example.com',
        password: '12345678',
        records: recordList.slice(0, 3).concat(recordList[4])
    },
    {
        name: '小新',
        email: 'user2@example.com',
        password: '12345678',
        records: recordList.slice(3, 4)
    },
]
db.once('open', () => {
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
                 return Promise.all(Array.from(seedUser.records, (records, i) => {
                    console.log(records)
                    const { name, date, amount, category_id, userId } = records
                    const categoryName = categoryList.find(categories => categories.id === records.category_id).name
                    return Category.findOne({ name: categoryName })
                        .then(category => {
                            console.log(category)
                            return User.findOne({ email: seedUser.email })
                                .then(user => {
                                    return Record.create({
                                        name: records.name,
                                        date: records.date,
                                        amount: records.amount,
                                        categoryId: category._id,
                                        userId: user.id
                                    })
                                })
                        })
                }))
                    .catch(err => console.log(err))
            })
    }))
        .then(() => {
            console.log('recordSeeder generated!')
            process.exit()
        })
})
require('dotenv').config({ path: '../.env' })

const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.testMongoUrl : process.env.mongoUrl
const PORT = process.env.PORT

module.exports = {
    mongoUrl,
    PORT
}

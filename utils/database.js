const mongoose = require("mongoose")

const connectMongo = callback => {
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASSWORD
    const dbName = process.env.DB_NAME

    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@clusterrathorenterprise.45984.mongodb.net/${dbName}?retryWrites=true&w=majority`)
    .then(client => {
        console.log('Mongo DB connection success')
        callback(client)
    }).catch(error => {
        console.log('Mongo DB connection failed')
        console.log(error)
    })
}

module.exports = connectMongo
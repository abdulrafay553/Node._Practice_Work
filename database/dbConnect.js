const mongoose = require('mongoose')
const dbLink = "mongodb://127.0.0.1:27017/batch106"

// mongoose.set('strictQuery', false)
// mongoose.pluralize(null)

const dbFlag = mongoose.connect(dbLink)

dbFlag.then(() => {
    console.log("MongoDB Connected ...")
}).catch((err) => {
    console.log("MongoDB Connection Error:" + err)
})


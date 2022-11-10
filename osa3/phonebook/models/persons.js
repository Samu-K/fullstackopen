const mongoose = require("mongoose")

const url = process.env.MONGODB_URL 

mongoose.connect(url)
    .then(result => {
        console.log("Connected to db")
    })
    .catch((error) => {
        console.log("Erro connecting to db: ",error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model("Person",personSchema)

const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const personsRouter = require("./controllers/persons")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info("connecting to", config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        logger.info("connected to MongoDb")
    })
    .catch(error => {
        logger.error("Error connection to MongoDb:", error.message)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/persons",personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
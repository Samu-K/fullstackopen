require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")

const app = express()

morgan.token("body",req => {
    return JSON.stringify(req.body)
})

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :response-time :body"))

app.post("/api/persons", (req,resp, next) => {
    const rbody = req.body

    if (rbody.name==null || rbody.number==null) {
        console.log("content missing error")
        return resp.status(400).json({
            error: "content missing"
        })
    } else if (isDuplicate(Person,rbody.name)) {
        return resp.send(400).json({
            error: "name duplicate error"
        })
    } else {
        addPerson(Person,rbody, resp, next)
    }
})

app.get("/", (req,resp) => {
    // placeholder if frontend build fails
    resp.send("<h1>Front page</h1>")
})

app.get("/api/persons/",(req,resp) => {
    Person.find({}).then( persons => {
        resp.json(persons)
    })
})

app.get("/api/persons/:id",(req,resp, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            resp.json(person)
        } else {
            resp.status(404).end()
        }}
    )
        .catch(error => next(error))
})

app.get("/info",(req,resp) => {
    const date = new Date()
    Person.count({},(err,pplnum)=> {
        resp.send(`<p>Phonebook has info for ${pplnum}</p> <p>${date}</p>`)
    })
})

app.delete("/api/persons/:id", (req,resp,next) => {
    Person.findOneAndDelete({"id":req.params.id})
        .then(resp.status(204).end())
        .catch(error => next(error))
})

const unknownEndpoint = (req,resp) => {
    resp.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, resp, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return resp.status(400).send({error: "malformatted id"})
    } else if (error.name === "ValidationError") {
        return resp.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

function isDuplicate(Person,pname) {
    Person.countDocuments({"name":pname},{limit:1},(err,num) => {
        if (num > 0) {
            console.log("name unique error")
            return true
        }
    })
    return false
}

function addPerson(Person, rbody, resp, next) {
    Person
        .findOne({})
        .sort("-id")
        .exec((err,mem)=>{
        // add new person
            const person = new Person({
                name: rbody.name,
                number: rbody.number,
                id: mem.id+1,
            })
        
            person.save()
                .then(savedPerson => {
                    resp.json(savedPerson)
                })
                .catch(error => next(error))
        
        })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

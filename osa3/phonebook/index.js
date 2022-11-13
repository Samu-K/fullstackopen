require('dotenv').config()

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")
const { json } = require('express')

const app = express()

morgan.token("body",req => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :response-time :body"))
app.use(express.static("build"))

function isDuplicate(Person,pname) {
    Person.countDocuments({"name":pname},{limit:1},(err,num) => {
        if (num > 0) {
            console.log("name unique error")
            return true
        }
    })
    return false
}

function addPerson(Person, rbody,resp) {
    Person
    .findOne({})
    .sort('-id')
    .exec((err,mem)=>{
        // add new person
        const person = new Person({
            name: rbody.name,
            number: rbody.number,
            id: mem.id+1,
        })
        
        person.save().then(savedPerson => {
            resp.json(savedPerson)
        })
        
    })
}

app.get("/", (req,resp) => {
    // placeholder if frontend build fails
    resp.send("<h1>Front page</h1>")
})

app.get("/api/persons/",(req,resp) => {
    Person.find({}).then( persons => {
        resp.json(persons)
    })
})

app.get("/api/persons/:id",(req,resp) => {
    Person.findById(req.params.id).then(person => {
        resp.json(person)
    })
})

app.get("/info",(req,resp) => {
    const date = new Date()
    Person.count({},(err,pplnum)=> {
        resp.send(`<p>Phonebook has info for ${pplnum}</p> <p>${date}</p>`)
    })
})

app.post("/api/persons", (req,resp) => {
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
        addPerson(Person,rbody, resp)
    }
})

app.delete("/api/persons/:id", (req,resp) => {
    Person.findOneAndDelete({"id":req.params.id})
    .catch(error => {
        console.log(`Error: ${error}`)
    })

    resp.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

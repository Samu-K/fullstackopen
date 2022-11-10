const addPerson = (id, rbody) => {
    const person = {
        name: rbody.name,
        number: rbody.number,
        id: id
    }
    
    return person
}

require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")

const app = express()

morgan.token("body",req => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :response-time :body"))
app.use(express.static("build"))

let persons = [
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 0
      },
      {
        "name": "sdfgsdfg",
        "number": "235325",
        "id": 7
      },
      {
        "name": "sdfgsdg",
        "number": "235532",
        "id": 9
      },
      {
        "name": "dfsg ",
        "number": "2131",
        "id": 11
      }
    ]

app.get("/", (req,resp) => {
    resp.send("<h1>Front page</h1>")
})

app.get("/api/persons/",(req,resp) => {
    Person.find({}).then( persons => {
        resp.json(persons)
    })
})

app.get("/api/persons/:id",(req,resp) => {
    const id = Number(req.params.id)
    const person = persons.find(person=>person.id === id)

    if (person) {
        resp.json(person)
    } else {
        resp.status(404).end()
    }
    
})

app.get("/info",(req,resp) => {
    const date = new Date()
    const pplnum = persons.length
    resp.send(`<p>Phonebook has info for ${pplnum}</p> <p>${date}</p>`)

})

app.post("/api/persons", (req,resp) => {
    const rbody = req.body

    if (rbody.name==null || rbody.number==null) {
        return resp.status(400).json({
            error: "content missing"
    })
    } else if (persons.find(person => person.name === rbody.name)) {
        return resp.status(400).json({
            error: "name must be unique"
        })
    } else {
        const max_id = Math.max(...persons.map(person=>person.id))

        const person = addPerson(max_id+1, rbody)

        persons= persons.concat(person)

        resp.json(person)
    }
})

app.delete("/api/persons/:id", (req,resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    resp.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

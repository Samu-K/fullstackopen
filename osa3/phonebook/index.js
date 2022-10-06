const { response } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

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
    resp.send("<h1>Test</h1>")
})

app.get("/api/persons/",(req,resp) => {
    resp.json(persons)
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

app.delete("/api/persons/:id", (req,resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    resp.status(204).end()
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
    
        const person = {
            name: rbody.name,
            number: rbody.number,
            id: max_id+1
        }
    
        persons= persons.concat(person)
        console.log(persons)
        resp.json(person)
    }
    
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
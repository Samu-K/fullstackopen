const addPerson = require("../components/addPerson")
const isDuplicate = require("../components/isDuplicate")

const personsRouter = require("express").Router()
const Person = require("../models/note")

personsRouter.get("/",(req,resp) => {
    Person.find({}).then( persons => {
        resp.json(persons)
    })
})

personsRouter.get("/:id",(req,resp, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            resp.json(person)
        } else {
            resp.status(404).end()
        }}
    )
        .catch(error => next(error))
})

personsRouter.post("/", (req,resp, next) => {
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

personsRouter.delete("/:id", (req,resp,next) => {
    Person.findOneAndDelete({"id":req.params.id})
        .then(resp.status(204).end())
        .catch(error => next(error))
})

module.exports = personsRouter
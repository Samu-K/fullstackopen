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

module.export = addPerson
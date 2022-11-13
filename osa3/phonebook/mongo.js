const mongoose = require("mongoose")


const password = process.argv[2]
const name = process.argv[3]
const num = process.argv[4]

const url = 
		`mongodb+srv://mgdfso:${password}@fullstackopen.52okaik.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
		name: {
			type: String,
			minlength: 3,
			required: true
		},
		number: {
			type: String,
			minlength: 8,
			required: true
		},
		id: Number,
})

const Person = mongoose.model("Person",personSchema)

if (!name) {
		console.log("phonebook")
		Person.find({}).then( result => {
				result.forEach(note => {
				console.log(`${note.name} ${note.number}`)
				})
		mongoose.connection.close()
		})
} else {
		const person = new Person({
				name: name,
				number: num,
				id: Math.floor(Math.random() * 10000),
		})

		person.save().then(result => {
				console.log(`added ${name} number ${num} to phonebook`)
				mongoose.connection.close()
		})
}


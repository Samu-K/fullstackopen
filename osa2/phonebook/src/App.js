import {useReducer, useState} from "react";

const App = () => {
  const [persons, setPersons] = useState(
    [
    {name: "Arto Hellas",
    number: "040-1231244",
    id: 1
    },
    {name: "Tester2",
    number: "044-1222221244",
    id: 2
    },

])

  const [newName,setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const match = persons.find(person => person.name === newName)
    if (match === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1,
      }
  
      setPersons(persons.concat(personObject))

    } else {
      const msg = `${newName} is already added to phonebook`
      alert(msg)
    }
    setNewName("")
    setNewNumber("")
  }

  const personsToShow = persons.filter(person => person.name.includes(currentFilter))
  return (
    <div>
      <h2>phonebook</h2>
      <form>
        filter shown with <input value={currentFilter} onChange={handleFilterChange}/>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        name: <input value={newName} onChange={handleNameChange}/>
      <div>  
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      </form>
      <h2>numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App;
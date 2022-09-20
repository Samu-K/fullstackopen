import {useReducer, useState} from "react";

const App = () => {
  const [persons, setPersons] = useState(
    [
    {name: "Arto Hellas",
    id: 1
    },
    {name: "Tester2",
    id: 2
    },

])

  const [newName,setNewName] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()

    const match = persons.find(person => person.name === newName)
    if (match === undefined) {
      const personObject = {
        name: newName,
        id: persons.length+1,
      }
  
      setPersons(persons.concat(personObject))

    } else {
      const msg = `${newName} is already added to phonebook`
      alert(msg)
    }
    setNewName("")
  }

  return (
    <div>
      <h2>phonebook</h2>
      <form onSubmit={addName}>
          name: <input value={newName} onChange={handleNameChange}/>
      <div>
        <button type="submit">add</button>
      </div>
      </form>
      <h2>numbers</h2>
      <ul>
        {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App;
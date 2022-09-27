import {useState,useEffect} from "react";
import axios from "axios"
import service from "./services/persons"

const AddPerson = ({newName,newNumber,addName,handleNameChange,handleNumberChange}) => {
  return (
  <div>
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
  </div>
  )
}

const ShowBook = ({persons,currentFilter}) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase()))

  return (
  <div>
    <h2>numbers</h2>
    <ul>
      {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </ul>
  </div>
  )

}

function NewPerson(name,number,len) {
  const id = len+1

  const personObject = {
    name: name,
    number: number,
    id: id,
  }

  return personObject
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    service
    .getCurrent(initpersons => {
      setPersons(initpersons)
    })
  },[])

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
      const personObject = NewPerson(newName,newNumber,persons.length)
      
      service
      .createNew(personObject)
      .then(rtn => {
        setPersons(persons.concat(rtn))
        setNewName("")
        setNewNumber("")
      })
        
    } else {
      const msg = `${newName} is already added to phonebook`
      alert(msg)
    }
  }

  return (
    <div>
      <h2>phonebook</h2>
      
      <form>
        filter shown with <input value={currentFilter} onChange={handleFilterChange}/>
      </form>

      <AddPerson 
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <ShowBook
        persons={persons}
        currentFilter={currentFilter}
      />

    </div>
  )
}

export default App;
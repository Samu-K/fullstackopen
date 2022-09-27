import axios from "axios";
import {useState,useEffect} from "react";
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

const ShowBook = ({persons,currentFilter,handleDelete}) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase()))

  return (
  <div>
    <h2>numbers</h2>
    <ul>
      {personsToShow.map(person => <li key={person.id}>
        {person.name} {person.number} <button value={person.id} onClick={handleDelete}>Delete</button>
      </li>)}
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
    .getCurrent()
    .then(initpersons => {
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

  const handleDelete = (event) => {
    const id = event.target.value
    const cnf = window.confirm(`Delete ${persons[id]} ?`)

    if (cnf) {
      service
      .delperson(id)

      service
      .getCurrent()
      .then(prs => {
        setPersons(prs)
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const match = persons.find(person => person.name === newName)

    if (match === undefined) {
      const personObject = NewPerson(newName,newNumber,persons.length+1)
      
      service
      .createNew(personObject)
      .then(rtn => {
        setPersons(persons.concat(rtn))
        setNewName("")
        setNewNumber("")
      })
        
    } else {
      const rtn = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (rtn) {
        const personObject = {...match, number: newNumber}
        axios
        .put(`http://localhost:3001/persons/${personObject.id}`,personObject)
      
        setNewName("")
        setNewNumber("")

        service
        .getCurrent()
        .then(prs => {
          setPersons(prs)
        })
      }
    }}

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
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App;
import axios from "axios";
import {useState,useEffect} from "react";
import service from "./services/persons"
import AddPerson from "./components/addperson"
import ShowBook from "./components/showbook"
import NewPerson from "./components/newperson"
import DisplayNotif from "./components/displaynotif"
import fix_id from "./components/fix_id";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName,setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  useEffect(() => {
    service
    .getCurrent()
    .then(initpersons => {
      setPersons(initpersons)
    })
  },[])

  const handleDelete = (event) => {
    const id = event.target.value
    const cnf = window.confirm(`Delete ${persons[id]} ?`)

    if (cnf) {

      service
      .delperson(id)

      service
      .getCurrent()
      .then(prs => {
        setPersons(fix_id(prs))
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const match = persons.find(person => person.name === newName)

    if (match === undefined) {
      const personObject = NewPerson(newName,newNumber,persons.length-1)
      
      service
      .createNew(personObject)
      .then(rtn => {
        setPersons(persons.concat(rtn))
        setNewName("")
        setNewNumber("")
      })

      setErrorMsg(`Added ${newName}`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
        
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
      <h3><DisplayNotif message={errorMsg}/></h3>
    
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
        setErrorMsg={setErrorMsg}
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
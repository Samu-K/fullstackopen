import {useState, useEffect} from "react";
import axios from "axios";
import Countries from "./components/countries";


const App = () => {
  const [newSearch,setNewSearch] = useState("")
  const [countries,setCountries] = useState([])

  const handleFilter = event => {
    setNewSearch(event.target.value)
  }

  useEffect(()=>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => setCountries(response.data))
  },[])

  return (
    <div>
      <form>
        find countries
        <input value={newSearch} onChange={handleFilter} />
      </form>

      <Countries countries={countries} currentFilter={newSearch}/>
    </div>
  )
}

export default App;

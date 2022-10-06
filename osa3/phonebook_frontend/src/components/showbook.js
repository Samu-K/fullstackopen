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

export default ShowBook;
function fix_id(persons) {
    let fixed_persons = []
    console.log(persons)
    
    for (let i=0;i<persons.length;i++) {
      let tempPerson = {}
      tempPerson = {
        ...persons[i],
        id: i
      }
  
      fixed_persons = [...fixed_persons,tempPerson]
    }
  
    return fixed_persons
  }

export default fix_id;
function NewPerson(name,number,len) {
    const id = len+1
  
    const personObject = {
      name: name,
      number: number,
      id: id,
    }
  
    return personObject
}

export default NewPerson;
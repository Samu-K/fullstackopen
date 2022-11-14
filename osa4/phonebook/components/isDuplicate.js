function isDuplicate(Person,pname) {
    Person.countDocuments({"name":pname},{limit:1},(err,num) => {
        if (num > 0) {
            console.log("name unique error")
            return true
        }
    })
    return false
}

export default isDuplicate
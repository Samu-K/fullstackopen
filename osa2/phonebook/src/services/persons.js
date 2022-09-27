import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getCurrent = () => {
    const request = axios.get(baseUrl)
    return request.then(response=> {
        return response.data
    })
}

const createNew = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response=> {
        return response.data
    })
}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=> {
        return response.data
    })
}

export default {getCurrent, createNew, update};
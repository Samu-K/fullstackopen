import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getCurrent = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const createNew = async (newObject) => {
    const request = axios.post(baseUrl,newObject)
    const response = await request
    return response.data
}

const delperson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line
export default {getCurrent, createNew, delperson};
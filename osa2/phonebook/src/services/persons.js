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

const delperson = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
    const update = await getCurrent()
    return update
}

// eslint-disable-next-line
export default {getCurrent, createNew, delperson};
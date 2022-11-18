import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const getUnpopulated = () => {
    const request = axios.get(`${baseUrl}/unpopulated`)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const createComment = async (newObject) => {
    const response = await axios.post(`${baseUrl}/${newObject.blog}/comments`, newObject)
    return response.data
}

const update = async (id, updatedBlog) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, setToken, update, remove, getUnpopulated, createComment }

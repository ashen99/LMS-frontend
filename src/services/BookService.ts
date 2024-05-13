import axios,  { AxiosPromise } from "axios";

export const saveBook = async (
    payload: any
) => {
    try {
        return await axios.post('http://localhost:8080/v1/books/add-book', payload) 
    } catch (error) {
        throw error
    }
}
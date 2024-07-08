import axios from "axios";

export const getBookList = async () => {
  try {
    return axios.get("http://localhost:8080/v1/books/get-books");
  } catch (error) {
    throw error;
  }
};

export const saveBook = async (payload: any) => {
  try {
    return await axios.post("http://localhost:8080/v1/books/add-book", payload);
  } catch (error) {
    throw error;
  }
};

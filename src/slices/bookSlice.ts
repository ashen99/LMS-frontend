import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as BookService from "../services/BookService";
import axios from "axios";
import Book from "../model/Book";
import { BookDataType } from "../types/global";

export interface BookState {
  id: string;
  title: string;
  isbn: string;
  authoer: string;
  copies: number;
}

const initialState = {
  booksFetched: false,
  inProgress: false,
  error: null,
  book: {} as Book,
  bookList: [] as BookDataType[],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    bookListFetchInProgress: (state) => {
      state.booksFetched = false;
      state.inProgress = true;
      state.error = null;
    },
    bookListFetchCompelte: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      state.inProgress = false;
      state.error = null;
      state.booksFetched = true;
      state.bookList = payload;
    },
    bookListFetchFail: (state, action) => {
      state.inProgress = false;
      state.error = action.payload;
    },
    bookSavingInprogress: (state) => {
      state.inProgress = true;
      state.error = null;
    },
    bookSaveCompleted: (state, { payload, type }: PayloadAction<any>) => {
      state.inProgress = false;
      state.error = null;
      state.book.author = payload.data.author;
      state.book.title = payload.data.title;
      state.book.isbn = payload.data.isbn;
      state.book.id = payload.data.id;
      state.book.copies = payload.data.copies;
    },
    bookSaveCompleteFail: (state, action) => {
      state.inProgress = false;
      state.error = action.payload;
    },
    bookEditInProgress: (state) => {
      state.inProgress = true;
      state.error = null;
    },
    bookEditCompleted: (state, {payload, type}: PayloadAction<any>) => {
      state.inProgress = false;
      state.error = null;
      state.book.author = payload.data.author;
      state.book.title = payload.data.title;
      state.book.isbn = payload.data.isbn;
      state.book.id = payload.data.id;
      state.book.copies = payload.data.copies;
    },
    bookEditCompleteFail: (state,action) => {
      state.inProgress = false;
      state.error = action.payload;
    },
    deleteBookInProgress: (state) => {
      state.inProgress = true;
      state.error = null;
    },
    deleteBookComplete: (state, action) => {
      state.inProgress = false;
      state.error = null;
    },
    deleteBookCompleteFail: (state, action) => {
      state.inProgress = false;
      state.error = action.payload;
    }
  },
});

export const {
  bookSavingInprogress,
  bookSaveCompleted,
  bookSaveCompleteFail,
  bookListFetchInProgress,
  bookListFetchCompelte,
  bookListFetchFail,
  bookEditInProgress,
  bookEditCompleted,
  bookEditCompleteFail,
  deleteBookInProgress,
  deleteBookComplete,
  deleteBookCompleteFail
} = bookSlice.actions;

export const saveBook = (payload: BookDataType) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await BookService.saveBook(payload);
      const data = response.data;
      dispatch(bookSaveCompleted({ data: data }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          bookSaveCompleteFail({
            data: error.response?.data,
          })
        );
      }
    }
  };
};

export const fetchBookList = () => {
  return async (dispath: Dispatch) => {
    dispath(bookListFetchInProgress());
    try {
      // debugger;
      const response = await BookService.getBookList();
      dispath(bookListFetchCompelte(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispath(bookListFetchFail(JSON.parse(JSON.stringify(error.response))));
      }
    }
  };
};

export const editBook = (payload: BookDataType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(bookEditInProgress())
      console.log(payload)
      const response = await BookService.editBook(payload);
      const data = response.data;
      dispatch(bookEditCompleted({ data: data }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          bookEditCompleteFail({
            data: error.response?.data,
          })
        );
      }
    }
  };
};

export const deleteBook = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteBookInProgress());
    try {
        const response = await BookService.deleteBook(id);
        dispatch(deleteBookComplete(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          deleteBookCompleteFail({
            data: error.response?.data,
          })
        );
      }
    }
  }
}

export default bookSlice.reducer;

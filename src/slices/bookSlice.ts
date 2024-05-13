import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as BookService from '../services/BookService'
import axios from "axios";

export interface Book {
    id: string;
    title: string;
    isbn: string;
    authoer:string;
    copies: number;
}


const initialState = {
    id:'',
    title:'',
    isbn:'',
    author: '',
    copies: 1,
    bookSave: {
        inProgress: false,
        error: null
    }
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        bookSavingInprogress: (state) => {
            state.bookSave.inProgress = true;
            state.bookSave.error = null;
        },
        bookSaveCompleted : (
            state,
            {payload, type} : PayloadAction<any>
        ) => {
            state.bookSave.inProgress = false;
            state.bookSave.error = null;
            state.author = payload.data.author;
            state.title = payload.data.title;
            state.isbn = payload.data.isbn;
            state.id  = payload.data.id
            state.copies = payload.data.copies
        },
        bookSaveCompleteFail: (state, action) => {
            state.bookSave.inProgress = false;
            state.bookSave.error = action.payload;
        }
        
    }
});

export const {
    bookSavingInprogress,
    bookSaveCompleted,
    bookSaveCompleteFail
} = bookSlice.actions

export const saveBook = (payload : any) => {
    return async (dispatch:Dispatch) => {
        try {
            const response = await BookService.saveBook(payload)
            const data = response.data
            dispatch(bookSaveCompleted({data: data} ))
        } catch (error) {
            if(axios.isAxiosError(error)){
                dispatch(
                    bookSaveCompleteFail({
                        data:error.response?.data
                    })
                )
            }
        }
       
    }
};
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../slice/todosSlice'
import messagesReducer from '../slice/messagesSlice'

//具名匯出
export const store = configureStore({
    reducer: {
        todos: todosReducer,
        messages: messagesReducer,
    }
})
export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id: 1,
    text: '3/7 六角React直播班：加碼直播課 next.js'
}]

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: { //狀態管理器
        createTodo(state, action) {
            //console.log(state[0].text, action);
            state.push(action.payload) 
        },
        removeTodo(state, action) {
            //寫法1：找到相同id，並刪除
            // const index = state.findIndex((todo) => todo.id === action.payload);
            // state.splice(index, 1);
            //寫法2：id不同時保留 (覆蓋state要使用return，不能用 state = NewState，會出錯)
            return state.filter(todo => todo.id !== action.payload);
        },
        updateTodo(state, action) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index] = action.payload;
        }
    }
})

export const { createTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;

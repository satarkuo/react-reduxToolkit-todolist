import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = []

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        createMessage(state, action) {
            state.push(action.payload);
        },
        removeMessage(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id)
            state.splice(index,1)
        }
    }
})
//createAsyncThunk所建立的方法可被其他元件使用
//後方帶入：1.自定義名稱、2.async func
export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async function(payload, { dispatch, requestId }){ //dispatch, requestId 由params解構
        //console.log(payload, params)
        dispatch(
            messagesSlice.actions.createMessage({
                ...payload,
                id: requestId
            })
        )
        setTimeout(() => {
            dispatch(
                messagesSlice.actions.removeMessage(requestId)
            )
        }, 2000)

    }
)
export const { createMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
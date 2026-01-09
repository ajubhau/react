import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {}
}

const authReducer =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin(state, action) {
            state.userInfo = action.payload
        },
        onLogout(state, action) {
            state.userInfo = action.payload
        }
    }    
})

export const authAction = authReducer.actions;
export default authReducer.reducer;
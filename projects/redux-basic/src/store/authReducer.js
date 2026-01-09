import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin(state, action) {
            state.isLogin = true;
        },
        onLogout(state, action) {
            state.isLogin = false;
        }
     }
})

export const authAction = auth.actions;

export default auth.reducer;
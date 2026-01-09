import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0
}
const counterReducer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        onIncrement(state) {
            state.counter =  state.counter + 1
        },
        onDecrement(state) {
            state.counter = state.counter - 1;
        },
        resetCounter(state) {
            state.counter = 0;
        }
    },
});

export const counterAction = counterReducer.actions;

export default counterReducer.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GettingStartedProps {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

const initialState : GettingStartedProps = {
    fullName: '',
    userName: '',
    email: '',
    password: ''
}

// Reducer for user related global state
const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName= action.payload
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        }
    }
})

export const { setFullName, setEmail, setPassword, setUserName } = userReducer.actions
export default userReducer.reducer;
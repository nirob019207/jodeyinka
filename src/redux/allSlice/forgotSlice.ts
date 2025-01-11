import { createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
interface CounterState {
    email:string,
    otp:string,
}

const initialState: CounterState = {
    email: "",
    otp:"",
}

export const forgotSlice = createSlice({
    name: 'forgotPass',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email
        },
        setOtp: (state, action) => {
            state.otp = action.payload.otp
        },
     
    },
})

export const { setEmail,setOtp} = forgotSlice.actions



export default forgotSlice.reducer
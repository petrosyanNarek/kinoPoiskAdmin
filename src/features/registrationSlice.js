import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../api";

const initialState = {
    registrValid: true
}

export const registration = createAsyncThunk(
    'user/registration',
    async function (us, { rejectWithValue }) {
        try {
            const response = await api.post("addUser", { ...us });
            return response.item
        } catch (err) {
            rejectWithValue(err)
        }
    }
)


const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build
            .addCase(registration.fulfilled, (state, action) => {
                state.registrValid = action.payload
            })
    }
})

export const selectRegisterValid = (state) => state.registrValid.registrValid
export default registrationSlice.reducer

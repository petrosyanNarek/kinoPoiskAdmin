import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../api";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async function (us, { rejectWithValue }) {
        const response = await api.post("login", { ...us });
        const data = await response.data

        return data

    }
)
export const logOut = createAsyncThunk(
    'user/logoutUser',
    async function (_, { rejectWithValue }) {
        try {
            const response = await api.post("logOut");

            return response.data
        } catch (err) {
            rejectWithValue(err)
        }
    }
)
export const getUser = createAsyncThunk(
    'user/getUser',
    async function (id, { rejectWithValue }) {
        try {
            const response = await api.post("getUser", { id });

            return response.data.user
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const initialState = {
    user: {},
    userError: null,
    loadingUser: false
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(getUser.apply, (state, action) => {
                state.loadingUser = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = {}
                state.userError = action.payload
                state.loadingUser = false
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loadingUser = false

            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.user = {}
            })
    }
})

export const selectLoginUser = (state) => state.login.user
export const selectUserLoading = (state) => state.login.loadingUser
export const selectUserError = (state) => state.login.userError
export default loginSlice.reducer

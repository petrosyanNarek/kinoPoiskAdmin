import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  authors: [],
  author: {},
  authorLoading: false,
  authorError: null,
  totalPages: 0,
};

export const getAuthors = createAsyncThunk(
  "authors/getAuthors",
  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get(process.env.REACT_APP_GET_ALL_AUTHORS);

      const authors = item.data;

      return authors;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAuthorById = createAsyncThunk(
  "authors/getAuthorById",
  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("/author/getAuthor", {
        headers: {
          id,
        },
      });
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteAuthor = createAsyncThunk(
  "author/deleteAuthor",

  async function (id, { rejectWithValue }) {
    try {
      await api.delete(process.env.REACT_APP_DELETE_AUTHOR, { data: { id } });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "author/updateAuthor",

  async function ({ id, author }, { rejectWithValue }) {
    try {
      await api.put(process.env.REACT_APP_UPDATE_AUTHOR, { id, author });
    } catch (error) {
      return rejectWithValue(error);
    }
    try {
      const respons = await api.put(process.env.REACT_APP_UPDATE_AUTHOR, { id, ...author })
      return respons.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const newAuthor = createAsyncThunk(
  "author/newAuthor",

  async function (author, { rejectWithValue }) {
    try {
      const respons = await api.post(process.env.REACT_APP_NEW_ACTOR, author);
      return respons.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const getFilteredAuthors = createAsyncThunk(
  "authors/getFilteredAuthors",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post("/author/getFilteredAuthors", filteredObj);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredAuthors.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.authors = action.payload.authors;
      })
      .addCase(getAuthors.pending, (state, action) => {
        state.authorLoading = true;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.authorLoading = false;
        state.authorError = action.payload;
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.authorLoading = false;
      })
      .addCase(getAuthorById.pending, (state, action) => {
        state.authorLoading = true;
      })
      .addCase(getAuthorById.rejected, (state, action) => {
        state.authorError = action.payload;
        state.authorLoading = false;
      })
      .addCase(getAuthorById.fulfilled, (state, action) => {
        state.authorLoading = false;
        state.author = action.payload;
      });
  },
});

export const selectAuthors = (state) => state.authors.authors;
export const selectAuthorsLoading = (state) => state.authors.authorLoading;
export const selectAuthorsError = (state) => state.authors.authorError;
export const selectCategory = (state) => state.authors.author;
export const selectTotalPages = (state) => state.authors.totalPages;
export default authorsSlice.reducer;

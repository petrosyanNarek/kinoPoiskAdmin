import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  genres: [],
  genre: {},
  genresError: "",
  genresLoading: false,
  totalPages: [],
};

export const getGenres = createAsyncThunk(
  "genres/getGenres",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get(process.env.REACT_APP_GET_ALL_GENRES);

      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getGenresById = createAsyncThunk(
  "genres/getGenresById",

  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("genre/getGenreById", {
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

export const getFilteredGenres = createAsyncThunk(
  "genres/getFilteredGenres",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post("genre/getFilteredGenre", filteredObj);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGenres = createAsyncThunk(
  "genres/deletGenres",

  async function (id, { rejectWithValue }) {
    await api.delete(process.env.REACT_APP_DELETE_GENRE, { data: { id } });
  }
);

export const updateGenres = createAsyncThunk(
  "genres/updateGenres",

  async function ({ genre, id }, { rejectWithValue }) {
    await api.put(process.env.REACT_APP_UPDATE_GENRE, { genre, id });
  }
);
export const newGenres = createAsyncThunk(
  "genres/newGenres",

  async function (genre, { rejectWithValue }) {
    await api.post(process.env.REACT_APP_NEW_GENRE, { genre });
  }
);

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredGenres.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.genres = action.payload.genres;
      })
      .addCase(getGenres.pending, (state, action) => {
        state.genresLoading = true;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.genresLoading = false;
        state.genresError = action.payload;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genresLoading = false;
        state.genres = action.payload;
      })
      .addCase(getGenresById.pending, (state, action) => {
        state.genresLoading = true;
      })
      .addCase(getGenresById.rejected, (state, action) => {
        state.genresLoading = false;
        state.genresError = action.payload;
      })
      .addCase(getGenresById.fulfilled, (state, action) => {
        state.genre = action.payload;
        state.genresLoading = false;
      });
  },
});

export const selectGenresLoading = (state) => state.genres.genresLoading;
export const selectGenresError = (state) => state.genres.genresError;
export const selectGenre = (state) => state.genres.genre;
export const selectGenres = (state) => state.genres.genres;
export const selectTotalPages = (state) => state.genres.totalPages;

export default genresSlice.reducer;

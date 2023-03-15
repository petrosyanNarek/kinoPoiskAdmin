import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

const initialState = {
  films: [],
  totalPages: 0,
  film: {},
  getFilmLoading: false,
};

export const deleteFilmById = createAsyncThunk(
  "film/deleteFilm",
  async function (id, { rejectWithValue }) {
    await api.delete(process.env.REACT_APP_DELETE_FILM_BY_ID, { data: { id } });
  }
);

export const addNewFilm = createAsyncThunk(
  "film/addNewFilm",

  async function ({ film }, { rejectWithValue }) {
    const data = new FormData();
    Object.keys(film).forEach((e) => {
      if (Array.isArray(film[e])) {
        for (let i = 0; i < film[e].length; i++) {
          data.append(`${e}[]`, film[e][i].value);
        }
      } else {
        data.append(e, film[e]);
      }
    });

    await api.post(process.env.REACT_APP_ADD_NEW_FILM, data);
  }
);

export const editFilm = createAsyncThunk(
  "film/editFilm",

  async function ({ film, id }, { rejectWithValue }) {
    const data = new FormData();
    data.append("id", id);
    Object.keys(film).forEach((e) => {
      if (Array.isArray(film[e])) {
        for (let i = 0; i < film[e].length; i++) {
          data.append(`${e}[]`, film[e][i].value);
        }
      } else {
        data.append(e, film[e]);
      }
    });

    await api.put(process.env.REACT_APP_UPDATE_FILM_BY_ID, data);
  }
);

export const getFilteredFilms = createAsyncThunk(
  "film/getFileredFilms",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post(
        process.env.REACT_APP_GET_ALL_FILTERED_FILMS,
        filteredObj
      );
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFilmByid = createAsyncThunk(
  "film/getFilmById",

  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("film/filmById", {
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
export const getFilms = createAsyncThunk(
  "film/getFilms",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get("film/allFilm");
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    deleteFilm(state, action) {
      state.film = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredFilms.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.films = action.payload.films;
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(getFilmByid.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(getFilmByid.rejected, (state, action) => {
        state.film = {};
      });
  },
});

export const selectFilms = (state) => state.films.films;
export const selectTotalPages = (state) => state.films.totalPages;
export const selectFilmById = (state) => state.films.film;
export const selectFilmLoading = (state) => state.films.getFilmLoading;
export const { deleteFilm } = filmSlice.actions;
export default filmSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  actors: [],
  actor: {},
  actorsLoading: false,
  actorsError: null,
  totalPages: 0,
};

export const getActors = createAsyncThunk(
  "actors/getActors",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get(process.env.REACT_APP_GET_ALL_ACTORS);

      const actors = await item.data;

      return actors;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getActorById = createAsyncThunk(
  "actors/getActorById",

  async function (id, { rejectWithValue }) {
    const item = await api.get("actor/getActor", {
      headers: {
        id,
      },
    });
    try {
      return item.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteActor = createAsyncThunk(
  "actor/deleteActor",

  async function (id, { rejectWithValue }) {
    try {
      await api.delete(process.env.REACT_APP_DELETE_ACTOR, { data: { id } });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateActor = createAsyncThunk(
  "actor/updateActor",

  async function ({ id, actor }, { rejectWithValue }) {
    try {
      await api.put(process.env.REACT_APP_UPDATE_ACTOR, { id, actor });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const newActor = createAsyncThunk(
  "actor/newActor",

  async function (actor, { rejectWithValue }) {
    try {
      await api.post(process.env.REACT_APP_NEW_ACTOR, { actor });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFilteredActors = createAsyncThunk(
  "actors/getFilteredActors",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post("/actor/getFilteredActors", filteredObj);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredActors.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.actors = action.payload.actors;
      })
      .addCase(getActors.pending, (state, action) => {
        state.actorsLoading = true;
      })
      .addCase(getActors.rejected, (state, action) => {
        state.actorsLoading = false;
        state.actorsError = action.payload;
      })
      .addCase(getActors.fulfilled, (state, action) => {
        state.actors = action.payload;
        state.actorsLoading = false;
      })
      .addCase(getActorById.pending, (state, action) => {
        state.actorsLoading = true;
      })
      .addCase(getActorById.rejected, (state, action) => {
        state.actorsError = action.payload;
        state.actorsLoading = false;
      })
      .addCase(getActorById.fulfilled, (state, action) => {
        state.actorsLoading = false;
        state.actor = action.payload;
      });
  },
});

export const selectActors = (state) => state.actors.actors;
export const selectActorsLoading = (state) => state.actors.actorsLoading;
export const selectActorsError = (state) => state.actors.actorsError;
export const selectCategory = (state) => state.actors.actor;
export const selectTotalPages = (state) => state.actors.totalPages;

export default actorsSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  series: [],
  totalPages: 0,
  seria: {},
  seriesLoading: false,
  seriesError: null,
};

export const getSeries = createAsyncThunk(
  "series/getSeries",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get("series/getSeries");
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSeriesById = createAsyncThunk(
  "series/getSeriesById",

  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("series/getSeriesById", {
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
export const deleteSeries = createAsyncThunk(
  "series/deleteSeries",

  async function (id, { rejectWithValue }) {
    await api.delete("series/deleteSeries", { data: { id } });
  }
);

export const updateSeries = createAsyncThunk(
  "series/updateSeries",

  async function ({ seria, id }, { rejectWithValue }) {
    console.log(seria, id);
    const data = new FormData();
    data.append("id", id);
    Object.keys(seria).forEach((e) => {
      if (Array.isArray(seria[e])) {
        for (let i = 0; i < seria[e].length; i++) {
          data.append(`${e}[]`, seria[e][i].value);
        }
      } else {
        data.append(e, seria[e]);
      }
    });

    await api.put("series/updateSeries", data);
  }
);

export const newSeries = createAsyncThunk(
  "series/newSeries",

  async function (series, { rejectWithValue }) {
    const data = new FormData();
    Object.keys(series).forEach((e) => {
      data.append(e, series[e]);
    });
    await api.post("series/newSeries", data);
  }
);

export const getFiltededSeries = createAsyncThunk(
  "series/getFilteredSeries",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post("series/getFilteredSeries", filteredObj);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeries.pending, (state, action) => {
        state.seriesLoading = true;
      })
      .addCase(getSeries.rejected, (state, action) => {
        state.seriesLoading = false;
        state.seriesError = action.payload;
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.series = action.payload.series;
        state.seriesLoading = false;
      })
      .addCase(getFiltededSeries.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.series = action.payload.series;
        state.seriesLoading = false;
      })
      .addCase(getSeriesById.pending, (state, action) => {
        state.seriesLoading = true;
      })
      .addCase(getSeriesById.rejected, (state, action) => {
        state.seriesError = action.payload;
        state.seriesLoading = false;
      })
      .addCase(getSeriesById.fulfilled, (state, action) => {
        state.seriesLoading = false;
        state.seria = action.payload;
      });
  },
});

export const selectSeries = (state) => state.series.series;
export const selectTotalPages = (state) => state.series.totalPages;

export const selectSeriesLoading = (state) => state.series.seriesLoading;
export const selectSeriesError = (state) => state.series.seriesError;
export const selectSeria = (state) => state.series.seria;
export default seriesSlice.reducer;

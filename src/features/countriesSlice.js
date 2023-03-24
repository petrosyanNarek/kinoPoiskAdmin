import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  countries: [],
  country: {},
  loadingCountries: false,
  countriesError: null,
  totalPages: [],
};

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get(process.env.REACT_APP_GET_ALL_COUNTRIES);

      const countries = item.data;
      return countries;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCountryById = createAsyncThunk(
  "countries/getcountryById",

  async function (id, { rejectWithValue }) {
    const item = await api.get("country/getCountryById", {
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

export const deleteCountries = createAsyncThunk(
  "countries/deleteCountries",

  async function (id, { rejectWithValue }) {
    await api.delete(process.env.REACT_APP_DELETE_COUNTRY, { data: { id } });
  }
);

export const updateCountries = createAsyncThunk(
  "countries/updateCountries",

  async function ({ country, id }, { rejectWithValue }) {
    try {
      const respons = await api.put(process.env.REACT_APP_UPDATE_COUNTRY, {
        name: country.name,
        id,
      });
      return respons.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const newCountries = createAsyncThunk(
  "countries/newCountries",

  async function (country, { rejectWithValue }) {
    try {
      const respons = await api.post(process.env.REACT_APP_NEW_COUNTRY, {
        name: country.name,
      });
      return respons.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const getFilteredCountries = createAsyncThunk(
  "countries/getFilteredCountries",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post("country/getFilteredCountries", filteredObj);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredCountries.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.countries = action.payload.countries;
      })
      .addCase(getCountries.pending, (state, action) => {
        state.loadingCountries = true;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loadingCountries = false;
        state.countriesError = action.payload;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loadingCountries = false;
      })
      .addCase(getCountryById.pending, (state, action) => {
        state.loadingCountries = true;
      })
      .addCase(getCountryById.rejected, (state, action) => {
        state.countriesError = action.payload;
        state.loadingCountries = false;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.loadingCountries = false;
        state.country = action.payload;
      });
  },
});

export const selectCountries = (state) => state.countries.countries;
export const selectCountriesLoading = (state) =>
  state.countries.loadingCountries;
export const selectCountriesError = (state) => state.countries.countriesError;
export const selectCountry = (state) => state.countries.country;
export const selectTotalPages = (state) => state.countries.totalPages;

export default countriesSlice.reducer;

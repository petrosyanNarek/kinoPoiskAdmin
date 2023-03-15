import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
const initialState = {
  categories: [],
  category: {},
  loadingCategories: false,
  categoriesError: null,
  totalPages: 0,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get(process.env.REACT_APP_GET_ALL_CATEGORIES);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deletCategories",

  async function (id, { rejectWithValue }) {
    await api.delete(process.env.REACT_APP_DELETE_CATEGORY, { data: { id } });
  }
);

export const updateCategories = createAsyncThunk(
  "categories/updateCategories",

  async function ({ category, id }, { rejectWithValue }) {
    await api.put(process.env.REACT_APP_UPDATE_CATEGORY, { category, id });
  }
);

export const newCategories = createAsyncThunk(
  "categories/newCategories",

  async function (category, { rejectWithValue }) {
    await api.post(process.env.REACT_APP_NEW_CATEGORY, { category });
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",

  async function (id, { rejectWithValue }) {
    const item = await api.get("category/getCategoryById", {
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

export const getFilteredCategories = createAsyncThunk(
  "categories/getFilteredCategories",

  async function (filteredObj, { rejectWithValue }) {
    try {
      const item = await api.post(
        "category/getFilteredCategories",
        filteredObj
      );
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loadingCategories = true;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.categoriesError = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(getCategoryById.pending, (state, action) => {
        state.loadingCategories = true;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        console.log(action.payload);
        state.categoriesError = action.payload;
        state.loadingCategories = false;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.category = action.payload;
      });
  },
});

export const selectCategories = (state) => state.categories.categories;
export const selectCategoriesLoading = (state) =>
  state.categories.loadingCategories;
export const selectCategoriesError = (state) =>
  state.categories.categoriesError;
export const selectCategory = (state) => state.categories.category;
export const selectTotalPages = (state) => state.categories.totalPages;

export default categoriesSlice.reducer;

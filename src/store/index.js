import { configureStore, createSlice } from "@reduxjs/toolkit";

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    items: [],   
    filter: "", 
  },
  reducers: {
    setItems: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    addItem: (state, action) => {
      if (action.payload) state.items.push(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload ?? "";
    },
    clearFilter: (state) => {
      state.filter = "";
    },
  },
});

export const { setItems, addItem, setFilter, clearFilter } = assetsSlice.actions;

export const store = configureStore({
  reducer: {
    assets: assetsSlice.reducer,
  },
});

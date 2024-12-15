import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedProduct: "",
  category: "",
};

const filterSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    setSearchedProduct: (state, action) => {
      state.searchedProduct = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setSearchedProduct, setCategory } = filterSlice.actions;

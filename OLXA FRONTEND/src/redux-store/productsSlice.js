import { createSlice } from "@reduxjs/toolkit";

const productSclice = createSlice({
  name: "products",
  initialState: {
    productsData:[]
  },
  reducers: {
    addProducts(state, action) {
      state.productsData = action.payload;
      return state;
    }
  },
});

export const { addProducts } = productSclice.actions;
export default productSclice.reducer;

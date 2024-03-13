// features/feedback/feedbackSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  name: string;
  quantity: number;
  price: number;
  // Add other product fields as necessary
}
export type RootState = {
  product: ProductState;
};

export interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [],
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action:PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;

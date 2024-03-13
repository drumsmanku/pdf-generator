// features/feedback/feedbackSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string; // or number, depending on your ID system
  name: string;
  quantity: number;
  price: number;
  // Add other product fields as necessary
}
interface ProductState {
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

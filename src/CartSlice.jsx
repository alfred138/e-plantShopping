import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Initialize items as an empty array
    total: 0,
  };

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
        const { name, image, cost } = payload;
        const existingItem = state.items.find((item) => item.name === name);
        state.total++;
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({
            name,
            image,
            cost: cost.replace("$", ""),
            quantity: 1,
          });
        }
      },
    removeItem: (state, { payload }) => {
        const { name } = payload;
        state.items = state.items.filter((item) => {
          if (item.name === name) {
            state.total -= item.quantity;
            return false;
          }
          return true;
        });
    },
    updateQuantity: (state, { payload }) => {
        const { name, quantity } = payload;
        for (let i = 0; i < state.items.length; i++) {
          const item = state.items[i];
          if (item.name === name) {
            state.total += quantity - item.quantity;
            item.quantity = quantity;
            break;
          }
        }
      },   
  },
});

export const { addItem, removeItem, updateQuantity} = CartSlice.actions;

export default CartSlice.reducer;


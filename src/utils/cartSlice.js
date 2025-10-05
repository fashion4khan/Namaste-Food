import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // object with itemId as key
  },
  reducers: {
    addItem: (state, action) => {
      const id = action.payload.card.info.id;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { ...action.payload, quantity: 1 };
      }
    },
    removeItem: (state, action) => {
      const id = action.payload.card.info.id;
      if (state.items[id]) {
        state.items[id].quantity -= 1;
        if (state.items[id].quantity <= 0) {
          delete state.items[id]; // remove from cart if quantity 0
        }
      }
    },
    clearCart: (state) => {
      state.items = {}; // empty the cart
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

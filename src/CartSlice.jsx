import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.name === newItem.name);

            // If the item already exists in the cart, update its quantity
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                // Otherwise, add the new item to the cart with a quantity of 1
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemName = action.payload;
            state.items = state.items.filter((item) => item.name !== itemName);
        },
        updateQuantity: (state, action) => {
         

        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

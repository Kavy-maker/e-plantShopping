import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === action.payload.name);

            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.items.push({ ...action.payload, quantity: 1, addedToCart: true }); 
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload; 
            const itemToUpdate = state.items.find(item => item.name === name);

            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

// ✅ Add UI Component Below
export const AddToCartButton = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Check if item is already in the cart
    const isAddedToCart = cartItems.some(cartItem => cartItem.name === item.name);

    return (
        <button 
            className="cart-item-add"
            onClick={() => dispatch(addItem(item))} 
            disabled={isAddedToCart} 
            style={{
                backgroundColor: isAddedToCart ? 'grey' : '#ff6600',
                color: 'white',
                cursor: isAddedToCart ? 'not-allowed' : 'pointer'
            }}
        >
            {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
    );
};
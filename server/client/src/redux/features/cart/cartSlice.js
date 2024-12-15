import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `You have increased quantity of ${state.cartItems[itemIndex].title} in your cart`,
          {
            position: "top-right",
            autoClose: 1000,
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`You have added ${action.payload.title} to your cart`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProduct(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      toast.error(`You have removed ${action.payload.title} from your cart`, {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(
          `You have decreased quantity of ${state.cartItems[itemIndex].title} in your cart`,
          {
            position: "top-right",
            autoClose: 1000,
          }
        );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error(`You have removed ${action.payload.title} from your cart`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`You have cleared your cart`, {
        position: "top-right",
        autoClose: 1000,
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce( 
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;  
          const itemTotal = price * cartQuantity; 

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

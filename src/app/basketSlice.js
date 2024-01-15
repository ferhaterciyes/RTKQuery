import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartItemCount: 0,
  cartItemPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      try {
        const foundProductIndex = state.products.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.cartItemCount++;

        if (foundProductIndex >= 0) {
          state.products[foundProductIndex] = {
            ...state.products[foundProductIndex],
            cartQuantity: state.products[foundProductIndex].cartQuantity + 1,
          };
          toast.info("Ürün miktarı arttırıldı", { position: "top-right" });
        } else {
          let tempProductItem = { ...action.payload, cartQuantity: 1 };
          state.products.push(tempProductItem);
          toast.success("Ürün sepete eklendi", { position: "top-right" });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.products));
      } catch (error) {
        console.error("addToCart Hata:", error);
      }
    },

    decreaseCart: (state, action) => {
      try {
        const itemIndex = state.products.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (state.products[itemIndex].cartQuantity > 1) {
          state.products[itemIndex].cartQuantity -= 1;
          toast.info("Ürün miktarı azaltıldı", { position: "top-right" });
        } else if (state.products[itemIndex].cartQuantity === 1) {
          const nextCartItems = state.products.filter(
            (item) => item.id !== action.payload.id,
          );

          state.products = nextCartItems;
          toast.error("Ürün sepetten kaldırıldı", { position: "top-right" });
        }

        localStorage.setItem("cartItems", JSON.stringify(state.products));
      } catch (error) {
        console.error("decreaseCart Hata:", error);
      }
    },

    removeFromCart: (state, action) => {
      try {
        const nextCartItems = state.products.filter(
          (item) => item.id !== action.payload.id,
        );

        state.products = nextCartItems;
        toast.error("Ürün sepetten kaldırıldı", { position: "top-right" });

        localStorage.setItem("cartItems", JSON.stringify(state.products));
      } catch (error) {
        console.error("removeFromCart Hata:", error);
      }
    },

    getTotals: (state) => {
      try {
        let { total, quantity } = state.products.reduce(
          (cartTotal, productItem) => {
            const { price, cartQuantity } = productItem;
            const itemTotal = price * cartQuantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;

            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          },
        );
        total = parseFloat(total.toFixed(2));
        state.cartItemCount = quantity;
        state.cartItemPrice = total;
      } catch (error) {
        console.error("getTotals Hata:", error);
      }
    },

    clearCart: (state) => {
      try {
        state.products = [];
        localStorage.setItem("cartItems", JSON.stringify(state.products));
        toast.error("Sepet temizlendi", { position: "top-right" });
      } catch (error) {
        console.error("clearCart Hata:", error);
      }
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

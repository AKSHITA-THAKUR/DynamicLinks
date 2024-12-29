import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface productState {
  products: any[];
  cart: any[];
  error: string | undefined;
  isLoading: boolean;
}

export const fetchProducts = createAsyncThunk("getProducts", async () => {
  const productList = await axios.get("https://dummyjson.com/products");
  return productList.data.products;
});

const initialState: productState = {
  products: [],
  cart: [],
  error: "",
  isLoading: false,
};

const ProductSlice = createSlice({
  name: "Shopping",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const addedProduct = state.products.find(
        (product) => product.id === action.payload
      ); //Add the product to cart
      const alreadyProduct = state.cart.find(
        (product) => product.id === action.payload
      ); // check if the product is already present
      if (alreadyProduct) {
        alreadyProduct.quantity += 1;
      } else if (addedProduct) {
        state.cart.push({ ...addedProduct, quantity: 1 }); //Add the product to cart with quantity 1
      }
      console.log(state.cart);
    },

    increaseQunatity: (state, action: PayloadAction<number>) => {
      const increase = state.cart.find(
        (product) => product.id === action.payload
      );
      if (increase) {
        increase.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const decrease = state.cart.find(
        (product) => product.id === action.payload
      );
      if (decrease) {
        decrease.quantity -= 1;
        if (decrease.quantity == 0) { //if quantity is 0 , remove the product from cart
          state.cart = state.cart.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    },
    removeFromCart:(state,action:PayloadAction<number>)=>{
      console.log("Remove from cart button is clicked")
       state.cart = state.cart.filter((product)=> product.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.map((products: any) => ({
          ...products,
          quantity: 0,
        }));
        // console.log(state.products)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { addToCart, increaseQunatity, decreaseQuantity , removeFromCart } =
  ProductSlice.actions;
export default ProductSlice.reducer;
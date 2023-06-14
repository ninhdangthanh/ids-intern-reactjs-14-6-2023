import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductCreate } from "types/product";
import config from "./../../config";

const APP_URL_ONE = config.APP_URL_ONE;

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    console.log(APP_URL_ONE);

    const res = await axios.get<Product[]>(`${APP_URL_ONE}/products`);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string) => {
    await axios.delete<Product>(`${APP_URL_ONE}/products/${productId}`);
    return productId;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData: ProductCreate) => {
    const res = await axios.post<ProductCreate>(
      `${APP_URL_ONE}/products`,
      productData
    );
    return res.data;
  }
);

export const editProduct = createAsyncThunk<Product, Product>(
  "product/editProduct",
  async (productData: Product) => {
    const res = await axios.put<Product>(
      `${APP_URL_ONE}/products/${productData.id}`,
      productData
    );
    return res.data;
  }
);

interface ProductState {
  isLoading: boolean;
  totalPage: number;
  products: Product[];
  hasMore: boolean;
  page: number;
  productsPerPage: number;
}

const initialState: ProductState = {
  isLoading: false,
  totalPage: 100,
  products: [],
  hasMore: true,
  page: 1,
  productsPerPage: 10,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = true;
    },
    removeIsLoading: (state, action) => {
      state.isLoading = false;
    },
    increateProductInPage: (state, action) => {
      if (state.hasMore) {
        state.page++;
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending as any]: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled as any]: (state, action) => {
      state.products = action.payload;
      // state.totalPage = Math.ceil(state.products.length / 10);
      state.isLoading = false;
      state.hasMore = state.products.length > state.productsPerPage;
    },
    [deleteProduct.fulfilled as any]: (state, action) => {
      state.products = state.products.filter((product) => {
        return !(product.id == action.payload);
      });
      // state.totalPage = Math.ceil(state.products.length / 10);
    },
    [createProduct.fulfilled as any]: (state, action) => {
      state.products.push(action.payload);
      // state.totalPage = Math.ceil(state.products.length / 10);
    },
    [editProduct.fulfilled as any]: (state, action) => {
      const editedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === editedProduct.id
      );
      if (index !== -1) {
        state.products[index] = editedProduct;
      }
    },
  },
});

export const { setIsLoading, removeIsLoading, increateProductInPage } =
  productSlice.actions;
export default productSlice;

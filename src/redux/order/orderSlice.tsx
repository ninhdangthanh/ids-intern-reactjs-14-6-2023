import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, OrderCreate } from "types/product";
import config from "./../../config";

const APP_URL_TWO = config.APP_URL_TWO;

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const res = await axios.get<Order[]>(`${APP_URL_TWO}/orders`);
  return res.data;
});

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: string) => {
    await axios.delete<Order>(`${APP_URL_TWO}/orders/${orderId}`);
    return orderId;
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: OrderCreate) => {
    const res = await axios.post<OrderCreate>(
      `${APP_URL_TWO}/orders`,
      orderData
    );
    return res.data;
  }
);

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (orderData: Order) => {
    console.log({ orderData });
    const res = await axios.put<Order>(
      `${APP_URL_TWO}/orders/${orderData.id}`,
      orderData
    );
    return res.data;
  }
);

interface OrderState {
  isLoading: boolean;
  totalPage: number;
  orders: Order[];
}

const initialState: OrderState = {
  isLoading: false,
  totalPage: 100,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = true;
    },
    removeIsLoading: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchOrders.pending as any]: (state, action) => {
      state.isLoading = true;
    },
    [fetchOrders.fulfilled as any]: (state, action) => {
      state.orders = action.payload;
      state.totalPage = Math.ceil(state.orders.length / 10);
      state.isLoading = false;
    },
    [deleteOrder.fulfilled as any]: (state, action) => {
      state.orders = state.orders.filter((order) => {
        return !(order.id == action.payload);
      });
      state.totalPage = Math.ceil(state.orders.length / 10);
    },
    [createOrder.fulfilled as any]: (state, action) => {
      state.orders.push(action.payload);
      state.totalPage = Math.ceil(state.orders.length / 10);
    },
    [editOrder.fulfilled as any]: (state, action) => {
      const editedOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order.id === editedOrder.id
      );
      if (index !== -1) {
        state.orders[index] = editedOrder;
      }
    },
  },
});

export const { setIsLoading, removeIsLoading } = orderSlice.actions;
export default orderSlice;

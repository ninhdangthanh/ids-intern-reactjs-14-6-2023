import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductCreate, Staff, StaffCreate } from "types/product";
import config from "./../../config";

const APP_URL_ONE = config.APP_URL_ONE;

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async () => {
  const res = await axios.get<Staff[]>(`${APP_URL_ONE}/staffs`);
  return res.data;
});

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (staffId: string) => {
    await axios.delete<Staff>(`${APP_URL_ONE}/staffs/${staffId}`);
    return staffId;
  }
);

export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (staffData: StaffCreate) => {
    const res = await axios.post<StaffCreate>(
      `${APP_URL_ONE}/staffs`,
      staffData
    );
    return res.data;
  }
);

export const editStaff = createAsyncThunk(
  "staff/editStaff",
  async (staffData: Staff) => {
    const res = await axios.put<Staff>(
      `${APP_URL_ONE}/staffs/${staffData.id}`,
      staffData
    );
    return res.data;
  }
);

interface StaffState {
  isLoading: boolean;
  totalPage: number;
  staffs: Staff[];
}

const initialState: StaffState = {
  isLoading: false,
  totalPage: 100,
  staffs: [],
};

const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    removeIsLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchStaffs.pending as any]: (state, action) => {
      state.isLoading = true;
    },
    [fetchStaffs.fulfilled as any]: (state, action) => {
      state.staffs = action.payload;
      state.totalPage = Math.ceil(state.staffs.length / 10);
      state.isLoading = false;
    },
    [deleteStaff.fulfilled as any]: (state, action) => {
      state.staffs = state.staffs.filter((staff) => {
        return !(staff.id == action.payload);
      });
      state.totalPage = Math.ceil(state.staffs.length / 10);
    },
    [createStaff.fulfilled as any]: (state, action) => {
      state.staffs.push(action.payload);
      state.totalPage = Math.ceil(state.staffs.length / 10);
    },
    [editStaff.fulfilled as any]: (state, action) => {
      const editedStaff = action.payload;
      const index = state.staffs.findIndex(
        (staff) => staff.id === editedStaff.id
      );
      if (index !== -1) {
        state.staffs[index] = editedStaff;
      }
    },
  },
});

export const { setIsLoading, removeIsLoading } = staffSlice.actions;
export default staffSlice;

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchUserOrders } from './actions';
import { createOrder } from '../constructor/actions';

export type UserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    }
  },
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserOrdersLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [action.payload.order, ...state.orders];
      });
  }
});

export const { addOrder } = userOrdersSlice.actions;
export const userOrdersReducer = userOrdersSlice.reducer;
export const { selectUserOrders, selectUserOrdersLoading } =
  userOrdersSlice.selectors;

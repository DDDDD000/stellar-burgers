import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { fetchFeeds } from './actions';

export type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<TOrdersData>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectFeedLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка';
      });
  }
});

export const { setFeeds } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
export const {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectFeedLoading
} = feedSlice.selectors;

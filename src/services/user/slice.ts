import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TUser } from '@utils-types';
import { login, logout, updateUser } from './actions';

export type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors;

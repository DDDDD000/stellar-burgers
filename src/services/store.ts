import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { burgerConstructorReducer } from './constructor/slice';
import { ingredientsReducer } from './ingredients/slice';
import { feedReducer } from './feed/slice';
import { userOrdersReducer } from './user-orders/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  userOrders: userOrdersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

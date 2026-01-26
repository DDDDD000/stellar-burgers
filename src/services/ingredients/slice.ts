import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';

export type IngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;

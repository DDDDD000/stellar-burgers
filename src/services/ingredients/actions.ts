import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch {
    return rejectWithValue('Ошибка загрузки ингредиентов');
  }
});

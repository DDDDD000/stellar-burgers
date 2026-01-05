import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderResponse = {
  order: TOrder;
  name: string;
};

export const createOrder = createAsyncThunk<
  TOrderResponse,
  string[],
  { rejectValue: string }
>('constructor/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    if (response.success) {
      return {
        order: response.order,
        name: response.name
      };
    }
    return rejectWithValue('Ошибка при оформлении заказа');
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка при оформлении заказа'
    );
  }
});

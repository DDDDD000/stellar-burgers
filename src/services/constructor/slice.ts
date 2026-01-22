import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createOrder } from './actions';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          uuid: crypto.randomUUID()
        });
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;

      if (to < 0 || to >= state.ingredients.length) return;

      const items = state.ingredients;
      const [movedItem] = items.splice(from, 1);
      items.splice(to, 0, movedItem);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

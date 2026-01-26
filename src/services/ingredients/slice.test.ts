import { ingredientsReducer, initialState } from './slice';
import { fetchIngredients } from './actions';

describe('ingredients reducer', () => {
  it('должен установить isLoading в true при вызове fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен записать данные и установить isLoading в false при вызове fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: ''
      },
      {
        _id: '2',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.items).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  it('должен записать ошибку и установить isLoading в false при вызове fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});

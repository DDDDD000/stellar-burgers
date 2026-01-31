import { userOrdersReducer, initialState } from './slice';
import { fetchUserOrders } from './actions';

describe('user-orders reducer', () => {
  it('должен установить isLoading в true при вызове fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = userOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен записать данные и установить isLoading в false при вызове fetchUserOrders.fulfilled', () => {
    const mockOrders = [
      {
        _id: '1',
        status: 'done',
        name: 'Заказ 1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 1,
        ingredients: []
      },
      {
        _id: '2',
        status: 'pending',
        name: 'Заказ 2',
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
        number: 2,
        ingredients: []
      }
    ];

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersReducer(initialState, action);

    expect(state.orders).toEqual(mockOrders);
    expect(state.isLoading).toBe(false);
  });

  it('должен записать ошибку и установить isLoading в false при вызове fetchUserOrders.rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: errorMessage
    };
    const state = userOrdersReducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});

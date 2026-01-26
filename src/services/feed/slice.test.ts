import { feedReducer, initialState } from './slice';
import { fetchFeeds } from './actions';

describe('feed reducer', () => {
  it('должен установить isLoading в true при вызове fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен записать данные и установить isLoading в false при вызове fetchFeeds.fulfilled', () => {
    const mockFeedsData = {
      orders: [
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
      ],
      total: 100,
      totalToday: 10
    };

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedsData
    };
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(mockFeedsData.orders);
    expect(state.total).toBe(mockFeedsData.total);
    expect(state.totalToday).toBe(mockFeedsData.totalToday);
    expect(state.isLoading).toBe(false);
  });

  it('должен записать ошибку и установить isLoading в false при вызове fetchFeeds.rejected', () => {
    const errorMessage = 'Ошибка загрузки ленты заказов';
    const action = {
      type: fetchFeeds.rejected.type,
      payload: errorMessage
    };
    const state = feedReducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});

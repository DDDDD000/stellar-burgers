jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

import { rootReducer } from './store';

import { initialState as userInitialState } from './user/slice';
import { initialState as ingredientsInitialState } from './ingredients/slice';
import { initialState as constructorInitialState } from './constructor/slice';
import { initialState as feedInitialState } from './feed/slice';
import { initialState as userOrdersInitialState } from './user-orders/slice';

describe('rootReducer', () => {
  it('корректно инициализирует начальное состояние', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      user: userInitialState,
      ingredients: ingredientsInitialState,
      burgerConstructor: constructorInitialState,
      feed: feedInitialState,
      userOrders: userOrdersInitialState
    });
  });
});

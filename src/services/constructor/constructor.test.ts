import {
  burgerConstructorReducer,
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './slice';

describe('Конструктор бургера', () => {
  beforeAll(() => {
    if (!(globalThis as any).crypto) {
      (globalThis as any).crypto = {};
    }

    (globalThis as any).crypto.randomUUID = jest.fn(() => 'test-uuid');
  });
  it('Добавление ингредиента', () => {
    const ingredient = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const state = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient);
    expect(state.ingredients[0].uuid).toBeDefined();
  });

  it('Удаление ингредиента', () => {
    const ingredient = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: '',
      uuid: '123'
    };

    const stateBefore = {
      ...initialState,
      ingredients: [ingredient]
    };

    const state = burgerConstructorReducer(
      stateBefore,
      removeIngredient('123')
    );

    expect(state.ingredients).toHaveLength(0);
  });

  it('Смена порядка ингредиентов', () => {
    const ingredient1 = { uuid: '1', name: 'A' } as any;
    const ingredient2 = { uuid: '2', name: 'B' } as any;

    const stateBefore = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };

    const state = burgerConstructorReducer(
      stateBefore,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state.ingredients[0].uuid).toBe('2');
    expect(state.ingredients[1].uuid).toBe('1');
  });
});

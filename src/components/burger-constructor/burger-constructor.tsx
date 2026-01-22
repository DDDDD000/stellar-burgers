import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useAppDispatch } from '@services/store';
import {
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest
} from '@services/constructor/selectors';
import { createOrder } from '@services/constructor/actions';
import { setOrderModalData } from '@services/constructor/slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(selectConstructorItems);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

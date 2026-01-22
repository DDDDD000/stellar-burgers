import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@services/store';
import { selectUserOrders } from '@services/user-orders/slice';
import { fetchUserOrders } from '@services/user-orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

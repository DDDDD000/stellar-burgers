import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '@services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday
} from '@services/feed/slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    total,
    totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};

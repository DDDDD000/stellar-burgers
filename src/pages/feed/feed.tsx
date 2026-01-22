import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@services/store';
import { selectOrders, selectFeedLoading } from '@services/feed/slice';
import { fetchFeeds } from '@services/feed/actions';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const isLoading = useAppSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

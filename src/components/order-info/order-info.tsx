import { FC, useMemo, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector } from '@services/store';
import { selectIngredients } from '@services/ingredients/slice';
import { selectOrders } from '@services/feed/slice';
import { selectUserOrders } from '@services/user-orders/slice';
import { getOrderByNumberApi } from '@api';

type OrderInfoProps = {
  id?: string;
};

export const OrderInfo: FC<OrderInfoProps> = ({ id: propId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredients);
  const feedOrders = useAppSelector(selectOrders);
  const userOrders = useAppSelector(selectUserOrders);
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id =
    propId ||
    paramId ||
    location.pathname.match(/\/feed\/(\d+)/)?.[1] ||
    location.pathname.match(/\/profile\/orders\/(\d+)/)?.[1];

  const isProfileOrder = location.pathname.includes('/profile/orders/');

  useEffect(() => {
    const orderNumber = id ? parseInt(id, 10) : null;
    if (!orderNumber) {
      setIsLoading(false);
      return;
    }

    if (isProfileOrder) {
      const orderFromUserOrders = userOrders.find(
        (order) => order.number === orderNumber
      );
      if (orderFromUserOrders) {
        setOrderData(orderFromUserOrders);
        setIsLoading(false);
        return;
      }
    }

    const orderFromFeed = feedOrders.find(
      (order) => order.number === orderNumber
    );
    if (orderFromFeed) {
      setOrderData(orderFromFeed);
      setIsLoading(false);
      return;
    }

    getOrderByNumberApi(orderNumber)
      .then((response) => {
        if (response.success && response.orders && response.orders.length > 0) {
          setOrderData(response.orders[0]);
        }
      })
      .catch(() => {
        // Error handling
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, feedOrders, userOrders, isProfileOrder]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

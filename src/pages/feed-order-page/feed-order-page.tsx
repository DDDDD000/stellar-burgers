import { FC } from 'react';
import { OrderInfo } from '@components';
import styles from './feed-order-page.module.css';

export const FeedOrderPage: FC = () => (
  <main className={styles.container}>
    <div className={styles.content}>
      <OrderInfo />
    </div>
  </main>
);

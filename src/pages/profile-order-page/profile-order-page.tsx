import { FC } from 'react';
import { OrderInfo } from '@components';
import styles from './profile-order-page.module.css';

export const ProfileOrderPage: FC = () => (
  <main className={styles.container}>
    <div className={styles.content}>
      <OrderInfo />
    </div>
  </main>
);

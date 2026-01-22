import { FC } from 'react';
import { IngredientDetails } from '@components';
import styles from './ingredient-page.module.css';

export const IngredientPage: FC = () => (
  <main className={styles.container}>
    <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
      Детали ингредиента
    </h1>
    <div className={styles.content}>
      <IngredientDetails />
    </div>
  </main>
);

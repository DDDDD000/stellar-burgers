import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            end
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) => {
              const isFeedActive =
                isActive || matchPath('/feed/:id', location.pathname) !== null;
              return `${styles.link} ${isFeedActive ? styles.link_active : ''}`;
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          to='/profile'
          className={({ isActive }) => {
            const isProfileActive =
              isActive || matchPath('/profile/*', location.pathname) !== null;
            return `${styles.link_position_last} ${styles.link} ${
              isProfileActive ? styles.link_active : ''
            }`;
          }}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};

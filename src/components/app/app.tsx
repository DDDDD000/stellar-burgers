import {
  ConstructorPage,
  Feed,
  FeedOrderPage,
  ForgotPassword,
  IngredientPage,
  Login,
  NotFound404,
  Profile,
  ProfileOrderPage,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  ModalIngredientDetails,
  ModalOrderInfo,
  ModalProfileOrderInfo
} from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useAppDispatch } from '@services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '@services/ingredients/actions';
import { getUserApi } from '@api';
import { setIsAuthChecked, setUser } from '@services/user/slice';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getUserApi();
        if (data && data.user) {
          dispatch(setUser(data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
        dispatch(setUser(null));
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    }

    checkAuth();
  }, [dispatch]);

  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/feed/:id' element={<FeedOrderPage />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:id'
          element={<ProtectedRoute component={<ProfileOrderPage />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes location={location}>
          <Route path='/ingredients/:id' element={<ModalIngredientDetails />} />
          <Route path='/feed/:id' element={<ModalOrderInfo />} />
          <Route
            path='/profile/orders/:id'
            element={<ProtectedRoute component={<ModalProfileOrderInfo />} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

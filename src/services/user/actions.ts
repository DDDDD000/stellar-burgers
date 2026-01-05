import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './slice';
import { loginUserApi, logoutApi, getUserApi, updateUserApi } from '@api';
import { setCookie, getCookie } from '@utils/cookie';

export const login = createAsyncThunk(
  'user/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUserApi(credentials);

      if (response.success) {
        localStorage.setItem('refreshToken', response.refreshToken);
        setCookie('accessToken', response.accessToken);

        return response.user;
      }

      return rejectWithValue('Ошибка при входе');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Неверные учетные данные'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();

      if (response.success) {
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '', { expires: -1 });
      }

      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка при выходе'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    userData: { name?: string; email?: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserApi(userData);

      if (response.success) {
        return response.user;
      }

      return rejectWithValue('Ошибка при обновлении данных');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Ошибка при обновлении данных пользователя'
      );
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      try {
        const response = await getUserApi();

        if (response.success) {
          dispatch(setUser(response.user));
        } else {
          localStorage.removeItem('refreshToken');
          setCookie('accessToken', '', { expires: -1 });
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '', { expires: -1 });
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

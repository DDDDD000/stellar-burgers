import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '@services/store';
import { logout } from '@services/user/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        setErrorText(
          err?.message ||
            'Ошибка при сбросе пароля. Проверьте правильность введенных данных.'
        );
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={errorText}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};

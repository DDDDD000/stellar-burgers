import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setErrorText('');
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        setErrorText(
          err?.message ||
            'Ошибка при восстановлении пароля. Попробуйте еще раз.'
        );
      });
  };

  return (
    <ForgotPasswordUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};

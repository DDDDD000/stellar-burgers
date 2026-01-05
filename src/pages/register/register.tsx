import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '@api';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    registerUserApi({ email: email, name: userName, password: password })
      .then((response) => {
        if (response.success) {
          localStorage.setItem('refreshToken', response.refreshToken);
          setCookie('accessToken', response.accessToken);
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => {
        setErrorText(
          error?.message || 'Ошибка при регистрации. Попробуйте еще раз.'
        );
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

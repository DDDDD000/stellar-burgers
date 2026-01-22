import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '@services/store';
import { login } from '@services/user/actions';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        const from =
          (location.state as { from?: { pathname: string } })?.from?.pathname ||
          '/';
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorText(
          error || 'Ошибка при входе. Проверьте правильность введенных данных.'
        );
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

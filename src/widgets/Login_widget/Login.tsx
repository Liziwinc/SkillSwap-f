import { type FC, type SyntheticEvent, useState } from 'react';
import  { Preloader }  from '../../shared/ui/Preloader/Preloader';
import { useDispatch, useSelector } from '../../shared/utils/store';
import { loginProfileThunk } from '../../slice/profileSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { AppRoutes } from '../../shared/router';


export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const isLoading = useSelector((state) => state.profile.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      console.log('djd')
      return setErrorText('Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных');
    }
    try {
      const response = await dispatch(
        loginProfileThunk({
          email: email,
          password: password
        })
      ).unwrap();
      sessionStorage.setItem('Token', response.auth);
      navigate(AppRoutes.HOME, {
        replace: true
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrorText(err.message);
      } else {
        setErrorText('Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных');
      }
    }
  };

   // Создаем обработчики изменений
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCloseLogin = () => {
    const from = location.state?.from || '/';
    navigate(from, { replace: true });
  }
  return isLoading ? (
    <Preloader />
  ) : (
    <LoginPage
      errorText={errorText}
      email={email}
      onEmailChange={handleEmailChange}
      password={password}
      onPasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      onClickProps={handleCloseLogin}
    />
  );
};
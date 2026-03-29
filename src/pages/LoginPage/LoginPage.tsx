import React, { type SyntheticEvent, type FC } from 'react';
import { useNavigate} from 'react-router-dom';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import { AppRoutes } from '../../shared/router';
import styles from './LoginPage.module.css';
import InfoCard from '../../shared/ui/InfoCard';

type LoginUIProps = {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText: string | '';
  handleSubmit: (e: SyntheticEvent) => void;
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginPage: FC<LoginUIProps> = ({
                                       email,
                                       onEmailChange,
                                       errorText,
                                       handleSubmit,
                                       password,
                                       onPasswordChange
                                     }) => {

  const navigate = useNavigate();

  const handleGoogleAuth = () => console.log('Это заглушка');
  const handleAppleAuth = () => console.log('Это заглушка');

  const errorTexts = errorText ? errorText : '';

  return (
    <div className={styles.wrappper_LoginPage}>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.wrappper_LoginPage_content}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.oauthCol}>
              <button
                className={styles.oauthButton}
                onClick={handleGoogleAuth}
                aria-label='Продолжить с Google'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 25 25'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M24.5 12.77c0-.99-.08-1.71-.26-2.46H12.75v4.45h6.75c-.13 1.11-.86 2.78-2.5 3.9l-.02.15 3.64 2.76.25.02c2.31-2.1 3.64-5.18 3.64-8.82Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12.75 24.5c3.31 0 6.09-1.07 8.13-2.91l-3.86-2.93c-1.03.7-2.45 1.2-4.27 1.2-3.23 0-5.97-2.14-6.95-5.02l-.14.01-3.78 2.91-.05.14C3.82 21.8 7.95 24.5 12.75 24.5Z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.78 14.87c-.26-.75-.41-1.55-.41-2.37 0-.83.15-1.62.39-2.37l-.01-.16-3.83-2.91-.12.06C.98 8.74.5 10.57.5 12.5c0 1.93.48 3.76 1.31 5.4l3.97-3.03Z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12.75 5.14c2.3 0 3.85.98 4.73 1.79l3.46-3.3C18.81 1.69 16.05.5 12.75.5 7.96.5 3.82 3.19 1.81 7.11l3.96 3.01C6.76 7.23 9.5 5.14 12.75 5.14Z'
                    fill='#EB4335'
                  />
                </svg>
                <span>Продолжить с Google</span>
              </button>

              <button
                className={styles.oauthButton}
                onClick={handleAppleAuth}
                aria-label='Продолжить с Apple'
              >
                <svg
                  width='18'
                  height='22'
                  viewBox='0 0 22 25'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M10.65 6.28c-.26-1.4.4-2.83 1.2-3.8 0 0 1.49-1.88 3.66-1.97.22 1.46-.37 2.91-1.15 3.92-1.01 1.26-2.47 2.08-3.71 1.85ZM18.19 11.33c.4-1.11 1.19-2.1 2.41-2.78-1.23-1.54-2.96-2.45-4.63-2.45-2.17 0-3.09 1.03-4.61 1.03-1.55 0-2.74-1.03-4.61-1.03-1.83 0-3.78 1.12-5.02 3.04C1.32 9.86 1.01 10.74.85 11.72c-.47 2.75.22 6.33 2.31 9.51 1.02 1.54 2.36 3.26 4.1 3.25 1.57-.01 2.02-1.03 4.13-1.04 2.14-.01 2.53 1.04 4.11 1.03 1.76 0 3.2-1.92 4.23-3.47.72-1.1.99-1.67 1.56-2.93-2.86-1.08-4.03-4.19-3.2-6.78Z'
                    fill='#253017'
                  />
                </svg>
                <span>Продолжить с Apple</span>
              </button>
            </div>

            <div className={styles.divider}>
              <span>или</span>
            </div>

        <div className={styles.divider}>
          <span>или</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email
            <Input
              type='email'
              placeholder='Введите email'
              className={`${styles.input} ${errorTexts ? styles.errorInput : ''}`}
              value={email}
              onChange={onEmailChange}
              id='email'
            />
          </label>

          <label className={styles.label}>
            Пароль
            <Input
              type='password'
              placeholder='Введите ваш пароль'
              className={`${styles.input} ${errorTexts ? styles.errorInput : ''}`}
              value={password}
              onChange={onPasswordChange}
              id='password'
            />
          </label>
              
              {/* Показываем ошибку, если есть */}
              {errorTexts && (
                <p className={styles.error}>
                  {errorTexts}
                </p>
              )}

              <div className={styles.submitRow}>
                <Button
                  className='primary'
                  width={436}
                  type='submit'
                >
                  Войти
                </Button>
              </div>

              <button
                type='button'
                className={styles.registerButton}
                onClick={() => navigate(AppRoutes.REGISTRATION)}
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>

        <InfoCard
          imageSrc='/public/images/light-bulb.png'
          imageAlt='страница логина'
          title='С возвращением в SkillSwap!'
          text='Обменивайтесь знаниями и навыками с другими людьми'
          className={styles.infoCardWrapper}
        />
      </div>
    </div>
  );
};

export default LoginPage;
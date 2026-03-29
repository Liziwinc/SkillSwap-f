import React, { useState, type SyntheticEvent } from 'react';
import styles from './FirstStepRegistration.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import GoogleIcon from './icons/GoogleIcon';
import AppleIcon from './icons/AppleIcon';
import type { TUserFirst } from '../../../pages/Registration/RegistrationPage';

interface FirstStepRegistrationProps {
  handleFirstStep: (email: string, password: string) => void;
  initialUserData: TUserFirst | null;
}

export const FirstStepRegistration: React.FC<FirstStepRegistrationProps> = ({
  handleFirstStep,
  initialUserData,
}) => {

  const [email, setEmail] = useState<string | null>(initialUserData?.email ? initialUserData?.email : null);
  const [password, setPassword] = useState<string | null>(initialUserData?.password ? initialUserData?.password : null);
  const [emailError, setEmailError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const isPasswordShort = !!password && password.length < 8;

  const handleGoogleAuth = () => {
    console.log('Продолжить с Google (заглушка)');
  };

  const handleAppleAuth = () => {
    console.log('Продолжить с Apple (заглушка)');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

    const handleEmailBlur = async () => {
    if (!email) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError(true);
      setShowEmailError(false);
      return;
    }
    try {
      const { getProfilesApi } = await import('../../../api/skillswap-api');
      const profiles = await getProfilesApi();
      const isTaken = profiles.some((user) => user.email === email);
      setEmailError(isTaken);
      setShowEmailError(isTaken);
    } catch (err) {
      setEmailError(true);
      setShowEmailError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    e.stopPropagation();
    if (email && password && !emailError && !isPasswordShort) {
      handleFirstStep(email, password);
    }
  }

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.loginSection}>
        <button className={styles.socialButton} onClick={handleGoogleAuth}>
          <GoogleIcon className={styles.icon} />
          <span>Продолжить с Google</span>
        </button>
        <button className={styles.socialButton} onClick={handleAppleAuth}>
          <AppleIcon className={styles.icon} />
          <span>Продолжить с Apple</span>
        </button>
      </div>

      <div className={styles.orSeparator}>
        <div className={styles.orLine}></div>
        <span className={styles.orText}>или</span>
        <div className={styles.orLine}></div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsSection}>
          <label htmlFor='email' className={styles.inputLabel}>
            Email
          </label>
          <Input
            id='email'
            type='email'
            placeholder='Введите email'
            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            value={email ? email : ''}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <span className={`${styles.emailError} ${showEmailError && emailError ? styles.visible : ''}`}>
            Email уже используется
          </span>
        </div>

        <div className={styles.inputsSection}>
          <label htmlFor='password' className={styles.inputLabel}>
            Пароль
          </label>
          <Input
            id='password'
            type='password'
            placeholder='Придумайте надёжный пароль'
            className={`${styles.input} ${isPasswordShort ? styles.inputError : ''}`}
            value={password ? password : ''}
            onChange={handlePasswordChange}
          />
          <span className={styles.passwordTip}>
            {password && password.length >= 8 ? 'Надёжный' : 'Пароль должен содержать не менее 8 знаков'}
          </span>
        </div>

        <Button
          disabled={!email || !password || emailError || isPasswordShort}
          type="submit"
          className='primary'
          classNameNew={(!email || !password || emailError || isPasswordShort) ? styles.disabledButton : ''}
          toggleMode={false}
          width='100%'
        >
          Далее
        </Button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import LogoUI from '../Logo/Logo';
import { AppRoutes } from '../../router';
import Modal from '../Modal/Modal';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Не показываем футер на страницах логина и регистрации
  const isLoginPage = location.pathname === AppRoutes.LOGIN;
  const isRegistrationPage = location.pathname === AppRoutes.REGISTRATION;

  if (isLoginPage || isRegistrationPage) {
    return null;
  }

  const handleAboutPageClick = () => {
    navigate(AppRoutes.ABOUT);
  };


  const handleSkillsButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.leftSection}>
          <LogoUI />
          <span className={styles.copyright}>SkillSwap — 2025</span>
        </div>

        <nav className={styles.navColumn}>
          <a href='#' onClick={handleAboutPageClick}>
            О проекте
          </a>
          <a href='#' onClick={handleSkillsButtonClick}>
            Все навыки
          </a>
        </nav>

        <nav className={styles.navColumn}>
          <a href='#'>Контакты</a>
          <a href='#'>Блог</a>
        </nav>

        <nav className={styles.navColumn}>
          <a href='#'>Политика конфиденциальности</a>
          <a href='#'>Пользовательское соглашение</a>
        </nav>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Раздел в разработке'
        message='Раздел "Все навыки" скоро будет доступен. Следите за обновлениями!'
        secondaryButton='Ясно'
        primaryButton='Понятно'
        onPrimaryClick={() => setIsModalOpen(false)}
      />
    </>
  );
};
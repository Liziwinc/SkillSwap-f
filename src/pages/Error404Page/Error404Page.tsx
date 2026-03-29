import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../shared/ui/InfoCard';
import Button from '../../shared/ui/Button/Button';
import Modal from '../../shared/ui/Modal/Modal';
import styles from './Error404Page.module.css';

const Error404Page: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isModalOpen, navigate]);

  const handleReport = () => {
    setIsModalOpen(true);
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.page}>
        <InfoCard
          imageSrc='/images/error404.png'
          imageAlt='error404'
          title='Страница не найдена'
          text='К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже'
          buttons={
            <>
              <Button className='outline' onClick={handleReport} aria-label='Сообщить об ошибке'>
                Сообщить об ошибке
              </Button>
              <Button className='primary' onClick={handleHome} aria-label='Вернуться на главную страницу'>
                На главную
              </Button>
            </>
          }
        />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='' message=''>
          <p>
            Спасибо что уделили своё время и сообщили нам об этой ошибке, мы обязательно
            разберемся с этим вопросом
          </p>
          <p>Через несколько секунд вы будете перенаправлены на главную страницу.</p>
          <div className={styles.modalButtons}>
            <Button className='outline' onClick={handleCloseModal} aria-label='Закрыть окно'>
              Закрыть
            </Button>
            <Button className='primary' onClick={handleHome} aria-label='Вернуться на главную страницу'>
              На главную
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Error404Page;
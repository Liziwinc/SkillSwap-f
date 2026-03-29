import styles from './UserCards.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../shared/utils/store';
import { getUsersCardsByIdThunk } from '../../slice/cardsUserSlice';
import Button from '../../shared/ui/Button/Button';
import type { TUsersCards } from '../../shared/utils/types';
import UserCardUI from '../../shared/ui/UsersCardsUI/UserCardUI';
import { Preloader } from '../../shared/ui/Preloader/Preloader';

interface ProfilesListProps {
  loading: boolean;
  error: string | null;
  usersCards: TUsersCards[] | null;
  handleClick?: (id: string) => void; // Сделали необязательным
  seeAllClick?: () => void;
  title: string | '';
  seeBtn?: boolean;
  nameBtn?: string | '';
}

const ProfilesList: React.FC<ProfilesListProps> = ({
  loading = false,
  error = null,
  usersCards = null,
  handleClick,
  seeAllClick,
  title = '',
  seeBtn = false,
  nameBtn = ''
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserProfileClick = async (id: string) => {
    if (handleClick) {
      handleClick(id);
    } else {
      try {
        // Загружаем карточку пользователя
        await dispatch(getUsersCardsByIdThunk(id));
        // Переходим на страницу профиля
        navigate(`/skill/${id}`);
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      }
    }
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <h1 className={styles.container__header_text}>{title}</h1>
        {seeBtn && seeAllClick && (
          <Button
            onClick={() => seeAllClick()}
            icon={
              <svg
                width='8'
                height='16'
                viewBox='0 0 8 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.689834 16C0.514491 16 0.339149 15.9354 0.200721 15.797C-0.066907 15.5293 -0.066907 15.0864 0.200721 14.8187L6.21774 8.80173C6.66071 8.35876 6.66071 7.63893 6.21774 7.19596L0.200721 1.17895C-0.066907 0.91132 -0.066907 0.468349 0.200721 0.200721C0.468349 -0.066907 0.911319 -0.066907 1.17895 0.200721L7.19596 6.21774C7.66662 6.68839 7.93425 7.32516 7.93425 7.99885C7.93425 8.67253 7.67585 9.3093 7.19596 9.77996L1.17895 15.797C1.04052 15.9262 0.865176 16 0.689834 16Z'
                  fill='#253017'
                />
              </svg>
            }
            toggleMode={true}
            iconPosition='right'
            className='secondary'
          >
            {nameBtn}
          </Button>
        )}
      </div>
      <div className={styles.cards_grid}>
        {usersCards ? (
          usersCards.map((user) => (
            <div className={`${styles.card}`} key={user.id}>
              <UserCardUI {...user} />
              <Button
                className='primary'
                onClick={() => handleUserProfileClick(user.id)}
              >
                Подробнее
              </Button>
            </div>
          ))
        ) : (
          <p>Пользователей нет</p>
        )}
      </div>
    </div>
  );
};

export default ProfilesList;

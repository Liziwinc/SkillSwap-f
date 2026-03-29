import type { FC } from 'react';
import type { ProfileProps } from './ProfileSideBar.interface';
import styles from './ProfileSideBar.module.css';
import requestIcon from '../../../assets/icons/request.svg?url';
import messageTextIcon from '../../../assets/icons/message-text.svg?url';
import likeIcon from '../../../assets/icons/like.svg?url';
import ideaIcon from '../../../assets/icons/idea.svg?url';
import userIcon from '../../../assets/icons/user.svg?url';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfileSideBar: FC<ProfileProps> = ({
  selectedSection = 'profile'
}) => {
  const navigate = useNavigate();
  const fakeHandleButtonClick = (buttonName: string) => {
    console.log(
      `Спасибо за то, что нажали на кнопку "${buttonName}", но это заглушка`
    );
  };

  const [activeButton, setActiveButton] = useState<
    'favorites' | 'profile' | null
  >(selectedSection);

  useEffect(() => {
    setActiveButton(selectedSection);
  }, [selectedSection]);

  return (
    <div className={styles.sideBar}>
      <button
        className={styles.buttonContainer}
        onClick={() => fakeHandleButtonClick('Заявки')}
      >
        <img className={styles.sideBarButtonImage} src={requestIcon}></img>
        <h3 className={styles.sideBarButtonText}>Заявки</h3>
      </button>

      <button
        className={styles.buttonContainer}
        onClick={() => fakeHandleButtonClick('Мои обмены')}
      >
        <img className={styles.sideBarButtonImage} src={messageTextIcon}></img>
        <h3 className={styles.sideBarButtonText}>Мои обмены</h3>
      </button>

      <button
        className={`${styles.buttonContainer} ${
          activeButton === 'favorites' ? styles.buttonContainerActive : ''
        }`}
        onClick={() => {
          setActiveButton('favorites');
          navigate('/favorites');
        }}
      >
        <img className={styles.sideBarButtonImage} src={likeIcon}></img>
        <h3 className={styles.sideBarButtonText}>Избранное</h3>
      </button>

      <button
        className={styles.buttonContainer}
        onClick={() => fakeHandleButtonClick('Мои навыки')}
      >
        <img className={styles.sideBarButtonImage} src={ideaIcon}></img>
        <h3 className={styles.sideBarButtonText}>Мои навыки</h3>
      </button>

      <button
        className={`${styles.buttonContainer} ${
          activeButton === 'profile' ? styles.buttonContainerActive : ''
        }`}
        onClick={() => {
          setActiveButton('profile');
          navigate('/profile');
        }}
      >
        <img className={styles.sideBarButtonImage} src={userIcon}></img>
        <h3 className={styles.sideBarButtonText}>Личные данные</h3>
      </button>
    </div>
  );
};

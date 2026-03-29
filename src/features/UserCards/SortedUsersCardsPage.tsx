import { type RootState, useDispatch, useSelector } from '../../shared/utils/store';
import { getNewestUsersCardsThunk, getPopularUsersCardsThunk } from '../../slice/cardsUserSlice';
import { useEffect } from 'react';
import ProfilesList from '../../widgets/UserCard_widget/UserCards';
import styles from './UsersCardsMain.module.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../shared/router';

type TSortedUsersCardsPage = {
    contentType: boolean;
}
export const SortedUsersCardsPage = ({contentType}: TSortedUsersCardsPage) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { 
          usersCards: allUsersCards = [],
          isLoading: loading, 
          error 
        } = useSelector((state: RootState) => state.usersCards);
    
      // Загружаем данные при монтировании компонента
     useEffect(() => {
        if (contentType) {
            dispatch(getPopularUsersCardsThunk());
        } else {
            dispatch(getNewestUsersCardsThunk());
        }
    }, [dispatch, contentType]);

    const handleClick = (id:string) => {
        return console.log('тут когда-то появится навигая, а пока заглушка', id)
        //Позже заменить на:
        // navigate(`/usersList/${id}`);
    }

    const seeAllClick = () => {
          navigate(AppRoutes.HOME);
    };

    const titlePage = contentType ? 'Популярное' : 'Новое';

    return (
        <div className={styles.wrapper}>
        <div className={`${styles.cards__container_new}`}>
            <ProfilesList 
                loading={loading}
                error={error}
                usersCards={allUsersCards}
                seeAllClick={() => seeAllClick()}
                handleClick={handleClick}
                title={`${titlePage}`}
                seeBtn={true}
                nameBtn='Назад'
            />
        </div>
        </div>
    )
}
import {
  type RootState,
  useDispatch,
  useSelector
} from '../../shared/utils/store';
import { getUsersCardsThunk } from '../../slice/cardsUserSlice';
import { useEffect, useMemo, useState } from 'react';
import ProfilesList from '../../widgets/UserCard_widget/UserCards';
import styles from './UsersCardsMain.module.css';
import { Preloader } from '../../shared/ui/Preloader/Preloader';
import { filtersSelectors } from '../../slice/filtersSlice.ts';
import { useFilters } from '../../shared/hooks/useFilters.ts';
import Button from '../../shared/ui/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../shared/router';

export const UsersCardsMainPage = () => {
  const dispatch = useDispatch();
  const {
    usersCards: allUsersCards = [],
    isLoading: loading,
    error
  } = useSelector((state: RootState) => state.usersCards);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  const searchQuery = useSelector(filtersSelectors.searchQuery);
  const skillCity = useSelector(filtersSelectors.skillCity);
  const skillCategory = useSelector(filtersSelectors.skillCategory);
  const skillType = useSelector(filtersSelectors.skillType);
  const skillExpert = useSelector(filtersSelectors.skillExpert);

  const hasActiveFilters = skillCity.length > 0 ||
    skillCategory.subCategory.length > 0 ||
    skillType !== 'all' ||
    skillExpert !== '0';

  const hasSearchQuery = !!(searchQuery && searchQuery.trim());

  // Применяем фильтры через хук
  const filteredByFilters = useFilters(allUsersCards);

  // Основная логика: сначала фильтры, потом поиск по отфильтрованным результатам
  const processedUsers = useMemo(() => {
    if (!hasActiveFilters && !hasSearchQuery) {
      return allUsersCards || [];
    }

    // Сначала применяем фильтры (или берем все пользователи, если фильтров нет)
    let result = hasActiveFilters ? filteredByFilters : (allUsersCards || []);

    // Потом применяем поиск к отфильтрованным результатам
    if (hasSearchQuery) {
      const queryLower = searchQuery.toLowerCase().trim();

      result = result.filter((user) => {
        const canTeachMatch = user.subcategoriesCanTeach?.toLowerCase().includes(queryLower);
        const wantLearnMatch = user.subcategoriesWantLearn?.some(skill =>
          skill.toLowerCase().includes(queryLower)
        );
        const nameMatch = user.name?.toLowerCase().includes(queryLower);

        return canTeachMatch || wantLearnMatch || nameMatch;
      });
    }

    return result;
  }, [allUsersCards, filteredByFilters, searchQuery, hasActiveFilters, hasSearchQuery]);

  useEffect(() => {
    dispatch(getUsersCardsThunk());
  }, [dispatch]);

  const { popularUsers, newestUsers, otherUsers, allFilteredUsers } = useMemo(() => {
    const usersToProcess = processedUsers;

    if (!usersToProcess || usersToProcess.length === 0) {
      return {
        popularUsers: [],
        newestUsers: [],
        otherUsers: [],
        allFilteredUsers: []
      };
    }

    const allFilteredUsers = [...usersToProcess];

    if (!hasSearchQuery && !hasActiveFilters) {
      const usersCopy = [...usersToProcess];

      const popular = [...usersCopy]
        .sort((a, b) => (b.numberLikes || 0) - (a.numberLikes || 0))
        .slice(0, 3);

      const newest = [...usersCopy]
        .filter(
          (user) => !popular.some((popularUser) => popularUser.id === user.id)
        )
        .sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        })
        .slice(0, 3);

      const others = usersCopy.filter(
        (user) =>
          !popular.some((p) => p.id === user.id) &&
          !newest.some((n) => n.id === user.id)
      );

      return {
        popularUsers: popular,
        newestUsers: newest,
        otherUsers: others,
        allFilteredUsers: []
      };
    }

    return {
      popularUsers: [],
      newestUsers: [],
      otherUsers: [],
      allFilteredUsers
    };

  }, [processedUsers, hasActiveFilters, hasSearchQuery]);

  const seeAllClick = (toggle: boolean) => {
    try {
      const rout = toggle ? AppRoutes.POPULAR : AppRoutes.NEWEST;
      navigate(rout)
    } catch (err) {
      console.log('Ошибка нафигации', err)
      navigate(AppRoutes.HOME);
    }
  };

  const safeAllUsersCards = allUsersCards || [];
  const visibleOtherUsers = otherUsers.length > 0 ? otherUsers.slice(0, visibleCards) : [];

  const handleLoadMore = () => {
    if (otherUsers.length <= 0) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCards(prev => prev + 6);
      setIsLoadingMore(false)
    }, 500)
  };

  const getFilteredTitle = () => {
    if (hasSearchQuery && hasActiveFilters) {
      return `Поиск в отфильтрованных результатах (${allFilteredUsers.length})`;
    } else if (hasSearchQuery) {
      return `Результаты поиска (${allFilteredUsers.length})`;
    } else if (hasActiveFilters) {
      return `Отфильтрованные результаты (${allFilteredUsers.length})`;
    }
    return '';
  };

  return (
    <div className={styles.cards__container}>
      {(hasSearchQuery || hasActiveFilters) &&
      safeAllUsersCards.length > 0 &&
      processedUsers.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            marginBottom: '30px'
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '20px' }}></div>
          <h2
            style={{
              color: 'var(--clr-text)',
              marginBottom: '15px',
              fontSize: '24px'
            }}
          >
            {hasSearchQuery && hasActiveFilters
              ? 'В отфильтрованных результатах ничего не найдено'
              : 'Никого не нашли'
            }
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: '16px',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}
          >
            {hasSearchQuery && hasActiveFilters
              ? 'Попробуйте изменить поисковый запрос или настройки фильтров.'
              : 'Попробуйте изменить параметры поиска или фильтров.'
            }
          </p>
        </div>
      ) : (hasSearchQuery || hasActiveFilters) ? (
        <ProfilesList
          loading={loading}
          error={error}
          usersCards={allFilteredUsers}
          title={getFilteredTitle()}
          seeBtn={false}
        />
      ) : (
        <>
          {loading ? (
            <Preloader />
          ): (
            <>
              <ProfilesList
                loading={loading}
                error={error}
                usersCards={popularUsers}
                seeAllClick={() => seeAllClick(true)}
                title="Популярное"
                seeBtn={true}
                nameBtn='Смотреть всё'
              />
              <ProfilesList
                loading={loading}
                error={error}
                usersCards={newestUsers}
                seeAllClick={() => seeAllClick(false)}
                title="Новое"
                seeBtn={true}
                nameBtn='Смотреть всё'
              />
              <div className={`${styles.cards__container_more}`}>
                <ProfilesList
                  loading={loading}
                  error={error}
                  usersCards={visibleOtherUsers}
                  title="Рекомендуем"
                />
                {visibleCards < otherUsers.length && (
                  <Button
                    className='outline'
                    classNameNew={styles.btn__more}
                    onClick={handleLoadMore}
                  >
                    {isLoadingMore ? 'Загрузка...' : 'Посмотреть ещё'}
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
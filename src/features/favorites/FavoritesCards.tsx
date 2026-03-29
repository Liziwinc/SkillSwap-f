import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../shared/utils/store';
import ProfilesList from '../../widgets/UserCard_widget/UserCards';
import { getUsersCardsByIdThunk } from '../../slice/cardsUserSlice';
import type { TUsersCards } from '../../shared/utils/types';

export const FavoritesCard = () => {
  const dispatch = useDispatch();

  const {
    profile,
    isLoading: loadingProfile,
    error: errorProfile
  } = useSelector((state) => state.profile);

  const [idFavoritesCards, setIdFavoritesCards] = useState<string[]>([]);
  const [favoritesCards, setFavoritesCards] = useState<TUsersCards[] | null>(
    null
  );
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [errorFavorites, setErrorFavorites] = useState<string | null>(null);

  useEffect(() => {
    setIdFavoritesCards(profile?.myLikeArr ?? []);
  }, [profile]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (idFavoritesCards.length === 0) {
        setFavoritesCards(null);
        return;
      }

      setLoadingFavorites(true);
      setErrorFavorites(null);

      try {
        const results = await Promise.all(
          idFavoritesCards.map((id) =>
            dispatch(getUsersCardsByIdThunk(id)).unwrap()
          )
        );
        setFavoritesCards(results);
      } catch (error: any) {
        console.error('Ошибка при загрузке избранных карточек:', error);
        setErrorFavorites(error.message || 'Ошибка при загрузке');
      } finally {
        setLoadingFavorites(false);
      }
    };
    if (idFavoritesCards.length > 0) {
      loadFavorites();
    }
  }, [idFavoritesCards, dispatch]);

  const handleClick = (id: string) => {
    console.log('заглушка, заменить на навигацию', id);
  };

  return (
    <ProfilesList
      loading={loadingProfile || loadingFavorites}
      error={errorProfile || errorFavorites}
      usersCards={favoritesCards}
      handleClick={handleClick}
      title='Избранное'
      seeBtn={false}
    />
  );
};

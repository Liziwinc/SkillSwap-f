import { useState, useEffect } from 'react';
import { updateUsersCardsApi } from '../../api/skillswap-api';
import LikeButtonUI from '../../shared/ui/LikeButton/LikeButton';
import { type RootState, useSelector, useDispatch } from '../../shared/utils/store';
import { updateProfileThunk } from '../../slice/profileSlice';

interface LikeButtonLogicProps {
  cardId: string; //ид карточки
  initialLikes: number; //число лайков от апи
  className: string; //кастомный класс
}

const LikeButton = ({ cardId, initialLikes, className }: LikeButtonLogicProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.profile.profile);
  const [isActive, setIsActive] = useState(false);
  const [numberLikes, setNumberLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Флаг инициализации

  useEffect(() => {
    // Проверяем, залогинен ли пользователь и загружен ли его профиль
    if (currentUser) {
      // Проверяем, есть ли текущая карточка в массиве лайков пользователя
      const userLikedThisCard = currentUser.myLikeArr?.includes(cardId) ?? false;
      setIsActive(userLikedThisCard);
    } else {
      setIsActive(false);
    }
    setIsInitialized(true);
  }, [currentUser, cardId]);

  // Обновляем количество лайков при изменении initialLikes
  useEffect(() => {
    setNumberLikes(initialLikes);
  }, [ initialLikes]);

  const handleLike = async () => {
    if (isLoading || !currentUser) return;
    
    setIsLoading(true);
    const newIsActive = !isActive;
    const newLikesCount = newIsActive ? numberLikes + 1 : numberLikes - 1;

    try {
      // обновление UI
      setIsActive(newIsActive);
      setNumberLikes(newLikesCount);

      // обновляем данные карточки на сервере
      await updateUsersCardsApi(cardId, { numberLikes: newLikesCount });
      
      // обновляем массив лайков пользователя
      const updatedLikeArr = newIsActive
        ? [...(currentUser.myLikeArr || []), cardId]
        : (currentUser.myLikeArr || []).filter(id => id !== cardId);

      await dispatch(updateProfileThunk({
        id: currentUser.id,
        partialData: { myLikeArr: updatedLikeArr }
      })).unwrap();

    } catch (error) {
      console.error('Like error:', error);
      // откатываем изменения при ошибке
      setIsActive(!newIsActive);
      setNumberLikes(newIsActive ? numberLikes - 1 : numberLikes + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LikeButtonUI
      isActive={isActive}
      numberLikes={numberLikes}
      showNumberLike={true}
      onClick={handleLike}
      className={className}
      disabled={isLoading || !currentUser}
    />
  );
};

export default LikeButton;
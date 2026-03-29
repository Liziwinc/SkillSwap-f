import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import styles from './PreviewCard.module.css'

import Button from '../Button/Button'

import { useNavigate } from 'react-router-dom'
import ClockIcon from '../../../assets/icons/clock.svg'
import EditIcon from '../../../assets/icons/edit.svg'
import HeartIcon from '../../../assets/icons/like.svg'
import MoreIcon from '../../../assets/icons/more-square.svg'
import ShareIcon from '../../../assets/icons/share.svg'
import { addNotification, addPopup, removePopup } from '../../../slice/notificationsSlice'
import { AppRoutes } from '../../router'
import { useDispatch, useSelector } from '../../utils/store'
import Modal from '../Modal/Modal'
import { Notification as PopUpNotification } from '../PopUpNotification/PopUpNotification'

import categoryNames from '../../../assets/db/skills.json'
import { makeAllSubcategoryArray } from '../CategoryFilter/CategoryFilter'
import type { ImageData } from '../ThirdStepRegistration/ThirdStepRegistration'

type PreviewCardProps = {
  onConfirm?: () => void;
  onEdit?: () => void;
  onExchange?: () => void;
  onImageOverlayClick?: () => void;
  isModal: boolean;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imgArr: (ImageData | string)[];
};

const findCategoryName = (categoryId: string) => {
  return categoryNames.find(el => el.id === categoryId)?.name;
};
const findSubCategoryName = (categoryId: string) => {
  return makeAllSubcategoryArray(categoryNames).find(el => el.id === categoryId)?.name;
};

const PreviewCard: FC<PreviewCardProps> = ({
  onConfirm,
  onEdit,
  onExchange,
  onImageOverlayClick,
  isModal,
  title,
  category,
  subcategory,
  description,
  imgArr,
}) => {
  const maxVisible = 4;
  const visibleImages = imgArr.slice(0, maxVisible);
  const hiddenCount = imgArr.length - maxVisible;

  const [isExchanged, setIsExchanged] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state.profile);
  const isLoggedIn = useMemo(() => Boolean(auth && profile), [auth, profile]);
  const { popups } = useSelector((state) => state.notifications || { popups: [] });
  const pendingExchangeRef = useRef(false);

  const schedulePostExchangeEffects = () => {
    const popupId = Math.random().toString(36).slice(2);
    dispatch(addPopup({ message: 'Олег предлагает вам обмен', id: popupId }));
    window.setTimeout(() => {
      dispatch(removePopup({ id: popupId }));
    }, 5000);

    window.setTimeout(() => {
      dispatch(
        addNotification({
          user: 'Николай',
          message: 'принял ваш обмен',
          subText: 'Перейдите в профиль, чтобы обсудить детали',
          onAction: () => navigate(AppRoutes.PROFILE),
        }),
      );
    }, 3000);
  };

  const handleExchangeClick = () => {
    if (!isLoggedIn) {
      pendingExchangeRef.current = true;
      try {
        sessionStorage.setItem('pendingExchange', '1');
      } catch {}
      setIsRegisterModalOpen(true);
      return;
    }

    if (onExchange) onExchange();
    setIsExchanged(true);
    setIsCreatedModalOpen(true);
    schedulePostExchangeEffects();
  };

  // Функция для безопасного получения URL изображения
  const getImageUrl = (imageData: ImageData | string): string | null => {
    if (typeof imageData === 'string') {
      return imageData;
    }
    if (imageData.url) {
      return imageData.url;
    } else if (imageData.file && imageData.file instanceof File) {
      return URL.createObjectURL(imageData.file);
    }
    return null;
  };

  useEffect(() => {
    return () => {
      imgArr.forEach((imageData) => {
        if (
          typeof imageData !== 'string' &&
          imageData.url &&
          imageData.url.startsWith('blob:')
        ) {
          URL.revokeObjectURL(imageData.url);
        }
      });
    };
  }, [imgArr]);

  useEffect(() => {
    const wasPending = (() => {
      try {
        return sessionStorage.getItem('pendingExchange') === '1';
      } catch {
        return false;
      }
    })();

    if (isLoggedIn && (pendingExchangeRef.current || wasPending)) {
      pendingExchangeRef.current = false;
      try {
        sessionStorage.removeItem('pendingExchange');
      } catch {}
      setIsRegisterModalOpen(false);
      setIsExchanged(true);
      setIsCreatedModalOpen(true);
      schedulePostExchangeEffects();
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      {/* Модалка регистрации */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title={'Чтобы предложить обмен'}
        message={'Войдите или зарегистрируйтесь, чтобы продолжить'}
        primaryButton={'Зарегистрироваться'}
        secondaryButton={'Отмена'}
        onPrimaryClick={() => navigate(AppRoutes.REGISTRATION)}
      />

      {/* Модалка об успешном создании предложения */}
      <Modal
        isOpen={isCreatedModalOpen}
        onClose={() => setIsCreatedModalOpen(false)}
        title={'Ваше предложение создано'}
        message={'Теперь вы можете предложить обмен'}
        primaryButton={'Готово'}
        secondaryButton={'Закрыть'}
      />

      {/* Поп-ап уведомления снизу слева */}
      {popups?.length > 0 && (
        <div
          style={{
            position: 'fixed',
            left: 24,
            bottom: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 1000,
          }}
        >
          {popups.map((p) => (
            <PopUpNotification
              key={p.id}
              message={p.message}
              onClose={() => dispatch(removePopup({ id: p.id }))}
              onTo={() => {
                dispatch(removePopup({ id: p.id }));
                navigate(AppRoutes.PROFILE);
              }}
            />
          ))}
        </div>
      )}

      {isModal ? (
        <div className={styles.header}>
          <h2 className={styles.title}>Ваше предложение</h2>
          <p className={styles.subtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>
      ) : (
        <div className={styles.topRightIcons}>
          <HeartIcon />
          <ShareIcon />
          <MoreIcon />
        </div>
      )}

      <div className={styles.contentWrapper}>
        <div className={styles.leftSide}>
          <div className={styles.leftSideTitle}>
            <h3 className={styles.skillTitle}>{title}</h3>
            <p className={styles.category}>
              {findCategoryName(category)}/{findSubCategoryName(subcategory)}
            </p>
          </div>

          <div className={styles.leftSideDescriptionAndButton}>
            <p className={styles.description}>{description}</p>

            <div className={styles.actions}>
              {isModal ? (
                <>
                  <Button
                    onClick={onEdit}
                    className="outline"
                    width="100%"
                    iconPosition="right"
                    icon={<EditIcon />}
                  >
                    Редактировать
                  </Button>
                  <Button onClick={onConfirm} width="100%" className="primary">
                    Готово
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleExchangeClick}
                  className={isExchanged ? 'outline' : 'primary'}
                  width="100%"
                  icon={isExchanged ? <ClockIcon /> : undefined}
                  iconPosition="left"
                >
                  {isExchanged ? 'Обмен предложен' : 'Предложить обмен'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {visibleImages.map((imageData, index) => {
            const classNames = [
              styles.mainImage,
              styles.secondaryImage,
              styles.secondaryImage,
              styles.secondaryImageWithNumber,
            ];
            const isLastVisible = index === maxVisible - 1;
            const imageUrl = getImageUrl(imageData);

            // Не рендерим, если нет валидного URL
            if (!imageUrl) {
              return null;
            }

            return isLastVisible && hiddenCount > 0 ? (
              <div
                key={index}
                className={styles.overlayWrapper}
                onClick={onImageOverlayClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onImageOverlayClick?.();
                }}
              >
                <img
                  src={imageUrl}
                  alt={`img-${index}`}
                  className={classNames[index]}
                />
                <div className={styles.imageOverlay}>+{hiddenCount}</div>
              </div>
            ) : (
              <img
                key={index}
                src={imageUrl}
                alt={`img-${index}`}
                className={classNames[index]}
              />
            );
          }).filter(Boolean)}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
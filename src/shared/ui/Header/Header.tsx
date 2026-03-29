import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getSkillCategoriesApi } from '../../../api/skillswap-api'
import ArrowIcon from '../../../assets/icons/arrow-down-icon.svg'
import CrossIcon from '../../../assets/icons/cross.svg'
import { SkillsCatalog } from '../../../features/skills/SkillsCatalog'
import { AppRoutes } from '../../router'
import { type RootState, useDispatch, useSelector } from '../../utils/store.tsx'
import type { SkillCategory as TSkillCategory } from '../../utils/types.ts'
import Button from '../Button/Button.tsx'
import { DropdownPanel } from '../DropdownPanel/DropdownPanel.tsx'
import LikeButton from '../LikeButton/LikeButton.tsx'
import Logo from '../Logo/Logo.tsx'
import NotificationBell from '../NotificationBell/NotificationBell.tsx'
import NotificationList from '../NotificationList/NotificationList.tsx'
import { ProfilePicture } from '../ProfilePicture'
import SearchInput from '../SearchInput/SearchInput.tsx'
import SwitchTheme from '../SwitchTheme/SwitchTheme.tsx'
import UserMenu from '../UserMenu/UserMenu.tsx'
import styles from './Header.module.css'

import { clearRead, markAllRead } from '../../../slice/notificationsSlice.ts'

import categoryNames from '../../../assets/db/skills.json'
import { filtersSelectors, setCategoryIsShowFromAllSkills, setSkillCategory } from '../../../slice/filtersSlice.ts'
import { addAllSubcategory } from '../CategoryFilter/CategoryFilter.tsx'

const Header = () => {
  const [skillCategories, setSkillCategories] = useState<TSkillCategory[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const skillCategory = useSelector(filtersSelectors.skillCategory);

  const { auth, profile } = useSelector((state: RootState) => state.profile);
  const notifications = useSelector((state: RootState) => state.notifications?.notifications || []);

  useEffect(() => {
    const loadSkillCategories = async () => {
      try {
        setIsLoadingSkills(true);
        const categories = await getSkillCategoriesApi();
        setSkillCategories(categories);
      } catch (error) {
        console.error('Ошибка загрузки категорий навыков:', error);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    loadSkillCategories();
  }, []);

  const isLoggedIn = useMemo(() => Boolean(auth && profile), [auth, profile]);
  const isRegistrationPage = useMemo(
    () => location.pathname === AppRoutes.REGISTRATION,
    [location.pathname]
  );
  const isLoginPage = useMemo(
    () => location.pathname === AppRoutes.LOGIN,
    [location.pathname]
  );

  const userName = useMemo(() => {
    if (!profile) return 'Пользователь';
    return profile.name;
  }, [profile]);

  const userAvatar = useMemo(() => {
    return profile?.avatarUrl || '/public/images/default-avatar.png';
  }, [profile]);

  const handleLogin = useCallback(() => navigate(AppRoutes.LOGIN), [navigate]);
  const handleRegister = useCallback(
    () => navigate(AppRoutes.REGISTRATION),
    [navigate]
  );
  const handleClose = useCallback(() => navigate(AppRoutes.HOME), [navigate]);

  const handleFavoritesClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(AppRoutes.FAVORITES);
    },
    [navigate]
  );

  const handleSkillClick = (skillId: string) => {
    const parentCategory = categoryNames.find(elem => elem.skills.find(it => it.id === skillId));
    if (parentCategory) {
      dispatch(setSkillCategory({
        ...skillCategory,
        category: [`category-${parentCategory.id}`],
        subCategory: [skillId],
      }));
     
      dispatch(setCategoryIsShowFromAllSkills(`category-${parentCategory.id}`));
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const categoryFullId = `category-${categoryId}`;
    dispatch(setCategoryIsShowFromAllSkills(categoryFullId));
    const childSubcategoriesArray = addAllSubcategory(skillCategory.subCategory, categoryFullId, categoryNames);
    dispatch(setSkillCategory({
      ...skillCategory,
      category: [categoryFullId],
      subCategory: childSubcategoriesArray,
    }));
  };

  const getNavLinkClass = useCallback(
    (isActive: boolean, hasIcon = false) =>
      `${styles.navLink} ${hasIcon ? styles.navLinkWithIcon : ''} ${isActive ? styles.activeNavLink : ''}`,
    []
  );

  const handleSearchSubmit = useCallback(
    (query: string) => {
      if (location.pathname !== AppRoutes.HOME && query.trim()) {
        navigate(AppRoutes.HOME);
      }
    },
    [location.pathname, navigate]
  );

  const handleSearchChange = useCallback(() => {

  }, []);

  const searchInputProps = useMemo(
    () => ({
      type: 'text' as const,
      value: '',
      onChange: handleSearchChange,
      useReduxSearch: true,
      submitOnChange: false,
      onSubmit: handleSearchSubmit
    }),
    [handleSearchChange, handleSearchSubmit]
  );

  const skillsTrigger = useMemo(
    () => (
      <div className={`${styles.navLink} ${styles.navLinkWithIcon}`}>
        Все навыки
        <span>
          <ArrowIcon />
        </span>
      </div>
    ),
    []
  );

  const skillsDropdownContent = useMemo(() => {
    if (isLoadingSkills) return <div>Загрузка...</div>;
    if (skillCategories.length === 0)
      return <div>Категории навыков не найдены</div>;

    return (
      <SkillsCatalog
        categories={skillCategories}
        className={styles.dropdownCatalog}
        onSkillClick={handleSkillClick}
        onCategoryClick={handleCategoryClick}
      />
    );
  }, [skillCategories, isLoadingSkills, handleSkillClick]);

  // Триггер для пользовательского меню (твоя версия)
  const userTrigger = useMemo(
    () => (
      <div className={`${styles.logoLink} ${styles.avatarWrapper}`}>
        <div>{userName}</div>
        <ProfilePicture
          size={'small'}
          src={userAvatar}
          alt={`Аватар ${userName}`}
        />
      </div>
    ),
    [userName, userAvatar]
  );

  return (
    <header className={styles.header}>
      <Link to={AppRoutes.HOME} className={styles.logoLink}>
        <Logo />
      </Link>

      {isRegistrationPage || isLoginPage ? (
        <div className={styles.registrationActions}>
          <Button
            className={'secondary'}
            onClick={handleClose}
            icon={<CrossIcon />}
            iconPosition={'right'}
            width={'147px'}
          >
            Закрыть
          </Button>
        </div>
      ) : (
        <>
          <nav className={styles.navMenu}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  to={'/about'}
                >
                  О проекте
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <DropdownPanel
                  trigger={skillsTrigger}
                  align={'left'}
                  wide={true}
                >
                  {skillsDropdownContent}
                </DropdownPanel>
              </li>
            </ul>
          </nav>

          <SearchInput {...searchInputProps} />

          {!isLoggedIn ? (
            <div className={styles.authWrapper}>
              <SwitchTheme />
              <div className={styles.buttonWrapper}>
                <Button className={'outline'} onClick={handleLogin}>
                  Войти
                </Button>
                <Button
                  className={'primary'}
                  width={'208px'}
                  onClick={handleRegister}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.userActions}>
              <div className={styles.iconsWrapper}>
                <SwitchTheme />
                <DropdownPanel
                  trigger={<NotificationBell hasNotifications={notifications.some(n => !n.isRead)} />}
                  align={'right'}
                  wide={false}
                  className={styles.notificationDropdown}
                >
                  <NotificationList
                    notifications={notifications}
                    markAllRead={() => dispatch(markAllRead())}
                    clearRead={() => dispatch(clearRead())}
                  />
                </DropdownPanel>
                <LikeButton onClick={handleFavoritesClick} />
              </div>
              <DropdownPanel
                trigger={userTrigger}
                align={'right'}
                wide={false}
                className={styles.userMenuDropdown}
              >
                <UserMenu />
              </DropdownPanel>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;

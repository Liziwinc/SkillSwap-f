import { useSelector } from '../../shared/utils/store';
import { FavoritesCard } from '../../features/favorites';
import { ProfileUserInfo } from '../../shared/ui/ProfileUserInfo';
import styles from './ProfilePage.module.css';
import { useLocation } from 'react-router-dom';
import type { ProfileUserInfoProps } from '../../shared/ui/ProfileUserInfo/ProfileUserInfo.inteface';
import { ProfileSideBar } from '../../shared/ui/ProfileSideBar/ProfileSideBar';
import { Preloader } from '../../shared/ui/Preloader/Preloader';
import cities from '../../assets/db/cityList.json'

export const ProfilePage = () => {
  const pathToSectionMap: Record<string, 'profile' | 'favorites' | null> = {
    '/profile': 'profile',
    '/favorites': 'favorites'
  };

  const { profile, isLoading: loadingProfile } = useSelector(
    (state) => state.profile
  );

  if (loadingProfile) {
    return <Preloader />;
  }
  if (!profile) {
    return (
      <div>Ошибка: Произошла ошибка, пожалуйста, попробуйте ещё раз позже.</div>
    );
  }

  const userData: ProfileUserInfoProps = {
    emailInputValue: profile.email,
    nameInputValue: profile.name,
    avatarUrl: profile.avatarUrl,
    dateOfBirthInputValue: new Date(profile.dateOfBirth),
    cityInputValue: cities.find(elem => elem.id === profile.city)?.name,
    aboutInputValue: profile.aboutMe,
    genderInputValue:
      profile.gender === 'male'
        ? 'Мужской'
        : profile.gender === 'female'
          ? 'Женский'
          : '',
    onCityChange: (value) => {
      console.log('Город изменен на:', value);
    },
    onGenderChange: (value) => {
      console.log('Пол изменен на:', value);
    }
  };

  const { pathname } = useLocation();
  const selectedSection = pathToSectionMap[pathname] || 'profile';

  return (
    <div className={styles.profileContainer}>
      <ProfileSideBar selectedSection={selectedSection} />
      <div className={styles.mainContainer}>
        {selectedSection === 'profile' && <ProfileUserInfo {...userData} />}
        {selectedSection === 'favorites' && <FavoritesCard />}
      </div>
    </div>
  );
};

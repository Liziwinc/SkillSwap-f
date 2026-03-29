import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type RootState,
  useDispatch,
  useSelector
} from '../../utils/store.tsx';
import { updateProfileThunk } from '../../../slice/profileSlice';
import Button from '../Button/Button';
import { DatePickerUI } from '../DatePicker';
import { Dropdown } from '../Dropdown';
import { ProfilePicture } from '../ProfilePicture';
import styles from './ProfileUserInfo.module.css';
import type { ProfileUserInfoProps } from './ProfileUserInfo.inteface';
import editAvatar from '../../../assets/icons/edit.svg?url';
import citiesList from '../../../assets/db/cityList.json';
import { AppRoutes } from '../../router';

export const ProfileUserInfo: FC<ProfileUserInfoProps> = ({
  emailInputValue,
  nameInputValue,
  avatarUrl,
  dateOfBirthInputValue,
  genderInputValue = '',
  cityInputValue,
  onCityChange,
  aboutInputValue,
  onGenderChange
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.profile);

  const CITIES = citiesList.map((city) => ({
    value: city.name,
    label: city.name
  }));

  const GENDERS = [
    { value: '', label: 'Не указан' },
    { value: 'Мужской', label: 'Мужской' },
    { value: 'Женский', label: 'Женский' }
  ];

  const [gender, setGender] = useState<'' | 'Мужской' | 'Женский'>(
    genderInputValue
  );

  useEffect(() => {
    setGender(genderInputValue);
  }, [genderInputValue]);

  const handleGenderChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      const genderValue = value as '' | 'Мужской' | 'Женский';
      setGender(genderValue);
      onGenderChange?.(genderValue);
    }
  };

  const [city, setCity] = useState(cityInputValue);

  useEffect(() => {
    setCity(cityInputValue);
  }, [cityInputValue]);

  const handleCityChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setCity(value);
      onCityChange?.(value);
    }
  };

  const [email, setEmail] = useState(emailInputValue);
  const [name, setName] = useState(nameInputValue);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    dateOfBirthInputValue ? new Date(dateOfBirthInputValue) : null
  );
  const [about, setAbout] = useState(aboutInputValue);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    // Проверяем, что есть ID текущего пользователя
    if (!profile?.id) {
      setSaveError('Ошибка: не удалось определить пользователя');
      return;
    }

    const formData = {
      email,
      name,
      dateOfBirth: dateOfBirth?.toISOString().split('T')[0] || '',
      gender,
      city: city || '',
      aboutMe: about,
      ...(avatarFile && { avatarUrl: URL.createObjectURL(avatarFile) })
    };

    try {
      setIsSaving(true);
      setSaveError(null);

      const resultAction = await dispatch(
        updateProfileThunk({
          id: profile.id,
          partialData: formData
        })
      );

      if (updateProfileThunk.fulfilled.match(resultAction)) {
        // Редирект на главную страницу после успешного сохранения
        navigate(AppRoutes.HOME);
      } else {
        throw new Error('Не удалось сохранить изменения');
      }
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
      setSaveError('Не удалось сохранить изменения. Попробуйте позже.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className={styles.userInfo}>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImageAndButton}>
          <ProfilePicture
            src={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl}
            alt='Profile'
            size='large'
            className={styles.profileImage}
          />
          <button
            className={styles.profileEditAvatarButton}
            onClick={handleAvatarClick}
            type='button'
          >
            <img src={editAvatar} alt='Edit avatar'></img>
          </button>

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputName}>Почта</h2>
          <input
            className={`${styles.input} ${styles.inputWritable}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className={styles.changePasswordButton} type='button'>
          Изменить пароль
        </button>

        <div className={styles.inputBlock}>
          <h2 className={styles.inputName}>Имя</h2>
          <input
            className={`${styles.input} ${styles.inputWritable}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputBlockSmall}>
          <div>
            <h2 className={`${styles.inputName} ${styles.inputNameRow}`}>
              Дата рождения
            </h2>
            <DatePickerUI
              selectedDate={dateOfBirth}
              onDateChange={setDateOfBirth}
              profileStyle={true}
            />
          </div>

          <div>
            <h2 className={`${styles.inputName} ${styles.inputNameRow}`}>
              Пол
            </h2>
            <div className={styles.genderDropdownWrapper}>
              <Dropdown
                value={gender}
                onChange={handleGenderChange}
                options={GENDERS}
                placeholder='Не указан'
                className='small'
              />
            </div>
          </div>
        </div>

        <div className={styles.inputBlock}>
          <h2 className={styles.inputName}>Город</h2>
          <Dropdown
            value={city || ''}
            onChange={handleCityChange}
            options={CITIES}
            placeholder='Выберите город'
            className='large'
          />
        </div>

        <div className={styles.inputBlock}>
          <h2 className={styles.inputName}>О себе</h2>
          <textarea
            className={`${styles.input} ${styles.inputWritable} ${styles.inputAboutMe}`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
          />
        </div>

        {saveError && <div className={styles.errorMessage}>{saveError}</div>}

        <Button
          className='primary'
          width={460}
          type='submit'
          disabled={isSaving}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </form>
    </div>
  );
};

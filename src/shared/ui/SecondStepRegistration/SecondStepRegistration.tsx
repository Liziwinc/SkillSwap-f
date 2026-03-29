import React, { useRef, useState } from 'react';
import styles from './SecondStepRegistration.module.css';

import Button from '../Button/Button';
import { DatePickerUI } from '../DatePicker';
import { Dropdown } from '../Dropdown';
import Input from '../Input/Input';

import addIconUrl from '../../../assets/icons/add.svg?url';
import avatarPlaceholderUrl from '../../../assets/icons/user-circle.svg?url';

import cities from '../../../assets/db/cityList.json';
import skills from '../../../assets/db/skills.json';
import type { IAvatar, TUserSecond } from '../../../pages/Registration/RegistrationPage';

type Option = { value: string; label: string };

const genderOptions: Option[] = [
  { value: '', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' }
];

const cityOptions: Option[] = (cities as { id: string; name: string }[]).map(
  (c) => ({
    value: c.id,
    label: c.name
  })
);

const categoryOptions: Option[] = (skills as any[]).map((c: any) => ({
  value: c.id,
  label: c.name
}));

interface SecondStepRegistrationProps {
  initialUserData: TUserSecond | null;
  handlePrevStep: () => void,
  handleSecondStep: (avatar: IAvatar, name: string, gender: string, city: string, category: string, subcategory: string[], dateOfBirth: Date) => void;
};

export const SecondStepRegistration: React.FC<SecondStepRegistrationProps> = ({initialUserData, handlePrevStep, handleSecondStep}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const avatarPlaceholder = {
    file: null,
    url:avatarPlaceholderUrl
  };

  const [avatar, setAvatar] = useState<IAvatar>(initialUserData?.avatar ? initialUserData?.avatar : avatarPlaceholder);
  const [name, setName] = useState<string>(initialUserData?.name ? initialUserData?.name : '');
  const [gender, setGender] = useState(initialUserData?.gender ? initialUserData?.gender : '');
  const [city, setCity] = useState(initialUserData?.city ? initialUserData?.city : '');
  const [category, setCategory] = useState<string| string[]>(initialUserData?.categoriesWantToLearn ? initialUserData?.categoriesWantToLearn : '');
  const [subcategory, setSubcategory] = useState<string[]>(initialUserData?.subcategoriesWantToLearn ? initialUserData?.subcategoriesWantToLearn : []);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(initialUserData?.date ? initialUserData?.date : null);

  const subcategoryOptions: Option[] = (skills as any[])
    .filter((c: any) => category.includes(c.id))
    .flatMap((c: any) =>
      c.skills.map((s: any) => ({ value: s.id, label: s.name }))
    );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      URL.revokeObjectURL(avatar.url);
      const newAvatar = {
        file: file,
        url: URL.createObjectURL(file)
      };
      setAvatar(newAvatar);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDateOfBirthChange = (date: Date | null) => {
    setDateOfBirth(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // здесь добавить вызов функции сохранения заполненных полей в новом юзере
    if (dateOfBirth) handleSecondStep(avatar, name, gender, city, category[0], subcategory, dateOfBirth); // прописать передаваемые поля
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      data-ss2
      onSubmit={handleSubmit}
    >
      <div className={styles.formBlock}>
        {/* Аватар */}
        <div className={styles.avatarBlock}>
          <label
            htmlFor='avatar-upload'
            className={styles.avatarLabel}
            title='Загрузить фото'
          >
            <img
              src={avatar.url || avatarPlaceholderUrl}
              alt='Аватар'
              className={styles.avatarImg}
            />
            <span className={styles.addBadge}>
              <img
                src={addIconUrl}
                alt=''
                aria-hidden
                className={styles.addBadgeIcon}
              />
            </span>
            <input
              id='avatar-upload'
              type='file'
              accept='image/*'
              className={styles.fileInput}
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Имя */}
        <div className={styles.field}>
          <label className={styles.label}>Имя</label>
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder='Введите ваше имя'
            className={styles.input}
          />
        </div>

        {/* Дата / Пол */}
        <div className={styles.row}>
          <div className={`${styles.field} ${styles.half} ${styles.dateCol}`}>
            <label className={styles.label}>Дата рождения</label>
            <div className={styles.dateField}>
              <DatePickerUI selectedDate={dateOfBirth} onDateChange={handleDateOfBirthChange}/>
            </div>
          </div>

          <div className={`${styles.field} ${styles.half}`}>
            <label className={styles.label}>Пол</label>
            <div className={`${styles.controlBox} ${styles.genderDropdown}`}>
              <Dropdown
                value={gender}
                onChange={(v) => setGender(String(v))}
                options={genderOptions}
                placeholder='Не указан'
              />
            </div>
          </div>
        </div>

        {/* Город */}
        <div className={styles.field}>
          <label className={styles.label}>Город</label>
          <div className={`${styles.controlBox} ${styles.cityDropdown}`}>
            <Dropdown
              value={city}
              onChange={(v) => setCity(String(v))}
              options={cityOptions}
              placeholder='Не указан'
              searchable
            />
          </div>
        </div>

        {/* Категория */}
        <div className={styles.field}>
          <label className={styles.label}>
            Категория навыка, которому хотите научиться
          </label>
          <div className={styles.controlBox}>
            <Dropdown
              value={category}
              onChange={(v) => setCategory(v)}
              options={categoryOptions}
              placeholder='Выберите категорию'
              checkbox
            />
          </div>
        </div>

        {/* Подкатегория */}
        <div className={styles.field}>
          <label className={styles.label}>
            Подкатегория навыка, которому хотите научиться
          </label>
          <div className={styles.controlBox}>
            <Dropdown
              value={subcategory}
              onChange={(v) => setSubcategory(Array.isArray(v) ? v : [])}
              options={subcategoryOptions}
              placeholder='Выберите подкатегорию'
              multiple
              checkbox
            />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <Button onClick={handlePrevStep} className='outline' width={204}>
            Назад
          </Button>
          <Button
            disabled={avatar.url === avatarPlaceholderUrl || !name || !city || !category[0] || !subcategory || !dateOfBirth}
            classNameNew={(avatar.url === avatarPlaceholderUrl || !name || !city || !category[0] || !subcategory || !dateOfBirth) ? `${styles.disabledButton}` : ''}
            type="submit"
            className='primary'
            width={204}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </form>
  );
};

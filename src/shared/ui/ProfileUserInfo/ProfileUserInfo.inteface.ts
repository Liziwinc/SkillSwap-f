export interface ProfileUserInfoProps {
  emailInputValue: string;
  nameInputValue: string;
  avatarUrl: string;
  dateOfBirthInputValue: string | Date;
  cityInputValue?: string;
  onCityChange?: (value: string) => void;
  aboutInputValue: string;
  genderInputValue?: '' | 'Мужской' | 'Женский';
  onGenderChange?: (value: '' | 'Мужской' | 'Женский') => void;
}

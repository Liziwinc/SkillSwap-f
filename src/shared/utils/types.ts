//тип данных для профиля юзера 
export type TProfile = {
  id: string;
  avatarUrl: string;
  name: string;
  city: string;
  dateOfBirth: string;
  gender: string;
  categoriesWantToLearn: string;
  subcategoriesWantToLearn: string[];
  aboutMe: string;
  skillCanTeachName: string;
  skillCanTeachCategory: string;
  skillCanTeachSubCategory: string;
  skillCanTeachDescription: string;
  images: string[];
  email: string;
  password: string;
  myLikeArr: string[];
  auth: string;
}

//тип данных для списка пользователей
export type TUsersCards = {
  id: string;
  createdAt: string;
  name: string;
  city: string;
  age: string;
  numberLikes: number;
  subcategoriesCanTeach: string;
  subcategoriesWantLearn: string[];
  aboutMe: string;
  categoriesCanTeach: string;
  nameCategoriesCanTeach: string;
  descriptionCategoriesCanTeach: string;
  imgArr: string[];
  avatarURL: string;
  gender: string;
}

export type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  skills: {
    id: string;
    name: string;
  }[];
};
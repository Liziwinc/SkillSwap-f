export type Author = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
};

export type Preview = {
  isModal: boolean;
  title: string;
  category: string;
  description: string;
  imgArr: string[];
};

export type SuggestionUser = {
  id: string;
  name: string;
  city: string;
  age: string; 
  avatarURL?: string;
  numberLikes?: number;
  categoriesCanTeach: string;
  subcategoriesCanTeach: string;
  subcategoriesWantLearn: string[];
  createdAt?: string;
  aboutMe?: string;
  nameCategoriesCanTeach?: string;
  descriptionCategoriesCanTeach?: string;
  imgArr: string[];
};


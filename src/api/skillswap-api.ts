import type {
  SkillCategory,
  TProfile,
  TUsersCards
} from '../shared/utils/types';
import { v4 } from 'uuid';
import skillsData from '../assets/db/skills.json';

// импортируем URL, где лежат моковые данные
const URL = import.meta.env.VITE_API_URL;

//базовый обработчик ответа от сервера
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok
    ? res.json()
    : Promise.reject(new Error(`HTTP error! status: ${res.status}`));

//типы для ответа от сервера
export type TServerResponse<T> = T;

type TProfilesResponse = TServerResponse<TProfile[]>;

type TUsersCardsResponse = TServerResponse<TUsersCards[]>;

// методы API
//получение списка пользователей
export const getUsersCardsApi = (): Promise<TUsersCards[]> =>
  fetch(`${URL}/usersList`)
    .then((res) => checkResponse<TUsersCardsResponse>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//получение профиля пользователя по ID
export const getUsersCardsByIdApi = (id: string): Promise<TUsersCards> =>
  fetch(`${URL}/usersList/${id}`)
    .then((res) => checkResponse<TServerResponse<TUsersCards>>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//частичное обновление данных в карточке пользователей
export const updateUsersCardsApi = (
  id: string,
  partialData: Partial<TUsersCards>
): Promise<TUsersCards> =>
  fetch(`${URL}/usersList/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialData)
  })
    .then((res) => checkResponse<TServerResponse<TUsersCards>>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//получение с АПИ уже отфильтрованного списка карточек пользователя по дате регистрации
export const getNewestUsersFirstApi = (): Promise<TUsersCards[]> =>
  fetch(`${URL}/usersList?sortBy=createdAt&order=desc`)
    .then((res) => checkResponse<TUsersCardsResponse>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//получение с АПИ уже отфильтрованного списка карточе по количеству лайков
export const getPopularUsersFirstApi = (): Promise<TUsersCards[]> =>
  fetch(`${URL}/usersList?sortBy=numberLikes&order=desc`)
    .then((res) => checkResponse<TUsersCardsResponse>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//получение данных профиля нашего юзера
export const getProfilesApi = (): Promise<TProfile[]> =>
  fetch(`${URL}/user_profile`)
    .then((res) => checkResponse<TProfilesResponse>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

export const loginProfileApi = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  // 1. Запрашиваем всех пользователей
  const allUsersResponse = await fetch(`${URL}/user_profile`);
  const allUsers =
    await checkResponse<TServerResponse<TProfile[]>>(allUsersResponse);

  // 2. Ищем пользователя с совпадающими email и паролем
  const foundUser = allUsers.find(
    (user) => user.email === email && user.password === password
  );

  // 3. Если не нашли — кидаем ошибку
  if (!foundUser) {
    throw new Error('Неверный email или пароль');
  }

  // 4. Возвращаем найденного пользователя
  return foundUser as TServerResponse<TProfile>;
};

//получение профиля юзера по ID (если будет несколько профилей юзера создано)
export const getProfileByIdApi = (id: string): Promise<TProfile> =>
  fetch(`${URL}/user_profile/${id}`)
    .then((res) => checkResponse<TServerResponse<TProfile>>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//создание нового юзера
export const createProfileApi = (
  userData: Omit<TProfile, 'id' | 'auth'>
): Promise<TProfile> => {
  // Генерируем случайный UUID для поля auth
  const authToken = v4();

  // Создаем объект с данными пользователя, добавляя auth
  const userDataWithAuth = {
    ...userData,
    auth: authToken
  };

  return fetch(`${URL}/user_profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDataWithAuth)
  })
    .then((res) => checkResponse<TServerResponse<TProfile>>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
};

//обновление данных юзера по ID
export const updateProfileApi = (
  id: string,
  userData: Partial<TProfile>
): Promise<TProfile> =>
  fetch(`${URL}/user_profile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((res) => checkResponse<TServerResponse<TProfile>>(res))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });

//получение всех категорий навыков (статичные данные)
export const getSkillCategoriesApi = (): Promise<SkillCategory[]> =>
  Promise.resolve(skillsData as SkillCategory[]);

//получение категории навыков по ID
export const getSkillCategoryByIdApi = (id: string): Promise<SkillCategory> => {
  const category = skillsData.find((cat) => cat.id === id);
  if (!category) {
    return Promise.reject(new Error(`Категория с ID ${id} не найдена`));
  }
  return Promise.resolve(category as SkillCategory);
};

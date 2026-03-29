import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filtersSelectors } from '../../slice/filtersSlice';
import type { TUsersCards } from '../utils/types';
import { useDebounce } from '../hooks/useDebounce';

export const useFilteredUsers = (users: TUsersCards[] | null) => {
  const rawSearchQuery = useSelector(filtersSelectors.searchQuery);
  const searchQuery = useDebounce(rawSearchQuery, 300); // Добавляем дебаунс в 300мс

  const skillCity = useSelector(filtersSelectors.skillCity);
  const skillCategory = useSelector(filtersSelectors.skillCategory);
  const skillType = useSelector(filtersSelectors.skillType);
  const skillExpert = useSelector(filtersSelectors.skillExpert);

  return useMemo(() => {
    // Проверяем, что users не null и является массивом
    if (!users || !Array.isArray(users)) {
      return [];
    }

    return users.filter((user) => {
      // Фильтрация по поисковому запросу с дебаунсом
      if (searchQuery && searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();

        // Поиск только по subcategoriesCanTeach
        const canTeachMatch = user.subcategoriesCanTeach.toLowerCase().includes(queryLower);

        // Если не найдено совпадение, фильтруем
        if (!canTeachMatch) return false;
      }

      // Фильтрация по городу
      if (skillCity.length > 0) {
        if (!skillCity.includes(user.city)) return false;
      }

      return true;
    });
  }, [users, searchQuery, skillCity, skillCategory, skillType, skillExpert]);
};
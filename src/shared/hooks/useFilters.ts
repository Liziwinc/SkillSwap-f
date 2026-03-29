import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filtersSelectors } from '../../slice/filtersSlice';
import type { TUsersCards } from '../utils/types';
import citiesData from '../../assets/db/cityList.json';
import skillsData from '../../assets/db/skills.json';

export const useFilters = (users: TUsersCards[] | null) => {
  const skillCity = useSelector(filtersSelectors.skillCity);
  const skillCategory = useSelector(filtersSelectors.skillCategory);
  const skillType = useSelector(filtersSelectors.skillType);
  const skillExpert = useSelector(filtersSelectors.skillExpert);
  const searchQuery = useSelector(filtersSelectors.searchQuery);

  return useMemo(() => {
    if (!users || !Array.isArray(users)) {
      return [];
    }

    const allSkills = skillsData.flatMap((category) => category.skills);

    return users.filter((user) => {
      // Фильтрация по городу
      if (skillCity.length > 0) {
        const selectedCityNames = skillCity.map((cityId) => {
          const cleanId = cityId.replace('city-', '');
          const city = citiesData.find((c) => c.id === cleanId);
          return city?.name || cleanId;
        });

        const userCityMatch = selectedCityNames.some(
          (cityName) => user.city?.toLowerCase() === cityName.toLowerCase()
        );

        if (!userCityMatch) return false;
      }

      // Фильтрация по полу
      if (skillExpert !== '') {
        const userGender = user.gender?.toLowerCase() || '';

        if (
          skillExpert === 'male' &&
          userGender !== 'мужской' &&
          userGender !== 'male'
        ) {
          return false;
        }

        if (
          skillExpert === 'female' &&
          userGender !== 'женский' &&
          userGender !== 'female'
        ) {
          return false;
        }
      }

      // Фильтрация по типу навыков
      if (skillType !== 'all') {
        if (skillCategory.subCategory.length > 0) {
          // Если выбраны конкретные навыки
          const selectedSkillNames = skillCategory.subCategory.map(
            (skillId) => {
              const skill = allSkills.find((s) => s.id === skillId);
              return skill?.name || skillId;
            }
          );

          if (skillType === 'learn') {
            // "Хочу научиться" - показываем тех, кто тоже хочет изучать выбранные навыки
            const wantsToLearnSelectedSkills = selectedSkillNames.some(
              (selectedSkillName) =>
                user.subcategoriesWantLearn?.some(
                  (skill) =>
                    skill
                      .toLowerCase()
                      .includes(selectedSkillName.toLowerCase()) ||
                    selectedSkillName
                      .toLowerCase()
                      .includes(skill.toLowerCase())
                )
            );

            if (!wantsToLearnSelectedSkills) return false;
          } else if (skillType === 'teach') {
            // "Могу научить" - показываем тех, кто может научить выбранным навыкам
            const canTeachSelectedSkills = selectedSkillNames.some(
              (selectedSkillName) =>
                user.subcategoriesCanTeach
                  ?.toLowerCase()
                  .includes(selectedSkillName.toLowerCase())
            );

            if (!canTeachSelectedSkills) return false;
          }
        } else {
          // Если не выбраны конкретные навыки, но есть поисковый запрос
          if (searchQuery && searchQuery.trim()) {
            const queryLower = searchQuery.toLowerCase().trim();

            if (skillType === 'learn') {
              // "Хочу научиться" - фильтруем среди тех, кто хочет изучать то же, что ищем
              const wantLearnMatch = user.subcategoriesWantLearn?.some(
                (skill) => skill.toLowerCase().includes(queryLower)
              );

              if (!wantLearnMatch) return false;
            } else if (skillType === 'teach') {
              // "Могу научить" - фильтруем среди тех, кто может научить тому, что ищем
              const canTeachMatch = user.subcategoriesCanTeach
                ?.toLowerCase()
                .includes(queryLower);

              if (!canTeachMatch) return false;
            }
          } else {
            // Если нет поискового запроса и конкретных навыков - показываем всех по типу
            if (skillType === 'learn') {
              // Показываем всех, кто хочет чему-то научиться
              if (
                !user.subcategoriesWantLearn ||
                user.subcategoriesWantLearn.length === 0
              ) {
                return false;
              }
            } else if (skillType === 'teach') {
              // Показываем всех, кто может чему-то научить
              if (
                !user.subcategoriesCanTeach ||
                user.subcategoriesCanTeach.trim() === ''
              ) {
                return false;
              }
            }
          }
        }
      } else if (skillCategory.subCategory.length > 0) {
        // Если выбраны навыки, но не выбран тип - показываем всех, кто связан с этими навыками
        const selectedSkillNames = skillCategory.subCategory.map((skillId) => {
          const skill = allSkills.find((s) => s.id === skillId);
          return skill?.name || skillId;
        });

        const hasMatchingSkills = selectedSkillNames.some(
          (selectedSkillName) => {
            const canTeachMatch = user.subcategoriesCanTeach
              ?.toLowerCase()
              .includes(selectedSkillName.toLowerCase());
            const wantLearnMatch = user.subcategoriesWantLearn?.some(
              (skill) =>
                skill.toLowerCase().includes(selectedSkillName.toLowerCase()) ||
                selectedSkillName.toLowerCase().includes(skill.toLowerCase())
            );
            return canTeachMatch || wantLearnMatch;
          }
        );

        if (!hasMatchingSkills) return false;
      }

      return true;
    });
  }, [users, skillCity, skillCategory, skillType, skillExpert, searchQuery]);
};

import React, { useEffect, type FC } from 'react';
import styles from './CategoryFilter.module.css'; // предполагаемый путь к стилям
import Checkbox from '../CheckBox/Checkbox';
import type { CategoryId, CategoryKey, IShowState, ISubCategory } from '../Filters/type';
import { useDispatch } from '../../utils/store';
import { setCategoriesIsShow, setSkillCategory } from '../../../slice/filtersSlice';

export interface ICategory {
  id: string;
  name: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  category: string[];
  subCategory: string[];
}

interface RenderCategoriesProps {
  categoryNames: ICategory[];
  skillCategory: SkillCategory;
  categoriesIsShow: IShowState;
}

export const deleteAllSubcategory = (array: string[], categoryName: string, categoryNames: ICategory[]) => {
  const newArray = [...array];
  const foundCategory = categoryNames.find(item => item.id === categoryName.replace('category-', ''));
  if (foundCategory) {
      const skillsToRemove = foundCategory.skills.map(skill => skill.id);
      return newArray.filter(item => !skillsToRemove.includes(item));
  }
};

export const addAllSubcategory = (array: string[], categoryId: string, categoryNames: ICategory[]) => {
  const newArray = [...array];
  const foundCategory = categoryNames.find(item => item.id === categoryId.replace('category-', ''));
  if (foundCategory) {
      const skillsToAdd = foundCategory.skills.map(skill => skill.id);
      skillsToAdd.forEach(item => newArray.push(item));
      return newArray;
  }
};

export const makeAllSubcategoryArray = (categoryNames: ICategory[]) => {
      const arrayAllSubCategory: ISubCategory[] = [];
      categoryNames.forEach(item => item.skills.forEach(elem => arrayAllSubCategory.push(elem)));
      return arrayAllSubCategory;
  };

export const findCategoryFromSubcategory = (subcategoryId: string, categoryNames: ICategory[]): string => {
  const categoryId = categoryNames.find(elem => elem.skills.find(it => it.id === subcategoryId));
  return `category-${categoryId?.id}`;
}

const CategoriesList: FC<RenderCategoriesProps> = ({
  categoryNames,
  skillCategory,
  categoriesIsShow
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkboxes = document.querySelectorAll(`.${styles.checkbox}`);
    
    checkboxes.forEach((checkbox) => {
      requestAnimationFrame(() => {
        checkbox.classList.add(styles.visible);
      });
    });

    return () => {
      checkboxes.forEach(checkbox => {
        checkbox.classList.remove(styles.visible);
      });
    };
  }, [makeAllSubcategoryArray(categoryNames)]);
  
  const handleSkillCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (skillCategory.category.includes(e.target.id)) {
            // удаляем категории и все ее подкатегории при через снятие чекбокса
              const newCategoryList = skillCategory.category.filter((item: string) => item !== e.target.id);
              const newSubCategoryList = deleteAllSubcategory(skillCategory.subCategory, e.target.id, categoryNames);
              dispatch(setSkillCategory({
                  ...skillCategory,
                  category: newCategoryList,
                  subCategory: newSubCategoryList,
              }));
          } 
          else {
            // клик именно по чекбоксу категории выбирает эту категорию 
            const newCategoryList = skillCategory.category.concat(e.target.id);
            // и ее подкатегории
            const newSubCategoryList = addAllSubcategory(skillCategory.subCategory, e.target.id, categoryNames);
            dispatch(setSkillCategory({
                ...skillCategory,
                category: newCategoryList,
                subCategory: newSubCategoryList,
            }));
          };
  };

  const handleSkillSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      const Subcategory = makeAllSubcategoryArray(categoryNames).find(item => item.id === e.target.id);
      if (Subcategory) {
        const isIncluded = skillCategory.subCategory.includes(Subcategory?.id);
        const newSubCategoryList = isIncluded
          ? skillCategory.subCategory.filter((item: string)  => item !== Subcategory?.id)
          : skillCategory.subCategory.concat(Subcategory?.id);

        // тут реализовано, чтобы при выборе подкатегории, автоматически проставлялся чекбокс у соответствующей категории
        if (!isIncluded) {
          const parentCategoryId = findCategoryFromSubcategory(e.target.id, categoryNames);
          const newCategoryList = skillCategory.category.includes(parentCategoryId)
            ? skillCategory.category
            : skillCategory.category.concat(parentCategoryId);
          
          dispatch(setSkillCategory({
            ...skillCategory,
            category: newCategoryList,
            subCategory: newSubCategoryList,
          }));
        } else {
          // проверим, если эта подкатегория последняя в своей категории, то галочку с категории снимаем
          const currentCategory = findCategoryFromSubcategory(Subcategory.id, categoryNames);
          // проверяем что подкатегория последняя
          const isLast = !newSubCategoryList.some(elem => findCategoryFromSubcategory(elem, categoryNames) === currentCategory);
          // и если это так удаляем подкатегорию
          const deleteCurrentCategory = isLast
            ? skillCategory.category.filter((item: string)  => item !== currentCategory)
            : [...skillCategory.category];
          dispatch(setSkillCategory({
            ...skillCategory,
            category: deleteCurrentCategory,
            subCategory: newSubCategoryList,
          }));
        }
      }
  };

  const toggleShow = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const categoryId = `category-${target.id}` as CategoryId
    if (categoriesIsShow.hasOwnProperty(categoryId)) {
      dispatch(setCategoriesIsShow(categoryId));
    }
  }
  
  return categoryNames.map((category) => (
    <div key={category.id} className={styles.dropdown}>
      <div className={styles.category}>
        <Checkbox
          id={`category-${category.id}`}
          label=''
          checked={skillCategory.category.includes(`category-${category.id}`)}
          onChange={handleSkillCategory}
        />
        <div className={styles.categoryBox} onClick={toggleShow}>
          <span id={category.id}>{category.name}</span>
          <img className={styles.dropdownButton}  id={category.id} src="src/assets/icons/chevron-down.svg" alt="Развернуть" />
        </div>
      </div>
      {(categoriesIsShow[`category-${category.id}` as CategoryKey]) && (
        <div className={styles.subcategory}>
          {category.skills.map((skill) => (
            <div
              className={styles.checkbox}
              key={skill.id}
            >
              <Checkbox
                key={skill.id}
                id={skill.id}
                label={skill.name}
                checked={skillCategory.subCategory.includes(skill.id)}
                onChange={handleSkillSubCategory}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  ));
};

export default CategoriesList;
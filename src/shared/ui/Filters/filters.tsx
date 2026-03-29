import type { FC } from 'react';
import styles from './filters.module.css';
import CheckboxGroup from '../CheckBox/CheckboxGroup';
import { RadioButton } from '../RadioButton';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setSkillExpert, setSkillType, cleanFilters, filtersSelectors }  from '../../../slice/filtersSlice';
import citiesData from '../../../assets/db/cityList.json'
import categoryNames from '../../../assets/db/skills.json'
import CategoriesList from '../CategoryFilter/CategoryFilter';
import CityList from '../CityFilter/CityFilter';

export const Filters: FC = () => {
    const dispatch = useDispatch();
    
    const skillType = useSelector(filtersSelectors.skillType);
    const skillCategory = useSelector(filtersSelectors.skillCategory);
    const skillExpert = useSelector(filtersSelectors.skillExpert);
    const categoriesIsShow = useSelector(filtersSelectors.categoriesIsShow);
    const skillCity = useSelector(filtersSelectors.skillCity);
    
    const handleSkillType = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSkillType(e.target.value));
    };

    const handleSkillExpert = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSkillExpert(e.target.value));
    };

    const handleCleanFilters = () => {
        dispatch(cleanFilters());
    }

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                {( skillCategory.subCategory.length === 0 && skillCity.length === 0 ) && 
                    <h2>
                        Фильтры
                    </h2>
                }
                
                {( skillCategory.subCategory.length !== 0 || skillCity.length !== 0 ) && 
                    <>    
                        <h2 className={styles.filter}>
                            Фильтры (<span>{skillCity.length + skillCategory.subCategory.length}</span>)
                        </h2>                        
                        <Button
                            className='color'
                            width={102}
                            onClick={handleCleanFilters}
                            icon={<img style={{color: `--clr-accent`}} src='src/assets/icons/cross.svg'/>}
                            iconPosition = 'right'
                        >
                            Сбросить
                        </Button>
                    </>    
                }
            </div>
            <div>
                <RadioButton
                    label='Всё'
                    name='skillType'
                    value='all'
                    checked={skillType === 'all'}
                    onChange={handleSkillType}
                />
                <RadioButton
                    label='Хочу научиться'
                    name='skillType' value='learn'
                    checked={skillType === 'learn'}
                    onChange={handleSkillType}
                />
                <RadioButton
                    label='Могу научить'
                    name='skillType'
                    value='teach'
                    checked={skillType === 'teach'}
                    onChange={handleSkillType}
                />
            </div>
            <div>
               <h3>Навыки</h3>
                <CheckboxGroup>
                    <CategoriesList
                        categoryNames={categoryNames}
                        skillCategory={skillCategory}
                        categoriesIsShow={categoriesIsShow}
                    />
                </CheckboxGroup>
                {/* <div className={styles.more}>
                    <p>Все категории</p>
                    <div className={styles.moreChevron}>
                        <img src='src/assets/icons/chevron-down.svg' />
                    </div>
                </div> */}
            </div>
            <div>
               <h3>Пол автора</h3>
                <RadioButton
                    label='Не имеет значения'
                    name='skillExpert'
                    value=''
                    checked={skillExpert === ''}
                    onChange={handleSkillExpert}
                />
                <RadioButton
                    label='Мужской'
                    name='skillExpert'
                    value='male'
                    checked={skillExpert === 'male'}
                    onChange={handleSkillExpert}
                />
                <RadioButton
                    label='Женский'
                    name='skillExpert'
                    value='female'
                    checked={skillExpert === 'female'}
                    onChange={handleSkillExpert}
                /> 
            </div>
            <div>
                <h3>Город</h3>
                <CheckboxGroup>
                    <CityList
                        objects={citiesData}
                        checkedObjectsArray={skillCity}
                        buttonTitle='Все города'
                    />
                </CheckboxGroup>
            </div>
        </div>
    );
};

export default Filters;
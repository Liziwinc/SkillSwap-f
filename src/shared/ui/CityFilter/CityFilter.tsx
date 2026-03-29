import { filtersSelectors, setSkillCity } from '../../../slice/filtersSlice';
import { useDispatch, useSelector } from '../../utils/store';
import Checkbox from '../CheckBox/Checkbox';
import styles from './CityFilter.module.css';
import type { ICity } from '../Filters/type';
import { useState } from 'react';


const CityList = (   
    { objects, checkedObjectsArray, buttonTitle }: {
        objects: ICity[];
        checkedObjectsArray: string[];
        buttonTitle: string;
    }) => {
    const dispatch = useDispatch();

    const [showAll, setShowAllCities] = useState(false);
    
    const handleShowMore = () => {
        setShowAllCities(true);
    };
    const skillCity = useSelector(filtersSelectors.skillCity);

    const handleSkillCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCity = (skillCity.includes(e.target.id))
            ? skillCity.filter(item => item !== e.target.id)
            : skillCity.concat(e.target.id);
        dispatch(setSkillCity(newCity));
    }
    const firstGroup = objects.slice(0, 5);
    const secondGroup = objects.slice(5);

    return (
        <div>
            {[...firstGroup, ...(showAll ? secondGroup : [])].map(city => (
                <Checkbox
                    key={city.id}
                    id={`city-${city.id}`}
                    label={city.name}
                    checked={checkedObjectsArray.includes(`city-${city.id}`)}
                    onChange={handleSkillCity}
                />
            ))}

            {!showAll && (
                <div className={styles.moreContainer} onClick={handleShowMore}>
                    <p>{buttonTitle}</p>
                    <img className={styles.moreImg} src='src/assets/icons/chevron-down.svg' />
                </div>
            )}
        </div>
    )
};

export default CityList;
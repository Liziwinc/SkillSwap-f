import styles from './UserCardUI.module.css';
import type { SkillCategory, TUsersCards } from '../../../shared/utils/types';
import { getCategoryColor } from '../../../shared/utils/getCategoryColor';
import skillsList from '../../../assets/db/skills.json';
import { Tag } from '../../../shared/ui/Tag';
import LikeButton from '../../../features/UserCards/LikeBtnLogic';

const UserCardUI = (userData: TUsersCards) => {
  //новый массив, где содержатся только первые два навыка, что хочет изучить человек
  const firstTwoSills = userData.subcategoriesWantLearn.slice(0, 2);

  //ищем название категории для навыков, которые хочет изучить юзер
  const getSkillCategory = (skillName: string): SkillCategory | undefined => {
    return skillsList.find((category) =>
      category.skills.some((skill) => skill.name === skillName)
    );
  };

  //цифра навыков, которые еще хочет изучить человек, но они не влезли (лимит отображения на странице - 2шт)
  const remainingSkills = Math.max(
    userData.subcategoriesWantLearn.length - 2,
    0
  );

  return (
    <div className={styles.card__content}>
      <div className={`${styles.card__info}`}>
        <img src={userData.avatarURL} alt={`аватарка ${userData.name}`}></img>
        <div className={`${styles.card__info_wrapper}`}>
          <h3 className={`${styles.card__info_name}`}>{userData.name}</h3>
          <p className={`${styles.card__info_text}`}>
            {userData.city}, {userData.age}
          </p>
        </div>
        <LikeButton
          className={styles.like_btn__position}
          cardId={userData.id}
          initialLikes={userData.numberLikes}
          initialIsLiked={false}
        />
      </div>
      <div className={`${styles.card__skills}`}>
        <div className={`${styles.card__skills_category}`}>
          <h4 className={`${styles.skills_category_header}`}>Может научить:</h4>
          <Tag
            label={userData.subcategoriesCanTeach}
            backgroundColor={getCategoryColor(userData.categoriesCanTeach)}
          />
        </div>
        <div className={`${styles.card__skills_category}`}>
          <h4 className={`${styles.skills_category_header}`}>
            Хочет научиться:
          </h4>
          <div className={`${styles.skills__category_wrapper}`}>
            {firstTwoSills.map((skill, index) => {
              const category = getSkillCategory(skill);
              const backgroundColor = category
                ? getCategoryColor(category.name)
                : 'var(--clr-tag-ect)';
              return (
                <Tag
                  label={skill}
                  backgroundColor={backgroundColor}
                  key={index}
                />
              );
            })}
            {remainingSkills > 0 && (
              <Tag
                label={`+${remainingSkills}`}
                className={`${styles.skills__category_skill_more}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCardUI;

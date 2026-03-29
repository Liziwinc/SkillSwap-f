import { type FC, useMemo } from 'react';
import styles from './SkillPage.module.css';

import PreviewCard from '../../shared/ui/PreviewCard/PreviewCard';
import Button from '../../shared/ui/Button/Button';
import UserCardUI from '../../shared/ui/UsersCardsUI/UserCardUI';

// Демо-данные
const author = {
  imageSrc:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=640',
  imageAlt: 'Фото автора',
  title: 'Иван',
  text: 'Санкт-Петербург, 34 года\n\nПривет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое'
};

const authorTeach = ['Английский язык'];
const authorLearn = ['Тайм-менеджмент', 'Медитация'];

const preview = {
  isModal: false,
  title: 'Игра на барабанах',
  category: 'Творчество и искусство / Музыка и звук',
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
  imgArr: [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1080', // основное
    'https://unsplash.com/photos/-lWcaUVJ39Y/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzU1MjAxMzE4fA&force=true&w=640',
    'https://unsplash.com/photos/TlQ4hUWwpCo/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzU1MjAxMzE5fA&force=true&w=640',
    'https://picsum.photos/id/870/600/600',
    'https://picsum.photos/id/1044/600/600'
  ]
};

const suggestions = [
  {
    id: 'u1',
    name: 'Илона',
    city: 'Екатеринбург',
    age: '33',
    avatarURL:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=480',
    numberLikes: 12,
    categoriesCanTeach: 'Языки',
    subcategoriesCanTeach: 'Английский язык',
    subcategoriesWantLearn: ['Тайм-менеджмент', 'Медитация', 'И ещё'],
    createdAt: '2025-01-01',
    aboutMe: '',
    nameCategoriesCanTeach: '',
    descriptionCategoriesCanTeach: '',
    imgArr: []
  },
  {
    id: 'u2',
    name: 'Михаил',
    city: 'Новосибирск',
    age: '29',
    avatarURL:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480',
    numberLikes: 7,
    categoriesCanTeach: 'Языки',
    subcategoriesCanTeach: 'Английский язык',
    subcategoriesWantLearn: ['Тайм-менеджмент', 'Медитация', 'И ещё'],
    createdAt: '2025-01-01',
    aboutMe: '',
    nameCategoriesCanTeach: '',
    descriptionCategoriesCanTeach: '',
    imgArr: []
  },
  {
    id: 'u3',
    name: 'Мария',
    city: 'Краснодар',
    age: '21',
    avatarURL:
      'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=480',
    numberLikes: 19,
    categoriesCanTeach: 'Языки',
    subcategoriesCanTeach: 'Английский язык',
    subcategoriesWantLearn: ['Тайм-менеджмент', 'Медитация', 'И ещё'],
    createdAt: '2025-01-01',
    aboutMe: '',
    nameCategoriesCanTeach: '',
    descriptionCategoriesCanTeach: '',
    imgArr: []
  },
  {
    id: 'u4',
    name: 'Виктория',
    city: 'Кемерово',
    age: '30',
    avatarURL:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=480',
    numberLikes: 9,
    categoriesCanTeach: 'Языки',
    subcategoriesCanTeach: 'Английский язык',
    subcategoriesWantLearn: ['Тайм-менеджмент', 'Медитация', 'И ещё'],
    createdAt: '2025-01-01',
    aboutMe: '',
    nameCategoriesCanTeach: '',
    descriptionCategoriesCanTeach: '',
    imgArr: []
  }
];

const SkillPage: FC = () => {
  const { meta, about } = useMemo(() => {
    const [metaLine, ...rest] = author.text.split('\n\n');
    return { meta: metaLine ?? '', about: rest.join('\n\n') };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* верх: 2 колонки одинаковой высоты */}
        <section className={styles.topGrid}>
          {/* Левая колонка */}
          <article className={`${styles.card} ${styles.authorCard}`}>
            {/* шапка как у нижних карточек */}
            <div className={styles.authorHeader}>
              <img
                className={styles.authorAvatar}
                src={author.imageSrc}
                alt={author.imageAlt}
              />
              <div className={styles.authorHeadText}>
                <div className={styles.authorName}>{author.title}</div>
                <div className={styles.authorMeta}>{meta}</div>
              </div>
            </div>

            {/* привет-текст сразу под аватаркой */}
            <p className={styles.authorAbout}>{about}</p>

            {/* теги */}
            <div className={styles.tagsBlock}>
              <div className={styles.tagsGroup}>
                <div className={styles.tagsLabel}>Может научить</div>
                <div className={styles.tagsRow}>
                  {authorTeach.map((t) => (
                    <span
                      key={t}
                      className={`${styles.pill} ${styles.pillTeach}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.tagsGroup}>
                <div className={styles.tagsLabel}>Хочет научиться</div>
                <div className={`${styles.tagsRow} ${styles.nowrapRow}`}>
                  {authorLearn.map((t) => (
                    <span
                      key={t}
                      className={`${styles.pill} ${styles.pillLearn}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Правая колонка */}
          <div className={`${styles.card} ${styles.previewCard}`}>
            <PreviewCard
              isModal={preview.isModal}
              title={preview.title}
              category={preview.category}
              description={preview.description}
              imgArr={preview.imgArr}
            />
          </div>
        </section>
        {/* Нижняя секция */}
        <h3 className={styles.suggestionsTitle}>Похожие предложения</h3>

        <section className={styles.cardsRow}>
          {suggestions.map((u) => (
            <div className={styles.cardCol} key={u.id}>
              <div className={`${styles.card} ${styles.suggestCard}`}>
                <UserCardUI {...u} />

                {/* футер самой карточки */}
                <div className={styles.cardFooter}>
                  <Button className='primary' width='100%'>
                    Подробнее
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SkillPage;

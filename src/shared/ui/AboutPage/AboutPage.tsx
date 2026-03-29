import React from 'react';
import styles from './AboutPage.module.css';
import githubIcon from './githubicon.png';
import type { TeamMember } from './type.ts';
import type { Testimonial } from './type.ts';
import teamMembers from './teamMembers.tsx';
import testimonials from './testimonials.ts';

export const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>О SkillSwap</h1>
        <p className={styles.text}>
          SkillSwap — это платформа для обмена навыками. Здесь вы можете научить
          тому, что умеете, и научиться чему-то новому у других пользователей.
          Платформа была создана командой высококвалифицированных разработчиков,
          которые верят в то, что всё возможно!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Наша команда</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member: TeamMember) => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.teamContent}>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamCity}>{member.city}</p>
                <a
                  href={member.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.teamGithub}
                >
                  <img
                    src={githubIcon}
                    alt='GitHub'
                    className={styles.githubIcon}
                  />
                  <span>Профиль</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Отзывы</h2>
        <div className={styles.testimonials}>
          {testimonials.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <p className={styles.testimonialText}>“{testimonial.text}”</p>
              <p className={styles.testimonialAuthor}>— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import styles from './home-page.module.css';
import { UsersCardsMainPage } from '../../features/UserCards/UsersCardsMain';
import { Filters } from '../../shared/ui/Filters/filters';


export const HomePage: React.FC = () => {
  return (
    <>
      <main className={styles.page}>
        <aside className={styles.aside}>
          <Filters/>
        </aside>
        <section className={styles.content}>
          <UsersCardsMainPage/>
        </section>
      </main>
    </>
  );
}
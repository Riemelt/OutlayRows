import { FC } from 'react';

import { Layout } from '../layout/Layout';
import { ProjectSelector, Providers, OutlayScreen } from '../components';
import '../styles';

import styles from './App.module.scss';

export const App: FC = () => (
  <Providers>
    <Layout>
      <div className={styles.root}>
        <aside className={styles.sidebar}>
          <ProjectSelector />
        </aside>
        <main className={styles.main}>
          <OutlayScreen />
        </main>
      </div>
    </Layout>
  </Providers>
);

import { FC } from 'react';

import { Layout } from '../layout/Layout';
import { ProjectSelector, Providers, WorksTable } from '../components';
import '../styles';

import styles from './App.module.scss';

export const App: FC = () => {
  return (
    <Providers>
      <Layout>
        <div className={styles.root}>
          <aside className={styles.sidebar}>
            <ProjectSelector />
          </aside>
          <main className={styles.main}>
            <WorksTable />
          </main>
        </div>
      </Layout>
    </Providers>
  );
};

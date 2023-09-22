import { FC, ReactNode } from 'react';

import { Header } from '../components';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <header className={styles.header}>
      <Header />
    </header>
    <div className={styles.main}>{children}</div>
  </div>
);

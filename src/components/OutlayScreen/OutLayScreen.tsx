import { FC } from 'react';

import { OutlayTable } from '..';
import { title } from './OutLayScreen.constants';
import styles from './OutLayScreen.module.scss';

export const OutlayScreen: FC = () => (
  <div className={styles.screen}>
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.line} />
    </div>
    <div className={styles.table}>
      <OutlayTable />
    </div>
  </div>
);

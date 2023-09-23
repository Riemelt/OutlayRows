import { FC } from 'react';
import cn from 'classnames';

import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';

import { navigationList } from './Header.constants';
import styles from './Header.module.scss';

export const Header: FC = () => (
  <div className={styles.header}>
    <div className={styles.buttons}>
      <button type="button" className={styles.buttonIcon}>
        <AppsIcon className={styles.icon} />
      </button>
      <button type="button" className={styles.buttonIcon}>
        <ReplyIcon className={styles.icon} />
      </button>
    </div>
    <nav>
      <ul className={styles.navPanel}>
        {navigationList.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn(styles.navItemButton, {
                [styles.navItemButton_active]: item.isActive,
              })}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

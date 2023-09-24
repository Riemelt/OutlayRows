import { FC } from 'react';

import FeedIcon from '@mui/icons-material/Feed';

import trashSrc from './icons/trash.svg';
import styles from './ControlPanel.module.scss';

export const ControlPanel: FC = () => (
  <div className={styles.controlPanel}>
    <button type="button" className={styles.iconCreateButton} title="Create">
      <FeedIcon className={styles.createIcon} />
    </button>
    <button type="button" className={styles.iconDeleteButton} title="Delete">
      <img className={styles.deleteIcon} src={trashSrc} alt="delete row" />
    </button>
  </div>
);

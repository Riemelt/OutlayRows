import { FC } from 'react';

import FeedIcon from '@mui/icons-material/Feed';

import trashSrc from './icons/trash.svg';
import styles from './ControlPanel.module.scss';

type Props = {
  onCreateButtonClick?: Function;
  onDeleteButtonClick?: Function;
};

export const ControlPanel: FC<Props> = ({
  onCreateButtonClick,
  onDeleteButtonClick,
}) => (
  <div className={styles.controlPanel}>
    <button
      type="button"
      className={styles.iconCreateButton}
      title="Create"
      onClick={() => onCreateButtonClick?.()}
    >
      <FeedIcon className={styles.createIcon} />
    </button>
    <button
      type="button"
      className={styles.iconDeleteButton}
      title="Delete"
      onClick={() => onDeleteButtonClick?.()}
    >
      <img className={styles.deleteIcon} src={trashSrc} alt="delete row" />
    </button>
  </div>
);

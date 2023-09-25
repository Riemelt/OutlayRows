import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './Loading.module.scss';

export const Loading: FC = () => (
  <CircularProgress
    color="primary"
    classes={{
      colorPrimary: styles.colorPrimary,
    }}
  />
);

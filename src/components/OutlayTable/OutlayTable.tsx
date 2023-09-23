import { FC } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { headers } from './OutlayTable.constants';
import styles from './OutlayTable.module.scss';

export const OutlayTable: FC = () => (
  <TableContainer className={styles.container}>
    <Table className={styles.table}>
      <TableHead>
        <TableRow className={styles.rows}>
          <TableCell className={styles.level}>{headers.level}</TableCell>
          <TableCell className={styles.title}>{headers.title}</TableCell>
          {headers.outlay.map((item) => (
            <TableCell
              key={item.id}
              className={styles.outlayEntry}
              align="right"
            >
              {item.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={styles.rows}>
          <TableCell className={styles.level}>test</TableCell>
          <TableCell className={styles.title}>test</TableCell>
          <TableCell className={styles.outlayEntry} align="right">
            test
          </TableCell>
          <TableCell className={styles.outlayEntry} align="right">
            test
          </TableCell>
          <TableCell className={styles.outlayEntry} align="right">
            test
          </TableCell>
          <TableCell className={styles.outlayEntry} align="right">
            test
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

import {
  FC,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchOutlayRows,
  selectActiveRowId,
  selectFetchListStatus,
  selectOutlayList,
} from '../../store/slices/outlayRows';
import { OutlayEntity } from '../../store/types/types';
import { Loading, OutlayRow } from '..';
import { outlayHeaders } from './OutlayTable.constants';
import styles from './OutlayTable.module.scss';
import { convertTree } from './OutlayTable.utils';

export const OutlayTable: FC = () => {
  const dispatch = useAppDispatch();
  const fetchListStatus = useAppSelector(selectFetchListStatus);
  const outlayList = useAppSelector(selectOutlayList);
  const activeRowId = useAppSelector(selectActiveRowId);

  useEffect(() => {
    if (fetchListStatus === 'succeeded' || fetchListStatus === 'failed') return;
    dispatch(fetchOutlayRows());
  }, [dispatch, fetchListStatus]);

  const parsedTree = useMemo(() => convertTree(outlayList), [outlayList]);

  const handleSubmit = useCallback(
    (node: OutlayEntity, event: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      event.preventDefault();
      [...formData.keys()].forEach((key) => {
        console.log(formData.get(key));
      });
    },
    [],
  );

  if (fetchListStatus === 'pending')
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  return (
    <TableContainer className={styles.container}>
      {parsedTree.map((node) => (
        <form
          className={styles.form}
          id={`${node.id}`}
          key={`${node.id}`}
          onSubmit={(event) => handleSubmit(node, event)}
        />
      ))}
      <Table className={styles.table}>
        <TableHead>
          <TableRow className={styles.rows}>
            <TableCell className={styles.level}>
              {outlayHeaders.level}
            </TableCell>
            <TableCell className={styles.title}>
              {outlayHeaders.title}
            </TableCell>
            {outlayHeaders.outlay.map((item) => (
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
          {parsedTree.map((node) => (
            <Fragment key={node.id}>
              <OutlayRow
                id={node.id}
                rowName={node.rowName}
                salary={node.salary}
                equipmentCosts={node.equipmentCosts}
                estimatedProfit={node.estimatedProfit}
                overheads={node.overheads}
                hasChildren={node.hasChildren}
                parentId={node.parentId}
                lowerSiblingCounts={node.lowerSiblingCounts}
                isActive={node.id === activeRowId}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import { FC, memo, useMemo } from 'react';

import { TableRow, TableCell } from '@mui/material';

import {
  OutlayEntity,
  OutlayId,
} from '../../store/slices/outlayRowsSlice/types';
import { ControlPanel, InputField } from '..';
import { outlayHeaders } from '../OutlayTable';
import styles from './OutlayRow.module.scss';
import { createOutlayEntries, createScaffolds } from './OutlayRow.utils';

type Props = OutlayEntity & {
  isActive: boolean;
  onCreateButtonClick: (id: OutlayId) => void;
  onDeleteButtonClick: (id: OutlayId) => void;
  onDoubleClick: (id: OutlayId) => void;
};

export const OutlayRow: FC<Props> = memo(
  ({
    rowName,
    salary,
    overheads,
    estimatedProfit,
    equipmentCosts,
    hasChildren,
    lowerSiblingCounts,
    isActive,
    id,
    onCreateButtonClick,
    onDeleteButtonClick,
    onDoubleClick,
  }) => {
    const outlayEntries = useMemo(
      () =>
        createOutlayEntries([
          salary,
          overheads,
          equipmentCosts,
          estimatedProfit,
        ]),
      [salary, overheads, equipmentCosts, estimatedProfit],
    );

    const scaffolds = useMemo(
      () => createScaffolds(lowerSiblingCounts),
      [lowerSiblingCounts],
    );

    return (
      <TableRow className={styles.row} onDoubleClick={() => onDoubleClick(id)}>
        <TableCell className={styles.level}>
          <div className={styles.levelWrapper}>
            <div className={styles.scaffolds}>
              {scaffolds.map((scaffold) => (
                <div key={scaffold.id} className={scaffold.classes} />
              ))}
            </div>
            <div className={styles.controlPanelWrapper}>
              {hasChildren && <div className={styles.bottomLine} />}
              <ControlPanel
                onCreateButtonClick={() => onCreateButtonClick(id)}
                onDeleteButtonClick={() => onDeleteButtonClick(id)}
                isCreateButtonDisabled={id === 'creating'}
              />
            </div>
            <button type="submit" form={`${id}`} hidden aria-label="submit" />
          </div>
        </TableCell>
        <TableCell className={styles.title}>
          <InputField
            name="rowName"
            isActive={isActive}
            defaultValue={rowName}
            title={outlayHeaders.title}
            type="text"
            form={`${id}`}
            required
          />
        </TableCell>
        {outlayEntries.map((entry) => (
          <TableCell
            key={entry.id}
            className={styles.outlayEntry}
            align="right"
          >
            <InputField
              name={entry.type}
              isActive={isActive}
              defaultValue={entry.value}
              title={entry.title}
              type="number"
              form={`${id}`}
              step="any"
              required
            />
          </TableCell>
        ))}
      </TableRow>
    );
  },
);

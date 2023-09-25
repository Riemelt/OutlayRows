import { FC, useMemo } from 'react';

import { TableRow, TableCell } from '@mui/material';

import { OutlayEntity } from '../../store/types/types';
import { ControlPanel, InputField } from '..';
import { outlayHeaders } from '../OutlayTable';
import styles from './OutlayRow.module.scss';
import { createOutlayEntries, createScaffolds } from './OutlayRow.utils';

type Props = OutlayEntity & {
  isActive: boolean;
};

export const OutlayRow: FC<Props> = ({
  rowName,
  salary,
  overheads,
  estimatedProfit,
  equipmentCosts,
  hasChildren,
  lowerSiblingCounts,
  isActive,
  id,
}) => {
  const outlayEntries = useMemo(
    () =>
      createOutlayEntries([salary, overheads, equipmentCosts, estimatedProfit]),
    [salary, overheads, equipmentCosts, estimatedProfit],
  );

  const scaffolds = useMemo(
    () => createScaffolds(lowerSiblingCounts),
    [lowerSiblingCounts],
  );

  return (
    <TableRow className={styles.row}>
      <TableCell className={styles.level}>
        <div className={styles.levelWrapper}>
          <div className={styles.scaffolds}>
            {scaffolds.map((scaffold) => (
              <div key={scaffold.id} className={scaffold.classes} />
            ))}
          </div>
          <div className={styles.controlPanelWrapper}>
            {hasChildren && <div className={styles.bottomLine} />}
            <ControlPanel />
          </div>
          <button type="submit" form={`${id}`} hidden aria-label="submit" />
        </div>
      </TableCell>
      <TableCell className={styles.title}>
        <InputField
          name="title"
          isActive={isActive}
          defaultValue={rowName}
          title={outlayHeaders.title}
          type="text"
          form={`${id}`}
          required
        />
      </TableCell>
      {outlayEntries.map((entry) => (
        <TableCell key={entry.id} className={styles.outlayEntry} align="right">
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
};

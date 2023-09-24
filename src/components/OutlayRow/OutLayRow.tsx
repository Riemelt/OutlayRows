import { FC, useMemo, useState } from 'react';
import cn from 'classnames';

import { TableRow, TableCell } from '@mui/material';

import { OutLayEntity, outlayHeaders } from '../OutlayTable';
import styles from './OutLayRow.module.scss';
import { ControlPanel, InputField } from '..';

type Props = OutLayEntity & {
  isActive: boolean;
};

export const OutLayRow: FC<Props> = ({
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
      [salary, overheads, equipmentCosts, estimatedProfit].map(
        (value, index) => ({ value, ...outlayHeaders.outlay[index] }),
      ),
    [salary, overheads, equipmentCosts, estimatedProfit],
  );

  const scaffolds = useMemo(() => {
    const counts = lowerSiblingCounts
      .split(',')
      .filter((count) => count !== '')
      .map(Number);

    return counts.map((count, index) => ({
      id: index,
      classes: cn(
        styles.line,
        {
          [styles.line_horizontalRight]: index === counts.length - 1,
        },
        {
          [styles.line_fullVertical]: count > 0,
          [styles.line_topHalfVertical]:
            count <= 0 && index === counts.length - 1,
        },
      ),
    }));
  }, [lowerSiblingCounts]);

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
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

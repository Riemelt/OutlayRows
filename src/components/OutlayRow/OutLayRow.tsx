import { FC, useMemo, useState } from 'react';
import cn from 'classnames';

import { TableRow, TableCell } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';

import { OutLayEntity } from '../OutlayTable';
import styles from './OutLayRow.module.scss';
import trashSrc from './icons/trash.svg';

type Props = OutLayEntity;

const MyForm: FC = () => <form />;

export const OutLayRow: FC<Props> = ({
  rowName,
  salary,
  overheads,
  estimatedProfit,
  equipmentCosts,
  hasChildren,
  lowerSiblingCounts,
}) => {
  const outlayEntries = useMemo(
    () =>
      [salary, overheads, equipmentCosts, estimatedProfit].map(
        (value, index) => ({ value, id: index }),
      ),
    [salary, overheads, equipmentCosts, estimatedProfit],
  );

  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
          <div
            className={cn(
              styles.controlPanel,
              {
                [styles.controlPanel_open]: isPanelOpen,
              },
              {
                [styles.controlPanel_withBottomLine]: hasChildren,
              },
            )}
          >
            <button
              type="button"
              className={styles.iconCreateButton}
              title="Create"
              onPointerOut={() => setIsPanelOpen(false)}
              onPointerOver={() => setIsPanelOpen(true)}
            >
              <FeedIcon className={styles.createIcon} />
            </button>
            <button
              type="button"
              className={styles.iconDeleteButton}
              title="Delete"
              onPointerOut={() => setIsPanelOpen(false)}
              onPointerOver={() => setIsPanelOpen(true)}
            >
              <img
                className={styles.deleteIcon}
                src={trashSrc}
                alt="delete row"
              />
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell className={styles.title}>{rowName}</TableCell>
      {outlayEntries.map((entry) => (
        <TableCell key={entry.id} className={styles.outlayEntry} align="right">
          {entry.value.toLocaleString('ru-RU')}
        </TableCell>
      ))}
    </TableRow>
  );
};

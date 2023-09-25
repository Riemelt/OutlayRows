import cn from 'classnames';

import { outlayHeaders } from '../OutlayTable';
import styles from './OutlayRow.module.scss';

export function createOutlayEntries(entries: number[]) {
  return entries.map((value, index) => ({
    value,
    ...outlayHeaders.outlay[index],
  }));
}

export function createScaffolds(lowerSiblingCounts: string) {
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
}

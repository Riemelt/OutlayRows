import { FC, FormEvent, Fragment, useCallback } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  OutLayEntity,
  OutLayNode,
  OutLayTree,
  outlayHeaders,
  outlayTree,
} from './OutlayTable.constants';
import styles from './OutlayTable.module.scss';
import { OutLayRow } from '..';

const convertTree = (tree: OutLayTree) => {
  const stack: Array<OutLayEntity & { child: OutLayNode[] }> = tree.map(
    (node) => ({
      ...node,
      parentId: null,
      lowerSiblingCounts: '',
      hasChildren: node.child.length > 0,
    }),
  );

  const result: OutLayEntity[] = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) break;
    if (node.child.length > 0) {
      stack.push({
        ...node,
        child: [],
      });

      const children = node.child.map((childNode, index) => ({
        ...childNode,
        parentId: node.id,
        lowerSiblingCounts: `${node.lowerSiblingCounts},${
          node.child.length - index - 1
        }`,
        hasChildren: childNode.child.length > 0,
      }));

      stack.push(...children);
    } else {
      const { child: _, ...rest } = node;
      result.push(rest);
    }
  }

  return result.reverse();
};

const tree = convertTree(outlayTree);

export const OutlayTable: FC = () => {
  const handleSubmit = useCallback(
    (node: OutLayEntity, event: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);
      event.preventDefault();
      [...formData.keys()].forEach((key) => {
        console.log(formData.get(key));
      });
    },
    [],
  );

  return (
    <TableContainer className={styles.container}>
      {tree.map((node) => (
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
          {tree.map((node) => (
            <Fragment key={node.id}>
              <OutLayRow
                id={node.id}
                rowName={node.rowName}
                salary={node.salary}
                equipmentCosts={node.equipmentCosts}
                estimatedProfit={node.estimatedProfit}
                overheads={node.overheads}
                hasChildren={node.hasChildren}
                parentId={node.parentId}
                lowerSiblingCounts={node.lowerSiblingCounts}
                isActive
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

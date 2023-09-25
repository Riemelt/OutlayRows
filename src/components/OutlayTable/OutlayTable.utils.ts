import { OutlayTree, OutlayEntity, OutlayNode } from '../../store/types/types';

export function convertTree(tree: OutlayTree) {
  const stack: Array<OutlayEntity & { child: OutlayNode[] }> = tree.map(
    (node) => ({
      ...node,
      parentId: null,
      lowerSiblingCounts: '',
      hasChildren: node.child.length > 0,
    }),
  );

  const result: OutlayEntity[] = [];

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
        parentId: node.id !== 'creating' ? node.id : null,
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
}

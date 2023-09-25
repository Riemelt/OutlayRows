import {
  OutlayTree,
  OutlayEntity,
  OutlayNode,
} from '../../store/slices/outlayRowsSlice/types';

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

export function buildDataFromForm(data: FormData) {
  const rowName = data.get('rowName');
  const salary = data.get('salary');
  const overheads = data.get('overheads');
  const equipmentCosts = data.get('equipmentCosts');
  const estimatedProfit = data.get('estimatedProfit');

  return {
    rowName: typeof rowName === 'string' ? rowName : 'No name',
    salary: typeof salary === 'string' ? Number(salary) : 0,
    overheads: typeof overheads === 'string' ? Number(overheads) : 0,
    equipmentCosts:
      typeof equipmentCosts === 'string' ? Number(equipmentCosts) : 0,
    estimatedProfit:
      typeof estimatedProfit === 'string' ? Number(estimatedProfit) : 0,
  };
}

import {
  Outlay,
  OutlayId,
  OutlayNode,
  OutlayTree,
  OutlayUpdate,
} from '../types/types';

function searchNode(tree: OutlayTree, id: OutlayId): OutlayNode | null {
  const stack = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) return null;

    if (node.id === id) return node;

    stack.push(...node.child);
  }

  return null;
}

export function deleteOutlayNode(tree: OutlayTree, id: OutlayId): OutlayTree {
  const firstLayerIndex = tree.findIndex((node) => node.id === id);
  if (firstLayerIndex > 0)
    return tree.filter((child) => child.id !== firstLayerIndex);

  const stack = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) return tree;

    const index = node.child.findIndex((child) => child.id === id);
    if (index >= 0) {
      node.child = node.child.filter((_, i) => i !== index);
      return tree;
    }

    stack.push(...node.child);
  }

  return tree;
}

export function updateOutlayNode(
  tree: OutlayTree,
  id: OutlayId,
  newOutlay: Outlay,
): OutlayTree {
  const node = searchNode(tree, id);
  if (node === null) return tree;

  node.id = newOutlay.id;
  node.rowName = newOutlay.rowName;
  node.salary = newOutlay.salary;
  node.equipmentCosts = newOutlay.equipmentCosts;
  node.estimatedProfit = newOutlay.estimatedProfit;
  node.overheads = newOutlay.overheads;

  return tree;
}

export function updateOutlayTree(
  tree: OutlayTree,
  update: OutlayUpdate,
  nodeId: OutlayId,
): OutlayTree {
  const { current, changed } = update;

  const updatedCurrent =
    current === null
      ? deleteOutlayNode(tree, nodeId)
      : updateOutlayNode(tree, nodeId, current);

  return changed.reduce(
    (newTree, node) => updateOutlayNode(newTree, node.id, node),
    updatedCurrent,
  );
}

export function createOutlayBlankRow(
  tree: OutlayTree,
  parentId: number | null,
): void {
  const blank: OutlayNode = {
    id: 'creating',
    rowName: '',
    child: [],
    salary: 0,
    overheads: 0,
    estimatedProfit: 0,
    equipmentCosts: 0,
  };

  if (parentId === null) {
    tree.push(blank);
    return;
  }

  const node = searchNode(tree, parentId);
  if (node === null) return;

  node.child.push(blank);
}

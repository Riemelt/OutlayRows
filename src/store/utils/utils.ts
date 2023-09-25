import { Outlay, OutlayId, OutlayTree, OutlayUpdate } from '../types/types';

export function deleteOutlayNode(
  tree: OutlayTree,
  nodeId: OutlayId,
): OutlayTree {
  const firstLayerIndex = tree.findIndex((node) => node.id === nodeId);
  if (firstLayerIndex > 0)
    return tree.filter((child) => child.id !== firstLayerIndex);

  const stack = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) return tree;

    const index = node.child.findIndex((child) => child.id === nodeId);
    if (index >= 0) {
      node.child = node.child.filter((child) => child.id !== index);
      return tree;
    }

    stack.push(...node.child);
  }

  return tree;
}

export function updateOutlayNode(
  tree: OutlayTree,
  nodeId: OutlayId,
  newOutlay: Outlay,
): OutlayTree {
  const stack = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) return tree;

    if (node.id === nodeId) {
      node.id = newOutlay.id;
      node.rowName = newOutlay.rowName;
      node.salary = newOutlay.salary;
      node.equipmentCosts = newOutlay.equipmentCosts;
      node.estimatedProfit = newOutlay.estimatedProfit;
      node.overheads = newOutlay.overheads;
      return tree;
    }

    stack.push(...node.child);
  }

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

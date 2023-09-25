import { OutlayEntity } from '../../store/slices/outlayRowsSlice/types';

export function createRequestBody(node: OutlayEntity) {
  return {
    equipmentCosts: node.equipmentCosts,
    estimatedProfit: node.estimatedProfit,
    overheads: node.overheads,
    salary: node.salary,
    rowName: node.rowName,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
  };
}

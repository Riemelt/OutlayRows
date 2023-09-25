export type StatusType = 'idle' | 'pending' | 'succeeded' | 'failed';

export type OutlayId = number | 'creating';

export type OutlayEntries = {
  salary: number;
  equipmentCosts: number;
  estimatedProfit: number;
  overheads: number;
};

export type Outlay = OutlayEntries & {
  id: OutlayId;
  rowName: string;
};

export type OutlayEntity = Outlay & {
  hasChildren: boolean;
  parentId: number | null;
  lowerSiblingCounts: string;
};

export type OutlayNode = {
  child: OutlayNode[];
} & Outlay;

export type OutlayTree = OutlayNode[];

export type OutlayUpdate = {
  current: Outlay | null;
  changed: Outlay[];
};

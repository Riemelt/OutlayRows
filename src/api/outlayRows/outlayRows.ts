import {
  OutlayEntity,
  OutlayTree,
  OutlayUpdate,
} from '../../store/types/types';
import { endpointBase } from './constants';
import { createRequestBody } from './utils';

export async function getOutlayRows(): Promise<OutlayTree> {
  const query = `${endpointBase}/list`;
  const response = await fetch(query);

  if (!response.ok) throw new Error(`Couldn't fetch outlay list`);

  const outlayList: OutlayTree = await response.json();
  return outlayList;
}

export async function createOutlayRow(entity: OutlayEntity) {
  const query = `${endpointBase}/create`;
  const requestBody = createRequestBody(entity);
  const response = await fetch(query, {
    method: 'POST',
    body: JSON.stringify({
      ...requestBody,
      parentId: entity.parentId,
    }),
  });

  if (!response.ok) throw new Error(`Couldn't create outlay row`);

  const outlayUpdate: OutlayUpdate = await response.json();
  return outlayUpdate;
}
export function updateOutlayRow() {}
export function deleteOutlayRow() {}

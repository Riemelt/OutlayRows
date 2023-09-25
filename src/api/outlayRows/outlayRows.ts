import {
  OutlayEntity,
  OutlayTree,
  OutlayUpdate,
} from '../../store/types/types';
import { endpointBase } from './constants';
import { createRequestBody } from './utils';

export async function requestGetOutlayRows(): Promise<OutlayTree> {
  const query = `${endpointBase}/list`;
  const response = await fetch(query);

  if (!response.ok) throw new Error(`Couldn't fetch outlay list`);

  const outlayList: OutlayTree = await response.json();
  return outlayList;
}

export async function requestCreateOutlayRow(entity: OutlayEntity) {
  const query = `${endpointBase}/create`;
  const requestBody = createRequestBody(entity);

  const response = await fetch(query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...requestBody,
      parentId: entity.parentId,
    }),
  });

  if (!response.ok) throw new Error(`Couldn't create outlay row`);

  const outlayUpdate: OutlayUpdate = await response.json();
  return outlayUpdate;
}
export function requestUpdateOutlayRow() {}
export function requestDeleteOutlayRow() {}

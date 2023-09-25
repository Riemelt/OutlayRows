import {
  OutlayEntity,
  OutlayUpdate,
} from '../../../store/slices/outlayRowsSlice/types';
import { endpointBase } from '../constants';
import { createRequestBody } from '../utils';

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

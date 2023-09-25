import {
  OutlayEntity,
  OutlayUpdate,
} from '../../../store/slices/outlayRowsSlice/types';
import { endpointBase } from '../constants';
import { createRequestBody } from '../utils';

export async function requestUpdateOutlayRow(entity: OutlayEntity) {
  const query = `${endpointBase}/${entity.id}/update`;
  const requestBody = createRequestBody(entity);

  const response = await fetch(query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) throw new Error(`Couldn't update outlay row`);

  const outlayUpdate: OutlayUpdate = await response.json();
  return outlayUpdate;
}

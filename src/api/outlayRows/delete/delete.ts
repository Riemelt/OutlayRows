import { OutlayUpdate } from '../../../store/slices/outlayRowsSlice/types';
import { endpointBase } from '../constants';

export async function requestDeleteOutlayRow(id: number) {
  const query = `${endpointBase}/${id}/delete`;

  const response = await fetch(query, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error(`Couldn't delete outlay row`);

  const outlayUpdate: OutlayUpdate = await response.json();
  return outlayUpdate;
}

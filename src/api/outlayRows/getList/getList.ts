import { OutlayTree } from '../../../store/slices/outlayRowsSlice/types';
import { endpointBase } from '../constants';

export async function requestGetOutlayRows(): Promise<OutlayTree> {
  const query = `${endpointBase}/list`;
  const response = await fetch(query);

  if (!response.ok) throw new Error(`Couldn't fetch outlay list`);

  const outlayList: OutlayTree = await response.json();
  return outlayList;
}

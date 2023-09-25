/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  createOutlayRow,
  getOutlayRows,
} from '../../api/outlayRows/outlayRows';
import { OutlayEntity, OutlayId, OutlayTree, StatusType } from '../types/types';
import { RootState } from '../store';
import { updateOutlayTree } from '../utils/utils';

type OutlayRowsState = {
  fetchListStatus: StatusType;
  outlayList: OutlayTree;
  activeRowId: OutlayId | null;
  isOnCreating: boolean;
  fetchCreateRowStatus: StatusType;
};

export const fetchOutlayRows = createAsyncThunk(
  'outlayRows/fetchList',
  async () => {
    const outlayList = await getOutlayRows();
    return outlayList;
  },
);

export const fetchCreateOutlayRow = createAsyncThunk(
  'outlayRows/fetchCreateRow',
  async (entity: OutlayEntity) => {
    const outlayUpdate = await createOutlayRow(entity);
    return { outlayUpdate, nodeId: entity.id };
  },
);

const initialState: OutlayRowsState = {
  fetchListStatus: 'idle',
  outlayList: [],
  activeRowId: null,
  isOnCreating: false,
  fetchCreateRowStatus: 'idle',
};

const outlayRowsSlice = createSlice({
  initialState,
  name: 'outlayRows',
  reducers: {
    setIsOnCreating: (state, action: PayloadAction<boolean>) => {
      state.isOnCreating = action.payload;
    },
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(
        fetchOutlayRows.fulfilled,
        (state, action: PayloadAction<OutlayTree>) => {
          state.outlayList = action.payload;
          state.fetchListStatus = 'succeeded';
        },
      )
      .addCase(fetchOutlayRows.pending, (state) => {
        state.fetchListStatus = 'pending';
      })
      .addCase(fetchOutlayRows.rejected, (state) => {
        state.fetchListStatus = 'failed';
      })
      .addCase(fetchCreateOutlayRow.fulfilled, (state, action) => {
        const { nodeId, outlayUpdate } = action.payload;

        state.outlayList = updateOutlayTree(
          state.outlayList,
          outlayUpdate,
          nodeId,
        );

        state.fetchCreateRowStatus = 'succeeded';
      })
      .addCase(fetchCreateOutlayRow.pending, (state) => {
        state.fetchListStatus = 'pending';
      })
      .addCase(fetchCreateOutlayRow.rejected, (state) => {
        state.fetchListStatus = 'failed';
      });
  },
});

export const { setIsOnCreating } = outlayRowsSlice.actions;

export const selectFetchListStatus = (state: RootState) =>
  state.outlayRows.fetchListStatus;

export const selectOutlayList = (state: RootState) =>
  state.outlayRows.outlayList;

export const selectActiveRowId = (state: RootState) =>
  state.outlayRows.activeRowId;

export const selectIsOnCreating = (state: RootState) =>
  state.outlayRows.isOnCreating;

export default outlayRowsSlice.reducer;

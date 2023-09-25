/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  requestCreateOutlayRow,
  requestGetOutlayRows,
} from '../../api/outlayRows/outlayRows';
import { OutlayEntity, OutlayId, OutlayTree, StatusType } from '../types/types';
import { RootState } from '../store';
import {
  createOutlayBlankRow,
  deleteOutlayNode,
  updateOutlayTree,
} from '../utils/utils';

type OutlayRowsState = {
  fetchListStatus: StatusType;
  outlayList: OutlayTree;
  activeRowId: OutlayId | null;
  fetchCreateRowStatus: StatusType;
};

export const fetchOutlayRows = createAsyncThunk(
  'outlayRows/fetchList',
  async () => {
    const outlayList = await requestGetOutlayRows();
    return outlayList;
  },
);

export const fetchCreateOutlayRow = createAsyncThunk(
  'outlayRows/fetchCreateRow',
  async (entity: OutlayEntity) => {
    const outlayUpdate = await requestCreateOutlayRow(entity);
    return { outlayUpdate, nodeId: entity.id };
  },
);

const initialState: OutlayRowsState = {
  fetchListStatus: 'idle',
  outlayList: [],
  activeRowId: null,
  fetchCreateRowStatus: 'idle',
};

const outlayRowsSlice = createSlice({
  initialState,
  name: 'outlayRows',
  reducers: {
    setActiveRowId: (state, action: PayloadAction<OutlayId | null>) => {
      state.activeRowId = action.payload;
    },
    createBlankRow: (state, action: PayloadAction<number | null>) => {
      createOutlayBlankRow(state.outlayList, action.payload);
    },
    deleteRow: (state, action: PayloadAction<OutlayId>) => {
      state.outlayList = deleteOutlayNode(state.outlayList, action.payload);
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
        state.fetchCreateRowStatus = 'pending';
      })
      .addCase(fetchCreateOutlayRow.rejected, (state) => {
        state.fetchCreateRowStatus = 'failed';
      });
  },
});

export const { setActiveRowId, createBlankRow, deleteRow } =
  outlayRowsSlice.actions;

export const selectFetchListStatus = (state: RootState) =>
  state.outlayRows.fetchListStatus;

export const selectOutlayList = (state: RootState) =>
  state.outlayRows.outlayList;

export const selectActiveRowId = (state: RootState) =>
  state.outlayRows.activeRowId;

export default outlayRowsSlice.reducer;

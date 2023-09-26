import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  requestCreateOutlayRow,
  requestDeleteOutlayRow,
  requestGetOutlayRows,
  requestUpdateOutlayRow,
} from '../../../api/outlayRows';
import { OutlayEntity, OutlayId, OutlayTree, StatusType } from './types';
import { RootState } from '../../store';
import {
  createOutlayBlankRow,
  deleteOutlayNode,
  hasOrIsNode,
  updateOutlayTree,
} from './utils';

type OutlayRowsState = {
  fetchListStatus: StatusType;
  outlayList: OutlayTree;
  activeRowId: OutlayId | null;
  fetchCreateRowStatus: StatusType;
  fetchDeleteRowStatus: StatusType;
  fetchUpdateRowStatus: StatusType;
};

const initialState: OutlayRowsState = {
  fetchListStatus: 'idle',
  outlayList: [],
  activeRowId: null,
  fetchCreateRowStatus: 'idle',
  fetchDeleteRowStatus: 'idle',
  fetchUpdateRowStatus: 'idle',
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

export const fetchDeleteOutlayRow = createAsyncThunk(
  'outlayRows/fetchDeleteRow',
  async (id: number) => {
    const outlayUpdate = await requestDeleteOutlayRow(id);
    return { outlayUpdate, nodeId: id };
  },
);

export const fetchUpdateOutlayRow = createAsyncThunk(
  'outlayRows/fetchUpdateRow',
  async (entity: OutlayEntity) => {
    const outlayUpdate = await requestUpdateOutlayRow(entity);
    return { outlayUpdate, nodeId: entity.id };
  },
);

const outlayRowsSlice = createSlice({
  initialState,
  name: 'outlayRows',
  reducers: {
    setActiveRowId: (state, action: PayloadAction<OutlayId | null>) => {
      state.activeRowId = action.payload;
    },
    createBlankRow: (state, action: PayloadAction<number | null>) => {
      if (state.activeRowId === 'creating') {
        state.outlayList = deleteOutlayNode(state.outlayList, 'creating');
      }

      createOutlayBlankRow(state.outlayList, action.payload);
      state.activeRowId = 'creating';
    },
    deleteBlankRow: (state) => {
      state.outlayList = deleteOutlayNode(state.outlayList, 'creating');
      state.activeRowId = null;
    },
    setRowInUpdatingMode: (state, action: PayloadAction<OutlayId>) => {
      if (
        state.activeRowId !== action.payload &&
        state.activeRowId === 'creating'
      ) {
        state.outlayList = deleteOutlayNode(state.outlayList, 'creating');
      }

      state.activeRowId = action.payload;
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
      .addCase(fetchOutlayRows.rejected, (state, action) => {
        console.error(action.error.message);
        state.fetchListStatus = 'failed';
      })
      .addCase(fetchCreateOutlayRow.fulfilled, (state, action) => {
        const { nodeId, outlayUpdate } = action.payload;

        state.outlayList = updateOutlayTree(
          state.outlayList,
          outlayUpdate,
          nodeId,
        );

        state.activeRowId = null;
        state.fetchCreateRowStatus = 'succeeded';
      })
      .addCase(fetchCreateOutlayRow.pending, (state) => {
        state.fetchCreateRowStatus = 'pending';
      })
      .addCase(fetchCreateOutlayRow.rejected, (state, action) => {
        console.error(action.error.message);
        state.fetchCreateRowStatus = 'failed';
      })
      .addCase(fetchDeleteOutlayRow.fulfilled, (state, action) => {
        const { nodeId, outlayUpdate } = action.payload;

        state.outlayList = updateOutlayTree(
          state.outlayList,
          outlayUpdate,
          nodeId,
        );

        if (
          state.activeRowId !== null &&
          hasOrIsNode(state.outlayList, nodeId, state.activeRowId)
        ) {
          state.activeRowId = null;
        }

        state.fetchDeleteRowStatus = 'succeeded';
      })
      .addCase(fetchDeleteOutlayRow.pending, (state) => {
        state.fetchDeleteRowStatus = 'pending';
      })
      .addCase(fetchDeleteOutlayRow.rejected, (state, action) => {
        console.error(action.error.message);
        state.fetchDeleteRowStatus = 'failed';
      })
      .addCase(fetchUpdateOutlayRow.fulfilled, (state, action) => {
        const { nodeId, outlayUpdate } = action.payload;

        state.outlayList = updateOutlayTree(
          state.outlayList,
          outlayUpdate,
          nodeId,
        );

        state.activeRowId = null;
        state.fetchUpdateRowStatus = 'succeeded';
      })
      .addCase(fetchUpdateOutlayRow.pending, (state) => {
        state.fetchUpdateRowStatus = 'pending';
      })
      .addCase(fetchUpdateOutlayRow.rejected, (state, action) => {
        console.error(action.error.message);
        state.fetchUpdateRowStatus = 'failed';
      });
  },
});

export const {
  setActiveRowId,
  createBlankRow,
  deleteBlankRow,
  setRowInUpdatingMode,
} = outlayRowsSlice.actions;

export const selectFetchListStatus = (state: RootState) =>
  state.outlayRows.fetchListStatus;

export const selectOutlayList = (state: RootState) =>
  state.outlayRows.outlayList;

export const selectActiveRowId = (state: RootState) =>
  state.outlayRows.activeRowId;

export default outlayRowsSlice.reducer;

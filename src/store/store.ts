import { configureStore } from '@reduxjs/toolkit';

import outlayRowsReducer from './slices/outlayRows';

export const store = configureStore({
  reducer: {
    outlayRows: outlayRowsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

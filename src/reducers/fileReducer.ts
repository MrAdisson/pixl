import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Color } from '../types/Color';

export interface fileState {
  file: Color[][];
  openedFile: Color[][];
}

const initialState: fileState = {
  file: [],
  openedFile: [],
};

export const fileReducerSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    openFile: (state, action: PayloadAction<Color[][]>) => {
      state.openedFile = action.payload;
    },
    initFile: (state, action: PayloadAction<Color[][]>) => {
      state.file = action.payload;
    },
    updateFile: (
      state,
      action: PayloadAction<{ x: number; y: number; color: Color }>
    ) => {
      state.file[action.payload.y][action.payload.x] = action.payload.color;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFile, initFile, openFile } = fileReducerSlice.actions;

export default fileReducerSlice.reducer;

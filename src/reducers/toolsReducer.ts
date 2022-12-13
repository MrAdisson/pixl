import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Color } from '../types/Color';

export interface toolsState {
  mode: string;
  brushSettings: {
    brushColor: Color;
  };
  gridSettings: {
    visible: boolean;
    color: Color;
  };
}

const initialState: toolsState = {
  mode: 'DRAW',
  brushSettings: {
    brushColor: 'black',
  },
  gridSettings: {
    visible: false,
    color: 'black',
  },
};

export const toolsReducerSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    drawMode: (state) => {
      state.mode = 'DRAW';
    },
    selectMode: (state) => {
      state.mode = 'SELECT';
    },
    grabMode: (state) => {
      state.mode = 'GRAB';
    },
    eyedropperMode: (state) => {
      state.mode = 'EYEDROPPER';
    },
    setBrushColor: (state, action: PayloadAction<Color>) => {
      state.brushSettings.brushColor = action.payload;
    },
    setGridVisibility: (state, action: PayloadAction<boolean>) => {
      state.gridSettings.visible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  drawMode,
  selectMode,
  grabMode,
  eyedropperMode,
  setBrushColor,
  setGridVisibility,
} = toolsReducerSlice.actions;

export default toolsReducerSlice.reducer;

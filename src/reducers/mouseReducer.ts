import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface mouseState {
  isMouseDown: boolean;
}

const initialState: mouseState = {
  isMouseDown: false,
};

export const mouseReducerSlice = createSlice({
  name: 'mouse',
  initialState,
  reducers: {
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.isMouseDown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMouseDown } = mouseReducerSlice.actions;

export default mouseReducerSlice.reducer;

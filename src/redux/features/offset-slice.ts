import { createSlice } from '@reduxjs/toolkit';

interface OffsetSlice {
  offset: number;
}

const initialState: OffsetSlice = {
  offset: 0,
};

const offsetSlice = createSlice({
  name: 'offset',
  initialState,
  reducers: {
    incrementOffset(state, action) {
      state.offset += action.payload;
    },
    decrementOffset(state, action) {
      state.offset -= action.payload;
    },
  },
});

export const { incrementOffset, decrementOffset } = offsetSlice.actions;
export const offsetReducer = offsetSlice.reducer;

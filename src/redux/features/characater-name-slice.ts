import { createSlice } from '@reduxjs/toolkit';

interface CharacaterNameSlice {
  name: string;
  search: string;
}

const initialState: CharacaterNameSlice = {
  name: '',
  search: '',
};

const characaterNameSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterName(state, action) {
      state.name = action.payload;
    },
    setSearchValue(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setCharacterName, setSearchValue } = characaterNameSlice.actions;
export const characterNameReducer = characaterNameSlice.reducer;

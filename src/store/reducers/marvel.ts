import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  characters: [],
}

const marvelSlices = createSlice({
  name: 'marvel',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload
    },
  },
})

export const { setCharacters } = marvelSlices.actions

export default marvelSlices.reducer

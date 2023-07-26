import { configureStore } from '@reduxjs/toolkit'
import { QuerySlice } from './features/querySlice'

export const store = configureStore({
  reducer: {
    query: QuerySlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
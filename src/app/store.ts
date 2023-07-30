import { configureStore } from '@reduxjs/toolkit'
import heroReducer, { saveToLocalStorageMiddleware } from '../features/HeroSlice'

export const store = configureStore({
  reducer: {
    hero: heroReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
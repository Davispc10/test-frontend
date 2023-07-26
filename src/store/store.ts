import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import rootReducers from './reducers'
import { marvelApi } from './services/marvel'

export const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk, marvelApi.middleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

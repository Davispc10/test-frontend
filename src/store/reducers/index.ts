import { combineReducers } from '@reduxjs/toolkit'

import marvelReducer from './marvel'
import { marvelApi } from '../services/marvel'

const rootReducers = combineReducers({
  marvel: marvelReducer,
  [marvelApi.reducerPath]: marvelApi.reducer,
})

export default rootReducers

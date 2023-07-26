import { combineReducers } from '@reduxjs/toolkit'

import marvelReducer from './marvel'

const rootReducers = combineReducers({
  marvel: marvelReducer,
})

export default rootReducers

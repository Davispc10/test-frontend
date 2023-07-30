import { configureStore } from '@reduxjs/toolkit';

import { characterNameReducer } from './features/characater-name-slice';
import { offsetReducer } from './features/offset-slice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    character: characterNameReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { gameModesSlice } from './game_mode/reducer'

export const store = configureStore({
  reducer: {
     gameModes: gameModesSlice.reducer,
  },
});

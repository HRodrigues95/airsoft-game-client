import { configureStore } from '@reduxjs/toolkit';
import { gameModesSlice } from './game_mode/reducer'
import { locationsSlice } from './locations/reducer'
import { teamsSlice } from './teams/reducer'

export const store = configureStore({
  reducer: {
     gameModes: gameModesSlice.reducer,
     locations: locationsSlice.reducer,
     teams: teamsSlice.reducer,
  },
});

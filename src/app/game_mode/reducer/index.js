import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameModes, GameMode, GameModeAction, Teams, Team, TeamAction, Locations, Location } from '../../endpoints';

const initialState = {
  loading: false,
  list: [],
  currentGameMode: {
    name: '',
    locations: [],
    teams: []
  },
  currentTeams: [],
  currentLocations: []
};

// Request to API
export const getGameModes = createAsyncThunk(
  'gameModes/getGameModes',
  async () => {
    const URL = GameModes()
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const getGameMode = createAsyncThunk(
  'gameModes/getGameMode',
  async (id) => {
    const URL = GameMode(id)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateGameMode = createAsyncThunk(
  'gameModes/updateGameMode',
  async ({ gameMode, action, data }) => {
    let url =  GameMode(gameMode)
    if (action) url = GameModeAction(gameMode, action)
    const options = { method: 'PATCH' }
    if (data) options.body = data

    const response = await fetch(url, options);
    const json = await response.json()

    return json;
  }
)

export const deleteGameMode = createAsyncThunk(
  'gameModes/deleteGameMode',
  async (id) => {
    const URL = GameMode(id)
    const options = { method: 'DELETE' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

// Reducer
export const gameModesSlice = createSlice({
  name: 'gameModes',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGameModes.pending, (state) => {
        state.loading = true
      })
      .addCase(getGameModes.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload;
      })
      .addCase(deleteGameMode.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteGameMode.fulfilled, (state, action) => {
        state.loading = false
        state.list =  state.list.filter((g) => g !== action.payload?.id)
      })
      .addCase(getGameMode.pending, (state) => {
        state.loading = true
      })
      .addCase(getGameMode.fulfilled, (state, action) => {
        state.loading = false
        state.currentGameMode = action.payload
      })
      .addCase(updateGameMode.pending, (state) => {
        state.loading = true
      })
      .addCase(updateGameMode.fulfilled, (state, action) => {
        const { payload } = action

        state.currentGameMode = payload
        state.loading = false
      })
  }
});

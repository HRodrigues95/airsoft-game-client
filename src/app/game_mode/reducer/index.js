import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameModes } from '../../endpoints';

const initialState = {
  loading: false,
  list: []
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
  }
});
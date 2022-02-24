import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Team, Teams, TeamAction } from '../../endpoints';

const initialState = {
  loading: false,
  currentTeams: []
};

export const getTeams = createAsyncThunk(
  'teams/getTeams',
  async ({ gameMode }) => {
    const URL = Teams(gameMode)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async ({ gameMode, data }) => {
    const URL = Teams(gameMode)
    const options = { method: 'POST', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ gameMode, team, data }) => {
    const URL = Team(gameMode, team)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async ({ gameMode, team }) => {
    const URL = Team(gameMode, team)
    const options = { method: 'DELETE' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateActionTeam = createAsyncThunk(
  'teams/updateActionTeam',
  async ({ gameMode, team, data, action }) => {
    const URL = TeamAction(gameMode, team, action)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTeams.pending, (state) => {
      state.loading = true
    })
    .addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false
      state.currentTeams = action.payload
    })
    .addCase(createTeam.pending, (state) => {
      state.loading = true
    })
    .addCase(createTeam.fulfilled, (state, action) => {
      const { payload } = action

      state.currentTeams = [...state.currentTeams, payload]
      state.loading = false
    })
    .addCase(updateTeam.pending, (state) => {
      state.loading = true
    })
    .addCase(updateTeam.fulfilled, (state, action) => {
      const { payload } = action

      state.currentTeams = state.currentTeams.map( team => {
        if (team.id === payload.id) return payload
        else return team
      })
      state.loading = false
    })
    .addCase(deleteTeam.pending, (state) => {
      state.loading = true
    })
    .addCase(deleteTeam.fulfilled, (state, action) => {
      const { payload } = action

      state.currentTeams =  state.currentTeams.filter((team) => team.id !== payload?.id)

      state.loading = false
    })
    .addCase(updateActionTeam.pending, (state) => {
      state.loading = true
    })
    .addCase(updateActionTeam.fulfilled, (state, action) => {
      const { payload } = action

      state.currentTeams = state.currentTeams.map( team => {
        if (team.id === payload.id) return payload
        else return team
      })
      state.loading = false
    })
  }
});

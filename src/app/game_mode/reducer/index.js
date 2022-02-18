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
  async ({ gameMode, action }) => {
    let url =  GameMode(gameMode)
    if (action) {
      url = GameModeAction(gameMode, action)
    }
    const options = { method: 'PATCH' }

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

export const getTeams = createAsyncThunk(
  'gameModes/getTeams',
  async ({ gameMode }) => {
    const URL = Teams(gameMode)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const createTeam = createAsyncThunk(
  'gameModes/createTeam',
  async ({ gameMode, data }) => {
    const URL = Teams(gameMode)
    const options = { method: 'POST', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateTeam = createAsyncThunk(
  'gameModes/updateTeam',
  async ({ gameMode, team, data }) => {
    const URL = Team(gameMode, team)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const deleteTeam = createAsyncThunk(
  'gameModes/deleteTeam',
  async ({ gameMode, team }) => {
    const URL = Team(gameMode, team)
    const options = { method: 'DELETE' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateActionTeam = createAsyncThunk(
  'gameModes/updateActionTeam',
  async ({ gameMode, team, data, action }) => {
    const URL = TeamAction(gameMode, team, action)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const getLocations = createAsyncThunk(
  'gameModes/getLocations',
  async ({ gameMode }) => {
    const URL = Locations(gameMode)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const createLocation = createAsyncThunk(
  'gameModes/createLocation',
  async ({ gameMode, data }) => {
    const URL = Locations(gameMode)
    const options = { method: 'POST', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateLocation = createAsyncThunk(
  'gameModes/updateLocation',
  async ({ gameMode, location , data }) => {
    const URL = Location(gameMode, location)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const deleteLocation = createAsyncThunk(
  'gameModes/deleteLocation',
  async ({ gameMode, location }) => {
    const URL = Location(gameMode, location)
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
      .addCase(getLocations.pending, (state) => {
        state.loading = true
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        const { payload } = action

        state.currentLocations = payload
        state.loading = false
      })
      .addCase(createLocation.pending, (state) => {
        state.loading = true
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        const { payload } = action

        state.currentLocations = [...state.currentLocations, payload]
        state.loading = false
      })
      .addCase(updateLocation.pending, (state) => {
        state.loading = true
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const { payload } = action

        state.currentLocations = state.currentLocations.map(location => {
          if (location.id === payload.id) return payload
          else return location
        })

        state.loading = false
      })
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        const { payload } = action

        state.currentLocations =  state.currentLocations.filter((team) => team.id !== payload?.id)

        state.loading = false
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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Locations, Location } from '../../endpoints';

const initialState = {
  loading: false,
  currentLocations: [],
  openedLocation: null
};

export const getLocations = createAsyncThunk(
  'locations/getLocations',
  async ({ gameMode }) => {
    const URL = Locations(gameMode)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const getLocation = createAsyncThunk(
  'locations/getLocation',
  async ({ gameMode, location }) => {
    const URL = Location(gameMode, location)
    const options = { method: 'GET' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const createLocation = createAsyncThunk(
  'locations/createLocation',
  async ({ gameMode, data }) => {
    const URL = Locations(gameMode)
    const options = { method: 'POST', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async ({ gameMode, location , data }) => {
    const URL = Location(gameMode, location)
    const options = { method: 'PATCH', body: data }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const deleteLocation = createAsyncThunk(
  'locations/deleteLocation',
  async ({ gameMode, location }) => {
    const URL = Location(gameMode, location)
    const options = { method: 'DELETE' }

    const response = await fetch(URL, options);
    const json = await response.json()

    return json;
  }
)

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getLocations.pending, (state) => {
      state.loading = true
    })
    .addCase(getLocations.fulfilled, (state, action) => {
      const { payload } = action

      state.currentLocations = payload
      state.loading = false
    })
    .addCase(getLocation.pending, (state) => {
      state.loading = true
    })
    .addCase(getLocation.fulfilled, (state, action) => {
      const { payload } = action

      state.openedLocation = payload
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
      state.openedLocation = payload

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
  }
});

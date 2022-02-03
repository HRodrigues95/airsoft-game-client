const API_URL = process.env.REACT_APP_API_URL + '/api/'

export const GameModes = () => API_URL + 'game_modes'
export const GameMode = (id) => API_URL + 'game_modes/' + id 
export const GameModeAction = (id, action) => API_URL + 'game_modes/' + id + '/' + action
export const Teams = (gameModeId) => API_URL + 'game_modes/' + gameModeId + '/teams'
export const Team = (gameModeId, teamId) => API_URL + 'game_modes/' + gameModeId + '/teams/' + teamId
export const TeamAction = (gameModeId, teamId, action) => API_URL + 'game_modes/' + gameModeId + '/teams/' + teamId + '/' + action
export const Locations = (gameModeId) => API_URL + 'game_modes/'  + gameModeId + '/locations'
export const Location = (gameModeId, locationId) => API_URL + 'game_modes/'  + gameModeId + '/locations/' + locationId

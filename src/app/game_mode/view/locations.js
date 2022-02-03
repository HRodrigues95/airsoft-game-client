import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button } from '@mui/material'
import { getLocations, updateLocation } from '../reducer'

const Locations = ({ gameMode }) => {
  const dispatch = useDispatch()
  const { teams, locations } = useSelector(({ gameModes }) => ({ 
    teams: gameModes.currentTeams,
    locations: gameModes.currentLocations.length > 0 ? gameModes.currentLocations : gameModes.currentGameMode.locations
  }))

  useEffect(() => {
    dispatch(getLocations({ gameMode }))
  }, [gameMode, dispatch])

  const handleCapture = (location, team) => {
    const form = new FormData()
    if(!location?.current_team || location?.current_team?.id !== team) {
      form.append('location[team_id]', team)
      dispatch(updateLocation({ gameMode, location: location.id, data: form }))
    } else {
      form.append('location[team_id]', null)
    }
    
    dispatch(updateLocation({ gameMode, location: location.id, data: form }))
  }

  const handleReset = (location) => {
    const loca = locations.find(l => l.id === location)
    if (loca && loca?.current_team) {
      const form = new FormData()
      form.append('location[team_id]', null)
      dispatch(updateLocation({ gameMode, location, data: form }))
    }
  }

  return (
    <Box class='flex flex-col justify-center border-4 rounded-md mt-2 align-center bg-gradient-to-t from-slate-600 to-slate-100 p-8'>
      <Typography class='text-center font-bold text-3xl'>
        Locations
      </Typography>

      <Box
        class='flex sm:flex-col md:flex-row flex-grow md:justify-evenly sm:justify-center rounded-md mt-8 flex-wrap'
      >
        {locations.map((location) => (
          <Box
            key={location.id}
            class='flex md:ml-1 md:mr-1 flex-col flex-grow items-center rounded-md md:w-1/4 mb-4 bg-gradient-to-t from-stone-800 to-stone-400 border-4 shadow-inner'
          >
            <Typography class='text-center font-bold text-3xl mt-4'>
              {location.name}
            </Typography>

            <Box
              class='flex flex-col flex-grow justify-around items-center p-8 w-full'
            >
              {teams.map((team) => (
                <Button
                  key={team.id}
                  onClick={() => handleCapture(location, team.id)}
                  class={`flex flex-col items-center w-full justify-center mb-4 border-4 border-slate-700 rounded-md shadow-inner bg-gradient-to-b from-slate-400 to-slate-200 ${location.current_team?.id === team.id ? 'bg-gradient-to-t from-green-500 to-green-700' : ''}`}
                >
                  <Typography class='text-center font-bold text-2xl'>
                    {team.name}
                  </Typography>
                </Button>
              ))}
            </Box>

            <Button
              onClick={() => handleReset(location.id)}
              class='flex mt-8 mb-8 flex-row items-center font-bold text-xl rounded-md w-1/2 border-4 bg-gradient-to-r from-red-600 via-orange-200 to-orange-500'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Reset Capture
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Locations

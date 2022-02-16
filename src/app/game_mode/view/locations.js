import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Modal } from '@mui/material'
import { getLocations, updateLocation, createLocation, deleteLocation } from '../reducer'

const Locations = ({ gameMode }) => {
  const [adding, setAdding] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [locationName, setLocationName] = useState('')

  const dispatch = useDispatch()
  const { teams, locations } = useSelector(({ gameModes }) => ({
    teams: gameModes.currentTeams,
    locations: gameModes.currentLocations.length > 0 ? gameModes.currentLocations : gameModes.currentGameMode.locations
  }))

  useEffect(() => {
    dispatch(getLocations({ gameMode }))
  }, [gameMode, dispatch])

  useEffect(() => {
    setLocationName('')
  }, [adding, setLocationName])

  const handleAddLocation = async () => {
    if (locationName) {
      const form = new FormData()
      form.append('location[name]', locationName)
      form.append('location[points]', 0)
      await dispatch(createLocation({ gameMode, data: form }))

      setAdding(false)
    }
  }

  const handleDeleteLocation = async () => {
    await dispatch(deleteLocation({ gameMode, location: confirm }))
    setConfirm('')
  }

  const handleCapture = (location, team) => {
    const form = new FormData()
    if (!location?.current_team || location?.current_team?.id !== team) {
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
      <Box class='flex flex-row justify-between pr-4 pl-4 pt-4'>
        <Typography class='text-center font-bold text-3xl'>
          Locations
        </Typography>

        {!adding && (
          <Button
            onClick={() => setAdding(!adding)}
            class='flex flex-row items-center font-bold text-xl rounded-md w-1/4 bg-gradient-to-t  from-lime-600 to-green-100'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              Add
            </Typography>
          </Button>
        )}
      </Box>
      
      <Modal
        open={confirm !== ''}
        onClose={() => setConfirm('')}
      >
        <Box class='flex flex-row justify-center mt-96 pr-4 pl-4 pt-4'>
          <Button
            onClick={handleDeleteLocation}
            class='flex flex-row items-center font-bold text-xl rounded-md w-1/3 h-28 border-2 border-red-900 bg-gradient-to-t from-red-600 to-slate-100'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              Confirm Delete
            </Typography>
          </Button>
        </Box>
      </Modal>

      {adding && (
        <Box
          class='flex flex-col justify-center items-center flex-grow border-2 rounded-md mt-2 p-2 bg-gradient-to-b from-slate-600 to-slate-300'
        >
          <Typography class='text-center font-bold text-4xl  mr-2'>
            New Location:
          </Typography>

          <input
            type='text'
            class='h-10 p-2 mt-4 w-1/2 focus:outline-none focus:ring-0 focus:shadow-none'
            value={locationName}
            onChange={evt => setLocationName(evt.target.value)}
          />

          <Box class='flex flex-row w-5/6 justify-between pr-2 pl-2 pt-4'>
            <Button
              onClick={() => setAdding(!adding)}
              class='flex flex-row items-center font-bold text-xl rounded-md bg-gradient-to-t w-1/3 from-orange-600 to-slate-100'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Cancel
              </Typography>
            </Button>
            
            <Button
              onClick={handleAddLocation}
              class='flex flex-row items-center font-bold text-xl rounded-md bg-gradient-to-t w-1/3 from-green-600 to-slate-100'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Add
              </Typography>
            </Button>
          </Box>
        </Box>
      )}

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
              class='flex mt-2 mb-2 flex-row items-center font-bold text-xl w-full h-16 border-t-4 border-b-4 bg-gradient-to-r from-red-600 via-orange-200 to-orange-500'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Reset Capture
              </Typography>
            </Button>


            <Button
              onClick={() => setConfirm(location.id)}
              class='flex mt-2 flex-row items-center font-bold text-xl h-16 w-full bg-gradient-to-r border-t-2 from-red-600 via-orange-200 to-orange-500'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                DELETE
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Locations

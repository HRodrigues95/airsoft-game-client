import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Modal } from '@mui/material'
import { updateLocation, deleteLocation } from '../reducer'
import { RangeInput, DeleteButton, LocationButton, ResetButton } from './controls'

const Location = ({ gameMode, location }) => {
  const [confirm, setConfirm] = useState('')
  const [points, setPoints] = useState(0)
  const [timer, setTimer] = useState(null)
  const dispatch = useDispatch()
  
  const { teams } = useSelector(({ gameModes }) => ({ teams: gameModes.currentTeams }))

  useEffect(() => {
    setPoints(location.points)
  }, [location, setPoints])

  const update = (v) => {
    const form = new FormData()
    form.append('location[points]', v)
    dispatch(updateLocation({ gameMode, location: location.id, data: form }))
  }

  const handleUpdatePoints = (v) => {
    if (v) {
      clearTimeout(timer)
      setPoints(v)
      setTimer(setTimeout(() => update(v), 500))
    }
  } 

  const handleCapture = (id, team) => {
    const form = new FormData()
    if (!location?.current_team || location?.current_team?.id !== team) {
      form.append('location[team_id]', team)
    } else {
      form.append('location[team_id]', null)
    }

    dispatch(updateLocation({ gameMode, location: location.id, data: form }))
  }

  const handleReset = (id) => {
    const form = new FormData()
    form.append('location[team_id]', null)
    form.append('location[points]', 10)
    dispatch(updateLocation({ gameMode, location: id, data: form }))
  }

  const handleDeleteLocation = async () => {
    await dispatch(deleteLocation({ gameMode, location: confirm }))
    setConfirm('')
  }

  return (
    <Box
      class='flex sm:w-full md:ml-2 md:mr-2 md:w-2/6 flex-col flex-grow items-center rounded-md mb-4 bg-gradient-to-t from-stone-800 to-stone-400 border-4 shadow-inner'
    >
      <Typography class='text-center font-bold text-3xl mt-4 mb-4'>
        {location.name}
      </Typography>
      
      <RangeInput
        min={0}
        max={50}
        value={points}
        onChange={v => {
          handleUpdatePoints(v)
        }}
      />

      <Box
        class='flex flex-col flex-grow justify-around items-center p-8 w-full'
      >
        {teams.map((team) => (
          <LocationButton 
            key={team.id}
            selected={location.current_team?.id === team.id}
            name={team.name}
            onClick={() => handleCapture(location.id, team.id)} 
          />
        ))}
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

      <ResetButton onClick={() => handleReset(location.id)}/>

      <DeleteButton onClick={() => setConfirm(location.id)} />
    </Box>
  )
}

export default Location

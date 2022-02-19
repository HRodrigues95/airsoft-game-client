import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Modal } from '@mui/material'
import { updateLocation, deleteLocation, updateActionTeam } from '../reducer'
import { NumberInput, DeleteButton, LocationButton, ResetButton } from './controls'

const Location = ({ gameMode, location }) => {
  const [confirm, setConfirm] = useState('')
  const [points, setPoints] = useState(0)
  const [bonus, setBonus] = useState(0)

  const pointsTimer = useRef()
  const bonusTimer = useRef()

  const dispatch = useDispatch()
  
  const { teams, ongoing } = useSelector(({ gameModes }) => ({ 
    teams: gameModes.currentTeams,
    ongoing: gameModes.currentGameMode.ongoing
  }))

  useEffect(() => {
    setPoints(location?.points)
    setBonus(location?.capture_bonus)
  }, [location, setPoints])

  const handleUpdatePoints = (v) => {
    if (v) {
      clearTimeout(pointsTimer.current)
      setPoints(v)
      pointsTimer.current = setTimeout(() => {
        const form = new FormData()
        form.append('location[points]', v)
        dispatch(updateLocation({ gameMode, location: location.id, data: form }))
      }, 500)
    }
  }

  const handleUpdateBonus = (v) => {
    if (v) {
      clearTimeout(bonusTimer.current)
      setBonus(v)
      bonusTimer.current = setTimeout(() => {
        const form = new FormData()
        form.append('location[capture_bonus]', v)
        dispatch(updateLocation({ gameMode, location: location.id, data: form }))
      }, 500)
    }
  } 

  const handleCapture = (id, team) => {
    const Locationform = new FormData()

    if (!location?.current_team || location?.current_team?.id !== team) {
      Locationform.append('location[team_id]', team)
      const Teamform = new FormData()
      Teamform.append('team[amount]', bonus)
      dispatch(updateActionTeam({ gameMode, team, data: Teamform, action: 'increase' }))
    } else Locationform.append('location[team_id]', null)

    dispatch(updateLocation({ gameMode, location: id, data: Locationform }))
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
      class='
        flex flex-col flex-grow items-center
        sm:w-full md:ml-2 md:mr-2 md:w-2/6 
        rounded-md mb-4 
        bg-gradient-to-t from-stone-800 to-stone-400 border-4
        shadow-md shadow-zinc-600
      '
    >
      <Typography class='text-center font-bold text-5xl mt-4 mb-4'>
        {location.name}
      </Typography>

      <NumberInput
        label='Holding:'
        max={50}
        min={0}
        value={points}
        onChange={v => handleUpdatePoints(v)}
      />

      <NumberInput
        label='Capture:'
        max={1000}
        min={0}
        value={bonus}
        onChange={v => handleUpdateBonus(v)}
      />

      <Box
        class='flex flex-col flex-grow justify-around items-center p-8 w-full'
      >
        {teams.map((team) => (
          <LocationButton 
            key={team.id}
            selected={location.current_team?.id === team.id}
            disabled={!ongoing}
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

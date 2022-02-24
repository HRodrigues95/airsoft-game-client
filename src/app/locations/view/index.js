import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { getGameMode } from '../../game_mode/reducer'
import { getTeams, updateActionTeam } from '../../teams/reducer'
import { getLocation, updateLocation, deleteLocation } from '../reducer'
import Logo from '../../imgs/Logo.jpg'
import Map from '../../imgs/Map_v1.png'
import TeamsDisplay from '../../components/TeamsDisplay'
import { NumberInput } from '../../components/controls'
import { UPDATE_TICK } from '../../components/utils'
import './style.scss'

const Location = () => {
  const [confirm, setConfirm] = useState('')
  const [holdingPoints, setHoldingPoints] = useState(0)
  const [capturePoints, setCapturePoints] = useState(0)
  const [currentTeam, setCurrentTeam] = useState('')
  const { game_mode_id, location_id } = useParams()

  const intervalRef = useRef();
  const holdingTimer = useRef()
  const captureTimer = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { ongoing, location, teams } = useSelector(({ gameModes, teams, locations }) => ({
    ongoing: gameModes.currentGameMode.ongoing,
    teams: teams.currentTeams,
    location: locations.openedLocation
  }))
  
  useEffect(() => {
    if(ongoing) {
      intervalRef.current = setInterval(() => { 
        dispatch(getGameMode(game_mode_id))
        dispatch(getTeams({ gameMode: game_mode_id }))
        dispatch(getLocation({ gameMode: game_mode_id, location: location_id }))
      }, UPDATE_TICK)
    } else clearInterval(intervalRef.current)
  },[ongoing])
  
  useEffect(() => {
    const intervalId = intervalRef.current
    return () => { clearInterval(intervalId) }
  }, [])

  useEffect(() => {
    const getData = () => dispatch(getLocation({ gameMode: game_mode_id, location: location_id }))
    getData()
  },[game_mode_id, location_id])
  
  useEffect(() => {
    setHoldingPoints(location?.points)
    setCapturePoints(location?.capture_bonus)
  },[location])

  const handleBack = () => navigate(`/${game_mode_id}/`)

  const handleUpdateHolding = (v) => {
    if (v) {
      clearTimeout(holdingTimer.current)
      setHoldingPoints(v)
      holdingTimer.current = setTimeout(() => {
        const form = new FormData()
        form.append('location[points]', v)
        dispatch(updateLocation({ gameMode: game_mode_id, location: location.id, data: form }))
      }, 500)
    }
  }

  const handleUpdateCapture = (v) => {
    if (v) {
      clearTimeout(captureTimer.current)
      setCapturePoints(v)
      captureTimer.current = setTimeout(() => {
        const form = new FormData()
        form.append('location[capture_bonus]', v)
        dispatch(updateLocation({ gameMode: game_mode_id, location: location.id, data: form }))
      }, 500)
    }
  }

  const handleCapture = (team) => {
    const Locationform = new FormData()

    if (!location?.current_team || location?.current_team?.id !== team) {
      Locationform.append('location[team_id]', team)
      setCurrentTeam(team)
    } else Locationform.append('location[team_id]', null)

    dispatch(updateLocation({ gameMode: game_mode_id, location: location.id, data: Locationform }))
    addBonusPoints()
  }

  const handleDelete = () => {
    dispatch(deleteLocation({ gameMode: game_mode_id, location: location.id }))
    navigate(`/${game_mode_id}/`)
  }

  const addBonusPoints = () => {
    if (currentTeam) {
      const Teamform = new FormData()
      Teamform.append('team[amount]', capturePoints)
      dispatch(updateActionTeam({ gameMode: game_mode_id, team: currentTeam, data: Teamform, action: 'increase' }))
    }
  }

  return (
    <Box class='flex flex-col bg-gradient-to-b from-black via-slate-900 to-slate-400 p-6 h-full'>
      <img alt='logo' class='flex w-28 self-center' src={Logo} />

      <Button
        className='location-page__back'
        onClick={handleBack}
        variant='contained'
      >
        Back
      </Button>

      {ongoing && <Box className='location-page__ongoing' />}

      <img alt='mapa' class='flex md:w-1/2 sm:w-full self-center rounded-lg mt-4' src={Map} />
      
      <TeamsDisplay hideAdd gameMode={game_mode_id} />

      {location && (
        <Box 
          class='
            flex flex-col justify-center items-center
            p-6 mt-4
            border-4 border-slate-200 rounded-md
            bg-gradient-to-b from-slate-300 to-slate-600 
          '
        >
          <Typography className='location-page__header'>
            {location.name}
          </Typography>

          <NumberInput
            label='Holding:'
            max={50}
            min={0}
            value={holdingPoints}
            onChange={v => handleUpdateHolding(v)}
          />

          <NumberInput
            label='Capture:'
            max={50}
            min={0}
            value={capturePoints}
            onChange={v => handleUpdateCapture(v)}
          />

          <Box
            class='flex flex-col flex-grow justify-around items-center p-8 w-full'
          >
            {teams.map((team) => (
              <Button
                className={`location-page__team ${location?.current_team?.id === team.id && 'location-page__team--selected'}`}
                color='secondary'
                key={team.id}
                onClick={() => handleCapture(team.id)}
                variant='contained'
              >
                {team.name}
              </Button>
            ))}
          </Box>


          <Button
            className='location-page__delete'
            color='error'
            onClick={handleDelete}
            variant='contained'
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Location

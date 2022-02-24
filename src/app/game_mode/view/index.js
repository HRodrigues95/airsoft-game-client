import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { getGameMode, updateGameMode } from '../reducer'
import { getLocations } from '../../locations/reducer'
import Logo from '../../imgs/Logo.jpg'
import Map from '../../imgs/Map_v1.png'
import { NumberInput } from '../../components/controls'
import TeamsDisplay from '../../components/TeamsDisplay'
import LocationsList from '../../components/LocationList'
import { UPDATE_TICK } from '../../components/utils'
import './style.scss'

const ViewGameMode = () => {
  const [tickTime, setTickTime] = useState(5)
  const [timer, setTimer] = useState(null)
  const { game_mode_id } = useParams()
  const intervalRef = useRef();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { gameMode } = useSelector(({ gameModes }) => ({
    gameMode: gameModes.currentGameMode
  }))

  useEffect(() => {
    const getData = async () => {
      const { payload } = await dispatch(getGameMode(game_mode_id))
      dispatch(getLocations({ gameMode: game_mode_id }))
      setTickTime(payload.update_tick)
    }
    getData()
  }, [game_mode_id, dispatch, setTickTime])

  useEffect(() => {
    return () => { clearInterval(intervalRef.current) }
  }, [])

  const handleBack = () => navigate('/')

  const handleStartStop = () => {
    if (gameMode.ongoing) {
      dispatch(updateGameMode({gameMode: game_mode_id, action: 'end'}))
      clearInterval(intervalRef.current)
    } else {
      dispatch(updateGameMode({gameMode: game_mode_id, action: 'start'}))
      intervalRef.current = setInterval(() => dispatch(getGameMode(game_mode_id)), UPDATE_TICK)
    }
  }
  
  const update = (v) => {
    const form = new FormData()
    form.append('game_mode[update_tick]', v)
    dispatch(updateGameMode({ gameMode: game_mode_id, data: form }))
  }

  const handleUpdatePoints = (v) => {
    if (v) {
      clearTimeout(timer)
      setTickTime(v)
      setTimer(setTimeout(() => update(v), 3000))
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
      
      <img alt='logo' class='flex md:w-1/2 sm:w-full self-center rounded-lg mt-4' src={Map} />

      {gameMode?.ongoing && <Box className='location-page__ongoing' />}
      
      <Button
        className={gameMode?.ongoing ? 'game-mode__stop' : 'game-mode__start' }
        color='primary'
        onClick={handleStartStop}
        variant='contained'
      >
        {gameMode?.ongoing ? 'Stop' : 'Start'}
      </Button>

      <Box
        class='
          flex flex-col items-center justify-center flex-grow
          w-full p-8 rounded-md mt-4
          bg-zinc-400
          border-2 border-slate-200
        '
      >
        <NumberInput
          label='Tick Time:'
          max={20}
          min={0}
          value={tickTime}
          onChange={handleUpdatePoints}
        />
      </Box>

      {gameMode && <TeamsDisplay  gameMode={gameMode?.id} />}

      {gameMode && <LocationsList />}
    </Box>
  )
}

export default ViewGameMode
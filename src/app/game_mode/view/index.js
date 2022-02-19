import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { getGameMode, updateGameMode, getLocations, getTeams } from '../reducer'
import Logo from '../../imgs/Logo.jpg'
import Map from '../../imgs/Map_v1.png'
import Teams from './teams'
import Locations from './locations'
import { Button, NumberInput } from './controls'
import { UPDATE_TICK } from '../../components/utils'

const ViewGameMode = () => {
  const [tickTime, setTickTime] = useState(5)
  const [timer, setTimer] = useState(null)
  const { id } = useParams()
  const intervalRef = useRef();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gameMode = useSelector(({ gameModes }) => gameModes.currentGameMode)
  const { ongoing } = gameMode

  useEffect(() => {
    const getData = async () => {
      const { payload } = await dispatch(getGameMode(id))
      setTickTime(payload.update_tick)
    }
    getData()
  }, [id, dispatch, setTickTime])

  useEffect(() => {
    if(ongoing) {
      intervalRef.current = setInterval(async () => {
        await dispatch(getGameMode(id))
        await dispatch(getTeams({ gameMode: id }))
        await dispatch(getLocations({ gameMode: id }))
      }, UPDATE_TICK)
    } else {
      clearInterval(intervalRef.current)
    }
  }, [ongoing])

  
  useEffect(() => {
    const intervalId = intervalRef.current
    return () => { clearInterval(intervalId) }
  }, [])

  const handleBack = () => navigate('/')

  const handleStartStop = () => {
    if (gameMode.ongoing) {
      dispatch(updateGameMode({gameMode: id, action: 'end'}))
    } else {
      dispatch(updateGameMode({gameMode: id, action: 'start'}))
    }
  }
  
  const update = (v) => {
    const form = new FormData()
    form.append('game_mode[update_tick]', v)
    dispatch(updateGameMode({ gameMode: gameMode.id, data: form }))
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
        onClick={handleBack}
        label='Back'
        class={`
          flex flex-row items-center 
          mt-3 rounded-md p-2
          border-2
          text-6xl text-slate-300 font-bold
          hover:cursor-pointer
        `}
      />
      
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

      <Button
        onClick={handleStartStop}
        label={gameMode?.ongoing ? 'Stop' : 'Start'}
        class={`
          flex flex-row items-center 
          rounded-md border-4
          w-full
          hover:cursor-pointer
          transition ease-linear delay-[20ms] duration-[30ms]
          mt-4 p-8
          text-6xl text-slate-800 font-extrabold
          ${gameMode?.ongoing ? ' animate-pulse bg-gradient-to-t from-red-600 via-red-100 to-red-600' : 'bg-gradient-to-t from-green-600 via-teal-100 to-green-600'}`}
      />
      
      <img alt='logo' class='flex md:w-1/2 sm:w-full self-center rounded-lg mt-4' src={Map} />

      <Teams gameMode={id} />

      <Locations gameMode={id} />
    </Box>
  )
}

export default ViewGameMode
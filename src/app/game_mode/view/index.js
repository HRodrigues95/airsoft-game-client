import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { getGameMode, updateGameMode } from '../reducer'
import Logo from '../../imgs/Logo.jpg'
import Teams from './teams'
import Locations from './locations'
import { Button } from './controls'

const ViewGameMode = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gameMode = useSelector(({ gameModes }) => gameModes.currentGameMode)
  const loading = useSelector(({ gameModes }) => gameModes.loading)

  useEffect(() => {
    dispatch(getGameMode(id))
  }, [id, dispatch])

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   dispatch(getTeams({ gameMode }))
    // }, 2000)
  
    // return () => clearTimeout(timer);
  })

  const handleBack = () => navigate('/')

  const handleStartStop = () => {
    if (gameMode.ongoing) {
      dispatch(updateGameMode({gameMode: id, action: 'end'}))
    } else {
      dispatch(updateGameMode({gameMode: id, action: 'start'}))
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

      <span class='flex flex-col justify-center items-center w-full relative'>
        <Button
          onClick={handleStartStop}
          label={gameMode?.ongoing ? 'Stop' : 'Start'}
          class={`
          flex flex-row items-center 
          rounded-md border-4
          w-full
          hover:cursor-pointer
          transition ease-linear delay-[20ms] duration-[30ms]
          mt-8 p-8
          text-6xl text-slate-800 font-extrabold
          ${gameMode?.ongoing ? ' animate-pulse bg-gradient-to-t from-red-600 via-red-100 to-red-600' : 'bg-gradient-to-t from-green-600 via-teal-100 to-green-600'}`}
        />
      </span>

      <Teams gameMode={id} />

      <Locations gameMode={id} />
    </Box>
  )
}

export default ViewGameMode
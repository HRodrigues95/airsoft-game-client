import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { getGameMode, updateGameMode } from '../reducer'
import Logo from '../../imgs/Logo.jpg'
import Teams from './teams'
import Locations from './locations'

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
        class={`flex flex-row items-center mt-3 rounded-md border-2`}
      >
        <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-gray-300 text-2xl'>
          Back
        </Typography>
      </Button>

      <Button
        onClick={handleStartStop}
        class={`flex flex-row items-center rounded-md mt-8 p-8 border-4 ${gameMode?.ongoing ? 'bg-gradient-to-t from-red-600 via-red-100 to-red-600' : 'bg-gradient-to-t from-green-600 via-teal-100 to-green-600'}`}
      >
        <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-7xl'>
          {gameMode?.ongoing ? 'Stop' : 'Start'}
        </Typography>
      </Button>

      <Teams gameMode={id} />

      <Locations gameMode={id} />
    </Box>
  )
}

export default ViewGameMode
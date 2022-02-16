import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { getGameModes, deleteGameMode } from '../reducer'
import Logo from '../../imgs/Logo.jpg'
import './style.scss'


const IndexGameModes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gameModesList = useSelector(({ gameModes }) => gameModes.list)

  useEffect(() => {
    dispatch(getGameModes())
  }, [dispatch])

  
  const handleGoTo = (id) => () => navigate(`/${id}`)

  const handleDelete = (id) => () => dispatch(deleteGameMode(id))

  return (
    <Box class='flex flex-col bg-gradient-to-b from-black via-slate-900 to-slate-400 p-6 h-full'>
      <img alt='logo' class='flex w-28 self-center' src={Logo} />

      <Box class='flex flex-col justify-center border-2 border-slate-900 shadow-md p-2 rounded-md mt-8 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-100'>
        <Box class='flex flex-row flex-grow justify-between items-center mb-2'>
          <Typography class='flex flex-grow justify-center text-2xl text-slate-700 text-center font-bold self-center bg-gradient-to-t from-slate-100 to-slate-300 border border-slate-900 rounded-md'>
            Game Modes:
          </Typography>

          <Button 
            class='bg-gradient-to-t from-zinc-500 to-zinc-800 rounded-md w-32 border border-slate-900 ml-10'
          >
            <Typography class='text-center text-2xl text-blue-100 font-bold self-center'>
              Add
            </Typography>
          </Button>
        </Box>

        {gameModesList.map(({ id, name }) => (
          <Box key={id} class='flex flex-row flex-grow items-center bg-gradient-to-tl from-zinc-300 to-zinc-600 justify-between m-1 rounded-md border border-slate-700 p-1'>
            <Typography class='font-bold text-3xl pl-2 text-slate-100'>
              {name}
            </Typography>

            <Box class='flex flex-row items-center justify-between ml-2'>
              <Button class='p-2 bg-gradient-to-t from-slate-800 to-slate-400 font-bold text-slate-100 rounded-md' onClick={handleGoTo(id)}>
                View
              </Button>
{/* 
              <Button class='p-2 bg-gradient-to-t from-slate-800 to-slate-400 font-bold text-slate-100 rounded-md ml-2' onClick={handleDelete(id)}>
                Delete
              </Button> */}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default IndexGameModes

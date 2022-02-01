import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { getGameMode } from '../reducer'
import Logo from '../../imgs/Logo.jpg'

const ViewGameMode = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const gameMode = useSelector(({ gameModes }) => gameModes.currentGameMode)
  const loading = useSelector(({ gameModes }) => gameModes.loading)

  useEffect(() => {
    dispatch(getGameMode(id))
  }, [id, dispatch])

  const handleCapture = (location, team) => {

    dispatch(getGameMode(id))
  }

  const generateTeams = () => {
    const { teams } = gameMode

    return (
      <Box class='flex flex-col justify-around bg-gradient-to-r from-slate-50 to-slate-400 rounded-md p-2 border border-cyan-50 mt-4'>
        <Typography class='flex flex-row justify-center flex-grow text-center text-3xl font-bold text-gray-700 mb-1'>
          Teams
        </Typography>

        {teams.map(({ id, name, current_points }) => (
          <Box
            key={id} 
            class='flex flex-col justify-center flex-grow items-center bg-gradient-to-t from-sky-500 to-sky-200 rounded-md m-2 p-2 shadow-inner border-2 border-slate-900'
          >
            <Typography class='flex flex-row justify-center flex-grow text-center text-3xl font-bold text-gray-700 mb-1'>
              {name}
            </Typography>
            
            <Typography class='flex flex-row justify-center flex-grow text-center text-2xl font-bold text-slate-100'>
              {`Current points: ${current_points}`}
            </Typography>
          </Box>
        ))}

      </Box>
    )
  }

  const generateLocations = () => {
    const { locations, teams } = gameMode

    return (
      <Box class='flex flex-col bg-gradient-to-r from-slate-50 to-slate-400 rounded-md p-2 border border-cyan-50 mt-4'>
        <Typography class='flex flex-row justify-center flex-grow text-center text-3xl font-bold text-gray-700 mb-1'>
          Locations
        </Typography>

        {locations.map(({ id, name, current_team }) => (
          <Box key={id} class='flex flex-col justify-center flex-grow mt-4 border border-gray-200 shadow-inner rounded-sm bg-gradient-to-tr from-slate-400 via-slate-500 to-slate-800'>
            <Typography class='flex flex-row justify-center flex-grow text-center text-3xl font-bold text-slate-100'>
              {name}
            </Typography>

            <Box class='flex flex-row justify-between'>
              {teams.map((team) => {
                const selected = current_team?.id === team.id && 'bg-gradient-to-tr from-green-500 via-slate-500 to-green-900'

                return (
                  <btn
                    onClick={() => handleCapture(id, team.id)}
                    class={`flex flex-row justify-around w-24 m-4 bg-slate-200 hover:bg-slate-500 hover:cursor-pointer focus:bg-slate-300 rounded-md shadow-lg text-center border h-8  border-gray-800 ${selected}`}
                  >
                    <Typography class='flex flex-row justify-center flex-grow text-center font-bold text-slate-900'>
                      {team?.name}
                    </Typography>
                  </btn>
                )
              })}
            </Box>
          </Box>
        ))}
      </Box>
    )
  }



  return (
    <Box class='flex flex-col bg-gradient-to-b from-black via-slate-900 to-slate-400 p-6 h-full'>
      <img alt='logo' class='flex w-28 self-center' src={Logo} />

      {!loading && generateTeams()}

      {!loading && generateLocations()}
    </Box>
  )
}

export default ViewGameMode
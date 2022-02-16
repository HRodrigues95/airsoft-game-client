import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Modal } from '@mui/material'
import { getTeams, updateActionTeam, updateTeam, createTeam, deleteTeam } from '../reducer'

const Teams = ({ gameMode }) => {
  const [currentTeam, setCurrentTeam] = useState(null)
  const [points, setPoints] = useState(30)
  const [adding, setAdding] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [teamName, setTeamName] = useState('')
  const dispatch = useDispatch()
  const { teams } = useSelector(({ gameModes }) => ({ teams: gameModes.currentTeams }))

  useEffect(() => {
    dispatch(getTeams({ gameMode }))
  }, [gameMode, dispatch])

  useEffect(() => {
    setTeamName('')
  }, [adding, setTeamName])

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   dispatch(getTeams({ gameMode }))
    // }, 2000)
  
    // return () => clearTimeout(timer);
  })

  const handleAddTeam = async () => {
    if (teamName) {
      const form = new FormData()
      form.append('team[name]', teamName)
      form.append('team[current_points]', 0)
      await dispatch(createTeam({ gameMode, data: form }))

      setAdding(false)
    }
  }

  const handleDeleteTeam = async () => {
    await dispatch(deleteTeam({ gameMode, team: currentTeam.id }))
    setConfirm(false)
    setCurrentTeam(null)
  }

  const handleAddPoints = () => {
    const form = new FormData()
    form.append('team[amount]', points)
    dispatch(updateActionTeam({ gameMode, team: currentTeam.id, data: form, action: 'increase' }))
  }

  const handleRemovePoints = () => {
    const form = new FormData()
    form.append('team[amount]', points)
    dispatch(updateActionTeam({ gameMode, team: currentTeam.id, data: form, action: 'decrease' }))
  }

  const handleRespawn = () => {
    const form = new FormData()
    form.append('team[amount]', 1)
    dispatch(updateActionTeam({ gameMode, team: currentTeam.id, data: form, action: 'decrease' }))
  }

  const handleReset = () => {
    const form = new FormData()
    form.append('team[current_points]', 0)
    dispatch(updateTeam({ gameMode, team: currentTeam.id, data: form }))
  }

  return (
    <Box class='flex flex-col justify-center border-4 rounded-md align-center mt-8 bg-gradient-to-t from-slate-600 to-slate-100'>
      <Box class='flex flex-row justify-between pr-4 pl-4 pt-4'>
        <Typography class='text-center font-bold text-3xl'>
          Teams
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

      {adding && (
        <Box
          class='flex flex-col justify-center items-center flex-grow border-4 rounded-md p-2 bg-gradient-to-b from-slate-600 to-slate-100 m-8'
        >
          <Typography class='text-center font-bold text-4xl  mr-2'>
            Add a new Team:
          </Typography>

          <input
            type='text'
            class='h-10 p-2 mt-4 w-1/2 focus:outline-none focus:ring-0 focus:shadow-none'
            value={teamName}
            onChange={evt => setTeamName(evt.target.value)}
          />

          <Box class='flex flex-row w-5/6 justify-between pr-4 pl-4 pt-4'>
            <Button
              onClick={() => setAdding(!adding)}
              class='flex flex-row items-center font-bold text-xl rounded-md bg-gradient-to-t w-1/3 from-orange-600 to-slate-100'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Cancel
              </Typography>
            </Button>
            
            <Button
              onClick={handleAddTeam}
              class='flex flex-row items-center font-bold text-xl rounded-md bg-gradient-to-t w-1/3 from-green-600 to-slate-100'
            >
              <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                Add
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
      
      <Box class='flex flex-col p-8'>
        {teams.map((team) => (
          <Box
            key={team.id}
            class={`flex flex-col align-center border-4 bg-gradient-to-t from-slate-400 to-slate-200 border-slate-800 mb-2 p-2 hover:bg-slate-600 hover:cursor-pointer rounded-md ${currentTeam?.id === team.id && 'bg-gradient-to-t from-green-500 to-green-700'}`}
            onClick={() => currentTeam?.id === team.id ? setCurrentTeam(null) : setCurrentTeam(team)}
          >
            <Typography class='text-center font-bold text-2xl'>
              {team.name}
            </Typography>

            <Typography class='text-center font-bold text-xl mt-4'>
              {`Current points: ${team.current_points}`}
            </Typography>
          </Box>
        ))}
      </Box>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
      >
        <Box class='flex flex-row justify-center mt-96 pr-4 pl-4 pt-4'>
          <Button
            onClick={handleDeleteTeam}
            class='flex flex-row items-center font-bold text-xl rounded-md w-1/3 h-28 border-2 border-red-900 bg-gradient-to-t from-red-600 to-slate-100'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              Confirm Delete
            </Typography>
          </Button>
        </Box>
      </Modal>

      {currentTeam && (
        <Box
          class='flex flex-col justify-center items-center border-4 rounded-md md:p-1 sm:p-1 bg-gradient-to-b from-slate-600 to-slate-100 m-8'
        >
          <Typography class='text-center font-bold text-3xl mb-5'>
            {`Actions on: ${currentTeam?.name}`}
          </Typography>

          <Box class='flex flex-col items-center justify-center md:w-1/2 sm:w-full'>
            <Box class='flex flex-row items-center justify-center'>
              <Typography class='text-center font-bold md:text-3xl sm:text-xl mr-2'>
                Points:
              </Typography>

              <input
                type='range'
                class='form-range h-6 p-2 w-1/2 focus:outline-none focus:ring-0 focus:shadow-none'
                min={10}
                max={1000}
                value={points}
                onChange={evt => setPoints(evt.target.valueAsNumber)}
              />

              <Typography class='text-center font-bold md:text-3xl sm:text-xl ml-2'>
                {points}
              </Typography>
            </Box>

            <Box class='flex flex-row items-center justify-around mt-4 w-full'>
              <Button
                onClick={handleAddPoints}
                class='flex flex-row items-center font-bold text-xl rounded-md bg-gradient-to-t w-1/3 from-slate-600 to-slate-100'
              >
                <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                  Add
                </Typography>
              </Button>

              <Button
                onClick={handleRemovePoints}
                class='flex flex-row items-center font-bold text-xl rounded-md w-1/3 bg-gradient-to-t from-slate-600 to-slate-100'
              >
                <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
                  Remove
                </Typography>
              </Button>
            </Box>

          </Box>

          <Button
            onClick={handleRespawn}
            class='flex mt-8 flex-row items-center font-bold text-xl h-10 rounded-md md:w-1/2 sm:w-full border-4 bg-gradient-to-r from-slate-600 via-slate-100 to-slate-600'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              Death/Respawn
            </Typography>
          </Button>

          <Button
            onClick={handleReset}
            class='flex mt-8 flex-row items-center font-bold text-xl rounded-md md:w-1/2 sm:w-full border-4 bg-gradient-to-r from-red-600 via-orange-200 to-orange-500'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              Reset Team points
            </Typography>
          </Button>

          <Button
            onClick={() => setConfirm(true)}
            class='flex mt-8 flex-row items-center font-bold text-xl rounded-md w-full border-4 bg-gradient-to-r from-red-600 via-orange-200 to-orange-500'
          >
            <Typography class='flex flex-row flex-grow justify-center text-center font-bold text-2xl'>
              DELETE
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Teams

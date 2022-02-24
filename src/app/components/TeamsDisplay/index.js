import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { getTeams, updateActionTeam, updateTeam, createTeam, deleteTeam } from '../../teams/reducer'
import { NumberInput } from '../controls'
import './style.scss'

const TeamsDisplay = ({ gameMode, hideAdd = false }) => {
  const [currentTeam, setCurrentTeam] = useState(null)
  const [points, setPoints] = useState(30)
  const [adding, setAdding] = useState(false)
  const [teamName, setTeamName] = useState('')

  const dispatch = useDispatch()
  const { game_mode_id } = useParams()
  const { teams } = useSelector(({ teams }) => ({ teams: teams.currentTeams }))

  useEffect(() => {
    dispatch(getTeams({ gameMode: game_mode_id }))
  }, [game_mode_id, dispatch])

  useEffect(() => {
    setTeamName('')
  }, [adding, setTeamName])

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
    setCurrentTeam(null)
  }

  const handleAddPoints = () => {
    if (points) {
      const form = new FormData()
      form.append('team[amount]', points)
      dispatch(updateActionTeam({ gameMode, team: currentTeam.id, data: form, action: 'increase' }))
    }
  }

  const handleRemovePoints = () => {
    if (points) {
      const form = new FormData()
      form.append('team[amount]', points)
      dispatch(updateActionTeam({ gameMode, team: currentTeam.id, data: form, action: 'decrease' }))
    }
  }

  const handleReset = () => {
    const form = new FormData()
    form.append('team[current_points]', 0)
    dispatch(updateTeam({ gameMode, team: currentTeam.id, data: form }))
  }

  return (
    <Box class='flex flex-col justify-center border-4 rounded-md align-center mt-4 bg-gradient-to-t from-slate-600 to-slate-100'>
      <Box class='flex flex-row justify-between pr-4 pl-4 pt-4'>
        <Typography class='text-center font-bold text-3xl'>
          Teams
        </Typography>


        {!adding && !hideAdd && (
          <Button
            onClick={() => setAdding(true)}
            className='locations-list__add'
            variant='contained'
          >
            Add
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
              className='locations-list__cancel'
              variant='contained'
            >
              Cancel
            </Button>

            <Button
              onClick={handleAddTeam}
              className='locations-list__add'
              variant='contained'
            >
              Add
            </Button>
          </Box>
        </Box>
      )}

      {teams?.length > 0 && (
        <Box 
          class='
            flex flex-col p-8
          '
        >
          {teams.map((team) => (
            <Box
              key={team.id}
              class={`
              flex flex-col align-center
              p-2
              border-r-2 border-l-2 border-slate-700
              first:border-t-2 first:rounded-t-md
              last:border-b-2 last:rounded-b-md
              transition ease-in-out delay-[20ms] duration-[100ms]
            hover:bg-slate-600 hover:cursor-pointer  
              ${currentTeam?.id === team.id ? 'scale-[102%] rounded-md border-2 bg-gradient-to-t from-green-500 to-green-700' : 'bg-gradient-to-t from-slate-400 to-slate-200'}
            `}
              onClick={() => currentTeam?.id === team.id ? setCurrentTeam(null) : setCurrentTeam(team)}
            >
              <Typography class='text-center font-bold text-3xl'>
                {team.name}
              </Typography>

              <Typography class='text-center font-bold text-xl mt-4'>
                {`Current points: ${team.current_points}`}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {currentTeam && (
        <Box
          class='
            flex flex-col justify-center items-center 
            border-4 rounded-md m-8
            bg-gradient-to-t from-slate-600 to-slate-100
            shadow-lg shadow-slate-800
          '
        >
          <Typography class='text-center font-bold text-3xl mt-2 mb-5'>
            {`Actions on:`}
          </Typography>
          
          <Typography class='text-center font-bold text-4xl mb-5'>
            {currentTeam?.name}
          </Typography>

          <NumberInput
            label='Points:'
            min={10}
            max={1000}
            value={points}
            onChange={v => setPoints(v)}
          />

          <Box class='flex flex-row justify-around mt-4 w-full'>
            <Button
              color='secondary'
              onClick={handleAddPoints}
              className='teams-display__points--add'
              variant='contained'
            >
              Add
            </Button>

            
            <Button
              color='secondary'
              onClick={handleRemovePoints}
              className='teams-display__points--remove'
              variant='contained'
            >
              Remove
            </Button>
          </Box>

          <Button
            color='error'
            onClick={handleReset}
            className='teams-display__reset'
            variant='contained'
          >
            Reset
          </Button>

          
          <Button
            color='error'
            onClick={handleDeleteTeam}
            className='teams-display__delete'
            variant='contained'
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default TeamsDisplay

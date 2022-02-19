import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Modal } from '@mui/material'
import { getTeams, updateActionTeam, updateTeam, createTeam, deleteTeam } from '../reducer'
import { NumberInput, DeleteButton, ResetButton, Button } from './controls'
import { UPDATE_TICK } from '../../components/utils'

const Teams = ({ gameMode }) => {
  const [currentTeam, setCurrentTeam] = useState(null)
  const [points, setPoints] = useState(30)
  const [adding, setAdding] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [teamName, setTeamName] = useState('')
  const dispatch = useDispatch()
  const { teams } = useSelector(({ gameModes }) => ({
    teams: gameModes.currentTeams 
  }))

  useEffect(() => {
    dispatch(getTeams({ gameMode }))
  }, [gameMode, dispatch])

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
    setConfirm(false)
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


        {!adding && (
          <Button
            onClick={() => setAdding(!adding)}
            label='Add'
            class='
              flex flex-row items-center
              whitespace-normal
              w-[150px] overflow-auto font-sans
              transition ease-linear delay-[20ms] duration-[30ms]
              font-bold text-3xl text-center text-slate-100
              border-2 border-green-500 rounded-md
              bg-lime-600
              hover:bg-lime-500
              hover:cursor-pointer
              hover:shadow-inner hover:shadow-lime-500
              hover:border-lime-400
              hover:scale-105
            '
          />
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
              label='Cancel'
              class='
                flex flex-row items-center
                whitespace-normal
                w-[200px] h-[48px] overflow-auto font-sans
                transition ease-linear delay-[20ms] duration-[30ms]
                font-bold text-3xl text-center
                border-2 border-red-500 rounded-md
                bg-orange-600
                hover:bg-oreange-500
                hover:cursor-pointer hover:text-slate-200
                hover:shadow-inner hover:shadow-red-300
                hover:border-red-300
                hover:scale-105
              '
            />
            
            <Button
              onClick={handleAddTeam}
              label='Add'
              class='
                flex flex-row items-center
                whitespace-normal
                w-[200px] h-[48px] overflow-auto font-sans
                transition ease-linear delay-[20ms] duration-[30ms]
                font-bold text-3xl text-center text-slate-100
                border-2 border-green-500 rounded-md
                bg-lime-600
                hover:bg-lime-500
                hover:cursor-pointer
                hover:shadow-inner hover:shadow-lime-500
                hover:border-lime-400
                hover:scale-105
              '
            />
          </Box>
        </Box>
      )}
      
      <Box class='
        flex flex-col p-8
      '>
        {teams.map((team) => (
          <Box
            key={team.id}
            class={`
              flex flex-col align-center
              p-2
              border-r-2 border-l-2 border-slate-700
              first:border-t-2 first:rounded-t-md
              last:border-b-2 last:rounded-b-md
              bg-gradient-to-t from-slate-400 to-slate-200
              transition ease-in-out delay-[20ms] duration-[100ms]
            hover:bg-slate-600 hover:cursor-pointer  
              ${currentTeam?.id === team.id && 'scale-[102%] rounded-md border-2 bg-gradient-to-t from-green-500 to-green-700'}
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

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
      >
        <Box class='flex flex-row justify-center mt-96 pr-4 pl-4 pt-4'>
          <Button
            onClick={handleDeleteTeam}
            label='Confirm Delete'
            class='
              flex flex-row items-center
              whitespace-normal 
              p-8 sm:h-[100px] overflow-auto font-sans
              transition ease-linear delay-[20ms] duration-[30ms]
              font-bold text-3xl text-center
              border-2 border-red-600 rounded-md
              bg-orange-500
              hover:bg-orange-700
              hover:cursor-pointer hover:text-slate-200
              hover:shadow-inner hover:shadow-red-500
              hover:border-orange-600
              hover:scale-105
            '
          />
        </Box>
      </Modal>

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
              onClick={handleAddPoints}
              label='Add'
              class='
                flex flex-row items-center 
                h-10 w-1/3
                transition ease-linear delay-[20ms] duration-[30ms]
                font-bold text-2xl
                border-2 border-slate-600 rounded-md
                bg-slate-500
                hover:bg-slate-400 hover:cursor-pointer
                hover:scale-105
              '
            />
            
            <Button
              onClick={handleRemovePoints}
              label='Remove'
              class='
                flex flex-row items-center 
                h-10 w-1/3
                transition ease-linear delay-[20ms] duration-[30ms]
                font-bold text-2xl
                border-2 border-slate-600 rounded-md
                bg-slate-500
                hover:bg-slate-400 hover:cursor-pointer
                hover:scale-105
              '
            />
          </Box>

          <ResetButton classes='mt-8' onClick={handleReset} />

          <DeleteButton onClick={() => setConfirm(true)} />
        </Box>
      )}
    </Box>
  )
}

export default Teams

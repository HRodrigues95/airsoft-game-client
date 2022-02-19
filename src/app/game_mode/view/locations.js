import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { getLocations, createLocation } from '../reducer'
import { NumberInput, Button } from './controls'
import Location from './location'

const Locations = ({ gameMode }) => {
  const [adding, setAdding] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [locationPoints, setLocationPoints] = useState(0)

  const dispatch = useDispatch()
  const { locations } = useSelector(({ gameModes }) => ({ 
    locations: gameModes.currentLocations
  }))

  useEffect(() => {
    dispatch(getLocations({ gameMode }))
  }, [gameMode, dispatch])

  useEffect(() => {
    setLocationName('')
  }, [adding, setLocationName])

  const handleAddLocation = async () => {
    if (locationName) {
      const form = new FormData()
      form.append('location[name]', locationName)
      form.append('location[points]', locationPoints)
      await dispatch(createLocation({ gameMode, data: form }))

      setAdding(false)
    }
  }

  return (
    <Box class='
      flex flex-col justify-center align-center
      p-4 border-4 rounded-md mt-2 
      bg-gradient-to-t from-slate-600 to-slate-100'
    >
      <Box class='flex flex-row justify-between pr-4 pl-4 pt-4'>
        <Typography class='text-center font-bold text-3xl'>
          Locations
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
          class='
            flex flex-col justify-center items-center flex-grow 
            border-2 rounded-md mt-2 p-2 
            bg-gradient-to-t from-slate-600 to-slate-300
            shadow-lg shadow-slate-700
          '
        >
          <Typography class='text-center font-bold text-4xl  mr-2'>
            New Location:
          </Typography>

          <input
            type='text'
            class='h-10 p-2 mt-4 mb-8 w-1/2 focus:outline-none focus:ring-0 focus:shadow-none'
            value={locationName}
            onChange={evt => setLocationName(evt.target.value)}
          />

          <NumberInput
            label='Points:'
            max={50}
            min={0}
            value={locationPoints}
            onChange={v => setLocationPoints(v)}
          />

          <Box class='flex flex-row justify-evenly w-full pt-4'>
            <Button
              onClick={() => setAdding(!adding)}
              label='Cancel'
              class='
                flex flex-row items-center
                whitespace-normal
                w-[45%] h-[48px] overflow-auto font-sans
                transition ease-linear delay-[20ms] duration-[30ms]
                font-bold text-3xl text-center
                border-2 border-red-500 rounded-md
                bg-orange-600
                hover:bg-oreange-500
                hover:cursor-pointer hover:text-slate-200
                hover:shadow-inner hover:shadow-red-300
                hover:border-orange-400
                hover:scale-105
              '
            />

            <Button
              onClick={handleAddLocation}
              label='Add'
              class='
                flex flex-row items-center
                whitespace-normal
                w-[45%] h-[48px] overflow-auto font-sans
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

      <Box
        class='flex sm:flex-col md:flex-row flex-grow md:justify-evenly sm:justify-center rounded-md mt-8 flex-wrap'
      >
        {locations.map((location) => (<Location key={location.id} gameMode={gameMode} location={location} />))}
      </Box>
    </Box>
  )
}

export default Locations

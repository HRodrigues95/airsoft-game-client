import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { getLocations, createLocation } from '../../locations/reducer'
import { NumberInput } from '../controls'
import './style.scss'

const LocationsList = () => {
  const [adding, setAdding] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [holdingPoints, setHoldingPoints] = useState(0)
  const [capturePoints, setCapturePoints] = useState(0)
  const { game_mode_id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { locations, gameMode, loading } = useSelector(({ gameModes, locations }) => ({
    gameMode: gameModes.currentGameMode,
    locations: locations.currentLocations,
    loading: locations.loading,
  }))

  useEffect(() => {
    dispatch(getLocations({ gameMode: game_mode_id }))
  }, [game_mode_id, dispatch])

  if (locations?.length < 1) return null

  const handleRedirect = (locationId) => navigate(`/${game_mode_id}/locations/${locationId}`)

  const handleAddLocation = async () => {
    if (locationName) {
      const form = new FormData()
      form.append('location[name]'         , locationName)
      form.append('location[points]'       , holdingPoints)
      form.append('location[capture_bonus]', capturePoints)
      await dispatch(createLocation({ gameMode: game_mode_id , data: form }))

      setAdding(false)
    }
  }

  return (
    <Box className='locations-list__container'>
      <Box className='locations-list__header'>
        <Typography className='locations-list__title'>
          Locations
        </Typography>


        {!adding && (
          <Button
            onClick={() => setAdding(true)}
            className='locations-list__add'
            variant='contained'
          >
            Add
          </Button>
        )}
      </Box>

      {!loading && locations?.length > 0 && (
        locations.map((loc) => (
          <Box
            class='
              flex flex-row justify-between
              w-full p-2 m-1
              border-2 border-slate-700 rounded-md
              last:border-b-2 last:rounded-b-md
              bg-gradient-to-r from-slate-200 to-slate-700
            '
            key={loc.id}
          >
            <Typography className='locations-list__row--text'>
              {loc.name}
            </Typography>

            <Button
              className='locations-list__btn'
              color='secondary'
              onClick={() => handleRedirect(loc.id)}
              variant='contained'
            >
              View
            </Button>
          </Box>
        ))
      )}

      {adding && (
        <Box
          className='locations-list__adding'
        >
          <Typography class='text-center font-bold text-4xl mr-2'>
            New Location:
          </Typography>

          <input
            type='text'
            class='h-10 p-2 mt-4 mb-8 w-11/12 focus:outline-none focus:ring-0 focus:shadow-none'
            value={locationName}
            onChange={evt => setLocationName(evt.target.value)}
          />

          <NumberInput
            label='Holding Points:'
            max={50}
            min={0}
            value={holdingPoints}
            onChange={v => setHoldingPoints(v)}
          />

          <NumberInput
            label='Capture Points:'
            max={50}
            min={0}
            value={capturePoints}
            onChange={v => setCapturePoints(v)}
          />

          <Box className='locations-list__footer'>
            <Button
              className='locations-list__cancel'
              onClick={() => setAdding(!adding)}
              variant='outlined'
            >
              Cancel
            </Button>
            
            <Button
              className='locations-list__add'
              onClick={handleAddLocation}
              variant='outlined'
            >
              Add
            </Button>
          </Box>
        </Box>
      )}

    </Box>
  )
}

export default LocationsList

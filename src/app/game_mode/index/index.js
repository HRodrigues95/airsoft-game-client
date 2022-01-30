import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getGameModes } from '../reducer'
import './style.scss'


const IndexGameModes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gameModesList = useSelector(({ gameModes }) => gameModes.list)

  useEffect(() => {
    dispatch(getGameModes())
  }, [dispatch])

  return (
    <Paper className='game-mode-accordions__container'>
    <Typography className='game-mode-accordions__header'>
      This is a Testing App
    </Typography>



      {gameModesList.map(({ name, locations, teams, total_points }) => (
        <Accordion className='game-mode-accordions__acordion'>
          <AccordionSummary className='game-mode-accordions__acordion--summary' expandIcon={<ExpandMore />}>
            <Typography className='game-mode-accordions__header'>
              {name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className='game-mode-accordions__acordion--content'>
            <Box className='game-mode-accordions__info'>
              <Typography className='game-mode-accordions__label'>
                Locations:
              </Typography>

              <Typography className='game-mode-accordions__detail'>
                {locations.length}
              </Typography>
            </Box>

            <Box className='game-mode-accordions__info'>
              <Typography className='game-mode-accordions__label'>
                Teams:
              </Typography>

              <Typography className='game-mode-accordions__detail'>
                {teams.length}
              </Typography>
            </Box>
            
            <Box className='game-mode-accordions__info'>
              <Typography className='game-mode-accordions__label'>
                Points:
              </Typography>

              <Typography className='game-mode-accordions__detail'>
                {total_points}
              </Typography>
            </Box>

            <Box className='game-mode-accordions__actions'>
              <Button className='game-mode-accordions__btn' variant='contained'> 
                Delete
              </Button>

              <Button className='game-mode-accordions__btn' variant='contained'>
                View
              </Button>

              <Button className='game-mode-accordions__btn' variant='contained'>
                Edit
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  )
}

export default IndexGameModes

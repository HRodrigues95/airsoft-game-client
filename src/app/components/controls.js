import React from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { ArrowRight, ArrowLeft } from '@mui/icons-material'
import './style.scss'

export const RangeInput = ({ label, value, min, max, onChange }) => (
  <Box class='flex flex-row items-center justify-center'>
    <Typography class='text-center font-bold text-2xl mr-2'>
      {label}
    </Typography>

    <input
      type='number'
      class='h-8 p-2 w-1/2 focus:border-2 focus:border-r-emerald-900 rounded-md text-2xl text-center'
      min={min}
      max={max}
      step={5}
      value={value}
      onChange={evt => onChange(evt.target.valueAsNumber)}
    />
  </Box>
)

export const NumberInput = ({ label, onChange, value = 0, min = 0, max = 9999, step = 5  }) => {
  const handleAdd = () => {
    if ((value + step) <= max) onChange(value+step)
    else onChange(max)
  }
  
  const handleRemove = () => {
    if ((value - step) >= min) onChange(value-step)
    else onChange(min)
  }

  const handleChange = (value) => {
    if (value >= min && value <= max) onChange(value)
  }

  return (
    <Box class='flex flex-col justify-center items-center border-[2px] border-slate-300 rounded-md p-[4px]' >
      <Typography class='text-center font-bold text-4xl mr-2'>
        {label}
      </Typography>

      <Box
        class='
          flex flex-row justify-center items-center mt-[10px]
        '
      >
        <Box
          class={`
            flex flex-col items-center justify-center
            p-[4px]
            text-2xl font-bold text-center capitalize align-text-top
            transition ease-in-out delay-75 duration-[100ms]
            border-4 border-slate-700 rounded-full
            hover:cursor-pointer hover:scale-105
            bg-slate-600
            hover:bg-slate-400 hover:drop-shadow-md
          `}
          onClick={handleRemove}
        >
          <ArrowLeft className='number-input_icon' />
        </Box>

        <TextField
          classes= { {
            root: 'number-input_container'
          }}
          InputProps={{
            classes: { 
              input: 'number-input_text',
              focused: 'number-input_text-focus'
            } 
          }}
          type='number'
          value={value}
          onChange={(ev) => handleChange(ev.target.valueAsNumber)}
          variant='outlined'
        />

        <Box
          class={`
            flex flex-col items-center justify-center
            p-[4px]
            text-2xl font-bold text-center capitalize align-text-top
            transition ease-in-out delay-75 duration-[100ms]
            border-4 border-slate-700 rounded-full
            hover:cursor-pointer hover:scale-105
            bg-slate-600
            hover:bg-slate-400 hover:drop-shadow-md
          `}
          onClick={handleAdd}
        >
          <ArrowRight className='number-input_icon' />
        </Box>
      </Box>
    </Box>
  )
}

export const Button = ({ label, onClick, ...rest }) => (
  <input
    type='button'
    onClick={onClick}
    value={label}
    {...rest}
  />
)

export const ResetButton = ({ onClick }) => (
  <input
    type='button'
    onClick={onClick}
    value='RESET'
    class={`
      flex flex-col
      text-3xl font-bold
      transition ease-in-out delay-75 duration-200
      items-center w-5/6 justify-center mb-4 mt-4
      border-4 border-slate-700 rounded-md
      hover:cursor-pointer hover:scale-105
      bg-orange-600
      hover:bg-orange-400 hover:drop-shadow-md
    `}
  />
)

export const LocationButton = ({ name, onClick, selected, disabled = false }) => (
  <input
    type='button'
    disabled={disabled}
    onClick={onClick}
    value={name}
    class={`
      flex flex-col
      text-2xl font-bold
      transition ease-in-out delay-75 duration-200
      items-center w-full justify-center mb-4
      border-4 border-slate-700 rounded-md bg-slate-400
      hover:cursor-pointer hover:shadow-md hover:shadow-stone-700 hover:bg-slate-300
      ${selected && 'scale-[112%] bg-gradient-to-t from-green-500 to-green-700'}
      ${disabled && 'bg-slate-800 text-slate-600 hover:bg-slate-800'}
    `}
  />
)

export const DeleteButton = ({ onClick }) => (
  <input
    type='button'
    onClick={onClick}
    value='DELETE'
    class='
      flex flex-row items-center
      transition ease-linear delay-[20ms] duration-[30ms]
      mt-2 mb-2 h-14 w-5/6 
      font-bold text-xl
      border-2 border-orange-800 rounded-md shadow-inner shadow-red-800
      bg-red-600
      hover:cursor-pointer
      hover:text-slate-200
      hover:bg-orange-800
      hover:shadow-inner
      hover:shadow-red-600
      hover:scale-105
    '
  />
)

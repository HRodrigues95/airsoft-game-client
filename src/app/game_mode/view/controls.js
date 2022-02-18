import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Modal } from '@mui/material'

export const RangeInput = ({ value, min, max, onChange }) => (
  <Box class='flex flex-row items-center justify-center'>
    <Typography class='text-center font-bold text-2xl mr-2'>
      Points:
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
      items-center w-1/2 justify-center mb-4 mt-4
      border-4 border-slate-700 rounded-md
      hover:cursor-pointer hover:scale-105
      bg-orange-600
      hover:bg-orange-400 hover:drop-shadow-md
    `}
  />
)

export const LocationButton = ({ name, onClick, selected }) => (
  <input
    type='button'
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

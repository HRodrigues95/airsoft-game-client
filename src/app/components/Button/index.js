import React from 'react'
import { Button } from '@mui/material'

export const NButton = ({ onClick, children, root }) => (
  <Button
    class={`flex flex-row items-center hover:bg-slate-600 hover:border-2 bg-gradient-to-b from-slate-100 to-slate-400 justify-around w-40 rounded-md p-2 ${root}`}
    onClick={onClick}
  >
    {children}
  </Button>
)

export const SelectButton = ({ selected, onClick, children, root }) => {
  return (
    <NButton
      root={`${root} ${selected ? 'bg-gradient-to-b from-green-400 via-teal-100 to-lime-600' : ''}`}
      onClick={onClick}
    >
      {children}
    </NButton>
  )
}

export default Button

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexGameModes from '../game_mode/index'

const GameMode = () => (
  <Routes>
    <Route element={<IndexGameModes />} context='gameModes' path='/' />
  </Routes>
)

export default GameMode

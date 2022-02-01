import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexGameModes from '../game_mode/index'
import ViewGameMode from '../game_mode/view'

const GameMode = () => (
  <Routes>
    <Route element={<IndexGameModes />} context='gameModes' path='/' />
    <Route element={<ViewGameMode />} context='gameModes' path='/:id' />
  </Routes>
)

export default GameMode

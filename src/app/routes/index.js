import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import IndexGameModes from '../game_mode/index'
import ViewGameMode from '../game_mode/view'
import ViewLocation from '../locations/view'

const locations = () => (
  <Route path='locations'>
    <Route path=":location_id" element={<ViewLocation />} />
  </Route>
)

const gameModes = () => (
  <Route path="/">
    <Route index element={<IndexGameModes />} />

    <Route path=":game_mode_id">
      <Route index element={<ViewGameMode />} />

      {locations()}
    </Route>
  </Route>
)

const Routing = () => {
  return (
    <Router>
      <Routes>
        {gameModes()}
      </Routes>
    </Router>
  )
}

export default Routing
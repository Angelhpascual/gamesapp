import { BrowserRouter, Routes, Route } from "react-router-dom"
import GamesPage from "../pages/GamesPage"
import GameDetailPage from "../pages/GameDetailPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

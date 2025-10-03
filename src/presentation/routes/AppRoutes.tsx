import { BrowserRouter, Routes, Route } from "react-router-dom"
import GamesPage from "../pages/GamesPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

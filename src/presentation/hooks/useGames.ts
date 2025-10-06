import { useEffect } from "react"
import { useGamesStore } from "../store/games.store"

export function useGames() {
  const status = useGamesStore((state) => state.status)
  const games = useGamesStore((state) => state.games)
  const error = useGamesStore((state) => state.error)
  const loadAll = useGamesStore((state) => state.loadAll)

  useEffect(() => {
    if (status === "idle") {
      void loadAll()
    }
  }, [status, loadAll])

  return { status, data: games, error }
}

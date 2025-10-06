import { useEffect, useState } from "react"
import type { Game, GameId } from "../../domain/entities/Game"
import { useGamesStore } from "../store/games.store"

type UseGameByIdState = {
  status: "idle" | "loading" | "error" | "success"
  data: Game | null
  error: string | null
}

export function useGameById(id?: GameId | string) {
  const status = useGamesStore((state) => state.status)
  const selectedGame = useGamesStore((state) => state.selectedGame)
  const error = useGamesStore((state) => state.error)
  const loadById = useGamesStore((state) => state.loadById)
  const [data, setData] = useState<Game | null>(selectedGame)

  useEffect(() => {
    if (id == null) return

    const numericId = typeof id === "string" ? Number(id) : id

    setData(null)
    void loadById(numericId).then((game) => {
      setData(game)
    })
  }, [id, loadById])

  return { status, data, error }
}

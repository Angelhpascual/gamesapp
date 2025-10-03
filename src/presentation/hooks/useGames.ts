import { useEffect, useState } from "react"
import type { Game } from "../../domain/entities/Game"
import { resolveGetAllGamesUseCase } from "../../infrastructure/di/container"

type UseGameState =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "error"; data: null; error: string }
  | { status: "success"; data: Game[]; error: null }

export function useGames() {
  const [state, setState] = useState<UseGameState>({
    status: "idle",
    data: null,
    error: null,
  })

  useEffect(() => {
    let isMounted = true
    async function loadGames() {
      setState({ status: "loading", data: null, error: null })
      try {
        const getAllGamesUseCase = resolveGetAllGamesUseCase()
        const games = await getAllGamesUseCase()

        if (!isMounted) return

        setState({ status: "success", data: games, error: null })
      } catch (error) {
        if (!isMounted) return

        setState({
          status: "error",
          data: null,
          error: error instanceof Error ? error.message : "Error desconocido",
        })
      }
    }
    loadGames()
    return () => {
      isMounted = false
    }
  }, [])
  return state
}

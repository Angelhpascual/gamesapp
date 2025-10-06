import { create } from "zustand"
import type { Game, GameId } from "../../domain/entities/Game"
import {
  resolveGetAllGamesUseCase,
  resolveGetGameByIdUseCase,
} from "../../infrastructure/di/container"

type Status = "idle" | "loading" | "error" | "success"

type GamesState = {
  status: Status
  games: Game[] | null
  error: string | null
  selectedGame: Game | null
  loadAll: () => Promise<void>
  loadById: (id: GameId) => Promise<Game | null>
}

const initialState: Omit<GamesState, "loadAll" | "loadById"> = {
  status: "idle",
  games: null,
  selectedGame: null,
  error: null,
}

export const useGamesStore = create<GamesState>((set, get) => ({
  ...initialState,
  async loadAll() {
    set({ status: "loading", error: null, selectedGame: null })
    try {
      const useCase = resolveGetAllGamesUseCase()
      const games = await useCase()
      set({ status: "success", games, error: null })
    } catch (error) {
      set({
        status: "error",
        games: null,
        selectedGame: null,
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  },

  loadById: async (id: GameId) => {
    const games = get().games
    const cached = games?.find((game) => game.id === id)

    if (cached) {
      set({ selectedGame: cached, status: "success" })
      return cached
    }

    set({ status: "loading", error: null })

    try {
      const useCase = resolveGetGameByIdUseCase()
      const game = await useCase(id)

      set({ selectedGame: game, status: "success" })
      return game
    } catch (error) {
      set({
        status: "error",
        selectedGame: null,
        error: error instanceof Error ? error.message : "Error desconocido",
      })
      return null
    }
  },
}))

export const resetGamesStore = () => {
  useGamesStore.setState(initialState)
}

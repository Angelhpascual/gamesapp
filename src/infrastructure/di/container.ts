import type { Game, GameId } from "../../domain/entities/Game"
import type { GameRepository } from "../../domain/repositories/GameRepository"
import { FreeToGameApiRepository } from "../http/FreeToGameApiRepository"
import { getAllGames } from "../../application/GetAllGamesUseCase"
import { getGameById } from "../../application/GetGameByIdUseCase"

type TokenMap = {
  GameRepository: GameRepository
  GetAllGamesUseCase: () => Promise<Game[]>
  GetGameByIdUseCase: (id: GameId) => Promise<Game | null>
}

const registry = new Map<keyof TokenMap, unknown>()

function register<T extends keyof TokenMap>(token: T, value: TokenMap[T]) {
  registry.set(token, value)
}

export function resolve<T extends keyof TokenMap>(token: T): TokenMap[T] {
  const instance = registry.get(token)
  if (!instance) {
    throw new Error(
      `No se ha encontrado ninguna instancia para el token: ${token}`
    )
  }
  return instance as TokenMap[T]
}

export const container = { register, resolve }

container.register("GameRepository", new FreeToGameApiRepository())
const gameRepository = container.resolve("GameRepository")

container.register("GetAllGamesUseCase", async () =>
  getAllGames(gameRepository)
)
container.register("GetGameByIdUseCase", async (id: GameId) =>
  getGameById(gameRepository, id)
)

export function resolveGetAllGamesUseCase() {
  return container.resolve("GetAllGamesUseCase")
}

export function resolveGetGameByIdUseCase() {
  return container.resolve("GetGameByIdUseCase")
}

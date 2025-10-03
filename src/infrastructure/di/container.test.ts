import { afterEach, describe, expect, it, vi } from "vitest"
import type { GameRepository } from "../../domain/repositories/GameRepository"
import {
  container,
  resolveGetAllGamesUseCase,
  resolveGetGameByIdUseCase,
} from "./container"
import { FreeToGameApiRepository } from "../http/FreeToGameApiRepository"

describe("container", () => {
  afterEach(() => {
    const realRepo = new FreeToGameApiRepository()
    container.register("GameRepository", realRepo)
    container.register("GetAllGamesUseCase", async () => realRepo.getAllGames())
    container.register("GetGameByIdUseCase", async (id) =>
      realRepo.getGameById(id)
    )
  })
  it("Devuelve GetAllGamesUseCase inyectando el repositorio registrado", async () => {
    const mockRepo: GameRepository = {
      getAllGames: vi.fn().mockResolvedValue([]),
      getGameById: vi.fn(),
    }
    container.register("GameRepository", mockRepo)
    container.register("GetAllGamesUseCase", async () => mockRepo.getAllGames())

    const useCase = resolveGetAllGamesUseCase()
    await useCase()

    expect(mockRepo.getAllGames).toHaveBeenCalledTimes(1)
  })

  it("Devuelve GetGameByIdUseCase inyectando el repositorio registrado", async () => {
    const mockRepo: GameRepository = {
      getAllGames: vi.fn(),
      getGameById: vi.fn().mockResolvedValue(null),
    }
    container.register("GameRepository", mockRepo)
    container.register("GetGameByIdUseCase", async (id) =>
      mockRepo.getGameById(id)
    )

    const useCase = resolveGetGameByIdUseCase()
    const gameIdTest = 258
    const result = await useCase(gameIdTest)

    expect(mockRepo.getGameById).toHaveBeenCalledWith(gameIdTest)
    expect(result).toBe(null)
  })
})

import { describe, expect, it, vi } from "vitest"
import type { Game } from "../../domain/entities/Game"

import type { GameRepository } from "../../domain/repositories/GameRepository"
import { getGameById } from "../GetGameByIdUseCase"

const gameMock: Game = {
  id: 286,
  title: "Juego 1",
  thumbnail: "thumb1",
  short_description: "desc1",
  game_url: "url1",
  genre: "Action",
  platform: "PC",
  publisher: "Publisher 1",
  developer: "Dev 1",
  release_date: "2020-01-01",
  freetogame_profile_url: "profile1",
}

describe("GetGameById use case", () => {
  it("Devuelve un único juego según si id", async () => {
    const gameId = 286

    const repository: GameRepository = {
      getAllGames: vi.fn(),
      getGameById: vi.fn().mockResolvedValue(gameMock),
    }

    const result = await getGameById(repository, gameId)

    expect(repository.getGameById).toHaveBeenCalledWith(gameId)
    expect(result).toEqual(gameMock)
  })
  it("Devuelve null cuando el repositorio no encuentra el juego", async () => {
    const gameId = 999999

    const repository: GameRepository = {
      getAllGames: vi.fn(),
      getGameById: vi.fn().mockResolvedValue(null),
    }

    const result = await getGameById(repository, gameId)

    expect(repository.getGameById).toHaveBeenCalledWith(gameId)
    expect(result).toBeNull()
  })
})

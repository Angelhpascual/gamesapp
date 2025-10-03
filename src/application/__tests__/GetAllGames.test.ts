import { describe, it, expect, vi } from "vitest"
import type { Game } from "../../domain/entities/Game"
import type { GameRepository } from "../../domain/repositories/GameRepository"
import { getAllGames } from "../GetAllGamesUseCase"

describe("getAllGames use case", () => {
  it("Devuelve todos los juegos tal y como los entrega el repositorio", async () => {
    const gameMock: Game[] = [
      {
        id: 1,
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
      },
    ]

    const repository: GameRepository = {
      getAllGames: vi.fn().mockResolvedValue(gameMock),
      getGameById: vi.fn(),
    }

    const result = await getAllGames(repository)

    expect(repository.getAllGames).toHaveBeenCalledTimes(1)
    expect(result).toEqual(gameMock)
  })
})

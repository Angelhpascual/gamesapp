import { describe, expect, it } from "vitest"
import { env } from "../../../shared/config/env"
import { FreeToGameApiRepository } from "../FreeToGameApiRepository"
import { mswServer } from "../../../../vitest.setup"
import { http, HttpResponse } from "msw"

const baseUrl = env.freeToGameBaseUrl
const repository = new FreeToGameApiRepository()

describe("FreeToGameApiRepository", () => {
  it("Devuelve los juegos cuando la API responde 200", async () => {
    const games = await repository.getAllGames()

    expect(games).toHaveLength(1)
    expect(games[0].title).toBe("Mock Game")
  })
  it("Lanza un error cuando /games responde 500", async () => {
    mswServer.use(
      http.get(`${baseUrl}/games`, () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        )
      })
    )
    await expect(repository.getAllGames()).rejects.toThrow(
      "Error al listar los juegos"
    )
  })
  it("Devuelve null cuando /game responde 404", async () => {
    const game = await repository.getGameById(404)

    expect(game).toBeNull()
  })
  it("Lanza un error cuando /game responde 500", async () => {
    mswServer.use(
      http.get(`${baseUrl}/game`, () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        )
      })
    )

    await expect(repository.getGameById(99999)).rejects.toThrow(
      "Error al obtener el juego"
    )
  })
})

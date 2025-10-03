import type { Game, GameId } from "../../domain/entities/Game"
import type { GameRepository } from "../../domain/repositories/GameRepository"
import { env } from "../../shared/config/env"

type GameDto = {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

function mapGameDTOToEntity(dto: GameDto): Game {
  return {
    id: dto.id,
    title: dto.title,
    thumbnail: dto.thumbnail,
    short_description: dto.short_description,
    game_url: dto.game_url,
    genre: dto.genre,
    platform: dto.platform,
    publisher: dto.publisher,
    developer: dto.developer,
    release_date: dto.release_date,
    freetogame_profile_url: dto.freetogame_profile_url,
  }
}

export class FreeToGameApiRepository implements GameRepository {
  async getAllGames(): Promise<Game[]> {
    try {
      const response = await fetch(`${env.freeToGameBaseUrl}/games`)
      if (!response.ok) {
        throw new Error("Error al listar los juegos")
      }
      const data = (await response.json()) as GameDto[]
      return data.map(mapGameDTOToEntity)
    } catch (error) {
      console.error(error)
      throw new Error("Error al listar los juegos")
    }
  }

  async getGameById(id: GameId): Promise<Game | null> {
    try {
      const response = await fetch(`${env.freeToGameBaseUrl}/game?id=${id}`)

      if (response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw new Error("Error al obtener el juego")
      }

      const data = (await response.json()) as GameDto
      return mapGameDTOToEntity(data)
    } catch (error) {
      throw new Error("Error al obtener el juego")
    }
  }
}

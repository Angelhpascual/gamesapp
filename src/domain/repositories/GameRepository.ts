import type { Game, GameId } from "../entities/Game"

export interface GameRepository {
  getAllGames(): Promise<Game[]>
  getGameById(id: GameId): Promise<Game | null>
}

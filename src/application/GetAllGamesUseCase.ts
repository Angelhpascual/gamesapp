import type { Game } from "../domain/entities/Game"
import type { GameRepository } from "../domain/repositories/GameRepository"

export async function getAllGames(repository: GameRepository): Promise<Game[]> {
  return repository.getAllGames()
}

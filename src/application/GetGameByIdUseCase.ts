import type { Game } from "../domain/entities/Game"
import type { GameRepository } from "../domain/repositories/GameRepository"

export async function getGameById(
  repository: GameRepository,
  id: number
): Promise<Game | null> {
  return repository.getGameById(id)
}

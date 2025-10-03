import type { Game } from "../../domain/entities/Game"

type GameCardProps = {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="rounded-lg border-slate-2 bg-white shadow-sm transition hover:shadow-md">
      <img
        className="h-48 w-full rounded-t-lg object-cover"
        src={game.thumbnail}
        alt={game.title}
      />
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-slate-900">{game.title}</h3>
        <p className="line-clamp-3 text-sm text-slate-600">
          {game.short_description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
          <span className="rounded bg-slate-100 px-2 py-1">{game.genre}</span>
          <span className="rounded bg-slate-100 px-2 py-1">
            {game.platform}
          </span>
        </div>
      </div>
    </article>
  )
}

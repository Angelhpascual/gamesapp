import { useGames } from "../hooks/useGames"
import { GameCard } from "../components/GameCard"

const GamesPage = () => {
  const { status, data, error } = useGames()

  if (status === "idle" || status === "loading") {
    return (
      <section className="flex h-full flex-col items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">
          Cargando juegos ...
        </p>
      </section>
    )
  }
  if (status === "error") {
    return (
      <section className="flex h-full flex-col items-center justify-center">
        <p className="text-lg text-red-600">
          Error al cargar los juegos: {error}
        </p>
      </section>
    )
  }

  if (!data || data.length === 0) {
    return (
      <section className="flex h-full flex-col items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">
          No hay juegos disponibles
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Juegos Gratis</h2>
        <p className="text-slate-600">
          Consulta nuestra selección de títulos gratuitos
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}

export default GamesPage

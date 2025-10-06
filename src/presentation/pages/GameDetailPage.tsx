import { Link, useParams } from "react-router-dom"
import { useGameById } from "../hooks/useGameById"

const GameDetailPage = () => {
  const { id } = useParams()
  const { status, data, error } = useGameById(id)

  if (status === "idle" || status === "loading") {
    return (
      <section className="flex h-full flex-col items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">
          Cargando juego...
        </p>
      </section>
    )
  }

  if (status === "error") {
    return (
      <section className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-600">
          Error al cargar el juego: {error}
        </p>
        <Link className="text-sky-600 underline" to="/">
          Volver al listado
        </Link>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold text-slate-600">
          No se encontró el juego solicitado.
        </p>
        <Link className="text-sky-600 underline" to="/">
          Volver al listado
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
      <Link className="text-sm text-sky-600 underline" to="/">
        ← Volver al listado
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="h-60 w-60 shrink-0 rounded-lg object-cover shadow"
        />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">{data.title}</h1>
          <p className="text-slate-600">{data.short_description}</p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
            <span className="rounded bg-slate-100 px-2 py-1">{data.genre}</span>
            <span className="rounded bg-slate-100 px-2 py-1">{data.platform}</span>
            <span className="rounded bg-slate-100 px-2 py-1">
              Publicado por {data.publisher}
            </span>
            <span className="rounded bg-slate-100 px-2 py-1">
              Lanzado el {data.release_date}
            </span>
          </div>
          <a
            href={data.game_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-700"
          >
            Jugar ahora
          </a>
        </div>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          Acerca del juego
        </h2>
        <p className="text-sm text-slate-600">
          Desarrollado por {data.developer}. Consulta más detalles en
          {' '}
          <a
            href={data.freetogame_profile_url}
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline"
          >
            FreeToGame
          </a>
          .
        </p>
      </section>
    </section>
  )
}

export default GameDetailPage

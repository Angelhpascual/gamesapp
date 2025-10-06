import { afterEach, describe, expect, it } from "vitest"
import { mswServer } from "../../../../vitest.setup"
import { cleanup, render, waitFor, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import GamesPage from "../GamesPage"
import { http, HttpResponse } from "msw"
import { resetGamesStore } from "../../store/games.store"

describe("GamesPage", () => {
  afterEach(() => {
    mswServer.resetHandlers()
    cleanup()
    resetGamesStore()
  })

  it("Muestra la lista de juegos cuando la API responde 200", async () => {
    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(screen.getByText("Mock Game")).toBeInTheDocument()
    )
  })

  it("Muestra un mensaje de error cuando la API responde 500", async () => {
    mswServer.use(
      http.get("*/games", () =>
        HttpResponse.json({ message: "Internal Server Error" }, { status: 500 })
      )
    )
    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(
        screen.getByText(/Error al cargar los juegos/i)
      ).toBeInTheDocument()
    )
  })
  it("Muestra un mensaje de ausencia de datos cuando la lista está vacía", async () => {
    mswServer.use(http.get("*/games", () => HttpResponse.json([])))
    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(screen.getByText(/no hay juegos disponibles/i)).toBeInTheDocument()
    )
  })
})

import { MemoryRouter, Route, Routes } from "react-router-dom"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import GameDetailPage from "./GameDetailPage"
import { mswServer } from "../../../vitest.setup"
import { resetGamesStore } from "../store/games.store"

describe("GameDetailPage", () => {
  afterEach(() => {
    cleanup()
    mswServer.resetHandlers()
    resetGamesStore()
  })

  const renderWithRouter = (initialPath: string) =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/games/:id" element={<GameDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

  it("muestra los detalles del juego cuando la API responde 200", async () => {
    renderWithRouter("/games/1")

    await waitFor(() =>
      expect(screen.getByText("Mock Game")).toBeInTheDocument()
    )
    expect(screen.getByText("Action")).toBeInTheDocument()
  })

  it("muestra un mensaje de error cuando la API responde 500", async () => {
    mswServer.use(
      http.get("*/game", () =>
        HttpResponse.json({ message: "Server error" }, { status: 500 })
      )
    )

    renderWithRouter("/games/1")

    await waitFor(() =>
      expect(screen.getByText(/Error al cargar el juego/i)).toBeInTheDocument()
    )
  })

  it("muestra un mensaje cuando el juego no existe", async () => {
    mswServer.use(
      http.get("*/game", ({ request }) => {
        const url = new URL(request.url)
        if (url.searchParams.get("id") === "404") {
          return HttpResponse.json(null, { status: 404 })
        }
        return HttpResponse.json(
          {
            id: 999,
            title: "Otro juego",
            thumbnail: "thumb.png",
            short_description: "",
            game_url: "http://example.com",
            genre: "MMO",
            platform: "PC",
            publisher: "Publisher",
            developer: "Dev",
            release_date: "2020-01-01",
            freetogame_profile_url: "http://example.com/profile",
          },
          { status: 200 }
        )
      })
    )

    renderWithRouter("/games/404")

    await waitFor(() =>
      expect(screen.getByText(/No se encontró el juego/i)).toBeInTheDocument()
    )
  })
})

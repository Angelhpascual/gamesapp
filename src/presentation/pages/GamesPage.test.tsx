import { afterEach, describe, expect, it } from "vitest"
import { mswServer } from "../../../vitest.setup"
import { cleanup, render, waitFor, screen } from "@testing-library/react"
import GamesPage from "./GamesPage"

describe("GamesPage", () => {
  afterEach(() => {
    mswServer.resetHandlers()
    cleanup()
  })

  it("Muestra la lista de juegos cuando la API responde 200", async () => {
    render(<GamesPage />)
    await waitFor(() =>
      expect(screen.getByText("Mock Game")).toBeInTheDocument()
    )
  })
})

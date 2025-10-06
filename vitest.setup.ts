import { beforeAll, afterEach, afterAll } from "vitest"
import { freeToGameHandlers } from "./src/infrastructure/http/mocks/handlers"
import { setupServer } from "msw/node"
import { env } from "./src/shared/config/env"
import "@testing-library/jest-dom/vitest"

env.freeToGameBaseUrl = "https://www.freetogame.com/api"

export const mswServer = setupServer(...freeToGameHandlers)

beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }))
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

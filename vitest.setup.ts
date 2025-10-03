import { beforeAll, afterEach, afterAll } from "vitest"
import { freeToGameHandlers } from "./src/infrastructure/http/mocks/handlers"
import { setupServer } from "msw/node"

export const mswServer = setupServer(...freeToGameHandlers)

beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }))
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

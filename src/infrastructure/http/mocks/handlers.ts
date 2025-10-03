import { http, HttpResponse } from "msw"
import { env } from "../../../shared/config/env"

const baseUrl = env.freeToGameBaseUrl

const gameDTO = {
  id: 1,
  title: "Mock Game",
  thumbnail: "thumb1.png",
  short_description: "desc1",
  game_url: "http://...",
  genre: "Action",
  platform: "PC",
  publisher: "Mock Publisher",
  developer: "Mock Dev",
  release_date: "2020-01-01",
  freetogame_profile_url: "http://profile",
}

export const freeToGameHandlers = [
  http.get(`${baseUrl}/games`, () => HttpResponse.json([gameDTO])),
  http.get(`${baseUrl}/game`, ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (id === "404") {
      return HttpResponse.json(null, { status: 404 })
    }

    if (id === "500") {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }

    return HttpResponse.json(gameDTO)
  }),
]

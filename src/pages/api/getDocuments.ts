import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const API_URL = import.meta.env.API_URL
  const API_KEY = import.meta.env.API_KEY

  const type = url.searchParams.get("type")
  url.searchParams.delete("type")

  const res = await fetch(API_URL + "/" + type + "?" + url.searchParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY
    }
  })

  return new Response(
    JSON.stringify(await res.json() || []), 
    { status: res.status }
  )
}

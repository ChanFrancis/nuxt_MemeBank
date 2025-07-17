import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { getRouterParam } from "h3"
import type { Sticker } from "~/types/sticker"

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, "id")
    const id = parseInt(idParam || "")

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: "Invalid ID" })
    }

    const filePath = join(process.cwd(), "server/data/stickers.json")

    let data
    try {
        data = JSON.parse(readFileSync(filePath, "utf-8"))
    } catch (err) {
        console.error("Failed to read JSON:", err)
        throw createError({ statusCode: 500, statusMessage: "Failed to read data" })
    }

    const sticker = data.find((s: Sticker) => s.id === id)
    if (!sticker) {
        throw createError({ statusCode: 404, statusMessage: "Sticker not found" })
    }

    sticker.likes += 1

    try {
        writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    } catch (err) {
        console.error("Failed to write JSON:", err)
        throw createError({ statusCode: 500, statusMessage: "Failed to save data" })
    }

    return { success: true, likes: sticker.likes }
})

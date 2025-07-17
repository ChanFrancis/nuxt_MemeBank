import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import type { Sticker } from "~/types/sticker"

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id || "")

    const filePath = join(process.cwd(), "server/data/stickers.json")
    const data = JSON.parse(readFileSync(filePath, "utf-8"))

    const sticker = data.find((s: Sticker) => s.id === id)
    if (!sticker) {
        throw createError({ statusCode: 404, statusMessage: "Sticker not found" })
    }

    sticker.likes = Math.max(0, sticker.likes - 1)

    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")

    return { success: true, likes: sticker.likes }
})

// server/api/stickers.ts
import fs from "fs/promises"
import { join } from "path"

const filePath = join(process.cwd(), ".data/stickers.json")

export default defineEventHandler(async (event) => {
    setResponseHeader(event, "Cache-Control", "no-store")
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content)
})

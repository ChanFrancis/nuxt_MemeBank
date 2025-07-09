// server/api/upload.post.ts
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { promises as fs } from 'fs'
import { join, extname } from 'path'

const UPLOAD_DIR = join(process.cwd(), 'public/stickers')
const DATA_FILE  = join(process.cwd(), 'server/data/stickers.json')

export default defineEventHandler(async (event) => {
    try {
        const parts = await readMultipartFormData(event)
        const filePart = parts.find(p => p.filename && p.data)
        if (!filePart) {
            throw createError({ statusCode: 400, statusMessage: 'Pas de fichier reçu.' })
        }
        let buffer: Buffer
        if (Buffer.isBuffer(filePart.data)) {
            buffer = filePart.data
        } else if (filePart.data instanceof ArrayBuffer) {
            buffer = Buffer.from(filePart.data)
        } else {
            const arrayBuffer = await filePart.data.arrayBuffer()
            buffer = Buffer.from(arrayBuffer)
        }
        await fs.mkdir(UPLOAD_DIR, { recursive: true })
        const filename = `${Date.now()}-${filePart.filename}`
        const filePath = join(UPLOAD_DIR, filename)
        await fs.writeFile(filePath, buffer)
        const raw      = await fs.readFile(DATA_FILE, 'utf-8')
        const stickers = JSON.parse(raw) as Array<{
            id: number
            name: string
            url: string
            tags: string[]
            animated: boolean
            likes: number
        }>
        const maxId = stickers.reduce((max, s) => Math.max(max, s.id), 0)
        const newId = maxId + 1
        const ext = extname(filename).toLowerCase()
        const isGif = ext === '.gif'
        const newSticker = {
            id: newId,
            name: filePart.filename,
            url: `/stickers/${filename}`,
            tags: [],
            animated: isGif,
            likes: 0
        }
        stickers.push(newSticker)
        await fs.writeFile(DATA_FILE, JSON.stringify(stickers, null, 2), 'utf-8')
        return {
            url: newSticker.url,
            sticker: newSticker
        }

    } catch (err: any) {
        throw createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.message || 'Erreur serveur'
        })
    }
})

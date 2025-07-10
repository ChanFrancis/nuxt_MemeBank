// tests/insert-json.spec.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'server', 'data', 'stickers.json')

describe('Insertion de data dans le json', () => {
    let original: string
    beforeAll(async () => {
        await fs.access(DATA_FILE)
        original = await fs.readFile(DATA_FILE, 'utf-8')
    })

    afterAll(async () => {
        await fs.writeFile(DATA_FILE, original, 'utf-8')
    })

    it('test ajout', async () => {
        const content = await fs.readFile(DATA_FILE, 'utf-8')
        const stickers = JSON.parse(content) as Array<any>
        const maxId = stickers.reduce((m, s) => Math.max(m, s.id), 0)
        const newSticker = {
            id:       maxId + 1,
            name:     'test-upload.png',
            url:      `/stickers/test-upload.png`,
            tags:     [],
            animated: false,
            likes:    0
        }
        const updatedList = [...stickers, newSticker]
        await fs.writeFile(DATA_FILE, JSON.stringify(updatedList, null, 2), 'utf-8')
        const updated = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8')) as Array<any>
        const found = updated.find(s => s.id === newSticker.id)
        expect(found).toBeDefined()
        expect(found).toMatchObject({
            name: 'test-upload.png',
            url:  '/stickers/test-upload.png'
        })
        expect(updated.length).toBe(stickers.length + 1)
    })
})

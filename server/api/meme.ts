// server/api/meme.ts
export default defineEventHandler(async () => {
    const config = useRuntimeConfig()
    const apiKey = config.humorApiKey
  
    try {
      const res = await $fetch('https://api.humorapi.com/memes/random', {
        params: {
          'api-key': apiKey,
          'media-type': 'image',
        },
      })
      return res
    } catch (error) {
      console.error('Erreur lors de la récupération du meme :', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur HumorAPI',
      })
    }
  })
  
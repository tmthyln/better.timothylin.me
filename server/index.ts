import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

app.get('/api/random-word', async (c) => {
	const result = await c.env.DB.prepare(
		"SELECT word FROM words WHERE use_count = 0 ORDER BY RANDOM() LIMIT 1"
	).first<{ word: string }>()

	if (!result) {
		return c.json({ error: "No words found" }, 404)
	}

	return c.json({ word: result.word })
})

export default app

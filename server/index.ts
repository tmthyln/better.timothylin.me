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

app.delete('/api/word/:word', async (c) => {
	const word = c.req.param('word')
	const result = await c.env.DB.prepare(
		"DELETE FROM words WHERE word = ?"
	).bind(word).run()

	if (result.meta.changes === 0) {
		return c.json({ error: "Word not found" }, 404)
	}

	return c.json({ success: true })
})

app.post('/api/word/:word', async (c) => {
	const word = c.req.param('word')
	const result = await c.env.DB.prepare(
		"UPDATE words SET use_count = use_count + 1, last_used = datetime('now') WHERE word = ?"
	).bind(word).run()

	if (result.meta.changes === 0) {
		return c.json({ error: "Word not found" }, 404)
	}

	return c.json({ success: true })
})

export default app

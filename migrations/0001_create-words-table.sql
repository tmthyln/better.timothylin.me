-- Migration number: 0001 	 2026-01-27T22:47:31.727Z

CREATE TABLE words (
    word TEXT NOT NULL,
    last_used TEXT DEFAULT NULL,
    use_count INTEGER DEFAULT 0
);

CREATE INDEX idx_words_used ON words (last_used DESC, word)
WHERE use_count > 0;

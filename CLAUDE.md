# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Better" is a collection of web-based self-improvement tools built with Vue 3 and deployed to Cloudflare Workers. Current features include speech practice with random words and a timer.

## Development Commands

- `npm run dev` - Start development server (Vite + Cloudflare Worker via @cloudflare/vite-plugin)
- `npm run build` - Build for production (runs type-check and vite build in parallel)
- `npm run preview` - Build and run with wrangler dev
- `npm run deploy` - Build and deploy to Cloudflare
- `npm run type-check` - Run vue-tsc type checking
- `npm run cf-typegen` - Generate Cloudflare Worker types

## Architecture

### Frontend
- Vue 3 with Composition API (`<script setup>`)
- Vue Router for routing (`src/router/index.ts`)
- Bulma CSS framework for styling
- VueUse library for reusable composables
- Path alias: `@` maps to `src/`

### Backend
- Cloudflare Worker (`server/index.ts`)
- D1 database (SQLite) bound as `env.DB`
- API routes under `/api/`

### Deployment
- Static assets built to `dist/` and served by Cloudflare
- SPA mode enabled (`not_found_handling = "single-page-application"`)
- Worker handles API requests, assets handled by Cloudflare

## Database

- D1 database named "better"
- Migrations in `migrations/` directory
- Run migrations: `npx wrangler d1 migrations apply better`
- Local dev uses D1 local emulator automatically

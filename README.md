# Breath of the Wild Cooking App — Backend

The API for the BOTW Cooking App: user signup/login with bcrypt-protected passwords, per-user kitchens, pantries, and dishes, plus a full catalog of cookbook recipes, ingredients, and stores.

Originally a Rails 7 + Heroku app, the backend is now a **Node/Express API that deploys to Vercel for free**, backed by a free [Neon](https://neon.tech) Postgres database. The built React frontend in `public/` is served from the same deployment, so one Vercel project runs the whole app. The API routes, payloads, and response shapes are identical to the old Rails API, so the frontend works unchanged.

## Architecture

- `api/index.js` — Vercel serverless entry point (all `/api/*` traffic is rewritten here, see `vercel.json`)
- `server/app.js` — the Express app: all `/api/v1` routes, auth via an HMAC-signed session cookie
- `server/db.js` — Postgres connection pool (`DATABASE_URL`)
- `db/schema.sql` — schema (port of the old Rails `schema.rb`)
- `db/data/*.json` — seed data (recipes, ingredients, stores)
- `scripts/seed.js` — creates tables and seeds the reference data; safe to re-run
- `public/` — production build of the React frontend, served statically with SPA fallback
- `client/` — the React frontend source (Vite). Edit it, then `cd client && npm install && npm run build` to regenerate `public/`

The old Rails app (`app/`, `config/`, `Gemfile`, …) is kept in the repo for reference but is no longer used; it can be deleted whenever you like.

## Deploying (free)

### 1. Create a free Postgres database on Neon

1. Sign up at [neon.tech](https://neon.tech) (free tier: 0.5 GB, no credit card).
2. Create a project, then copy the **pooled** connection string (the one with `-pooler` in the hostname). It looks like `postgres://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`.

> Any free Postgres works (Supabase, etc.) — Neon is just the smoothest fit for Vercel. You can also add it directly from the Vercel dashboard via **Storage → Neon**.

### 2. Seed the database

From your machine (or anywhere with Node 18+):

```sh
npm install
DATABASE_URL="<your neon connection string>" npm run seed
```

This creates the tables and loads 33 recipes, 71 ingredients, and 5 stores. It never touches user data and skips tables that are already seeded.

### 3. Deploy to Vercel

1. Sign up at [vercel.com](https://vercel.com) (free Hobby plan) and import this GitHub repo. The defaults are fine — no build command needed.
2. In the project's **Settings → Environment Variables**, add:
   - `DATABASE_URL` — the Neon pooled connection string
   - `SESSION_SECRET` — a random secret for signing login cookies; generate one with
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Deploy. The app (frontend + API) is live at your `*.vercel.app` URL.

`FRONTEND_ORIGIN` is only needed if you later host the frontend on a different domain (enables CORS with credentials for that origin).

## Local development

Requires Node 18+ and a local Postgres.

```sh
npm install
createdb botw_dev
DATABASE_URL="postgres://localhost:5432/botw_dev" npm run seed
DATABASE_URL="postgres://localhost:5432/botw_dev" npm run dev
# → http://localhost:3000
```

## API

All routes are under `/api/v1` and (except signup/login) require the session cookie:

| Method | Path | Description |
| --- | --- | --- |
| POST | `/signup` | Create account (`username`, `password`, `password_confirmation`, `bank`) |
| POST | `/login` | Log in (`username`, `password`) |
| DELETE | `/logout` | Log out |
| GET | `/me` | Current user |
| PATCH | `/users/:id` | Update the current user's `bank` |
| GET | `/recipes`, `/recipes/:id` | Cookbook recipes |
| GET | `/ingredients`, `/ingredients/:id` | Ingredients |
| GET | `/stores`, `/stores/:id` | Stores |
| GET | `/kitchens` | Current user's kitchen |
| GET/POST/PATCH/DELETE | `/pantries`, `/pantries/:id` | Pantry items (`{pantry: {ingredient_id, quantity}}`) |
| GET/POST/PATCH/DELETE | `/dishes`, `/dishes/:id` | Cooked dishes (`{dish: {recipe_id, quantity}}`) |

## Seed data note

The original Rails seeds scraped ingredient data from the Zelda wiki at seed time. That data now lives as static JSON in `db/data/`, so seeding is fast and can't break when the wiki changes. Ingredient images use the wiki's stable `Special:FilePath` redirect URLs (e.g. `https://zelda.fandom.com/wiki/Special:FilePath/BotW_Apple_Icon.png`).

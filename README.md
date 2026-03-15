# ProxyRouter

A unified API gateway for handling client requests across multiple LLM providers.

## Overview

ProxyRouter is a monorepo project with:

- A backend API gateway that routes requests to different AI providers
- Provider adapters for OpenAI, Anthropic, DeepSeek, Gemini, and Grok
- User auth and API key generation endpoints
- Shared database package powered by Prisma + PostgreSQL
- A Next.js frontend dashboard/app shell

## Core Features

- Routing layer to select the correct AI model provider
- Provider adapters for different LLM services
- API key authentication and request validation
- Usage tracking, logging, and rate limiting (foundation in place)
- Scalable backend design for adding new providers easily

## Monorepo Structure

```
open_router_version2/
	apps/
		backend/      # Express API gateway
		frontend/     # Next.js app
	packages/
		store/        # Prisma schema + generated DB client
		ui/           # Shared UI components
		eslint-config/
		typescript-config/
```

## Tech Stack

- Node.js + TypeScript
- Turborepo + npm workspaces
- Express (backend)
- Next.js App Router (frontend)
- Prisma + PostgreSQL (data layer)

## Prerequisites

- Node.js 18+
- npm 11+
- PostgreSQL database

## Installation

From repository root:

```bash
npm install
```

## Environment Variables

Create `apps/backend/.env` and set:

```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
JSON_WEB_TOKEN="your_jwt_secret"

OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."
DEEPSEEK_API_KEY="..."
GEMINI_API_KEY="..."
XAI_API_KEY="..."
```

## Database Setup (Prisma)

From repository root:

```bash
npx prisma generate --schema packages/store/prisma/schema.prisma
npx prisma migrate dev --schema packages/store/prisma/schema.prisma
```

## Run the Project

### Run all apps (recommended)

From repository root:

```bash
npm run dev
```

### Run backend only

```bash
cd apps/backend
npm run dev
```

### Run frontend only

```bash
cd apps/frontend
npm run dev
```

## Useful Scripts

From repository root:

- `npm run dev` — run workspace dev tasks
- `npm run build` — build all workspaces via Turbo
- `npm run lint` — run lint across workspaces
- `npm run check-types` — run TypeScript checks across workspaces
- `npm run format` — format TS/TSX/MD files

## Backend API (Current)

Base URL (local): `http://localhost:3000`

### Auth routes

- `POST /api/v1/auth/sign-up`
- `POST /api/v1/auth/log-in`

### User/API key routes

- `POST /api/v1/user/generate-api` (auth required)
- `GET /api/v1/user/get-api` (auth required)
- `GET /api/v1/user/get-user` (auth required)

### Model routing route

- `POST /api/v1/models/chat/:model`
  - Supported model params: `chatgpt`, `claude`, `deepseek`, `googledeepmind`, `grok`

## Security Notes

- Never commit `.env` or real provider API keys
- Rotate keys immediately if exposed
- GitHub push protection will block commits containing secrets

## Current Status

This project is actively evolving. Some features (especially complete usage metering/rate limiting and finalized model response shape) are under active development.

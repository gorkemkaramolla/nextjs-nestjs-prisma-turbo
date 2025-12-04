# Next.js + NestJS Monorepo

Production-ready monorepo template with Next.js 16, NestJS, Prisma, and Supabase PostgreSQL.

## Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up Supabase database:**
   - Create a project at [supabase.com](https://supabase.com)
   - Get your connection string from: **Project Settings > Database**
   - Create a `.env` file in the root directory with:

   ```bash
   DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   ```

   **Example:**

   ```bash
   DATABASE_URL="postgresql://postgres.abcdefghijklmnop:MySecurePassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   ```

3. **Push database schema:**

   ```bash
   pnpm db:push
   ```

4. **Start development:**
   ```bash
   pnpm dev
   ```

## Supabase Connection Strings

### Pooled Connection (Recommended for Vercel/Serverless)

Use this for Next.js apps deployed on Vercel or other serverless platforms:

```bash
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**Where to find:**

- Supabase Dashboard > Project Settings > Database > Connection string > **Connection pooling** tab
- Copy the "Session" or "Transaction" mode connection string

### Direct Connection (For NestJS API / Long-running servers)

Use this for traditional server deployments (Railway, Render, etc.):

```bash
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

**Where to find:**

- Supabase Dashboard > Project Settings > Database > Connection string > **Direct connection** tab

### Optional: Supabase Client (for Auth/Storage)

If you plan to use Supabase's JavaScript client for authentication or storage:

```bash
SUPABASE_URL="https://[PROJECT_REF].supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

**Where to find:**

- Supabase Dashboard > Project Settings > API

## Environment Variables

Create a `.env` file in the root directory:

```bash
# Required: Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Optional: Supabase Client (if using auth/storage)
# SUPABASE_URL="https://[PROJECT_REF].supabase.co"
# SUPABASE_ANON_KEY="your-anon-key-here"
# SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

## Project Structure

```
├── apps/
│   ├── web/          # Next.js 16 frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── database/     # Prisma schema & client
│   ├── ui/           # Shared React components
│   └── utils/        # Shared utilities
```

## Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all apps
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Prisma Studio

## Deployment

### Vercel (Next.js App)

1. Connect your repository to Vercel
2. Set **Root Directory** to `apps/web`
3. Add environment variable:
   - `DATABASE_URL` - Your Supabase pooled connection string
4. Deploy!

### NestJS API

Deploy to Railway, Render, Fly.io, or any Node.js hosting service:

1. Set `DATABASE_URL` environment variable (use direct connection string)
2. Build and start the API server

## Tech Stack

- **Monorepo:** Turborepo
- **Package Manager:** pnpm
- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** NestJS 11
- **Database:** PostgreSQL (Supabase) with Prisma ORM

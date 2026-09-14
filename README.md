# CSSwitch Design Lab

## Overview
CSSwitch Design Lab is a user-friendly application designed to allow users to customize the colors of their Nintendo Switch consoles. Users can select their preferred colors, create orders, and save their configurations for future reference.

## Features
- **Color Selection:** Choose from a variety of colors for different parts of the Nintendo Switch console.
- **Order Creation:** Easily create and manage orders based on your custom color configurations.
- **Save Configurations:** Save your favorite configurations for quick access and future modifications.

## Tech stack
Next.js 16 (App Router with Cache Components), React 19, TypeScript, Tailwind CSS 4 with shadcn/ui, MongoDB with Mongoose, Zod and Vitest.

## Installation
You need Node.js 22 and a MongoDB server.

1) Clone the repository: `git clone https://github.com/CookieNr2/csswitch-design-lab.git`
2) Go to the project folder: `cd csswitch-design-lab`
3) Install the dependencies: `npm install`
4) Create your environment file and fill it in: `cp .env.example .env.local`
5) Load the colors and switch parts into the database: `npm run seed`
6) Start the development server: `npm run dev`

## Usage
- **Launch the Application:** Open your web browser and navigate to http://localhost:3000.
- **Select Colors:** Use the interface to choose your preferred colors for the Nintendo Switch console.
- **Create Orders:** Once satisfied with the configuration, create an order by following the prompts.
- **Save Configurations:** Save your custom configurations for future use by clicking the save button.

## Scripts
Run these from the project root:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server on http://localhost:3000 |
| `npm run build` | Production build. The database must be reachable, because pages are prerendered |
| `npm test` | Runs the unit tests (Vitest) |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Generates the route types, then runs the TypeScript compiler |
| `npm run seed` | Loads the colors and switch parts into empty collections |

## Project structure
The layout follows the "split project files by feature or route" strategy from the [Next.js project structure guide](https://nextjs.org/docs/app/getting-started/project-structure#split-project-files-by-feature-or-route): `app/` holds the routes and the files only one route uses, and everything shared lives at the project root.

```
csswitch-design-lab/
├── app/                  Routes. Code used by a single route sits next to it in _components/
│   ├── (auth)/           /login and /register, sharing one layout
│   └── api/              REST Route Handlers (see "REST API" below)
├── components/custom/    Components shared by more than one route
├── components/shadcn/    Generated shadcn/ui components
├── lib/                  Code that is safe to import anywhere: schemas, types, helpers
├── lib/actions/          Server Actions, used by the forms
├── lib/server/           Server-only code, one file per domain:
│   ├── auth.ts           Session cookie or Bearer token -> AuthenticatedUser
│   ├── catalog.ts        Colors and switch parts (read-only, cached)
│   ├── configs.ts        Saved designs and the popular galleries
│   ├── users.ts          Registration, login and account
│   ├── orders.ts         Orders
│   ├── dto.ts            Turns database documents into the plain objects in lib/types.ts
│   ├── errors.ts         Turns failures into messages for the user
│   ├── api.ts            Response helpers for the Route Handlers
│   ├── db.ts, env.ts     Database connection and validated environment variables
│   └── models/           Mongoose schemas
├── data/                 Seed data for the colors and switch parts
└── scripts/seed.mjs      Loads that seed data
```

Conventions:
- React component files use PascalCase. Every other file uses kebab-case, including the shadcn/ui components, which keep the names the shadcn CLI gives them.
- Every module in `lib/server/` starts with `import "server-only"`, so importing one from a Client Component fails the build.
- Environment variables are read only in `lib/server/env.ts`, which validates them with Zod.
- Server Actions and Route Handlers stay thin: parse the input with a schema from `lib/schemas.ts`, call a function in `lib/server/`, revalidate.
- A data function that acts for a user takes an `AuthenticatedUser`, which only `getCurrentUser()` and `requireUser()` in `lib/server/auth.ts` can create. The ownership checks live inside those functions, so no caller can skip them.
- Nothing leaves `lib/server/` as a Mongoose document. `dto.ts` copies named fields into plain objects, so the password hash and other internal fields cannot reach a page or an API response.

## REST API
Authenticate with the session cookie, or send `Authorization: Bearer <accessToken>` using the token from `POST /api/auth/login`.

| Method and path | Sign-in | What it does |
| --- | --- | --- |
| `POST /api/auth/register` | — | Creates an account |
| `POST /api/auth/login` | — | Starts a session and returns an `accessToken` |
| `POST /api/auth/logout` | — | Ends the cookie session |
| `GET`, `PATCH`, `DELETE /api/me` | Required | Reads, updates or deletes your account |
| `GET /api/colors` | — | The color catalog |
| `GET /api/switch-parts` | — | The switch parts with their color options |
| `GET /api/configs/popular?limit=6` | — | The most-saved designs; `limit=0` returns all of them |
| `GET /api/configs` | Required | Your saved designs |
| `POST /api/configs` | Optional | Saves a design |
| `GET`, `PATCH`, `DELETE /api/configs/:id` | Required | One of your own designs |
| `POST /api/orders` | Optional | Orders a saved design |

## Rendering and caching
The app uses Next.js Cache Components (`cacheComponents: true`). Pages don't use a single strategy: each part is rendered in the way that suits its data.

| Part | Strategy | Why |
| --- | --- | --- |
| Layout, footer and the static part of the navbar | SSG (prerendered at build time) | The same for every visitor |
| Colors and switch parts | ISR, cached for hours | They rarely change |
| Popular designs on `/` and `/inspiration` | ISR, cached for minutes | Public, but new designs should show up quickly |
| Login and account buttons in the navbar | SSR, inside `<Suspense>` | They depend on the session cookie |
| `/configurator` | SSR, with the catalog read from the cache | The template colors come from the URL |
| Color picker, dialogs and forms | Client Components | They react to every click |
| `/profile/*`, `/login` and `/register` | SSR, not cached | They depend on the user |

### Why this mix
- Public content is prerendered or cached, so pages load fast, work well for SEO and query MongoDB less often.
- Only the parts that depend on the user render on every request. Wrapping the navbar's session buttons in `<Suspense>` keeps the rest of each page static.
- No page uses pure client-side rendering (CSR), which would load more slowly and be worse for SEO.

### How the cache stays fresh
- Cached queries are the `"use cache"` functions in `lib/server/catalog.ts` and `lib/server/configs.ts`.
- Saving, deleting or ordering a design, or deleting an account, calls `updateTag(CONFIGS_TAG)` from the Server Action, so the popular designs update immediately. The Route Handlers call `revalidateTag(CONFIGS_TAG, "max")` instead (`updateTag` only works in Server Actions), so API writes show up after a background refresh.
- Logging in, logging out or changing the account calls `revalidatePath("/", "layout")`.
- Nothing clears `CATALOG_TAG`, so after editing colors or parts directly in MongoDB the old catalog can show for up to an hour.

## Deployment
The application is deployed to Fly.io from the project root. The comments in `fly.toml` and `Dockerfile` list the secrets and build arguments it needs.

## Contributing
We welcome contributions to enhance the functionality and user experience of CSSwitch Design Lab. To contribute, please follow these steps:

1) Fork the repository.
2) Create a new branch (`git checkout -b feature-branch`).
3) Make your changes.
4) Commit your changes (`git commit -m 'Add some feature'`).
5) Push to the branch (`git push origin feature-branch`).
6) Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or feedback, please contact us at oksana.klochak@gmail.com.

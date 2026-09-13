# CSSwitch Design Lab

## Overview
CSSwitch Design Lab is a user-friendly application designed to allow users to customize the colors of their Nintendo Switch consoles. Users can select their preferred colors, create orders, and save their configurations for future reference.

## Features
- **Color Selection:** Choose from a variety of colors for different parts of the Nintendo Switch console.
- **Order Creation:** Easily create and manage orders based on your custom color configurations.
- **Save Configurations:** Save your favorite configurations for quick access and future modifications.

## Tech stack
Next.js 16 (App Router with Cache Components), React 19, TypeScript, Tailwind CSS 4 with shadcn/ui, MongoDB with Mongoose, Zod and Vitest. The application lives in `web-next/`.

## Installation
You need Node.js 22 and a MongoDB server.

1) Clone the repository: `git clone https://github.com/CookieNr2/csswitch-design-lab.git`
2) Go to the application: `cd csswitch-design-lab/web-next`
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
Run these from `web-next/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server on http://localhost:3000 |
| `npm run build` | Production build. The database must be reachable, because pages are prerendered |
| `npm test` | Runs the unit tests (Vitest) |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Generates the route types, then runs the TypeScript compiler |
| `npm run seed` | Loads the colors and switch parts into empty collections |

## Project structure
```
web-next/
├── app/                  Routes. Code used by a single route sits next to it in _components/
│   ├── (auth)/           /login and /register, sharing one layout
│   ├── actions/          Server Actions
│   └── api/              REST route handlers
├── components/custom/    Components shared by more than one route
├── components/shadcn/    Generated shadcn/ui components
├── lib/                  Code that is safe to import anywhere: schemas, types, helpers
├── lib/server/           Server-only code: environment, database, auth, queries, mutations
├── data/                 Seed data for the colors and switch parts
└── scripts/seed.mjs      Loads that seed data
```

Conventions:
- React component files use PascalCase. Every other file uses kebab-case, including the shadcn/ui components, which keep the names the shadcn CLI gives them.
- Every module in `lib/server/` starts with `import "server-only"`, so importing one from a Client Component fails the build.
- Environment variables are read only in `lib/server/env.ts`, which validates them with Zod.

The `api/` (Express) and `web/` (React with Vite) folders contain the original version of the project, which `web-next` replaces.

## Deployment
The application is deployed to Fly.io from `web-next/`. The comments in `web-next/fly.toml` and `web-next/Dockerfile` list the secrets and build arguments it needs.

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

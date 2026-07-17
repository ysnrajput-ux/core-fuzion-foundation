# Fuzion Coaching Institute

A premium, production-grade Coaching ERP foundation.

> This repository is the **foundation phase**. Business modules (Student, Teacher, Parent, and Admin portals, CBT engine, Fee Management, etc.) will be built on top without modifying the architecture.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-first, oklch design tokens)
- **React Router v7** (SPA routing + route guards)
- **React Hook Form** (typed forms)
- **TanStack Query** (server-state cache)
- **Firebase**: Auth, Firestore, Storage, Cloud Functions, Hosting
- **Framer Motion** (motion system)
- **Chart.js** + **react-chartjs-2** (charts)
- **Sonner** (toasts)
- **Lucide** (icons)

## Getting Started

```bash
bun install
cp .env.example .env.local   # fill in your Firebase project keys
bun dev
```

Open http://localhost:8080.

Without Firebase env vars the UI renders, but auth/DB actions surface a
configuration error rather than silently failing.

## Firebase Setup

1. Create a Firebase project.
2. Enable **Authentication** (Email/Password), **Firestore**, **Storage**, **Functions**, **Hosting**.
3. Copy your web app config into `.env.local` (`VITE_FIREBASE_*`).
4. Deploy security rules and indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```
5. Deploy hosting:
   ```bash
   bun run build
   firebase deploy --only hosting
   ```

## Folder Structure

```
src/
├── app/                    App shell (App.tsx, provider composition)
├── config/                 Env & runtime configuration
├── constants/              App-wide constants (routes, roles, app info)
├── context/                Global React contexts (auth, theme, sidebar)
├── features/               Feature-owned code — grows with each module
│   └── auth/
├── hooks/                  Reusable hooks
├── layouts/                Page shells (AuthLayout, AppLayout)
├── lib/                    Small library glue (utils re-exports)
├── pages/                  Route components
│   ├── auth/
│   ├── dashboard/
│   └── errors/
├── routes/                 Router + guards (ProtectedRoute, PublicRoute)
├── services/
│   ├── firebase/           Firebase init + auth service
│   ├── firestore/          Generic CRUD helpers
│   ├── storage/            Upload/download helpers
│   └── functions/          Callable Cloud Functions wrapper
├── components/
│   ├── ui/                 Primitives: Button, Input, Card, Modal, Label
│   ├── common/             SearchBar, EmptyState, Pagination, PageHeader
│   ├── forms/              FormField
│   ├── tables/             DataTable
│   ├── charts/             Chart.js wrappers
│   ├── media/              FileUpload, ImagePreview, PdfPreview, VideoPlayer
│   ├── navigation/         Sidebar, Topbar, MobileNav, Breadcrumbs
│   └── feedback/           ErrorBoundary, Spinner, Skeleton, toast, FullPageLoader
├── theme/                  Design tokens (TS-side accessor)
├── types/                  Shared TypeScript types
├── utils/                  cn, format, error mapping
└── styles.css              Design system (Tailwind v4 + tokens)
```

## Roles

Four roles are defined in `src/types/user.ts` and `src/constants/roles.ts`:
`student`, `teacher`, `parent`, `admin`. Wire them into `ProtectedRoute` via
the `roles` prop.

## Adding a New Feature Module

1. Create `src/features/<module>/` with its own `components/`, `hooks/`, `services/`, `types.ts`.
2. Add pages under `src/pages/<module>/`.
3. Register routes in `src/routes/AppRouter.tsx` (under `<ProtectedRoute>` with role gating as needed).
4. Add navigation entries in `src/components/navigation/Sidebar.tsx` and `MobileNav.tsx`.
5. Extend Firestore security rules for any new collections.

## Deployment

Firebase Hosting is preconfigured. Any static host that serves `dist/` with an SPA fallback works.

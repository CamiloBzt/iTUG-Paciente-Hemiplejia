# iTUG Next.js Migration Design

## Decision

Migrate the single React dashboard file into a basic Next.js App Router project while preserving the existing visual language and chart behavior.

## Architecture

- `app/` owns the route shell, metadata, and global CSS.
- `components/dashboard/` owns each dashboard section as a focused React component.
- `data/` owns the embedded iTUG datasets.
- `lib/` owns shared colors and statistical helpers.

## Charting

The project keeps Recharts for this migration because the existing dashboard is already modeled around its primitives. This avoids unnecessary visual regression while still making later chart-library replacement possible section by section.

## Client Boundary

`components/dashboard/ItugDashboard.jsx` is marked as a client component because the dashboard uses Recharts and an interactive signal explorer.

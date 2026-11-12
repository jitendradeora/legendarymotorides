# legendary-moto-rides

Next.js App Router + React + Tailwind CSS project for Legendary Moto Rides.

## Development Server

```bash
npm run dev
```

The app runs on port `8443` by default.

## Project Structure

- `src/app/layout.tsx` — Root layout and global metadata
- `src/app/page.tsx` — Homepage
- `src/app/` — Inner routes for destinations, tours, calendar, insights, and policies
- `src/index.css` and `src/pages.css` — Global CSS and Tailwind CSS v4
- `src/components/` — Shared page UI
- `src/lib/` — Site config and content
- `package.json` — Dependencies and Next.js scripts
- `next.config.ts` — Next.js config and legacy redirects

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/postcss`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through `@tailwindcss/postcss`. `src/index.css` imports Tailwind with `@import "tailwindcss";`. Use Tailwind utility classes directly in JSX and put global CSS in `src/index.css` or `src/pages.css`.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export route pages and shared components as default exports where the file is a route entry.

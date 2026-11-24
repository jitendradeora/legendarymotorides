# legendary-moto-rides

Next.js App Router + React + Tailwind CSS project for Legendary Moto Rides.

## Development Server

```bash
npm run dev
```

The app runs on port `8443` by default.

## Project Structure

- `src/app/layout.tsx` — Root layout; metadata, tracking and schema come from WordPress Site Settings
- `src/app/page.tsx` — Homepage
- `src/app/` — Inner routes for destinations, tours, calendar, insights, and policies
- `src/app/api/` — Form routes that forward to Contact Form 7 (enquiry, join-tour, newsletter) and cache revalidation
- `src/index.css` and `src/pages.css` — Global CSS and Tailwind CSS v4
- `src/components/` — Shared page UI; `sections.tsx` holds the reusable sections (hero, intro, CTA, tour row)
- `src/lib/wp.ts` — WordPress GraphQL client and Contact Form 7 submit helper
- `src/lib/queries.ts` — GraphQL selections; `src/lib/api.ts` — typed data loaders
- `package.json` — Dependencies and Next.js scripts
- `next.config.ts` — Next.js config and legacy redirects

## Content comes from WordPress

Nothing on the site is hard-coded. All text, images, links and lists are loaded through WPGraphQL from the WordPress site in the parent folder (plugin: `wp-content/plugins/lmr-headless`).

- Set `WORDPRESS_URL` and `REVALIDATE_SECRET` in `.env.local` (the URL defaults to `http://legendarymotoridesnew.test` in development only).
- Pages are WordPress Pages edited through custom fields (no page editor). Repeating items are custom post types: destination, tour, departure, insight, team_member, faq, testimonial, video_testimonial.
- Images live in the WordPress Media Library. Do not add images to `public/`.
- To add a field: add it in the plugin's `inc/fields-*.php`, add it to `src/lib/queries.ts`, then use it in the component.
- Titles support `*accent*` markers and line breaks; render them with `RichTitle` from `src/lib/format.tsx`.

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

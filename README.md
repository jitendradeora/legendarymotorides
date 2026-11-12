# Legendary Moto Rides

Guided motorcycle tour website for Legendary Moto Rides, built with Next.js, React 19, TypeScript, and Tailwind CSS v4.

## Local setup

```bash
npm install
npm run dev
```

The site runs at [http://localhost:8443](http://localhost:8443).

Production build:

```bash
npm run build
npm start
```

## Project structure

- `src/app/` — Next.js App Router pages and the root layout
- `src/App.tsx` — Homepage
- `src/components/SitePages.tsx` — Inner pages, header, and footer
- `src/lib/` — Tours, destinations, company details, and schema

## Enquiry delivery

Enquiry forms validate required fields and open a message in the visitor's email app addressed to `info@legendarymotorides.com`. They do not store form data on this website.

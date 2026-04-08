# OpenChair

OpenChair is a simple MVP for helping people find nearby haircut availability fast.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Local mock data

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Analytics setup

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SITE_URL=https://openchair-six.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

This app uses:

- Vercel Analytics for traffic overview
- Google Analytics 4 for search, detail-view, call-click, booking-click, and website-click events

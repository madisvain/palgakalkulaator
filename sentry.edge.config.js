import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://0c4c8860638845a3a74da4c2507d45b5@o87060.ingest.sentry.io/4505591794499584",
  tracesSampleRate: 1.0,
});

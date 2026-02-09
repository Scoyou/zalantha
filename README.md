# Knights of Zalantha
Website for the Knights of Zalantha LARP.

## Overview
- Next.js (App Router) + Tailwind CSS
- Hosted on Vercel
- SES for contact form delivery
- Images hosted in S3 and served via AWS CloudFront
- Auth API for sign-in and password reset flows

## Getting Started

Create a `.env.local` with the values below (see Environment Variables).

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Required:
- `NEXT_PUBLIC_CLOUDFRONT_URL` - CloudFront base URL for images
- `NEXT_PUBLIC_SITE_URL` - Public site URL (used for metadata)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA v3 site key (contact form)
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v3 secret key (contact form)
- `AWS_REGION` - AWS region for SES (or `SES_REGION`)
- `CONTACT_FROM_EMAIL` - Verified SES from address for contact form
- `NEXT_PUBLIC_AUTH_API_BASE_URL` - Auth API base URL (see Auth API)
- `NEXT_PUBLIC_CHARACTER_API_BASE_URL` - Character API base URL (see Character API)
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID` - Cognito User Pool ID
- `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID` - Cognito app client ID
- `NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID` - Cognito identity pool ID
- `NEXT_PUBLIC_COGNITO_REGION` - AWS region for Cognito

## Auth API

Used for sign-in, sign-up, and password reset. The client calls Next API routes
under `/api/auth/*` which proxy to the Auth API to avoid CORS issues.

Expected API shape:
- `POST /login` -> `{ idToken, accessToken?, refreshToken?, expiresAt? }`
- `POST /signup`
- `POST /reset/request`
- `POST /reset/confirm`

## Character API (AWS serverless)

Character data is loaded from an AWS API backed by a serverless database. Configure:

- `NEXT_PUBLIC_CHARACTER_API_BASE_URL` - API Gateway base URL (ex: `https://abc123.execute-api.us-east-1.amazonaws.com/prod`)

Expected API shape:

- `GET /characters` -> `{ "items": Character[] }`
- `PUT /characters` -> `{ "items": Character[] }` (body)

Use API Gateway + Lambda + DynamoDB (or AppSync + DynamoDB) with a Cognito
authorizer so the app can pass the Cognito id token in the `Authorization`
header.

## SES (Contact form)

The contact form posts to `/api/contact`, which sends via SES. Configure
`RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `AWS_REGION` (or
`SES_REGION`), and `CONTACT_FROM_EMAIL`/`CONTACT_TO_EMAIL` in `.env.local`.

## Hosting
Frontend is hosted on Vercel. backend is serverless with AWS

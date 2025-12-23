# Knights of Zalantha
Website for the Knights of Zalantha LARP. 

## Dev setup
Site is hosted on netlify and using EmailJS for email service. Images are hosted in S3 served via AWS CloudFront.

### Getting Started

First, fill .env.local with the correct variables.

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

### Character API (AWS serverless)

Character data is loaded from an AWS API backed by a serverless database. Configure:

- `NEXT_PUBLIC_CHARACTER_API_BASE_URL` - API Gateway base URL (ex: `https://abc123.execute-api.us-east-1.amazonaws.com/prod`)

Expected API shape:

- `GET /characters` -> `{ "items": Character[] }`
- `PUT /characters` -> `{ "items": Character[] }` (body)

Use API Gateway + Lambda + DynamoDB (or AppSync + DynamoDB) with a Cognito
authorizer so the app can pass the Cognito id token in the `Authorization`
header.

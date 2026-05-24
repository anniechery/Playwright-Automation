# Playwright Automation

This repository contains Playwright automation tests for web and API scenarios.

## Setup

1. Install dependencies:

```bash
npm install
```

2. For local development, create a `.env` file with your credentials:

```
AUTHORIZATION = 'your_authorization_token'
APIKEY = 'your_api_key'
```

**Note:** Add `.env` to `.gitignore` to keep credentials private.

## Available scripts

- `npm test` — run Playwright tests
- `npm run test:report` — open the Playwright HTML report
- `npm run lint` — run ESLint over the TypeScript files

## Project structure

- `tests/` — Playwright test suites
- `playwright.config.ts` — Playwright configuration
- `tsconfig.json` — TypeScript compiler settings
- `.github/workflows/playwright.yml` — GitHub Actions CI pipeline

## GitHub Actions

A CI pipeline is configured in `.github/workflows/playwright.yml`.

It runs on pushes and pull requests to `main` and `master`, installs dependencies, and executes the Playwright tests. The Playwright HTML report is uploaded as an artifact on each run.

### Secrets

To use API credentials in GitHub Actions, configure repository secrets:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:
   - `AUTHORIZATION`: Your authorization token
   - `APIKEY`: Your API key

These secrets are inserted as environment variables during the workflow.

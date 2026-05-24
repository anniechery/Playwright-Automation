# Playwright Automation

This repository contains Playwright automation tests for web and API scenarios.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure any required environment values are available. For example:

```bash
export APIKEY=your_api_key_here
```

On Windows PowerShell:

```powershell
$env:APIKEY = 'your_api_key_here'
```

## Available scripts

- `npm test` — run Playwright tests
- `npm run test:report` — open the Playwright HTML report
- `npm run lint` — run ESLint over the TypeScript files

## Project structure

- `tests/` — Playwright test suites
- `playwright.config.ts` — Playwright configuration
- `tsconfig.json` — TypeScript compiler settings
- `.github/workflows/ci.yml` — GitHub Actions CI pipeline

## GitHub Actions

A sample pipeline is configured in `.github/workflows/ci.yml`.

It runs on pushes and pull requests to `main` and `master`, installs dependencies, executes `npm test`, and uploads the Playwright report on failure.

# KatoSuite UI Components

This package provides a self-contained React implementation of the KatoSuite early childhood education dashboard. It includes a primary `KatoSuite` component together with supporting navigation, dashboard, and utility components that showcase the platform experience across different subscription plans.

## Features

- Dashboard with subscription-aware statistics, quick actions, and compliance summaries
- Navigation sidebar that reflects plan entitlements and upsell opportunities
- Modular sub-pages for lesson planning, child profiles, compliance monitoring, and parent communications
- Lightweight authentication and service connection hooks for demonstration purposes
- Headless UI primitives (`Button`, `Card`, `Badge`, `Progress`) that match the sample design tokens

## Development

Install dependencies and type-check the project:

```bash
npm install
npm run build
```

The `build` script runs TypeScript in `--noEmit` mode to ensure the codebase type-checks successfully.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager. Key commands:

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production  
- `pnpm run preview` - Preview production build
- `pnpm run check` - Run Svelte type checking
- `pnpm run check:watch` - Run Svelte type checking in watch mode
- `pnpm run lint` - Run ESLint and Prettier checks
- `pnpm run format` - Format code with Prettier
- `pnpm run test` - Run all tests (unit + e2e)
- `pnpm run test:unit` - Run unit tests with Vitest
- `pnpm run test:e2e` - Run e2e tests with Playwright

## Project Architecture

### Tech Stack
- **SvelteKit** - Full-stack web framework with SSR/SSG capabilities
- **Svelte 5** - Component framework with new runes syntax
- **TypeScript** - Strict type checking enabled
- **Tailwind CSS 4** - Utility-first CSS framework
- **Paraglide JS** - Type-safe i18n solution with compile-time optimizations
- **Vitest** - Unit testing framework with browser testing support
- **Playwright** - E2e testing framework

### Internationalization (i18n)
The project uses **Paraglide JS** for internationalization:
- Message files: `messages/{locale}.json` (en, fr, ar, es)
- Generated code: `src/lib/paraglide/` (auto-generated, don't edit)
- Configuration: `project.inlang/settings.json`
- Middleware integration in `src/hooks.server.ts` handles locale detection
- URL rerouting in `src/hooks.ts` manages localized paths

### Testing Strategy
**Dual testing setup with Vitest:**
- **Client tests**: Browser environment using Playwright, includes `*.svelte.{test,spec}.{js,ts}` files
- **Server tests**: Node environment, includes regular `*.{test,spec}.{js,ts}` files
- **E2e tests**: Playwright tests in `e2e/` directory

### Code Style
- **Prettier**: Uses tabs, single quotes, no trailing commas, 100 char width
- **ESLint**: TypeScript + Svelte rules with Prettier integration
- **File naming**: Standard SvelteKit conventions (`+page.svelte`, `+layout.svelte`, etc.)
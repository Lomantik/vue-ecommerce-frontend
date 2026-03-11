# Vue 3 eCommerce Frontend Demo

Production-like eCommerce SPA built with Vue 3 + TS + Vite.

Live Demo:
https://lomantik.github.io/vue-ecommerce-frontend/

---

## Project Goal

Demonstrate architecture and frontend logic of a scalable eCommerce platform, including:

- SPA architecture
- Complex product types
- Dynamic attribute dependency logic
- Mock API layer (replaceable with real backend)
- CI/CD pipeline
- Performance considerations

---

## Tech Stack

- Vue 3 (Composition API)
- Vite
- Pinia (state management)
- Vue Router
- SCSS
- Vitest (unit tests)
- Playwright (E2E)
- GitHub Actions (CI/CD)

---

## Implemented Product Types

### 1. Simple Product
Basic standalone product.

### 2. Grouped Product
Collection of simple products with independent quantity selection.

### 3. Configurable Product

Complex product that:

- Combines multiple Simple products
- Allows attribute-based selection (e.g. size, color)
- Dynamically disables invalid combinations
- Reactively recalculates availability on each attribute change

The attribute selection engine ensures that only valid product combinations remain selectable at any time.

This logic mimics real-world Magento-style configurable products.

---

## Architecture Highlights

- Modular folder structure
- Domain-driven component separation
- Reusable composables
- Mock API abstraction layer
- Centralized state management via Pinia
- Clear separation of UI and business logic

---

## CI/CD

GitHub Actions pipeline:

1. Install dependencies
2. Run unit tests
3. Build project
4. Deploy to GitHub Pages (on merge)

Workflow file:
.github/workflows/ci_deploy.yml

---

## Future Improvements

- SSR version (Nuxt 3)
- Full backend integration (Laravel API)
- Cart & checkout logic
- Authentication layer
- TypeScript migration

---

## Author

Frontend & Fullstack Engineer with 16+ years of commercial experience.
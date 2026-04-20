# 🛒 Vue 3 eCommerce Frontend

> Production-grade eCommerce SPA showcasing advanced product configurations, dynamic UIs, and enterprise-level architecture.

[![CI Status](https://img.shields.io/github/actions/workflow/status/lomantik/vue-ecommerce-frontend/ci_deploy.yml?branch=main&label=CI)](https://github.com/lomantik/vue-ecommerce-frontend/actions)
[![Deploy Status](https://img.shields.io/github/actions/workflow/status/lomantik/vue-ecommerce-frontend/ci_deploy.yml/deployed?branch=main&label=Deployed)](https://lomantik.github.io/vue-ecommerce-frontend/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-green.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Live Demo

**Try it live:** [lomantik.github.io/vue-ecommerce-frontend](https://lomantik.github.io/vue-ecommerce-frontend/)

---

## 🎯 What Makes This Special

This isn't just another demo — it's a **production-ready architecture** demonstrating how to build complex eCommerce platforms at scale.

### ✨ Key Features

| Feature                         | Description                                                         |
|---------------------------------|---------------------------------------------------------------------|
| 🧩 **3 Product Types**          | Simple, Grouped, and Configurable products with full purchase flows |
| 🎨 **Smart Product Gallery**    | Image zoom, lightbox, responsive slider with Swiper.js              |
| 🔄 **Dynamic Attribute Engine** | Real-time invalid combination blocking (like Magento)               |
| 📱 **Fully Responsive**         | Mobile-first design with Bootstrap 5                                |
| 🧪 **Test Coverage**            | Unit tests (Vitest) + E2E tests (Playwright)                        |
| ⚡ **Blazing Fast**              | Vite 7 for instant HMR and optimized builds                         |
| 🚢 **CI/CD Ready**              | Automated testing, linting, and GitHub Pages deployment             |

---

## 🛍️ Product Types Implemented

### 1. Simple Product
The foundation — standalone products with basic purchase functionality.

### 2. Grouped Product
A collection of related products that can be purchased together or individually, with independent quantity controls.

### 3. Configurable Product ⭐
**The crown jewel** — a sophisticated product system that:
- Combines multiple simple products under one parent
- Enables attribute-based selection (size, color, etc.)
- **Dynamically disables invalid combinations** in real-time
- Recalculates availability reactively on every attribute change
- Mimics enterprise-grade systems like Magento's configurable products

```
Example: Select "Blue" → "Large" size becomes unavailable
         Select "Red" → "Large" size becomes available
```

---

## 🏗️ Architecture & Tech Stack

### Core Technologies

| Layer                | Technology                                    |
|----------------------|-----------------------------------------------|
| **Framework**        | Vue 3.5+ (Composition API + `<script setup>`) |
| **Language**         | TypeScript 5.x (100% type coverage)           |
| **Build Tool**       | Vite 7 (latest)                               |
| **State Management** | Pinia + PersistedState plugin                 |
| **Routing**          | Vue Router 5.0                                |
| **Styling**          | SCSS + Bootstrap 5.3                          |
| **UI Components**    | Custom components + Swiper.js                 |

### Developer Experience

- **Testing:** Vitest (unit) + Playwright (E2E)
- **Linting:** ESLint + oxlint + Prettier
- **Type Checking:** vue-tsc with strict mode
- **Dev Tools:** Vite Vue Devtools

### Project Structure

```
src/
├── api/              # API layer (mock + real backend ready)
├── components/       # Reusable UI components
│   ├── ui/          # Atomic UI components
│   ├── product/     # Product-specific components
│   ├── layout/      # Layout components (header, footer, nav)
│   └── blocks/      # Page building blocks
├── pages/           # Page components (Home, Shop, Product, etc.)
├── stores/          # Pinia state management
├── router/          # Vue Router configuration
├── services/        # Business logic services
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

---

## 🎬 Component Showcase

### Product Components
- `ProductImageGallery` — Responsive image gallery with zoom
- `ProductLightbox` — Full-screen image viewer
- `ProductActionsSimple/Grouped/Configurable` — Purchase flows per product type
- `ProductTabs` — Description, specifications, reviews
- `ProductPrice` — Dynamic pricing with discounts

### Layout Components
- `LayoutHeader` — Search, cart, user actions
- `LayoutMenu` — Category navigation
- `LayoutFooter` — Links, newsletter, social
- `HeroBlock` — Promotional banners

### UI Components
- `ProductCard` — Reusable product card
- `ProductSlider` — Swiper-based carousel
- `RatingIndicator` — Star ratings
- `ProductQuantity` — Quantity selector

---

## 🔄 CI/CD Pipeline

Automated workflow ensuring code quality:

```
┌─────────────┐    ┌────────────┐    ┌──────────┐    ┌────────────┐
│   Push to   │ -> │  Lint &    │ -> │ Type     │ -> │ Build &    │
│   Main      │    │  Unit Test │    │ Check    │    │ Deploy     │
└─────────────┘    └────────────┘    └──────────┘    └────────────┘
```

**Workflow:** [`.github/workflows/ci_deploy.yml`](.github/workflows/ci_deploy.yml)

---

## 📦 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+

### Installation

```bash
# Clone repository
git clone https://github.com/lomantik/vue-ecommerce-frontend.git
cd vue-ecommerce-frontend

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Lint and format
npm run lint
npm run format
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Test Coverage

| Test Type     | Tool            | Status        |
|---------------|-----------------|---------------|
| Unit Tests    | Vitest          | ✅ Implemented |
| E2E Tests     | Playwright      | ✅ Implemented |
| Type Checking | vue-tsc         | ✅ Strict mode |
| Code Quality  | ESLint + oxlint | ✅ Configured  |

---

## 🎯 Use Cases

This project demonstrates:

1. **Advanced State Management** — Complex product configurations with Pinia
2. **Reactive UI Patterns** — Real-time attribute validation and updates
3. **Component Architecture** — Scalable, reusable component design
4. **Type Safety** — Full TypeScript coverage with strict mode
5. **Testing Strategy** — Comprehensive unit and E2E test coverage
6. **CI/CD Implementation** — Production-ready deployment pipeline
7. **Performance Optimization** — Vite-based fast builds and HMR

---

## 🚧 Future Roadmap

- [ ] Nuxt 3 SSR version for improved SEO
- [ ] Full backend integration (Laravel/Symfony API)
- [ ] Complete checkout flow with payment integration
- [ ] User authentication & order history
- [ ] Advanced filtering & search with Elasticsearch
- [ ] PWA support with offline capabilities

---

## 👨‍💻 Author

**Frontend & Fullstack Engineer** with 15+ years of commercial experience.

Specializing in:
- Enterprise-scale Vue.js applications
- eCommerce platform architecture
- Full-stack development (Node.js, Laravel)
- CI/CD and DevOps automation

---

## 📄 License

MIT License — feel free to use this project as a reference for your own eCommerce applications.

---

**Built with ❤️ using Vue 3 + TypeScript**

<div align="center">

# 🛒 React Store with Advanced Testing

[![Tests](https://img.shields.io/badge/tests-53%20passing-brightgreen.svg)](https://github.com/Serg-Ale/jest-testing-react)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)](https://reactjs.org/)
[![Testing Library](https://img.shields.io/badge/Testing%20Library-16.3.0-red.svg)](https://testing-library.com/)
[![Husky](https://img.shields.io/badge/🐕%20Husky-Git%20Hooks-green.svg)](https://typicode.github.io/husky/)

A modern React e-commerce application built with **Vite + TypeScript** showcasing best practices for testing, code quality, and developer experience. This project demonstrates comprehensive testing strategies and automated quality checks via **Husky** git hooks.


</div>



## 📸 Git Hooks in Action

Our automated quality gates ensure code integrity before every push. This is a real example of the **Husky** pre-push hook preventing broken code from reaching the remote repository:

```bash
🧪 Running tests before push...
> react-use-dev@0.0.0 test
> jest

PASS  src/context/cart/cart.context.test.tsx
PASS  src/components/Footer/Footer.test.tsx
PASS  src/components/Header/Header.test.tsx
PASS  src/screens/Cart/__tests__/cart.item-management.test.tsx
PASS  src/utils/index.test.ts
PASS  src/screens/Cart/__tests__/cart.empty-state.test.tsx
PASS  src/screens/Cart/__tests__/cart.checkout.test.tsx
PASS  src/screens/Cart/__tests__/cart.test-suite.test.tsx
PASS  src/screens/Cart/__tests__/cart.screen.test.tsx

Test Suites: 9 passed, 9 total
Tests:       53 passed, 53 total
Snapshots:   0 total
Time:        2.627 s

🔍 Running type check...
> tsc -b && vite build
✓ Build successful
```

-----

## 🚀 Quick Start

### Prerequisites

  - Node.js 18+
  - pnpm (recommended) or npm

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Serg-Ale/jest-testing-react.git
cd jest-testing-react

# 2. Install dependencies (Husky git hooks are set up automatically)
pnpm install

# 3. Start the dev server and mock API in separate terminals
pnpm dev
pnpm server
```

### 🌐 Access the Application

  - **Frontend**: http://localhost:5173
  - **Mock API**: http://localhost:3001

-----

## ⚙️ Available Commands

| Command | Description |
|:---|:---|
| `pnpm dev` | Starts the development server with hot reload. |
| `pnpm build` | Creates a production build with a full TypeScript check. |
| `pnpm test` | Runs the entire test suite once. |
| `pnpm test:watch` | Runs tests in watch mode for active development. |
| `pnpm test:coverage` | Generates a detailed test coverage report. |
| `pnpm lint` | Checks code quality and style. |
| `pnpm lint:fix` | Automatically fixes linting issues. |
| `pnpm format` | Formats all code with Prettier for consistency. |
| `pnpm server` | Starts the mock JSON Server API. |
| `pnpm preview` | Previews the production build locally. |

-----

## 🧪 Testing & Quality

This project is built on a foundation of robust testing practices and automated quality enforcement.

### Key Principles

  - **User-Centric Tests**: We use **React Testing Library** and **`user-event`** to test user behavior and public APIs, not implementation details.
  - **Automated Gates**: **Husky** git hooks prevent broken code from being pushed, ensuring the main branch is always stable.
  - **Test Isolation**: Each test is self-contained with no shared state, leading to **zero flaky tests**.
  - **Centralized Mocks**: A single `jest.setup.ts` file manages global mocks for `fetch` and `react-router`, providing consistency and reducing boilerplate.
  - **Semantic Queries**: We prioritize **`getByRole`** and other semantic queries over test IDs for more robust and accessible tests.

### Example Test

Here is a clear, concise example demonstrating our testing approach:

```tsx
import { screen } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { renderWithProviders } from '@/test-utils/render';
import { mockNavigate } from '@/test-utils/routerMocks';

describe('Header', () => {
  test('navigates to home when clicking logo', async () => {
    const { user } = renderWithProviders(<Header />);
    
    await user.click(screen.getByRole('img', { name: /logo/i }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
```

### Test Metrics

  - ✅ **53 passing tests** across 9 test suites.
  - ✅ **\~2.6s test execution time** for fast feedback.
  - ✅ **100% pre-push validation**.

-----

## 🧩 Tech Stack & Architecture

### Core Technologies

  - **[React 19](https://react.dev/)**
  - **[Vite](https://vitejs.dev/)**
  - **[TypeScript 5.8.3](https://www.typescriptlang.org/)**
  - **[React Router v7](https://reactrouter.com/)**
  - **[Tailwind CSS](https://tailwindcss.com/)**
  - **[JSON Server](https://github.com/typicode/json-server)**

### Testing & Quality Tools

  - **[Jest](https://jestjs.io/)**
  - **[@testing-library/react](https://testing-library.com/)**
  - **[Husky](https://typicode.github.io/husky/)**
  - **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)**

### 📂 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/             # Global state management
├── screens/             # Page components
├── test-utils/          # Shared testing utilities & mocks
├── utils/               # Business logic utilities
└── types/               # TypeScript type definitions
```

-----

## 📈 Roadmap & Future Enhancements

  - [ ] **Accessibility Testing**: Integrate `jest-axe` for a11y validation.
  - [ ] **E2E Testing**: Add Playwright or Cypress for full user journey validation.
  - [ ] **API Mocking**: Replace JSON Server with **MSW** for realistic API simulation.
  - [ ] **CI/CD Pipeline**: Automate testing and deployment with GitHub Actions.

---

<div align="center">

### This Project Demonstrates...

- **Production-Ready React Development** with modern tooling.
- A **Comprehensive Testing Strategy** from unit to behavioral tests.
- **Quality Automation** with git hooks and validation.
- **Clean Architecture** and proper separation of concerns.
- **TypeScript Mastery** for scalable, type-safe development.

**Ready to explore modern React testing?**
**Clone this repo and start building! 🚀**

[![GitHub Stars](https://img.shields.io/github/stars/Serg-Ale/jest-testing-react?style=social)](https://github.com/Serg-Ale/jest-testing-react)
[![Follow on GitHub](https://img.shields.io/github/followers/Serg-Ale?style=social)](https://github.com/Serg-Ale)

</div>

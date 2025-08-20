# Git Hooks Setup with Husky

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality through git hooks.

## 🪝 Active Hooks

### Pre-commit Hook (`.husky/pre-commit`)

Runs automatically when you commit code:

- **ESLint**: Fixes code style issues automatically
- **Prettier**: Formats code consistently
- **Staged files only**: Only processes files you're committing

```bash
# This happens automatically on git commit
npx lint-staged
```

### Pre-push Hook (`.husky/pre-push`)

Runs automatically when you push code:

- **Full test suite**: Ensures all tests pass
- **Type checking**: Verifies TypeScript compilation
- **Build verification**: Confirms the project builds successfully

```bash
# This happens automatically on git push
pnpm test
pnpm build
```

## 🛠 Manual Commands

### Code Quality

```bash
# Fix linting issues
pnpm lint:fix

# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🚫 Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook (not recommended)
git commit --no-verify -m "emergency fix"

# Skip pre-push hook (not recommended)
git push --no-verify
```

## 🔧 Configuration Files

- **`.husky/`**: Git hook scripts
- **`.prettierrc`**: Code formatting rules
- **`.prettierignore`**: Files to ignore during formatting
- **`package.json`**: lint-staged configuration

## 📈 Benefits

1. **Consistent Code Style**: Prettier ensures uniform formatting
2. **Code Quality**: ESLint catches potential issues early
3. **Reliable Deployments**: Tests must pass before code reaches remote
4. **Type Safety**: TypeScript compilation verified on push
5. **Automated Workflow**: No manual steps needed

## 🚨 Troubleshooting

### Hook Not Running

```bash
# Reinstall hooks
pnpm prepare
```

### Tests Failing

```bash
# Run tests to see failures
pnpm test

# Run specific test file
pnpm test src/path/to/test.ts
```

### Build Errors

```bash
# Check TypeScript errors
pnpm build

# Check for type issues
npx tsc --noEmit
```

The hooks help maintain code quality and prevent broken code from reaching the repository. They run automatically and should not interfere with normal development workflow.

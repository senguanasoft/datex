# Contributing to DateX

Thank you for your interest in contributing to DateX! This guide will help you get started with contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm, yarn, or pnpm
- Git

### Development Setup

1. **Fork the repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/senguanasoft/datex.git
   cd datex
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

### Project Structure

```
datex/
├── src/                    # Source code
│   ├── DateRangePicker.ts  # Main class
│   ├── styles/             # SCSS styles
│   └── index.ts            # Main export
├── docs/                   # Documentation (VitePress)
├── dist/                   # Built files
├── tests/                  # Test files
└── examples/               # Example implementations
```

## Development Workflow

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write code following our style guide
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**

   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:

```bash
git commit -m "feat: add time picker support"
git commit -m "fix: resolve calendar navigation issue"
git commit -m "docs: update installation guide"
```

## Types of Contributions

### 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Minimal steps to reproduce the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, DateX version
- **Code example**: Minimal code that demonstrates the issue

### ✨ Feature Requests

For feature requests, please include:

- **Use case**: Why is this feature needed?
- **Description**: Detailed description of the feature
- **Examples**: How would the API look?
- **Alternatives**: Any alternative solutions considered

### 📝 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples or use cases
- Improve API documentation
- Translate documentation

### 🧪 Tests

Help improve test coverage:

- Add unit tests for existing functionality
- Add integration tests
- Add visual regression tests
- Improve test utilities

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use meaningful variable and function names

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### CSS/SCSS

- Use SCSS for styling
- Follow BEM methodology for class names
- Ensure responsive design
- Support dark mode
- Consider accessibility

### Testing

- Write tests for new features
- Maintain existing test coverage
- Use descriptive test names
- Test edge cases

## Documentation

### API Documentation

When adding new features:

1. Update TypeScript interfaces
2. Add JSDoc comments
3. Update the API reference docs
4. Add usage examples

### Guides and Examples

- Keep examples simple and focused
- Include complete, working code
- Explain the "why" not just the "how"
- Test examples to ensure they work

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite
4. Build and test the package
5. Create release notes
6. Tag the release
7. Publish to npm

## Getting Help

### Questions

- Check existing [GitHub Issues](https://github.com/senguanasoft/datex/issues)
- Start a [GitHub Discussion](https://github.com/senguanasoft/datex/discussions)
- Read the [documentation](https://datex-docs.vercel.app)

### Development Help

- Join our development discussions
- Ask questions in issues or discussions
- Reach out to maintainers

## Recognition

Contributors will be:

- Listed in the `CONTRIBUTORS.md` file
- Mentioned in release notes
- Given credit in documentation

## License

By contributing to DateX, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DateX! 🎉

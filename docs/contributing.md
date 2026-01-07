# Contributing to DateX

Thank you for your interest in contributing to DateX! This guide will help you get started with contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/datex.git
   cd datex
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start development:

   ```bash
   pnpm run dev
   ```

5. Run tests:
   ```bash
   pnpm test
   ```

## Project Structure

```
datex/
├── src/                 # Source code
│   ├── datex.ts        # Main DateX class
│   ├── datex.scss      # Styles
│   └── index.ts        # Entry point
├── docs/               # Documentation
├── dev/                # Development examples
├── dist/               # Built files
└── tests/              # Test files
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards
3. Add tests for new functionality
4. Update documentation if needed
5. Run tests to ensure everything works:
   ```bash
   pnpm test
   pnpm run build
   ```

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and small

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting
- Test in multiple browsers when possible
- Include accessibility testing

## Submitting Changes

### Pull Request Process

1. Push your changes to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request on GitHub
3. Fill out the pull request template
4. Wait for review and address feedback

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Documentation**: Update docs if you changed APIs
- **Breaking Changes**: Clearly mark any breaking changes

## Types of Contributions

### Bug Reports

- Use the GitHub issue template
- Include steps to reproduce
- Provide browser/OS information
- Include code examples when possible

### Feature Requests

- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity
- Be open to discussion and alternatives

### Documentation

- Fix typos and improve clarity
- Add examples and use cases
- Update API documentation
- Improve accessibility documentation

### Code Contributions

- Bug fixes
- New features
- Performance improvements
- Accessibility enhancements
- Test coverage improvements

## Coding Standards

### TypeScript

```typescript
// Good: Clear interface definitions
interface DatexOptions {
  startDate?: Date;
  endDate?: Date;
  autoApply?: boolean;
}

// Good: Descriptive function names
function calculateChosenLabel(): void {
  // Implementation
}
```

### CSS/SCSS

```scss
// Good: BEM-style naming
.datex-picker {
  &__calendar {
    // Styles
  }

  &__button {
    &--primary {
      // Styles
    }
  }
}
```

### Documentation

```javascript
/**
 * Sets the start date for the picker
 * @param date - The new start date
 * @example
 * picker.setStartDate(new Date('2024-01-01'));
 */
setStartDate(date: Date): void {
  // Implementation
}
```

## Release Process

DateX follows semantic versioning:

- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backwards compatible
- **Patch** (1.0.1): Bug fixes, backwards compatible

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

### Communication

- Use GitHub issues for bug reports and feature requests
- Use GitHub discussions for questions and ideas
- Be patient with response times
- Provide context and examples

## Getting Help

If you need help contributing:

- Check existing issues and documentation
- Ask questions in GitHub discussions
- Look at recent pull requests for examples
- Reach out to maintainers if needed

## Recognition

Contributors are recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Documentation credits

Thank you for contributing to DateX! 🎉

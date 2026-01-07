# Deployment Guide

This guide covers how to deploy DateX library to npm and the documentation to Vercel.

## 📦 Publishing to NPM

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **NPM CLI**: Install npm CLI and login
   ```bash
   npm login
   ```

### Automated Publishing

Use the provided publish script:

```bash
# Make script executable (Unix/Mac)
chmod +x scripts/publish.js

# Run publish script
node scripts/publish.js
```

The script will:

- ✅ Check npm login status
- 🧪 Run tests
- 🔍 Run linting
- 🏗️ Build the package
- 📦 Publish to npm
- 🏷️ Create git tag

### Manual Publishing

If you prefer manual control:

```bash
# 1. Run tests
npm test

# 2. Build the package
npm run build

# 3. Publish (dry run first)
npm publish --dry-run

# 4. Publish for real
npm publish

# 5. Create git tag
git tag v1.0.0
git push origin v1.0.0
```

### Version Management

Follow [Semantic Versioning](https://semver.org/):

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

## 🚀 Deploying Documentation to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from project root**

   ```bash
   cd libs/datex
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (first time)
   - Project name: **datex-docs**
   - Directory: **docs** (or leave empty if vercel.json is configured)

### Method 2: GitHub Integration

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "feat: add documentation"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: VitePress
     - **Build Command**: `npm run docs:build`
     - **Output Directory**: `docs/.vitepress/dist`
     - **Install Command**: `npm install`

3. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

### Method 3: Manual Deployment

1. **Build documentation locally**

   ```bash
   cd docs
   npm install
   npm run build
   ```

2. **Deploy dist folder**
   ```bash
   vercel --prod docs/.vitepress/dist
   ```

## ⚙️ Vercel Configuration

The `vercel.json` file is already configured with:

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "framework": "vitepress"
}
```

### Custom Domain Setup

1. **Add domain in Vercel dashboard**

   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `datex-docs.com`)

2. **Configure DNS**

   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers

3. **Update package.json**
   ```json
   {
     "homepage": "https://your-custom-domain.com"
   }
   ```

## 🔄 Continuous Deployment

### Automatic Deployment

Once connected to GitHub, Vercel will automatically:

- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Build and deploy documentation

### Branch Protection

Set up branch protection rules:

- Require pull request reviews
- Require status checks (tests, linting)
- Require branches to be up to date

## 📊 Monitoring and Analytics

### Vercel Analytics

Enable analytics in Vercel dashboard:

- Go to Project Settings → Analytics
- Enable Web Analytics
- View performance metrics

### Error Monitoring

Monitor deployment errors:

- Check Vercel dashboard for build logs
- Set up notifications for failed deployments
- Monitor function logs if using serverless functions

## 🔧 Troubleshooting

### Common Issues

**Build fails on Vercel:**

```bash
# Check build locally first
npm run docs:build

# Check Node.js version compatibility
node --version
```

**Documentation not updating:**

- Clear Vercel cache: `vercel --prod --force`
- Check if build command is correct
- Verify output directory path

**NPM publish fails:**

```bash
# Check if package name is available
npm view datex

# Check npm login status
npm whoami

# Verify package.json is valid
npm pack --dry-run
```

### Getting Help

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 📚 [NPM Documentation](https://docs.npmjs.com/)
- 🐛 [Create an issue](https://github.com/senguanasoft/datex/issues)

## 📋 Deployment Checklist

### Before Publishing

- [ ] All tests pass
- [ ] Linting passes
- [ ] Documentation is up to date
- [ ] Version number is updated
- [ ] CHANGELOG.md is updated
- [ ] Build succeeds locally

### After Publishing

- [ ] Verify package on npmjs.com
- [ ] Test installation: `npm install datex`
- [ ] Check documentation deployment
- [ ] Create GitHub release
- [ ] Announce on social media/blog

### Regular Maintenance

- [ ] Monitor download statistics
- [ ] Respond to issues and PRs
- [ ] Keep dependencies updated
- [ ] Monitor security vulnerabilities
- [ ] Update documentation as needed

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev                 # Start dev server
npm run docs:dev           # Start docs dev server

# Building
npm run build              # Build library
npm run docs:build         # Build documentation

# Testing
npm test                   # Run tests
npm run lint               # Run linting

# Publishing
node scripts/publish.js    # Automated publish
npm publish               # Manual publish

# Deployment
vercel                    # Deploy to Vercel
vercel --prod            # Deploy to production
```

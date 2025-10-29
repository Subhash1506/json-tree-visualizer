# 🐙 GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in top right → "New repository"
3. Configure:
   - **Name**: `json-tree-visualizer`
   - **Description**: `Interactive JSON Tree Visualizer with React Flow - Visualize, search, and explore JSON data`
   - **Visibility**: Public
   - **Initialize**: ❌ Don't initialize with README (we already have files)
4. Click "Create repository"

## Step 2: Push Your Code

GitHub will show you commands. Use these:

```bash
# Navigate to your project (if not already there)
cd C:\Users\rohit\OneDrive\Desktop\Tree

# Add the remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/json-tree-visualizer.git

# Rename branch to main (optional, modern convention)
git branch -M main

# Push your code
git push -u origin main
```

## Step 3: Configure Repository Settings

### Add Topics (for discoverability)
1. Go to your repository on GitHub
2. Click the gear icon next to "About"
3. Add topics:
   - `react`
   - `javascript`
   - `json`
   - `visualization`
   - `tree`
   - `react-flow`
   - `vite`
   - `json-parser`

### Update Repository Description
Set description: "🌳 Interactive JSON Tree Visualizer - Visualize, search, and explore JSON data with a beautiful hierarchical tree interface"

### Add Website (after deployment)
After deploying to Netlify/Vercel, add the deployment URL to repository settings.

## Step 4: Deploy Automatically

### Option A: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your repository
5. Settings are auto-detected from `netlify.toml`
6. Click "Deploy"
7. Get your URL: `https://your-app.netlify.app`

### Option B: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Settings are auto-detected from `vercel.json`
5. Click "Deploy"
6. Get your URL: `https://your-app.vercel.app`

## Step 5: Add Deployment Badge

After deployment, add a badge to README.md:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE/deploys)
```

Or for Vercel:
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/json-tree-visualizer)
```

## Step 6: Create a GitHub Pages Deployment (Optional)

If you want to host on GitHub Pages:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/json-tree-visualizer/',
   });
   ```

3. **Add script to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from branch"
   - Branch: `gh-pages`, folder: `/ (root)`
   - Save

Your site will be at: `https://YOUR_USERNAME.github.io/json-tree-visualizer/`

## Step 7: Add Useful GitHub Files

### Create .github/workflows/deploy.yml for CI/CD

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
```

### Add Issue Templates
Create `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`

### Add CONTRIBUTING.md
Guide for contributors

## Repository Structure Best Practices

Your repository now contains:
- ✅ Source code
- ✅ Documentation (README, guides)
- ✅ Configuration files
- ✅ Git history with clean commits
- ✅ .gitignore for node_modules

## Final Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Topics added
- [ ] Description set
- [ ] Deployed to hosting platform
- [ ] Deployment URL added to repository
- [ ] Badge added to README (optional)
- [ ] Repository made public
- [ ] Repository URL shared

## Example Repository URLs

After setup, you'll have:
- **GitHub**: `https://github.com/YOUR_USERNAME/json-tree-visualizer`
- **Live Demo**: `https://your-app.netlify.app` or `https://your-app.vercel.app`
- **Docs**: Available in repository

## Share Your Project

Once deployed, share on:
- LinkedIn
- Twitter/X
- Dev.to
- Your portfolio
- Reddit (r/reactjs, r/webdev)

## Example README Badge Section

```markdown
# 🌳 JSON Tree Visualizer

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-app.netlify.app)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/YOUR_USERNAME/json-tree-visualizer)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
```

---

**You're all set! Your project is now professional and ready to showcase! 🎉**

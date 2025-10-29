# 🚀 Deployment Guide

## Quick Deployment Options

### Option 1: Netlify (Recommended)

1. **Sign up at [Netlify](https://netlify.com)**

2. **Drag & Drop Method:**
   ```bash
   npm run build
   ```
   - Drag the `dist` folder to Netlify dashboard

3. **Git Method:**
   - Push code to GitHub
   - Connect repository in Netlify
   - It will auto-detect settings from `netlify.toml`

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Or via Git:**
   - Push to GitHub
   - Import project in Vercel dashboard

### Option 3: GitHub Pages

1. **Update `vite.config.js`:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',  // Add this line
   });
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json` scripts:**
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Any Static Host

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to any static hosting service:
   - Cloudflare Pages
   - AWS S3
   - Firebase Hosting
   - Surge.sh
   - Render

## Environment Variables

No environment variables required! This is a purely client-side application.

## Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the production build at `http://localhost:4173`

## Troubleshooting

### Blank page after deployment?
- Check if base path is correct in `vite.config.js`
- Ensure all routes redirect to `index.html`

### Assets not loading?
- Verify `base: './'` in `vite.config.js` for relative paths

### Build fails?
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires v16+)

## Post-Deployment Checklist

- ✅ Test JSON input functionality
- ✅ Test tree visualization
- ✅ Test search feature
- ✅ Test dark/light mode toggle
- ✅ Test download feature
- ✅ Test on mobile devices
- ✅ Share the URL!

---

**Happy Deploying! 🎉**

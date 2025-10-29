# 🚀 Deploy to Vercel - Step by Step

## Method 1: Web Interface (Recommended - Easiest)

### Step 1: Push to GitHub First

```bash
# Create a new repository on GitHub at https://github.com/new
# Name it: json-tree-visualizer

# Then run these commands:
git remote add origin https://github.com/YOUR_USERNAME/json-tree-visualizer.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and use **GitHub** to sign in
3. Click "Add New..." → "Project"
4. Click "Import" next to your `json-tree-visualizer` repository
5. Vercel will auto-detect the settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**
7. Wait 1-2 minutes ⏱️
8. Get your live URL: `https://json-tree-visualizer-xxx.vercel.app` 🎉

---

## Method 2: Vercel CLI (For Advanced Users)

### Step 1: Login to Vercel CLI

```bash
vercel login
```

Follow the prompts to authenticate via email or GitHub.

### Step 2: Deploy

```bash
# Deploy to production
vercel --prod
```

Answer the prompts:
- **Set up and deploy?** `Y`
- **Which scope?** Select your account
- **Link to existing project?** `N`
- **Project name?** `json-tree-visualizer`
- **Directory?** `./` (press Enter)
- **Override settings?** `N`

### Step 3: Get Your URL

The CLI will output your deployment URL:
```
✅ Production: https://json-tree-visualizer.vercel.app
```

---

## After Deployment

### Update README.md

Add a badge to your README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/json-tree-visualizer)

## 🌐 Live Demo

🔗 **[View Live Demo](https://your-app.vercel.app)**
```

### Test Your Deployment

Visit your Vercel URL and test:
- ✅ JSON input and tree generation
- ✅ Search functionality
- ✅ Dark/light mode
- ✅ Click to copy paths
- ✅ Download feature
- ✅ Zoom and pan controls

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration steps

---

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch = automatic deployment
- Preview deployments for pull requests
- Rollback to previous versions anytime

---

## Troubleshooting

### "Command not found: vercel"
```bash
npm install -g vercel
```

### Build fails?
Make sure dependencies are installed:
```bash
npm install
npm run build
```

### Need to redeploy?
```bash
vercel --prod
```

---

## Quick Commands Reference

```bash
# Login
vercel login

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel remove PROJECT_NAME
```

---

## Your Deployment Checklist

- [ ] Code pushed to GitHub (if using web interface)
- [ ] Signed up/logged in to Vercel
- [ ] Project imported/deployed
- [ ] Live URL received
- [ ] Tested all features on live site
- [ ] Added deployment URL to README
- [ ] Shared your project!

---

**🎉 You're live! Share your JSON Tree Visualizer with the world!**

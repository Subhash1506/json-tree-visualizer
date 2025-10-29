# ⚡ Quick Start Guide

Get your JSON Tree Visualizer running in 3 easy steps!

## 📦 Step 1: Install Dependencies

```bash
npm install
```

## 🚀 Step 2: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 Step 3: Try It Out!

1. The app loads with sample JSON already in place
2. Click **"Generate Tree"** to visualize
3. Try the search feature with: `$.user.address.city`
4. Click any node to copy its path
5. Toggle dark mode with the moon/sun icon

## 🎨 What You Can Do

### Input Your JSON
- Replace sample JSON with your own data
- Click "Generate Tree" to visualize
- Invalid JSON? The app will show helpful error messages

### Search & Navigate
- Search by JSON path: `$.user.name` or `items[0].price`
- Matched nodes highlight in red
- View automatically pans to the result

### Interact with Nodes
- **Click**: Copy JSON path to clipboard
- **Hover**: View node details
- **Different colors** for objects, arrays, and primitives

### Controls
- **Zoom**: Use + and - buttons or mouse wheel
- **Pan**: Click and drag the canvas
- **Fit View**: Click the fit-to-screen button
- **Download**: Save your tree as PNG image

### Customize
- **Dark Mode**: Toggle theme with top-right button
- **Clear**: Remove all input
- **Reset**: Restore sample JSON

## 🛠 Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- Start visualizing your JSON data!

## 💡 Pro Tips

1. **Complex JSON?** Use the zoom and pan features to navigate
2. **Can't find a node?** Use the search feature with JSON path
3. **Want to share?** Download as image or deploy online
4. **Multiple JSONs?** Use Clear/Reset to switch between them

---

**Enjoy exploring your JSON data! 🌳**

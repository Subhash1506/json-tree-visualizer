# 🌳 JSON Tree Visualizer

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://json-tree-visualizer-91op14txw-subhashs-projects-940ade2b.vercel.app)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/json-tree-visualizer)

An interactive web application that visualizes JSON data as a hierarchical tree structure using React Flow. Features search functionality, dark mode, and the ability to download visualizations.

## 🌐 Live Demo

**🔗 [Try it now!](https://json-tree-visualizer-91op14txw-subhashs-projects-940ade2b.vercel.app)**

![JSON Tree Visualizer](screenshot.png)

## ✨ Features

### Mandatory Features
- ✅ **JSON Input & Parsing**: Text area for pasting JSON with validation and error messages
- ✅ **Generate Tree Button**: One-click visualization of JSON structure
- ✅ **React Flow Visualization**: Interactive tree with hierarchical node display
- ✅ **Color-Coded Nodes**:
  - 🔵 **Objects**: Blue/Purple gradient
  - 🟢 **Arrays**: Green gradient
  - 🟠 **Primitives**: Orange/Yellow gradient
- ✅ **Search Functionality**: Search by JSON path (e.g., `$.user.address.city`, `items[0].name`)
- ✅ **Highlight & Pan**: Matched nodes are highlighted and centered in view
- ✅ **Search Messages**: "Match found" or "No match found" feedback

### Bonus Features
- ✅ **Dark/Light Mode**: Toggle between themes
- ✅ **Clear/Reset Buttons**: Clear all input or reset to sample JSON
- ✅ **Copy JSON Path**: Click any node to copy its path to clipboard
- ✅ **Download as Image**: Export tree visualization as PNG
- ✅ **Zoom Controls**: Built-in zoom in/out and fit view
- ✅ **Pan & Navigate**: Drag canvas to explore large trees
- ✅ **Hover Information**: View node path and value on hover
- ✅ **Sample JSON**: Pre-loaded example for quick testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Tree
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📖 How to Use

### 1. Input JSON
- Paste or type your JSON data in the left panel
- The app includes a sample JSON for quick testing
- Click "Reset Sample" to restore the example

### 2. Visualize
- Click the **"Generate Tree"** button
- The tree will render with color-coded nodes
- Use zoom controls and drag to navigate

### 3. Search
- Enter a JSON path in the search bar:
  - `$.user.name` - Access nested object property
  - `$.items[0].price` - Access array element
  - `$.address.city` - Deep nested access
- Click **"Search"** or press Enter
- Matched nodes will be highlighted in red and centered

### 4. Interact
- **Click nodes**: Copy the JSON path to clipboard
- **Hover nodes**: View path and value
- **Zoom/Pan**: Use controls or mouse gestures
- **Download**: Export visualization as PNG image

### 5. Theme
- Click the moon/sun icon to toggle dark/light mode

## 🎨 Node Types

| Type | Color | Description |
|------|-------|-------------|
| Object | Blue/Purple | JSON objects `{}` |
| Array | Green | JSON arrays `[]` |
| Primitive | Orange/Yellow | Strings, numbers, booleans, null |

## 🛠 Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **React Flow**: Graph visualization library
- **HTML-to-Image**: Download functionality
- **CSS3**: Styling with gradients and animations

## 📂 Project Structure

```
Tree/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx       # Custom React Flow node component
│   │   └── CustomNode.css       # Node styling
│   ├── utils/
│   │   └── jsonToTree.js        # JSON parsing and tree building logic
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Main application styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                    # Documentation
```

## 🌐 Deployment

### Deploy to Netlify
```bash
npm run build
# Drag the dist folder to Netlify
```

### Deploy to Vercel
```bash
npm run build
vercel --prod
```

### Deploy to GitHub Pages
1. Update `vite.config.js` base path to your repo name
2. Run build and deploy:
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🎯 JSON Path Examples

```javascript
// Sample JSON
{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC"
    }
  },
  "items": [
    { "id": 1, "name": "Laptop" }
  ]
}

// Search paths:
$.user.name           // "John"
$.user.address.city   // "NYC"
$.items[0].name       // "Laptop"
$                     // Root object
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - Graph visualization
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ using React and React Flow

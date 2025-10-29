import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';
import { buildTreeFromJSON, searchNodeByPath } from './utils/jsonToTree';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

const sampleJSON = {
  "company": {
    "name": "Tech Innovations Inc",
    "founded": 2020,
    "industry": "Software Development",
    "employees": 250,
    "headquarters": {
      "city": "San Francisco",
      "state": "California",
      "country": "USA",
      "coordinates": {
        "latitude": 37.7749,
        "longitude": -122.4194
      }
    },
    "departments": [
      {
        "name": "Engineering",
        "head": "Sarah Johnson",
        "budget": 5000000,
        "teams": ["Backend", "Frontend", "DevOps", "QA"]
      },
      {
        "name": "Marketing",
        "head": "Michael Chen",
        "budget": 2000000,
        "teams": ["Digital", "Content", "Brand"]
      }
    ],
    "products": [
      {
        "id": "prod-001",
        "name": "CloudSync Pro",
        "category": "SaaS",
        "price": 49.99,
        "features": ["Real-time sync", "256-bit encryption", "Unlimited storage"],
        "active": true
      },
      {
        "id": "prod-002",
        "name": "DataAnalytics Suite",
        "category": "Analytics",
        "price": 99.99,
        "features": ["AI-powered insights", "Custom dashboards", "API access"],
        "active": true
      }
    ],
    "financials": {
      "revenue": 15000000,
      "expenses": 12000000,
      "profit": 3000000,
      "growth_rate": 0.25
    }
  },
  "metadata": {
    "version": "2.1.0",
    "last_updated": "2024-01-15",
    "public": false
  }
};

function App() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleJSON, null, 2));
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      setTimeout(() => {
        reactFlowInstance.fitView({ 
          padding: 0.15,
          includeHiddenNodes: false,
          minZoom: 0.1,
          maxZoom: 1.2,
          duration: 300
        });
      }, 100);
    }
  }, [nodes, reactFlowInstance]);

  const visualizeJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      const { nodes: newNodes, edges: newEdges } = buildTreeFromJSON(parsed);
      
      const edgesWithMarkers = newEdges.map(edge => ({
        ...edge,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        style: { strokeWidth: 2 },
      }));

      setNodes(newNodes);
      setEdges(edgesWithMarkers);
      setSearchMessage('');
      
      setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ 
            padding: 0.15,
            includeHiddenNodes: false,
            minZoom: 0.1,
            maxZoom: 1.2,
            duration: 500
          });
        }
      }, 50);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput, setNodes, setEdges, reactFlowInstance]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchMessage('');
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, isHighlighted: false }
      }));
      setNodes(updatedNodes);
      return;
    }

    const foundNode = searchNodeByPath(nodes, searchQuery);
    
    if (foundNode) {
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: node.id === foundNode.id
        }
      }));
      setNodes(updatedNodes);
      setSearchMessage('Match found!');
      
      if (reactFlowInstance) {
        reactFlowInstance.setCenter(
          foundNode.position.x + 100,
          foundNode.position.y + 50,
          { zoom: 1.5, duration: 800 }
        );
      }
    } else {
      setSearchMessage('No match found');
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, isHighlighted: false }
      }));
      setNodes(updatedNodes);
    }
  }, [searchQuery, nodes, setNodes, reactFlowInstance]);

  const handleClear = useCallback(() => {
    setJsonInput('');
    setNodes([]);
    setEdges([]);
    setError('');
    setSearchQuery('');
    setSearchMessage('');
  }, [setNodes, setEdges]);

  const handleReset = useCallback(() => {
    setJsonInput(JSON.stringify(sampleJSON, null, 2));
    setSearchQuery('');
    setSearchMessage('');
    visualizeJSON();
  }, [visualizeJSON]);

  const downloadAsImage = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const canvas = document.querySelector('.react-flow__viewport');
    if (!canvas) return;

    import('html-to-image').then(({ toPng }) => {
      toPng(canvas)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'json-tree.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to download image:', err);
        });
    });
  }, [reactFlowInstance]);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h1>🌳 JSON Tree Visualizer</h1>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="main-content">
        <div className="input-panel">
          <div className="panel-header">
            <h2>JSON Input</h2>
            <div className="button-group">
              <button onClick={handleReset} className="btn btn-secondary">
                Reset Sample
              </button>
              <button onClick={handleClear} className="btn btn-danger">
                Clear All
              </button>
            </div>
          </div>
          
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="json-input"
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <button onClick={visualizeJSON} className="btn btn-primary btn-large">
            🎨 Generate Tree
          </button>

          <div className="search-section">
            <h3>Search by JSON Path</h3>
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., $.user.address.city or items[0].name"
                className="search-input"
              />
              <button onClick={handleSearch} className="btn btn-primary">
                🔍 Search
              </button>
            </div>
            {searchMessage && (
              <div className={`search-message ${searchMessage.includes('found!') ? 'success' : 'warning'}`}>
                {searchMessage}
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>ℹ️ How to Use</h3>
            <ul>
              <li><strong>Objects</strong>: Blue/Purple nodes</li>
              <li><strong>Arrays</strong>: Green nodes</li>
              <li><strong>Primitives</strong>: Orange/Yellow nodes</li>
              <li><strong>Click</strong> any node to copy its path</li>
              <li><strong>Search</strong> using JSON path notation</li>
              <li><strong>Zoom</strong> and pan to navigate</li>
            </ul>
          </div>
        </div>

        <div className="visualization-panel">
          <div className="panel-header">
            <div>
              <h2>Tree Visualization</h2>
              {nodes.length > 0 && (
                <div className="tree-stats">
                  {nodes.length} nodes • Interactive • Powered by React Flow
                </div>
              )}
            </div>
            <button onClick={downloadAsImage} className="btn btn-secondary" title="Download as image">
              📥 Download PNG
            </button>
          </div>
          
          <div className="react-flow-wrapper">
            {nodes.length > 0 ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                  padding: 0.15,
                  includeHiddenNodes: false,
                  minZoom: 0.1,
                  maxZoom: 1.2
                }}
                minZoom={0.1}
                maxZoom={2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                attributionPosition="bottom-left"
              >
                <Background />
                <Controls />
              </ReactFlow>
            ) : (
              <div className="empty-state">
                <p>👈 Enter JSON and click "Generate Tree" to visualize</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

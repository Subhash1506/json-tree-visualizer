export const buildTreeFromJSON = (jsonData) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;
  const nodePositions = new Map();

  const getNodeType = (value) => {
    if (value === null) return 'primitive';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'primitive';
  };

  const createNode = (key, value, path, parentId = null) => {
    const id = `node-${nodeId++}`;
    const type = getNodeType(value);
    
    let label = '';
    let nodeValue = value;
    
    if (type === 'object') {
      label = key || 'root';
    } else if (type === 'array') {
      label = `${key || 'root'} [${value.length}]`;
    } else {
      label = key !== null ? `${key}: ${JSON.stringify(value)}` : JSON.stringify(value);
    }

    nodes.push({
      id,
      type: 'custom',
      data: { 
        label, 
        nodeType: type, 
        value: nodeValue,
        path,
        key 
      },
      position: { x: 0, y: 0 },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: 'smoothstep',
      });
    }

    return { id, type };
  };

  let currentXByLevel = new Map();

  const traverse = (obj, key, path, parentId = null, level = 0) => {
    const horizontalSpacing = 300;
    const verticalSpacing = 120;
    
    if (!currentXByLevel.has(level)) {
      currentXByLevel.set(level, 0);
    }

    const x = currentXByLevel.get(level);
    const y = level * verticalSpacing;

    const { id, type } = createNode(key, obj, path, parentId);
    
    const nodeIndex = nodes.findIndex(n => n.id === id);
    nodes[nodeIndex].position = { x, y };
    nodePositions.set(id, { x, y });

    currentXByLevel.set(level, x + horizontalSpacing);

    if (type === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        const newPath = path ? `${path}.${k}` : k;
        traverse(v, k, newPath, id, level + 1);
      }
    } else if (type === 'array') {
      obj.forEach((item, idx) => {
        const newPath = `${path}[${idx}]`;
        traverse(item, `[${idx}]`, newPath, id, level + 1);
      });
    }
  };

  traverse(jsonData, null, '$', null, 0);

  return { nodes, edges };
};

export const searchNodeByPath = (nodes, searchPath) => {
  if (!searchPath || searchPath.trim() === '') return null;
  
  const normalizedSearch = searchPath.trim().toLowerCase();
  
  return nodes.find(node => {
    const nodePath = node.data.path?.toLowerCase();
    return nodePath === normalizedSearch || nodePath?.includes(normalizedSearch);
  });
};

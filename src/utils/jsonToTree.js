export const buildTreeFromJSON = (jsonData) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;
  const nodeChildren = new Map();

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
      
      if (!nodeChildren.has(parentId)) {
        nodeChildren.set(parentId, []);
      }
      nodeChildren.get(parentId).push(id);
    }

    return { id, type };
  };

  // First pass: create all nodes
  const traverse = (obj, key, path, parentId = null, level = 0) => {
    const { id, type } = createNode(key, obj, path, parentId);

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
    
    return id;
  };

  const rootId = traverse(jsonData, null, '$', null, 0);

  // Second pass: position nodes
  const horizontalSpacing = 220;
  const verticalSpacing = 100;
  const nodeWidths = new Map();

  // Calculate subtree widths (bottom-up)
  const calculateWidth = (nodeId) => {
    const children = nodeChildren.get(nodeId) || [];
    
    if (children.length === 0) {
      nodeWidths.set(nodeId, 1);
      return 1;
    }
    
    let totalWidth = 0;
    children.forEach(childId => {
      totalWidth += calculateWidth(childId);
    });
    
    nodeWidths.set(nodeId, totalWidth);
    return totalWidth;
  };

  calculateWidth(rootId);

  // Position nodes (top-down)
  const positionNode = (nodeId, x, y) => {
    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    nodes[nodeIndex].position = { x, y };

    const children = nodeChildren.get(nodeId) || [];
    
    if (children.length === 0) return;

    // Calculate total width of children
    const totalWidth = nodeWidths.get(nodeId);
    let currentX = x - (totalWidth * horizontalSpacing) / 2;

    children.forEach(childId => {
      const childWidth = nodeWidths.get(childId);
      const childX = currentX + (childWidth * horizontalSpacing) / 2;
      positionNode(childId, childX, y + verticalSpacing);
      currentX += childWidth * horizontalSpacing;
    });
  };

  // Start positioning from root at center (0, 0)
  positionNode(rootId, 0, 0);

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

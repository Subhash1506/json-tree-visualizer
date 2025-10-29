import React from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomNode = ({ data }) => {
  const { label, nodeType, path, isHighlighted } = data;

  const getNodeClass = () => {
    let baseClass = 'custom-node';
    if (nodeType === 'object') baseClass += ' object-node';
    else if (nodeType === 'array') baseClass += ' array-node';
    else baseClass += ' primitive-node';
    
    if (isHighlighted) baseClass += ' highlighted';
    
    return baseClass;
  };

  const handleNodeClick = () => {
    if (path) {
      navigator.clipboard.writeText(path);
      const tooltip = document.createElement('div');
      tooltip.className = 'copy-tooltip';
      tooltip.textContent = 'Path copied!';
      document.body.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 2000);
    }
  };

  return (
    <div className={getNodeClass()} onClick={handleNodeClick} title={`Path: ${path}\nClick to copy path`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <div className="node-label">{label}</div>
        <div className="node-path">{path}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;

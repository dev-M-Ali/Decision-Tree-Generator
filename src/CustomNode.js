import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './CustomNode.module.css';

const CustomNode = ({ data, isConnectable }) => {
  const isRoot = data.isRoot;
  const isLeaf = data.isLeaf;
  
  let nodeClass = styles.customNode;
  if (isRoot) nodeClass += ` ${styles.rootNode}`;
  if (isLeaf) nodeClass += ` ${styles.leafNode}`;

  return (
    <div className={nodeClass}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={`${styles.nodeHandle} ${styles.target}`}
        style={{ visibility: isRoot ? 'hidden' : 'visible' }}
      />
      <div className={styles.nodeContent}>
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={`${styles.nodeHandle} ${styles.source}`}
        style={{ visibility: isLeaf ? 'hidden' : 'visible' }}
      />
    </div>
  );
};

export default CustomNode;

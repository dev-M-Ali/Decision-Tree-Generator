import React, { useCallback, useEffect, memo } from 'react';
import {
    Background,
    ReactFlow,
    addEdge,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import styles from './Tree.module.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

function Tree(props) {
    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 250;
    const nodeHeight = 80;

    const getLayoutedElements = (nodes, direction = 'TB') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction, nodesep: 80, ranksep: 100 });

        nodes.forEach((node) => {
            dagreGraph.setNode(String(node.id), { width: nodeWidth, height: nodeHeight });
        });

        const edges = []

        nodes.forEach((node) => {
            if (node.parent !== -1)
            {
                dagreGraph.setEdge(String(node.parent), String(node.id));
                edges.push({ 
                    id: `${node.parent}-${node.id}`, 
                    source: String(node.parent), 
                    target: String(node.id),
                    type: 'smoothstep'
                })
            }
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(String(node.id));
            const isRoot = node.parent === -1;
            const isLeaf = !nodes.some(n => n.parent === node.id);
            
            const newNode = {
                id: String(node.id),
                data: {
                    label: node.content,
                    isRoot: isRoot,
                    isLeaf: isLeaf
                },
                type: 'custom',
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2,
                },
            };

            return newNode;
        });

        return { nodes: newNodes, edges };
    };

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(props.nodes);

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
            ),
        [],
    );
    
    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                props.nodes,
                direction,
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [props.nodes],
    );

    useEffect(() => {
        const { nodes: newLayoutedNodes, edges: newLayoutedEdges } = getLayoutedElements(props.nodes);
        setNodes(newLayoutedNodes);
        setEdges(newLayoutedEdges);
    }, [props.nodes]);

    return (
        <div className={styles.treeContainer}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
            >
                <div className={styles.controlPanel}>
                    <div className={styles.controlTitle}>Layout Options</div>
                    <button 
                        className={styles.layoutButton} 
                        onClick={() => onLayout('TB')}
                    >
                        📋 Vertical Layout
                    </button>
                    <button 
                        className={styles.layoutButton} 
                        onClick={() => onLayout('LR')}
                    >
                        📊 Horizontal Layout
                    </button>
                    <button 
                        className={styles.homeButton}
                        onClick={() => window.location.reload()}
                    >
                        🏠 Back to Home
                    </button>
                </div>
                <Background />
            </ReactFlow>
        </div>
    );
}

export default memo(Tree);

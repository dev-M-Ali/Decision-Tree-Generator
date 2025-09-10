import { memo } from "react"
import React, { useCallback } from 'react';
import {
    Background,
    ReactFlow,
    addEdge,
    ConnectionLineType,
    Panel,
    useNodesState,
    useEdgesState,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    const edges = []

    nodes.forEach((node) => {
        if (node.parent !== -1)
        {
            dagreGraph.setEdge(node.parent, node.id);
            edges.push({ id: `${node.parent}-${node.id}`, source: String(node.parent), target: String(node.id) })
        }
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            id: String(node.id),
            data: {
                label: node.content
            },
            type: 'default',
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges };
};

function Tree(props) {

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(props.nodes);
    console.log(layoutedNodes)
    console.log(layoutedEdges)

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
                nodes,
                direction,
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
            >
                <Panel position="top-right">
                    <button className="xy-theme__button" onClick={() => onLayout('TB')}>
                        vertical layout
                    </button>
                    <button className="xy-theme__button" onClick={() => onLayout('LR')}>
                        horizontal layout
                    </button>
                </Panel>
                <Background />
            </ReactFlow>
        </div>
    );
}

export default memo(Tree)
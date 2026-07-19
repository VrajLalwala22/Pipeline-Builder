// Canvas.js — ReactFlow canvas wrapper with enhanced styling

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '../nodes';
import 'reactflow/dist/style.css';

const GRID_SIZE = 20;
const PRO_OPTIONS = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const Canvas = ({ onCanvasClick }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      let nodeType;
      try {
        ({ nodeType } = JSON.parse(rawData));
      } catch {
        return;
      }

      if (!nodeTypes[nodeType]) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(nodeType, position);
    },
    [reactFlowInstance, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handlePaneClick = useCallback(() => {
    onCanvasClick?.();
  }, [onCanvasClick]);

  return (
    <div ref={reactFlowWrapper} className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={handlePaneClick}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={PRO_OPTIONS}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        snapToGrid
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        fitView
      >
        <Background
          color="rgba(255, 255, 255, 0.03)"
          gap={GRID_SIZE}
          size={1}
          variant="dots"
        />
        <Controls className="canvas__controls" />
        <MiniMap
          className="canvas__minimap"
          nodeColor="#6366F1"
          maskColor="rgba(0, 0, 0, 0.7)"
          style={{ backgroundColor: '#1a1b23' }}
        />
      </ReactFlow>
    </div>
  );
};

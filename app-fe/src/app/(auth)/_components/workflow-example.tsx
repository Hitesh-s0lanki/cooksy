"use client";

import React, { useCallback, useRef } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type OnConnect,
  type OnNodeDrag,
  type Node,
  type Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// Vertical-only node layout
const nodesLayout: Node[] = [
  {
    id: "start",
    type: "input",
    data: { label: "Start" },
    position: { x: 150, y: 0 },
  },
  {
    id: "customer_info",
    data: { label: "Customer Info " },
    position: { x: 150, y: 80 },
  },
  {
    id: "requirement_check",
    data: { label: "Requirement Check " },
    position: { x: 150, y: 160 },
  },
  {
    id: "hallucination",
    data: { label: "Hallucination " },
    position: { x: 50, y: 400 },
  },
  {
    id: "generate_content",
    data: { label: "Generate Content " },
    position: { x: 300, y: 240 },
  },
  {
    id: "evaluate",
    data: { label: "Evaluate Content " },
    position: { x: 340, y: 320 },
  },
  { id: "image", data: { label: "Image " }, position: { x: 300, y: 400 } },
  {
    id: "youtube",
    data: { label: "YouTube Video " },
    position: { x: 300, y: 480 },
  },
  {
    id: "end",
    type: "output",
    data: { label: "End" },
    position: { x: 100, y: 580 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "start", target: "customer_info", animated: true },
  {
    id: "e2",
    source: "customer_info",
    target: "requirement_check",
    animated: true,
  },
  {
    id: "e_req_no",
    source: "hallucination",
    target: "end",
    label: "FollowUp Question To Customer",
    animated: true,
    style: { stroke: "red", strokeWidth: 2, strokeDasharray: "4 2" },
    labelStyle: { fill: "red", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  {
    id: "e_req_yes",
    source: "requirement_check",
    target: "generate_content",
    label: "All Requirement met",
    animated: true,
    style: { stroke: "green", strokeWidth: 2 },
    labelStyle: { fill: "green", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  {
    id: "e_hall_no",
    source: "requirement_check",
    target: "hallucination",
    animated: true,
    style: { stroke: "orange", strokeWidth: 2 },
    labelStyle: { fill: "orange", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  {
    id: "e_hall_yes",
    source: "hallucination",
    target: "customer_info",
    label: "Agent Hallucinated Need to Refactor",
    animated: true,
    style: { stroke: "purple", strokeWidth: 2 },
    labelStyle: { fill: "purple", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  { id: "e3", source: "generate_content", target: "evaluate", animated: true },
  {
    id: "e_eval_no",
    source: "evaluate",
    target: "generate_content",
    label: "No",
    animated: true,
    style: { stroke: "red", strokeWidth: 2, strokeDasharray: "4 2" },
    labelStyle: { fill: "red", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  {
    id: "e_eval_yes",
    source: "evaluate",
    target: "image",
    label: "Yes",
    animated: true,
    style: { stroke: "green", strokeWidth: 2 },
    labelStyle: { fill: "green", fontWeight: 600 },
    labelBgStyle: { fill: "white", fillOpacity: 0.8, borderRadius: 4 },
  },
  { id: "e4", source: "image", target: "youtube", animated: true },
  { id: "e5", source: "youtube", target: "end", animated: true },
];

const WorkflowExample = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesLayout);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const { updateEdge, getEdge, addEdges } = useReactFlow();
  const overlappedEdgeRef = useRef<string | null>(null);

  const onNodeDragStop: OnNodeDrag = useCallback(
    (event, node) => {
      const edgeId = overlappedEdgeRef.current;
      if (!edgeId) return;
      const edge = getEdge(edgeId);
      if (!edge) return;

      updateEdge(edgeId, { source: edge.source, target: node.id, style: {} });
      addEdges({
        id: `${node.id}->${edge.target}`,
        source: node.id,
        target: edge.target,
      });
      overlappedEdgeRef.current = null;
    },
    [getEdge, updateEdge, addEdges]
  );

  const onNodeDrag: OnNodeDrag = useCallback(
    (e, node) => {
      const nodeDiv = document.querySelector(
        `.react-flow__node[data-id=${node.id}]`
      );
      if (!nodeDiv) return;

      const rect = nodeDiv.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const edgeFound = document
        .elementsFromPoint(centerX, centerY)
        .find((el) =>
          el.classList.contains("react-flow__edge-interaction")
        )?.parentElement;

      const edgeId = edgeFound?.dataset.id;
      if (edgeId) updateEdge(edgeId, { style: { stroke: "black" } });
      else if (overlappedEdgeRef.current)
        updateEdge(overlappedEdgeRef.current, { style: {} });

      overlappedEdgeRef.current = edgeId || null;
    },
    [updateEdge]
  );

  return (
    <div className="w-full bg-white/40 rounded-xl flex flex-col gap-2">
      <h1 className="text-center w-full text-xl font-semibold">
        Our Agentic WorkFlow
      </h1>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeDrag={onNodeDrag}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        panOnScroll={false}
        fitView>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowExample;

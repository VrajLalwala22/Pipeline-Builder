# main.py — VectorShift Pipeline Parser API
# Provides pipeline analysis: node/edge counting and DAG detection via Kahn's algorithm.

from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# =============================================================================
# Pydantic Models
# =============================================================================

class NodeData(BaseModel):
    """Represents a single node in the pipeline graph."""
    id: str
    type: str | None = None
    position: dict[str, float] | None = None
    data: dict[str, Any] | None = None


class EdgeData(BaseModel):
    """Represents a directed edge between two nodes."""
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelineRequest(BaseModel):
    """Request body containing the full pipeline graph."""
    nodes: list[NodeData]
    edges: list[EdgeData]


class PipelineResponse(BaseModel):
    """Response containing pipeline analysis results."""
    num_nodes: int
    num_edges: int
    is_dag: bool


# =============================================================================
# Application Setup
# =============================================================================

app = FastAPI(title="VectorShift Pipeline Parser")

# Allow frontend dev server (localhost:3000) to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Endpoints
# =============================================================================

@app.get("/")
def read_root() -> dict[str, str]:
    """Health check endpoint."""
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    """
    Analyzes a pipeline graph and returns:
      - num_nodes: total node count
      - num_edges: total edge count
      - is_dag: whether the graph is a Directed Acyclic Graph

    DAG detection uses Kahn's Algorithm (BFS-based topological sort):
      1. Build adjacency list and in-degree map from edges
      2. Initialize a queue with all zero-in-degree nodes
      3. Process the queue: for each node, decrement neighbors' in-degrees
      4. If all nodes are processed, the graph is a DAG; otherwise it has cycles
    """
    node_ids = [node.id for node in pipeline.nodes]
    known_node_ids = set(node_ids)

    if len(node_ids) != len(known_node_ids):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='Node IDs must be unique.',
        )

    invalid_edge = next(
        (
            edge
            for edge in pipeline.edges
            if edge.source not in known_node_ids or edge.target not in known_node_ids
        ),
        None,
    )
    if invalid_edge:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f'Edge {invalid_edge.id or "(without an id)"} references '
                'a node that does not exist.'
            ),
        )

    num_nodes: int = len(node_ids)
    num_edges: int = len(pipeline.edges)

    # Build adjacency list and in-degree map
    adjacency: dict[str, list[str]] = defaultdict(list)
    in_degree: dict[str, int] = {node_id: 0 for node_id in known_node_ids}

    for edge in pipeline.edges:
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Kahn's Algorithm — BFS topological sort
    queue: deque[str] = deque(
        node_id for node_id, degree in in_degree.items() if degree == 0
    )
    processed_count: int = 0

    while queue:
        current = queue.popleft()
        processed_count += 1

        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag: bool = processed_count == num_nodes

    import json
    with open('payload_dump.json', 'w') as f:
        f.write(pipeline.json())

    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )

'use client';

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NeuralNode = {
  category?: 'content' | 'social';
  description: string;
  href: string;
  id: string;
  isExternal?: boolean;
  title: string;
  type: 'note' | 'post';
};

type PositionedNode = NeuralNode & {
  depth: number;
  projectedX: number;
  projectedY: number;
  projectedZ: number;
  size: number;
  x: number;
  y: number;
  z: number;
};

type NodePosition = {
  ringIndex: number;
  x: number;
  y: number;
  z: number;
};

type EdgePair = {
  from: number;
  to: number;
  type: 'bridge' | 'ring';
};

type NeuralEdge = {
  depth: number;
  id: string;
  maxOpacity: number;
  maxWidth: number;
  minOpacity: number;
  minWidth: number;
  stroke: string;
  twinkleDelay: number;
  twinkleDuration: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

type RenderedGraph = {
  edges: NeuralEdge[];
  nodes: PositionedNode[];
};

type HomeNeuralMapProps = {
  nodes: NeuralNode[];
  overlay?: ReactNode;
};

const RADIAN = Math.PI / 180;
const PERSPECTIVE = 940;
const FRONT_INTERACTIVE_DEPTH = 0.44;
const TAP_DISTANCE_THRESHOLD = 7;
const INTRO_DURATION_MS = 950;
const ROTATE_TO_NODE_MS = 520;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getAdaptiveMapHeight = (viewportWidth: number, viewportHeight: number) => {
  if (viewportWidth < 640) {
    return Math.round(clamp(viewportHeight * 0.62, 400, 660));
  }
  if (viewportWidth < 1024) {
    return Math.round(clamp(viewportHeight * 0.68, 480, 760));
  }
  return Math.round(clamp(viewportHeight * 0.73, 540, 900));
};

const angleDelta = (from: number, to: number) => {
  const wrappedFrom = normalizeAngle(from);
  const wrappedTo = normalizeAngle(to);
  const delta = wrappedTo - wrappedFrom;
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
};

const normalizeAngle = (angle: number) => {
  const normalized = angle % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const pseudoRandom = (seed: number) => {
  const raw = Math.sin(seed * 12.9898) * 43758.5453;
  return raw - Math.floor(raw);
};

const hashSeed = (value: string) =>
  value.split('').reduce((accumulator, letter) => accumulator * 31 + letter.charCodeAt(0), 11);

const getNodePositions = (nodeCount: number, sphereRadius: number): NodePosition[] => {
  if (nodeCount === 0) return [];

  const ringCount = nodeCount < 4 ? nodeCount : clamp(Math.round(Math.sqrt(nodeCount)) + 2, 4, 8);

  const ringMeta = Array.from({ length: ringCount }, (_, ringIndex) => {
    const t = ringCount === 1 ? 0.5 : ringIndex / (ringCount - 1);
    const latitude = (t - 0.5) * Math.PI * 0.84;
    const ringRadius = Math.max(26, Math.cos(latitude) * sphereRadius);
    const y = Math.sin(latitude) * sphereRadius * 0.82;
    const weight = Math.max(0.18, Math.pow(Math.max(0.1, Math.cos(latitude)), 1.55));
    return { ringIndex, ringRadius, weight, y };
  });

  const totalWeight = ringMeta.reduce((sum, ring) => sum + ring.weight, 0);
  const cdf: number[] = [];
  ringMeta.reduce((accumulator, ring) => {
    const next = accumulator + ring.weight / totalWeight;
    cdf.push(next);
    return next;
  }, 0);

  const bucketedNodeIndexes = Array.from({ length: ringCount }, () => [] as number[]);
  for (let index = 0; index < nodeCount; index++) {
    const ratio = (index + 0.5) / nodeCount;
    let targetRing = cdf.findIndex((value) => ratio <= value);
    if (targetRing < 0) targetRing = ringCount - 1;
    bucketedNodeIndexes[targetRing].push(index);
  }

  const points: NodePosition[] = [];
  ringMeta.forEach((meta, ringIndex) => {
    const nodesInRing = bucketedNodeIndexes[ringIndex];
    if (nodesInRing.length === 0) return;

    const count = nodesInRing.length;
    for (let localIndex = 0; localIndex < count; localIndex++) {
      const theta = (Math.PI * 2 * localIndex) / count + ringIndex * 0.47 + (ringIndex % 2 ? 0.19 : 0);
      const jitter = ((localIndex % 3) - 1) * 3.8 + Math.sin(localIndex * 1.4 + ringIndex) * 1.6;
      const radius = meta.ringRadius + jitter;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const y = meta.y + Math.sin(theta * 2.2 + ringIndex) * 3.2;

      points.push({
        ringIndex: meta.ringIndex,
        x,
        y,
        z,
      });
    }
  });

  return points.slice(0, nodeCount);
};

const getStructuralPairs = (points: NodePosition[]): EdgePair[] => {
  const pairSet = new Set<string>();
  const pairs: EdgePair[] = [];
  const ringMap = new Map<number, number[]>();

  const pushPair = (from: number, to: number, type: EdgePair['type']) => {
    const a = Math.min(from, to);
    const b = Math.max(from, to);
    const key = `${a}-${b}`;
    if (pairSet.has(key)) return;
    pairSet.add(key);
    pairs.push({ from: a, to: b, type });
  };

  points.forEach((point, index) => {
    const list = ringMap.get(point.ringIndex) ?? [];
    list.push(index);
    ringMap.set(point.ringIndex, list);
  });

  const rings = [...ringMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map((entry) => entry[1]);

  rings.forEach((indices) => {
    if (indices.length < 2) return;
    for (let index = 0; index < indices.length; index++) {
      pushPair(indices[index], indices[(index + 1) % indices.length], 'ring');
      if (indices.length > 8 && index % 2 === 0) {
        pushPair(indices[index], indices[(index + 2) % indices.length], 'ring');
      }
    }
  });

  for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex++) {
    const current = rings[ringIndex];
    const next = rings[ringIndex + 1];
    const bridgeCount = Math.max(2, Math.min(6, Math.round((current.length + next.length) / 6)));

    for (let bridge = 0; bridge < bridgeCount; bridge++) {
      const from = current[Math.floor((bridge / bridgeCount) * current.length) % current.length];
      const to = next[Math.floor((bridge / bridgeCount) * next.length) % next.length];
      pushPair(from, to, 'bridge');
    }
  }

  return pairs;
};

const getLineAnimationStyle = (edge: NeuralEdge): CSSProperties =>
  ({
    '--line-max-opacity': edge.maxOpacity.toFixed(3),
    '--line-max-width': `${edge.maxWidth.toFixed(2)}px`,
    '--line-min-opacity': edge.minOpacity.toFixed(3),
    '--line-min-width': `${edge.minWidth.toFixed(2)}px`,
    animationDelay: `${edge.twinkleDelay.toFixed(2)}s`,
    animationDuration: `${edge.twinkleDuration.toFixed(2)}s`,
    filter: `drop-shadow(0 0 ${0.18 + edge.depth * 0.9}px hsl(var(--ring) / ${0.05 + edge.depth * 0.14}))`,
  }) as CSSProperties;

export default function HomeNeuralMap({ nodes, overlay }: HomeNeuralMapProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [lockedNodeId, setLockedNodeId] = useState<string | null>(null);
  const [introProgress, setIntroProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 340, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [mapHeight, setMapHeight] = useState(520);
  const [viewport, setViewport] = useState({ height: 0, width: 0 });

  const inertiaFrameRef = useRef<number | null>(null);
  const autoFrameRef = useRef<number | null>(null);
  const rotateToNodeFrameRef = useRef<number | null>(null);
  const inertiaActiveRef = useRef(false);
  const aligningRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isPreviewingRef = useRef(false);
  const rotationRef = useRef(rotation);
  const pointerSampleRef = useRef<{ timestamp: number; x: number; y: number } | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const draggedDistanceRef = useRef(0);
  const didDragRef = useRef(false);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStateRef = useRef<{ distance: number; zoom: number } | null>(null);
  const hoverClearTimerRef = useRef<number | null>(null);

  const activeNodeId = lockedNodeId ?? hoveredNodeId;

  const graph = useMemo<RenderedGraph>(() => {
    const viewportShortSide = Math.min(viewport.width || 920, viewport.height || 640);
    const adaptiveSphereRadius = clamp(viewportShortSide * 0.36, 165, 252);
    const introTargetScale = clamp(viewportShortSide / 780, 0.74, 1.06);
    const introStartScale = 0.04;
    const introScale = (introStartScale + introProgress * (1 - introStartScale)) * introTargetScale;
    const positions = getNodePositions(nodes.length, adaptiveSphereRadius);
    const structuralPairs = getStructuralPairs(positions);
    const rotationX = rotation.x * RADIAN;
    const rotationY = rotation.y * RADIAN;
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const projectedNodes = nodes.map((node, index) => {
      const point = positions[index];
      const worldX = point.x * zoom;
      const worldY = point.y * zoom;
      const worldZ = point.z * zoom;

      const rotatedX = worldX * cosY - worldZ * sinY;
      const rotatedZ = worldX * sinY + worldZ * cosY;
      const rotatedY = worldY * cosX - rotatedZ * sinX;
      const finalZ = worldY * sinX + rotatedZ * cosX;
      const perspectiveScale = PERSPECTIVE / (PERSPECTIVE - finalZ);
      const projectedX = rotatedX * perspectiveScale * introScale;
      const projectedY = rotatedY * perspectiveScale * introScale;
      const rawDepth = clamp((finalZ + 335) / 670, 0, 1);
      const depth = Math.pow(rawDepth, 1.95);
      const baseSize = node.type === 'post' ? 21 : 18;
      const zoomScale = clamp(Math.pow(zoom, 0.86), 0.74, 1.48);
      const size = baseSize * (0.45 + depth * 0.76) * zoomScale;

      return {
        ...node,
        depth,
        projectedX,
        projectedY,
        projectedZ: finalZ,
        size,
        x: point.x,
        y: point.y,
        z: point.z,
      };
    });

    const centerEdges: NeuralEdge[] = projectedNodes
      .filter((_, index) => index % 2 === 0)
      .map((node, index) => {
        const seed = hashSeed(`center-${node.id}-${index}`);
        const sparkle = pseudoRandom(seed + 91);
        const minOpacity = 0.012 + node.depth * 0.08;
        const maxOpacity = minOpacity + 0.048 + sparkle * 0.04;
        const minWidth = 0.18 + node.depth * 0.16;
        const maxWidth = minWidth + 0.16 + sparkle * 0.08;

        return {
          depth: node.depth * 0.72,
          id: `radial-${node.id}`,
          maxOpacity,
          maxWidth,
          minOpacity,
          minWidth,
          stroke: 'hsl(var(--border) / 0.5)',
          twinkleDelay: pseudoRandom(seed + 31) * 4,
          twinkleDuration: 2.8 + pseudoRandom(seed + 47) * 2.6,
          x1: 0,
          x2: node.projectedX,
          y1: 0,
          y2: node.projectedY,
        };
      });

    const synapseEdges: NeuralEdge[] = structuralPairs.map((pair, index) => {
      const from = projectedNodes[pair.from];
      const to = projectedNodes[pair.to];
      const depth = (from.depth + to.depth) / 2;
      const seed = hashSeed(`synapse-${from.id}-${to.id}-${index}`);
      const sparkle = pseudoRandom(seed + 59);
      const ringBoost = pair.type === 'ring' ? 1 : 0.78;
      const minOpacity = (0.02 + depth * 0.11) * ringBoost;
      const maxOpacity = minOpacity + (0.06 + sparkle * 0.05) * ringBoost;
      const minWidth = 0.22 + depth * 0.2;
      const maxWidth = minWidth + (0.17 + sparkle * 0.12) * ringBoost;

      return {
        depth,
        id: `${pair.type}-${from.id}-${to.id}`,
        maxOpacity,
        maxWidth,
        minOpacity,
        minWidth,
        stroke: pair.type === 'ring' ? 'hsl(var(--border) / 0.68)' : 'hsl(var(--border) / 0.52)',
        twinkleDelay: pseudoRandom(seed + 17) * 4.4,
        twinkleDuration:
          pair.type === 'ring'
            ? 1.8 + pseudoRandom(seed + 73) * 2.2
            : 2.4 + pseudoRandom(seed + 77) * 2.8,
        x1: from.projectedX,
        x2: to.projectedX,
        y1: from.projectedY,
        y2: to.projectedY,
      };
    });

    return {
      edges: [...centerEdges, ...synapseEdges].sort((a, b) => a.depth - b.depth),
      nodes: projectedNodes.sort((a, b) => a.projectedZ - b.projectedZ),
    };
  }, [introProgress, nodes, rotation.x, rotation.y, viewport.height, viewport.width, zoom]);

  const activeNode = useMemo(
    () => graph.nodes.find((node) => node.id === activeNodeId) ?? null,
    [graph.nodes, activeNodeId],
  );

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    let frame: number | null = null;
    const start = performance.now();

    const tick = (timestamp: number) => {
      const progress = clamp((timestamp - start) / INTRO_DURATION_MS, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setIntroProgress(eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    isPreviewingRef.current = activeNodeId !== null;
    if (activeNodeId) stopInertia();
  }, [activeNodeId]);

  useEffect(() => {
    return () => {
      if (rotateToNodeFrameRef.current !== null) {
        cancelAnimationFrame(rotateToNodeFrameRef.current);
      }
      if (hoverClearTimerRef.current !== null) {
        window.clearTimeout(hoverClearTimerRef.current);
      }
    };
  }, []);

  const stopInertia = () => {
    if (inertiaFrameRef.current !== null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
    inertiaActiveRef.current = false;
  };

  const stopAligning = () => {
    if (rotateToNodeFrameRef.current !== null) {
      cancelAnimationFrame(rotateToNodeFrameRef.current);
      rotateToNodeFrameRef.current = null;
    }
    aligningRef.current = false;
  };

  const rotateSphereToNode = (node: PositionedNode) => {
    stopAligning();
    stopInertia();

    const radiusXZ = Math.hypot(node.x, node.z);
    const target = {
      x: normalizeAngle((Math.atan2(node.y, radiusXZ) / Math.PI) * 180),
      y: normalizeAngle((Math.atan2(node.x, node.z) / Math.PI) * 180),
    };
    const start = rotationRef.current;
    const deltaX = angleDelta(start.x, target.x);
    const deltaY = angleDelta(start.y, target.y);
    const startedAt = performance.now();

    aligningRef.current = true;

    const tick = (timestamp: number) => {
      const progress = clamp((timestamp - startedAt) / ROTATE_TO_NODE_MS, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation({
        x: normalizeAngle(start.x + deltaX * eased),
        y: normalizeAngle(start.y + deltaY * eased),
      });

      if (progress < 1) {
        rotateToNodeFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      aligningRef.current = false;
      rotateToNodeFrameRef.current = null;
    };

    rotateToNodeFrameRef.current = requestAnimationFrame(tick);
  };

  const startInertia = () => {
    stopInertia();
    let previousTimestamp: number | null = null;
    inertiaActiveRef.current = true;

    const tick = (timestamp: number) => {
      if (previousTimestamp === null) previousTimestamp = timestamp;
      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;
      const damping = Math.pow(0.92, delta / 16.7);
      velocityRef.current.x *= damping;
      velocityRef.current.y *= damping;

      if (Math.abs(velocityRef.current.x) < 0.0014 && Math.abs(velocityRef.current.y) < 0.0014) {
        stopInertia();
        return;
      }

      setRotation((current) => ({
        x: normalizeAngle(current.x + velocityRef.current.x * delta),
        y: normalizeAngle(current.y + velocityRef.current.y * delta),
      }));

      inertiaFrameRef.current = requestAnimationFrame(tick);
    };

    inertiaFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    let previousTimestamp: number | null = null;

    const tick = (timestamp: number) => {
      if (previousTimestamp === null) previousTimestamp = timestamp;
      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      if (!isDraggingRef.current && !inertiaActiveRef.current && !isPreviewingRef.current && !aligningRef.current) {
        setRotation((current) => ({
          x: normalizeAngle(current.x + Math.sin(timestamp * 0.00025) * 0.0025 * delta),
          y: normalizeAngle(current.y - 0.0052 * delta),
        }));
      }

      autoFrameRef.current = requestAnimationFrame(tick);
    };

    autoFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (autoFrameRef.current !== null) cancelAnimationFrame(autoFrameRef.current);
      stopInertia();
      stopAligning();
    };
  }, []);

  const navigateFromPreview = (node: PositionedNode) => {
    if (node.isExternal) {
      window.open(node.href, '_blank', 'noopener,noreferrer');
      return;
    }
    router.push(node.href);
  };

  const clearHoverTimer = () => {
    if (hoverClearTimerRef.current !== null) {
      window.clearTimeout(hoverClearTimerRef.current);
      hoverClearTimerRef.current = null;
    }
  };

  const queueClearHover = (nodeId: string) => {
    if (lockedNodeId) return;
    clearHoverTimer();
    hoverClearTimerRef.current = window.setTimeout(() => {
      setHoveredNodeId((previous) => {
        if (previous !== nodeId) return previous;
        isPreviewingRef.current = false;
        return null;
      });
    }, 120);
  };

  const getPinchDistance = () => {
    const points = [...pointersRef.current.values()];
    if (points.length < 2) return null;
    return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  };

  useEffect(() => {
    const container = interactionRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      const delta = event.deltaY < 0 ? 0.08 : -0.08;
      setZoom((previous) => clamp(previous + delta, 0.62, 1.72));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setViewport({ height: rect.height, width: rect.width });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateMapHeight = () => {
      setMapHeight(getAdaptiveMapHeight(window.innerWidth, window.innerHeight));
    };

    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') setIsCtrlPressed(true);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control') setIsCtrlPressed(false);
    };
    const handleBlur = () => setIsCtrlPressed(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${mapHeight}px` }}
      className={cn(
        'relative w-full overflow-hidden rounded-[1.6rem] border border-border/60',
        'bg-[radial-gradient(circle_at_18%_20%,hsl(var(--secondary))_0%,transparent_42%),radial-gradient(circle_at_85%_12%,hsl(var(--accent)/0.42)_0%,transparent_45%),radial-gradient(circle_at_50%_80%,hsl(var(--muted)/0.9)_0%,transparent_52%),hsl(var(--background))]',
      )}
    >
      {overlay && <div className="absolute inset-x-0 top-0 z-40">{overlay}</div>}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)] bg-[size:54px_54px]" />

      <div
        ref={interactionRef}
        className={cn(
          'absolute inset-0 touch-none',
          isDragging ? 'cursor-grabbing' : isCtrlPressed && isMapHovered ? 'cursor-zoom-in' : 'cursor-grab',
        )}
        onPointerEnter={() => setIsMapHovered(true)}
        onPointerLeave={() => setIsMapHovered(false)}
        onPointerDown={(event) => {
          const targetElement = event.target as HTMLElement;
          if (targetElement.closest('[data-neural-preview]')) return;
          if (targetElement.closest('[data-neural-node]')) return;

          pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          event.currentTarget.setPointerCapture(event.pointerId);

          if (pointersRef.current.size >= 2) {
            const distance = getPinchDistance();
            if (distance) {
              stopInertia();
              pinchStateRef.current = { distance, zoom };
              didDragRef.current = true;
            }
            return;
          }

          clearHoverTimer();
          isPreviewingRef.current = false;
          setHoveredNodeId(null);
          setLockedNodeId(null);

          stopInertia();
          stopAligning();
          velocityRef.current = { x: 0, y: 0 };
          draggedDistanceRef.current = 0;
          didDragRef.current = false;
          pointerSampleRef.current = {
            timestamp: event.timeStamp,
            x: event.clientX,
            y: event.clientY,
          };
          isDraggingRef.current = true;
          setIsDragging(true);
        }}
        onPointerMove={(event) => {
          if (pointersRef.current.has(event.pointerId)) {
            pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          }

          if (pinchStateRef.current && pointersRef.current.size >= 2) {
            const distance = getPinchDistance();
            if (distance) {
              const nextZoom = pinchStateRef.current.zoom * (distance / pinchStateRef.current.distance);
              setZoom(clamp(nextZoom, 0.62, 1.72));
            }
            return;
          }

          if (!isDraggingRef.current) return;
          const previousSample = pointerSampleRef.current;
          if (!previousSample) return;

          const moveX = event.clientX - previousSample.x;
          const moveY = event.clientY - previousSample.y;
          const dt = Math.max(event.timeStamp - previousSample.timestamp, 1);
          const containerBounds = event.currentTarget.getBoundingClientRect();
          const normalizedX = ((event.clientX - containerBounds.left) / containerBounds.width - 0.5) * 2;
          const normalizedY = ((event.clientY - containerBounds.top) / containerBounds.height - 0.5) * 2;
          const sensitivityX = 0.2 + Math.abs(normalizedX) * 0.04;
          const sensitivityY = 0.2 + Math.abs(normalizedY) * 0.04;
          const deltaPitch = moveY * sensitivityX;
          const deltaYaw = -moveX * sensitivityY;

          setRotation((current) => ({
            x: normalizeAngle(current.x + deltaPitch),
            y: normalizeAngle(current.y + deltaYaw),
          }));

          draggedDistanceRef.current += Math.hypot(moveX, moveY);
          didDragRef.current = draggedDistanceRef.current > TAP_DISTANCE_THRESHOLD;

          velocityRef.current = {
            x: deltaPitch / dt,
            y: deltaYaw / dt,
          };

          pointerSampleRef.current = {
            timestamp: event.timeStamp,
            x: event.clientX,
            y: event.clientY,
          };
        }}
        onPointerUp={(event) => {
          pointersRef.current.delete(event.pointerId);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }

          if (pointersRef.current.size < 2) {
            pinchStateRef.current = null;
          }

          if (pointersRef.current.size > 0) return;

          isDraggingRef.current = false;
          setIsDragging(false);
          pointerSampleRef.current = null;

          if (didDragRef.current && !isPreviewingRef.current) {
            startInertia();
          }
        }}
        onPointerCancel={(event) => {
          pointersRef.current.delete(event.pointerId);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          pinchStateRef.current = null;
          isDraggingRef.current = false;
          setIsDragging(false);
          pointerSampleRef.current = null;
          if (didDragRef.current && !isPreviewingRef.current) {
            startInertia();
          }
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[1220px] w-[1220px] -translate-x-1/2 -translate-y-1/2 will-change-transform">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="-610 -610 1220 1220">
            {graph.edges.map((edge) => (
              <line
                key={edge.id}
                className="neural-line-twinkle"
                style={getLineAnimationStyle(edge)}
                stroke={edge.stroke}
                x1={edge.x1}
                x2={edge.x2}
                y1={edge.y1}
                y2={edge.y2}
              />
            ))}
          </svg>

          <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/85 shadow-[0_0_0_5px_hsl(var(--background)/0.55)]">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
          </div>

          {graph.nodes.map((node) => {
            const isFrontInteractive = node.depth >= FRONT_INTERACTIVE_DEPTH;
            const isExternalNode = Boolean(node.isExternal);
            const isSocialNode = node.category === 'social';
            const isPinned = lockedNodeId === node.id;
            const isHot = activeNodeId === node.id;
            const hasFocus = activeNodeId !== null;
            const fadeOutFactor = hasFocus && !isHot ? 0.2 : 1;
            const fillColor = isSocialNode
              ? 'hsl(var(--chart-5) / 0.16)'
              : isExternalNode
                ? 'hsl(var(--chart-4) / 0.16)'
                : 'hsl(var(--chart-2) / 0.18)';
            const borderColor = isSocialNode
              ? 'hsl(var(--chart-5) / 0.68)'
              : isExternalNode
                ? 'hsl(var(--chart-4) / 0.68)'
                : 'hsl(var(--chart-2) / 0.66)';
            const shadowColor = isSocialNode
              ? 'hsl(var(--chart-5) / 0.34)'
              : isExternalNode
                ? 'hsl(var(--chart-4) / 0.34)'
                : 'hsl(var(--chart-2) / 0.3)';
            const twinkleSeed = pseudoRandom(hashSeed(`node-twinkle-${node.id}`));
            const twinkleDuration = 9.5 + twinkleSeed * 6.5;
            const displaySize = node.size + 8 + (isPinned ? 6 : 0);

            return (
              <motion.button
                key={node.id}
                type="button"
                data-neural-node
                disabled={!isFrontInteractive}
                aria-label={node.title}
                initial={false}
                animate={{
                  opacity: (0.1 + node.depth * 0.9) * fadeOutFactor,
                  scale: isPinned ? 1.18 : isHot ? 1.08 : 1,
                  x: node.projectedX,
                  y: node.projectedY,
                }}
                transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.65 }}
                style={{
                  left: '50%',
                  top: '50%',
                  zIndex: isPinned ? 420 : isHot ? 300 : Math.round(14 + node.depth * 100),
                }}
                className={cn(
                  'group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  if (didDragRef.current) return;
                  clearHoverTimer();
                  stopInertia();
                  isPreviewingRef.current = true;
                  setHoveredNodeId(node.id);
                  setLockedNodeId((previous) => {
                    if (previous === node.id) {
                      stopAligning();
                      return null;
                    }
                    rotateSphereToNode(node);
                    return node.id;
                  });
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  didDragRef.current = false;
                }}
                onPointerEnter={() => {
                  if (!isFrontInteractive || lockedNodeId) return;
                  clearHoverTimer();
                  stopInertia();
                  isPreviewingRef.current = true;
                  setHoveredNodeId(node.id);
                }}
                onPointerLeave={(event) => {
                  if (lockedNodeId) return;
                  const relatedTarget = event.relatedTarget as HTMLElement | null;
                  if (relatedTarget?.closest('[data-neural-preview]')) return;
                  queueClearHover(node.id);
                }}
                onFocus={() => {
                  if (!isFrontInteractive || lockedNodeId) return;
                  clearHoverTimer();
                  stopInertia();
                  isPreviewingRef.current = true;
                  setHoveredNodeId(node.id);
                }}
                onBlur={(event) => {
                  if (lockedNodeId) return;
                  const relatedTarget = event.relatedTarget as HTMLElement | null;
                  if (relatedTarget?.closest('[data-neural-preview]')) return;
                  queueClearHover(node.id);
                }}
              >
                <span
                  className="relative rounded-full transition-transform duration-300 group-hover:scale-[1.36]"
                  style={{
                    animation: `neural-node-twinkle ${twinkleDuration.toFixed(2)}s cubic-bezier(0.22,1,0.36,1) infinite`,
                    animationDelay: `${(twinkleSeed * 5.2).toFixed(2)}s`,
                    backgroundColor: fillColor,
                    border: `1px solid ${borderColor}`,
                    boxShadow: `0 ${6 + node.depth * 9}px ${14 + node.depth * 16}px -14px ${shadowColor}`,
                    height: `${displaySize.toFixed(2)}px`,
                    width: `${displaySize.toFixed(2)}px`,
                  }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 rounded-full bg-foreground/72"
                    style={{
                      height: `${Math.max(2, displaySize * 0.15).toFixed(2)}px`,
                      transform: 'translate(-50%, -50%)',
                      width: `${Math.max(2, displaySize * 0.15).toFixed(2)}px`,
                    }}
                  />
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isCtrlPressed && isMapHovered && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="pointer-events-none absolute right-4 top-4 rounded-full border border-border/65 bg-background/86 px-3 py-1 text-[11px] text-foreground/75 shadow-sm backdrop-blur"
            >
              Ctrl + Wheel To Zoom
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeNode && (
            <motion.div
              data-neural-preview
              key={activeNode.id}
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ zIndex: 500 }}
              className="absolute inset-x-0 bottom-5 flex justify-center px-4"
            >
              <button
                type="button"
                className="w-full max-w-[28rem] rounded-2xl border border-border/75 bg-background/92 px-4 py-3 text-left shadow-xl backdrop-blur-xl"
                onPointerEnter={() => {
                  clearHoverTimer();
                  isPreviewingRef.current = true;
                  if (!lockedNodeId) setHoveredNodeId(activeNode.id);
                }}
                onPointerLeave={() => {
                  if (!lockedNodeId) queueClearHover(activeNode.id);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateFromPreview(activeNode);
                }}
              >
                <p className="text-[11px] uppercase tracking-wide text-foreground/62">
                  {activeNode.category === 'social'
                    ? 'Social'
                    : activeNode.type === 'post'
                      ? 'Post'
                      : 'Note'}
                  {activeNode.isExternal ? ' · External' : ' · Internal'}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-foreground">{activeNode.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground/78 line-clamp-3">
                  {activeNode.description}
                </p>
                <p className="mt-2 text-xs font-medium text-foreground/70">
                  {lockedNodeId === activeNode.id ? 'Pinned · Click To Open' : 'Preview · Click To Open'}
                </p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

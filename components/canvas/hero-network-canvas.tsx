"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { themePalette } from "@/lib/theme";

type NetworkNode = {
  anchorX: number;
  anchorY: number;
  orbitX: number;
  orbitY: number;
  speed: number;
  phase: number;
  size: number;
  influence: number;
};

type PositionedNode = NetworkNode & {
  x: number;
  y: number;
};

const NODE_COUNT = 18;
const BASE_LINK_DISTANCE = 170;

function createSeededRandom(seed: number) {
  return () => {
    seed = Math.sin(seed * 43758.5453123) * 43758.5453123;
    return seed - Math.floor(seed);
  };
}

function createNodes() {
  const random = createSeededRandom(7.813);

  return Array.from({ length: NODE_COUNT }, () => ({
    anchorX: 0.16 + random() * 0.68,
    anchorY: 0.18 + random() * 0.62,
    orbitX: 0.012 + random() * 0.04,
    orbitY: 0.014 + random() * 0.055,
    speed: 0.42 + random() * 0.52,
    phase: random() * Math.PI * 2,
    size: 1.8 + random() * 2.4,
    influence: 0.45 + random() * 0.75
  }));
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => `${value}${value}`)
          .join("")
      : normalized;

  const numeric = Number.parseInt(expanded, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255
  };
}

function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const nodes = createNodes();

export default function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const palette = themePalette[theme];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    const container = canvas.parentElement;

    if (!context || !container) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;
    let width = 0;
    let height = 0;
    let renderScale = 1;

    const pointer = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderScale = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * renderScale));
      canvas.height = Math.max(1, Math.floor(height * renderScale));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();

      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const drawField = (time: number) => {
      const glow = context.createRadialGradient(
        width * (0.52 + pointer.currentX * 0.05),
        height * (0.3 + pointer.currentY * 0.04),
        0,
        width * 0.5,
        height * 0.52,
        Math.max(width, height) * 0.7
      );

      glow.addColorStop(0, withAlpha(palette.primary, 0.18));
      glow.addColorStop(0.42, withAlpha(palette.secondary, 0.12));
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (let lineIndex = 0; lineIndex < 6; lineIndex += 1) {
        const progress = lineIndex / 5;
        const baseY = height * (0.16 + progress * 0.68);

        context.beginPath();

        for (let x = 0; x <= width + 24; x += 24) {
          const wave =
            Math.sin(x * 0.012 + time * (1 + progress * 0.35) + lineIndex * 0.8) *
            (8 + progress * 10);
          const drift = Math.cos(time * 0.7 + lineIndex) * 7;
          const y = baseY + wave + drift + pointer.currentY * (12 - progress * 8);

          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.strokeStyle =
          lineIndex % 2 === 0
            ? withAlpha(palette.primary, 0.07)
            : withAlpha(palette.muted, 0.08);
        context.lineWidth = 1;
        context.stroke();
      }
    };

    const getNodePositions = (time: number) =>
      nodes.map((node) => ({
        ...node,
        x:
          width * node.anchorX +
          Math.cos(time * node.speed + node.phase) * width * node.orbitX +
          pointer.currentX * node.influence * 26,
        y:
          height * node.anchorY +
          Math.sin(time * node.speed * 0.9 + node.phase * 1.25) *
            height *
            node.orbitY +
          pointer.currentY * node.influence * 18
      }));

    const drawConnections = (positionedNodes: PositionedNode[]) => {
      for (let sourceIndex = 0; sourceIndex < positionedNodes.length; sourceIndex += 1) {
        for (
          let targetIndex = sourceIndex + 1;
          targetIndex < positionedNodes.length;
          targetIndex += 1
        ) {
          const source = positionedNodes[sourceIndex];
          const target = positionedNodes[targetIndex];
          const deltaX = target.x - source.x;
          const deltaY = target.y - source.y;
          const distance = Math.hypot(deltaX, deltaY);
          const reach =
            BASE_LINK_DISTANCE * (0.82 + (source.influence + target.influence) * 0.22);

          if (distance > reach) {
            continue;
          }

          const opacity = (1 - distance / reach) ** 2 * 0.42;
          const gradient = context.createLinearGradient(
            source.x,
            source.y,
            target.x,
            target.y
          );

          gradient.addColorStop(0, withAlpha(palette.primary, opacity * 0.9));
          gradient.addColorStop(1, withAlpha(palette.muted, opacity));

          context.beginPath();
          context.moveTo(source.x, source.y);
          context.lineTo(target.x, target.y);
          context.strokeStyle = gradient;
          context.lineWidth = 0.6 + opacity * 2;
          context.stroke();
        }
      }
    };

    const drawNodes = (positionedNodes: PositionedNode[], time: number) => {
      positionedNodes.forEach((node, index) => {
        const pulse = prefersReducedMotion
          ? 1
          : 0.92 + Math.sin(time * 2.2 + index * 0.45) * 0.12;
        const radius = node.size * pulse;

        context.beginPath();
        context.fillStyle = withAlpha(palette.primary, 0.96);
        context.shadowBlur = 18 + node.influence * 10;
        context.shadowColor = withAlpha(palette.primary, 0.65);
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = withAlpha(palette.secondary, 0.88);
        context.shadowBlur = 0;
        context.arc(node.x, node.y, Math.max(1, radius * 0.36), 0, Math.PI * 2);
        context.fill();
      });

      context.shadowBlur = 0;
    };

    const render = (timestamp: number) => {
      const time = timestamp * 0.001 * (prefersReducedMotion ? 0.35 : 1);

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;

      context.clearRect(0, 0, width, height);
      drawField(time);

      const positionedNodes = getNodePositions(time);
      drawConnections(positionedNodes);
      drawNodes(positionedNodes, time);

      frame = window.requestAnimationFrame(render);
    };

    resize();
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, [palette.muted, palette.primary, palette.secondary]);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full mask-edge opacity-90"
      />
    </div>
  );
}

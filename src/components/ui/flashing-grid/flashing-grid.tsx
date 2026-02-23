import * as React from "react";

import { cn } from "@/lib/utils";

import styles from "./flashing-grid.module.css";

const BLOCK_SIZE = 90; // each unit is 90×90px with a 3×3 grid inside
const GRID_PER_BLOCK = 3; // 3×3 cells per block, cell = 30×30px
const CELL_SIZE = BLOCK_SIZE / GRID_PER_BLOCK; // 30
const SQUARE = 30; // flashing square size, matches cell

// Hover trail: dwell time to reach 100% opacity (seconds)
const DWELL_FOR_FULL_OPACITY = 0.4;
// How long the trail takes to fade out (seconds) — longer = more visible trail
const TRAIL_DECAY_DURATION = 1.2;
// Minimum opacity for a brief hover (short hover ≈ 10%)
const MIN_HOVER_OPACITY = 0.1;
// Brush size: 0 = only the cell under the cursor (1×1 = 30×30px). 1 = 3×3 cells, etc.
const BRUSH_RADIUS_CELLS = 0;

interface CellDatum {
  dwellTime: number;
  lastVisitTime: number;
}

/** Ease-out: 1 at t=0, 0 at t=duration; smooth falloff */
function trailDecay(timeSinceLeave: number): number {
  if (timeSinceLeave <= 0) return 1;
  const t = Math.min(1, timeSinceLeave / TRAIL_DECAY_DURATION);
  return 1 - t * t * (3 - 2 * t); // smoothstep
}

/** Opacity from dwell: 10% for short, up to 100% for long hover */
function dwellToOpacity(dwellTime: number): number {
  const t = Math.min(1, dwellTime / DWELL_FOR_FULL_OPACITY);
  return MIN_HOVER_OPACITY + (1 - MIN_HOVER_OPACITY) * t;
}

/** Weight for a cell at (cellX, cellY) given cursor in content coords. Used when BRUSH_RADIUS_CELLS > 0. */
function brushWeight(
  contentX: number,
  contentY: number,
  cellX: number,
  cellY: number,
  radiusCells: number
): number {
  if (radiusCells <= 0) return 1;
  const cellCenterX = (cellX + 0.5) * CELL_SIZE;
  const cellCenterY = (cellY + 0.5) * CELL_SIZE;
  const dx = (contentX - cellCenterX) / CELL_SIZE;
  const dy = (contentY - cellCenterY) / CELL_SIZE;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist >= radiusCells) return 0;
  return 1 - (dist / radiusCells) * (dist / radiusCells); // smooth falloff
}

function getLinePositions(blocks: number): number[] {
  const size = blocks * BLOCK_SIZE;
  const positions: number[] = [];
  for (let i = 0; i <= blocks; i++) {
    positions.push(i * BLOCK_SIZE);
  }
  for (let b = 0; b < blocks; b++) {
    for (let j = 1; j < GRID_PER_BLOCK; j++) {
      positions.push(b * BLOCK_SIZE + j * CELL_SIZE);
    }
  }
  return positions
    .sort((a, b) => a - b)
    .filter((p) => p > 0 && p < size);
}

export interface FlashingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of 90×90 blocks per axis when square. Default 6. */
  blocks?: number;
  /** Number of 90×90 blocks horizontally (overrides blocks for width when provided with blocksY). */
  blocksX?: number;
  /** Number of 90×90 blocks vertically (overrides blocks for height when provided with blocksX). */
  blocksY?: number;
  /** Override total size in px (square); defaults to content size. */
  size?: number;
  /** Override width in px (rectangular). */
  width?: number;
  /** Override height in px (rectangular). */
  height?: number;
}

const DEFAULT_BLOCKS = 6;

export const FlashingGrid = React.forwardRef<HTMLDivElement, FlashingGridProps>(
  (
    {
      className,
      blocks = DEFAULT_BLOCKS,
      blocksX: blocksXProp,
      blocksY: blocksYProp,
      size: sizeProp,
      width: widthProp,
      height: heightProp,
      style,
      ...props
    },
    ref
  ) => {
    const blocksX = blocksXProp ?? blocks;
    const blocksY = blocksYProp ?? blocks;
    const contentWidth = blocksX * BLOCK_SIZE;
    const contentHeight = blocksY * BLOCK_SIZE;
    const displayWidth = widthProp ?? sizeProp ?? contentWidth;
    const displayHeight = heightProp ?? sizeProp ?? contentHeight;

    const linePositionsX = React.useMemo(
      () => getLinePositions(blocksX),
      [blocksX]
    );
    const linePositionsY = React.useMemo(
      () => getLinePositions(blocksY),
      [blocksY]
    );

    const cellsX = blocksX * GRID_PER_BLOCK;
    const cellsY = blocksY * GRID_PER_BLOCK;

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const hoverLayerRef = React.useRef<SVGSVGElement | null>(null);
    const cellDataRef = React.useRef<Map<string, CellDatum>>(new Map());
    const mouseRef = React.useRef<{
      clientX: number;
      clientY: number;
      hovered: boolean;
    }>({ clientX: 0, clientY: 0, hovered: false });
    const lastFrameRef = React.useRef<number>(0);

    const setContainerRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    React.useEffect(() => {
      let rafId = 0;
      function tick(now: number) {
        rafId = requestAnimationFrame(tick);
        const rect = containerRef.current?.getBoundingClientRect();
        const { clientX, clientY, hovered } = mouseRef.current;
        const contentWidth = blocksX * BLOCK_SIZE;
        const contentHeight = blocksY * BLOCK_SIZE;
        const dt = lastFrameRef.current ? (now - lastFrameRef.current) / 1000 : 0;
        lastFrameRef.current = now;

        if (rect && rect.width > 0 && rect.height > 0) {
          const contentX =
            ((clientX - rect.left) / rect.width) * contentWidth;
          const contentY =
            ((clientY - rect.top) / rect.height) * contentHeight;
          const cursorCellX = Math.floor(contentX / CELL_SIZE);
          const cursorCellY = Math.floor(contentY / CELL_SIZE);
          const inBounds =
            cursorCellX >= 0 &&
            cursorCellX < cellsX &&
            cursorCellY >= 0 &&
            cursorCellY < cellsY;

          if (hovered && inBounds) {
            const nowSec = now / 1000;
            const minCx = Math.max(0, cursorCellX - BRUSH_RADIUS_CELLS);
            const maxCx = Math.min(cellsX - 1, cursorCellX + BRUSH_RADIUS_CELLS);
            const minCy = Math.max(0, cursorCellY - BRUSH_RADIUS_CELLS);
            const maxCy = Math.min(cellsY - 1, cursorCellY + BRUSH_RADIUS_CELLS);
            for (let cy = minCy; cy <= maxCy; cy++) {
              for (let cx = minCx; cx <= maxCx; cx++) {
                const w =
                  BRUSH_RADIUS_CELLS <= 0
                    ? 1
                    : brushWeight(contentX, contentY, cx, cy, BRUSH_RADIUS_CELLS);
                if (w <= 0) continue;
                const key = `${cx},${cy}`;
                let data = cellDataRef.current.get(key);
                if (!data) {
                  data = { dwellTime: 0, lastVisitTime: nowSec };
                  cellDataRef.current.set(key, data);
                }
                data.dwellTime += dt * w;
                data.lastVisitTime = nowSec;
              }
            }
          }

          const next: Record<string, number> = {};
          const nowSec = now / 1000;
          for (let cy = 0; cy < cellsY; cy++) {
            for (let cx = 0; cx < cellsX; cx++) {
              const key = `${cx},${cy}`;
              const data = cellDataRef.current.get(key);
              if (!data) continue;
              const timeSinceLeave = nowSec - data.lastVisitTime;
              const decay = trailDecay(timeSinceLeave);
              const base = dwellToOpacity(data.dwellTime);
              const opacity = base * decay;
              if (opacity > 0.005) next[key] = opacity;
            }
          }
          // Update trail opacities directly in the DOM to avoid React re-renders every frame
          const layer = hoverLayerRef.current;
          if (layer) {
            const rects = layer.querySelectorAll<SVGRectElement>("rect[data-cell]");
            rects.forEach((el) => {
              const key = el.getAttribute("data-cell");
              if (key != null) el.style.opacity = String(next[key] ?? 0);
            });
          }
        }
      }
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }, [blocksX, blocksY, cellsX, cellsY]);

    const onMouseEnter = React.useCallback(() => {
      mouseRef.current.hovered = true;
    }, []);
    const onMouseLeave = React.useCallback(() => {
      mouseRef.current.hovered = false;
    }, []);
    const onMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        mouseRef.current.clientX = e.clientX;
        mouseRef.current.clientY = e.clientY;
      },
      []
    );

    // One 30×30 flashing square per 90×90 block: random cell, delay, duration, and max opacity (stable per mount)
    const squares = React.useMemo(() => {
      const out: {
        x: number;
        y: number;
        delay: number;
        duration: number;
        maxOpacity: number;
      }[] = [];
      for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
          const cellIndex = Math.floor(Math.random() * 9);
          const cy = Math.floor(cellIndex / 3);
          const cx = cellIndex % 3;
          const x = bx * BLOCK_SIZE + cx * CELL_SIZE;
          const y = by * BLOCK_SIZE + cy * CELL_SIZE;
          const delay = Math.random() * 2.5;
          const duration = 2 + Math.random() * 2;
          const maxOpacity = 0.2 + Math.random() * 0.4;
          out.push({ x, y, delay, duration, maxOpacity });
        }
      }
      return out;
    }, [blocksX, blocksY]);

    return (
      <div
        ref={setContainerRef}
        className={cn(styles.root, className)}
        style={{ width: displayWidth, height: displayHeight, ...style }}
        {...props}
        onMouseEnter={(e) => {
          props.onMouseEnter?.(e);
          onMouseEnter();
        }}
        onMouseLeave={(e) => {
          props.onMouseLeave?.(e);
          onMouseLeave();
        }}
        onMouseMove={(e) => {
          props.onMouseMove?.(e);
          onMouseMove(e);
        }}
      >
        <svg
          className={styles.gridSvg}
          viewBox={`0 0 ${contentWidth} ${contentHeight}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <g stroke="var(--color-border)" strokeWidth={1} opacity={0.5}>
            {linePositionsX.map((x, i) => (
              <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={contentHeight} />
            ))}
            {linePositionsY.map((y, i) => (
              <line key={`h-${i}`} x1={0} y1={y} x2={contentWidth} y2={y} />
            ))}
          </g>
        </svg>
        <svg
          className={styles.squaresLayer}
          viewBox={`0 0 ${contentWidth} ${contentHeight}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {squares.map(({ x, y, delay, duration, maxOpacity }, i) => (
            <rect
              key={i}
              className={styles.square}
              x={x}
              y={y}
              width={SQUARE}
              height={SQUARE}
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                // @ts-expect-error CSS custom property for keyframes
                "--opacity-max": maxOpacity,
              }}
            />
          ))}
        </svg>
        <svg
          ref={hoverLayerRef}
          className={styles.hoverLayer}
          viewBox={`0 0 ${contentWidth} ${contentHeight}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {Array.from({ length: cellsY }, (_, cy) =>
            Array.from({ length: cellsX }, (_, cx) => {
              const key = `${cx},${cy}`;
              return (
                <rect
                  key={key}
                  data-cell={key}
                  className={styles.trailSquare}
                  x={cx * CELL_SIZE}
                  y={cy * CELL_SIZE}
                  width={SQUARE}
                  height={SQUARE}
                  style={{ opacity: 0 }}
                />
              );
            })
          ).flat()}
        </svg>
      </div>
    );
  }
);

FlashingGrid.displayName = "FlashingGrid";

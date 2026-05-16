"use client";

import { useMemo, useId } from "react";
import { motion } from "framer-motion";
import { useCategoryTheme } from "@/components/CategoryThemeProvider";
import { CategoryTheme, PatternType } from "@/lib/category-themes";

// ============================================================
// SVG Pattern Components (with unique IDs via uid prop)
// ============================================================

function GeometricPattern({ color, uid }: { color: string; uid: string }) {
  const patternId = `geometric-grid-${uid}`;
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Grid lines */}
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.4"
          />
          {/* Diagonal accent */}
          <path
            d="M 0 0 L 60 60"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            opacity="0.2"
          />
          {/* Corner dot */}
          <circle cx="0" cy="0" r="1.5" fill={color} opacity="0.3" />
          {/* Center square */}
          <rect
            x="22"
            y="22"
            width="16"
            height="16"
            fill="none"
            stroke={color}
            strokeWidth="0.4"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function CodePattern({ color, uid }: { color: string; uid: string }) {
  const patternId = `code-brackets-${uid}`;
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="80"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Angle brackets < > */}
          <path
            d="M 20 15 L 10 30 L 20 45"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 35 15 L 45 30 L 35 45"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.3"
            strokeLinecap="round"
          />
          {/* Slash */}
          <path
            d="M 55 15 L 65 45"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.2"
            strokeLinecap="round"
          />
          {/* Dot separators */}
          <circle cx="28" cy="30" r="1" fill={color} opacity="0.3" />
          <circle cx="72" cy="30" r="1" fill={color} opacity="0.2" />
          {/* Curly brace hint */}
          <path
            d="M 5 25 Q 10 25 10 30 Q 10 35 5 35"
            fill="none"
            stroke={color}
            strokeWidth="0.4"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function HexagonalPattern({ color, uid }: { color: string; uid: string }) {
  const patternId = `hex-grid-${uid}`;
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Hexagons - first row */}
          <path
            d="M 28 2 L 52 16 L 52 44 L 28 58 L 4 44 L 4 16 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.3"
          />
          {/* Inner hexagon */}
          <path
            d="M 28 14 L 42 22 L 42 38 L 28 46 L 14 38 L 14 22 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            opacity="0.2"
          />
          {/* Circuit connection lines */}
          <line
            x1="28"
            y1="2"
            x2="28"
            y2="-8"
            stroke={color}
            strokeWidth="0.4"
            opacity="0.2"
          />
          <line
            x1="52"
            y1="30"
            x2="62"
            y2="30"
            stroke={color}
            strokeWidth="0.4"
            opacity="0.2"
          />
          {/* Node dots at hex vertices */}
          <circle cx="28" cy="2" r="1.2" fill={color} opacity="0.3" />
          <circle cx="52" cy="16" r="1" fill={color} opacity="0.25" />
          <circle cx="52" cy="44" r="1" fill={color} opacity="0.25" />
          <circle cx="28" cy="58" r="1.2" fill={color} opacity="0.3" />
          <circle cx="4" cy="44" r="1" fill={color} opacity="0.25" />
          <circle cx="4" cy="16" r="1" fill={color} opacity="0.25" />
          {/* Center node */}
          <circle cx="28" cy="30" r="2" fill={color} opacity="0.15" />
          {/* Second row offset hex */}
          <path
            d="M 0 58 L -14 72 L 0 86 L 14 72 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            opacity="0.15"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function NeuralPattern({ color, uid }: { color: string; uid: string }) {
  const patternId = `neural-net-${uid}`;
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="90"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Layer 1 - Input nodes */}
          <circle cx="15" cy="20" r="3" fill={color} opacity="0.12" />
          <circle cx="15" cy="40" r="3.5" fill={color} opacity="0.15" />
          <circle cx="15" cy="60" r="3" fill={color} opacity="0.12" />

          {/* Layer 2 - Hidden nodes */}
          <circle cx="45" cy="15" r="2.5" fill={color} opacity="0.1" />
          <circle cx="45" cy="30" r="3" fill={color} opacity="0.13" />
          <circle cx="45" cy="50" r="3" fill={color} opacity="0.13" />
          <circle cx="45" cy="65" r="2.5" fill={color} opacity="0.1" />

          {/* Layer 3 - Output nodes */}
          <circle cx="75" cy="25" r="3" fill={color} opacity="0.12" />
          <circle cx="75" cy="55" r="3" fill={color} opacity="0.12" />

          {/* Connections Layer 1 → Layer 2 */}
          <line x1="18" y1="20" x2="42" y2="15" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="18" y1="20" x2="42" y2="30" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="18" y1="40" x2="42" y2="30" stroke={color} strokeWidth="0.4" opacity="0.15" />
          <line x1="18" y1="40" x2="42" y2="50" stroke={color} strokeWidth="0.4" opacity="0.15" />
          <line x1="18" y1="60" x2="42" y2="50" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="18" y1="60" x2="42" y2="65" stroke={color} strokeWidth="0.3" opacity="0.15" />

          {/* Connections Layer 2 → Layer 3 */}
          <line x1="48" y1="15" x2="72" y2="25" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="48" y1="30" x2="72" y2="25" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="48" y1="30" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="48" y1="50" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="48" y1="65" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.12" />

          {/* Pulse rings on some nodes */}
          <circle cx="15" cy="40" r="6" fill="none" stroke={color} strokeWidth="0.3" opacity="0.08" />
          <circle cx="45" cy="30" r="5.5" fill="none" stroke={color} strokeWidth="0.3" opacity="0.08" />
          <circle cx="75" cy="25" r="5" fill="none" stroke={color} strokeWidth="0.3" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// ============================================================
// Pattern Renderer
// ============================================================

function CategoryPattern({ pattern, color, uid }: { pattern: PatternType; color: string; uid: string }) {
  switch (pattern) {
    case "geometric":
      return <GeometricPattern color={color} uid={uid} />;
    case "code":
      return <CodePattern color={color} uid={uid} />;
    case "hexagonal":
      return <HexagonalPattern color={color} uid={uid} />;
    case "neural":
      return <NeuralPattern color={color} uid={uid} />;
    default:
      return <GeometricPattern color={color} uid={uid} />;
  }
}

// ============================================================
// Main Background Component
// ============================================================

interface CategoryBackgroundProps {
  /** Override the theme - if not provided, uses useCategoryTheme() */
  theme?: CategoryTheme;
  /** Opacity of the pattern overlay (0-1), default 0.07 */
  patternOpacity?: number;
  /** Show/hide pattern overlay, default true */
  showPattern?: boolean;
  /** Show/hide gradient orbs, default true */
  showOrbs?: boolean;
  /** Additional class names */
  className?: string;
}

export function CategoryBackground({
  theme: themeProp,
  patternOpacity = 0.07,
  showPattern = true,
  showOrbs = true,
  className = "",
}: CategoryBackgroundProps) {
  // Get theme from context (always available with default) or override with prop
  const { theme: contextTheme } = useCategoryTheme();
  const theme = themeProp || contextTheme;
  const uid = useId();

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Gradient Orbs */}
      {showOrbs && (
        <>
          {/* Primary orb - top right */}
          <motion.div
            key={`orb1-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 10, -5, 0],
              y: [0, -8, 5, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.primaryColor}08` }}
          />

          {/* Secondary orb - middle left */}
          <motion.div
            key={`orb2-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, -8, 5, 0],
              y: [0, 10, -5, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
              x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-1/3 -left-20 w-60 h-60 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.gradientVia}06` }}
          />

          {/* Tertiary orb - bottom center */}
          <motion.div
            key={`orb3-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 5, -10, 0],
              y: [0, -5, 8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { duration: 0.8, delay: 0.4 },
              x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.gradientTo}05` }}
          />

          {/* Accent glow - top left (smaller) */}
          <motion.div
            key={`orb4-${theme.slug}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [0, 8, -3, 0],
              y: [0, 5, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-20 left-1/3 w-48 h-48 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.primaryColor}04` }}
          />
        </>
      )}

      {/* Pattern Overlay */}
      {showPattern && (
        <motion.div
          key={`pattern-${theme.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: patternOpacity }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <CategoryPattern pattern={theme.pattern} color={theme.primaryColor} uid={uid} />
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// Compact Background for Cards
// ============================================================

interface CategoryCardBackgroundProps {
  theme: CategoryTheme;
  /** Show pattern on hover, default true */
  showPatternOnHover?: boolean;
  className?: string;
}

let cardBgCounter = 0;

export function CategoryCardBackground({
  theme,
  showPatternOnHover = true,
  className = "",
}: CategoryCardBackgroundProps) {
  const uid = useId();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient tint */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
        }}
      />

      {/* Pattern (visible on hover via group-hover) */}
      {showPatternOnHover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500">
          <CategoryPattern pattern={theme.pattern} color={theme.primaryColor} uid={uid} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useId, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.4"
          />
          <path
            d="M 0 0 L 60 60"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            opacity="0.2"
          />
          <circle cx="0" cy="0" r="1.5" fill={color} opacity="0.3" />
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
          <path
            d="M 55 15 L 65 45"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="30" r="1" fill={color} opacity="0.3" />
          <circle cx="72" cy="30" r="1" fill={color} opacity="0.2" />
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
          <path
            d="M 28 2 L 52 16 L 52 44 L 28 58 L 4 44 L 4 16 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M 28 14 L 42 22 L 42 38 L 28 46 L 14 38 L 14 22 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            opacity="0.2"
          />
          <line x1="28" y1="2" x2="28" y2="-8" stroke={color} strokeWidth="0.4" opacity="0.2" />
          <line x1="52" y1="30" x2="62" y2="30" stroke={color} strokeWidth="0.4" opacity="0.2" />
          <circle cx="28" cy="2" r="1.2" fill={color} opacity="0.3" />
          <circle cx="52" cy="16" r="1" fill={color} opacity="0.25" />
          <circle cx="52" cy="44" r="1" fill={color} opacity="0.25" />
          <circle cx="28" cy="58" r="1.2" fill={color} opacity="0.3" />
          <circle cx="4" cy="44" r="1" fill={color} opacity="0.25" />
          <circle cx="4" cy="16" r="1" fill={color} opacity="0.25" />
          <circle cx="28" cy="30" r="2" fill={color} opacity="0.15" />
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
          <circle cx="15" cy="20" r="3" fill={color} opacity="0.12" />
          <circle cx="15" cy="40" r="3.5" fill={color} opacity="0.15" />
          <circle cx="15" cy="60" r="3" fill={color} opacity="0.12" />
          <circle cx="45" cy="15" r="2.5" fill={color} opacity="0.1" />
          <circle cx="45" cy="30" r="3" fill={color} opacity="0.13" />
          <circle cx="45" cy="50" r="3" fill={color} opacity="0.13" />
          <circle cx="45" cy="65" r="2.5" fill={color} opacity="0.1" />
          <circle cx="75" cy="25" r="3" fill={color} opacity="0.12" />
          <circle cx="75" cy="55" r="3" fill={color} opacity="0.12" />
          <line x1="18" y1="20" x2="42" y2="15" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="18" y1="20" x2="42" y2="30" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="18" y1="40" x2="42" y2="30" stroke={color} strokeWidth="0.4" opacity="0.15" />
          <line x1="18" y1="40" x2="42" y2="50" stroke={color} strokeWidth="0.4" opacity="0.15" />
          <line x1="18" y1="60" x2="42" y2="50" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="18" y1="60" x2="42" y2="65" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="48" y1="15" x2="72" y2="25" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="48" y1="30" x2="72" y2="25" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="48" y1="30" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.12" />
          <line x1="48" y1="50" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.15" />
          <line x1="48" y1="65" x2="72" y2="55" stroke={color} strokeWidth="0.3" opacity="0.12" />
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
// Floating Particle
// ============================================================

function FloatingParticle({
  color,
  size,
  initialX,
  initialY,
  duration,
  delay,
}: {
  color: string;
  size: number;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: initialX,
        top: initialY,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 10, -5, 8, 0],
        opacity: [0.15, 0.4, 0.25, 0.35, 0.15],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ============================================================
// Main Background Component — with Mouse Parallax
// ============================================================

interface CategoryBackgroundProps {
  theme?: CategoryTheme;
  patternOpacity?: number;
  showPattern?: boolean;
  showOrbs?: boolean;
  showParticles?: boolean;
  className?: string;
}

export function CategoryBackground({
  theme: themeProp,
  patternOpacity = 0.10,
  showPattern = true,
  showOrbs = true,
  showParticles = true,
  className = "",
}: CategoryBackgroundProps) {
  const { theme: contextTheme } = useCategoryTheme();
  const theme = themeProp || contextTheme;
  const uid = useId();

  // Mouse parallax tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Normalize to -1..1 range
      mouseX.set((e.clientX - rect.left - centerX) / centerX * 20);
      mouseY.set((e.clientY - rect.top - centerY) / centerY * 20);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random particles
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 5,
      initialX: `${10 + Math.random() * 80}%`,
      initialY: `${10 + Math.random() * 80}%`,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
    })),
    []
  );

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Gradient Orbs — with mouse parallax */}
      {showOrbs && (
        <>
          {/* Primary orb — top right */}
          <motion.div
            key={`orb1-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
            }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ x: springX, y: springY, backgroundColor: `${theme.primaryColor}12` }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                x: [0, 10, -5, 0],
                y: [0, -8, 5, 0],
              }}
              transition={{
                x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>

          {/* Secondary orb — middle left */}
          <motion.div
            key={`orb2-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
            }}
            className="absolute top-1/3 -left-16 w-72 h-72 rounded-full blur-3xl"
            style={{ x: springX, y: springY, backgroundColor: `${theme.gradientVia}10` }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                x: [0, -8, 5, 0],
                y: [0, 10, -5, 0],
              }}
              transition={{
                x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>

          {/* Tertiary orb — bottom center */}
          <motion.div
            key={`orb3-${theme.slug}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { duration: 0.8, delay: 0.4 },
            }}
            className="absolute -bottom-16 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ x: springX, y: springY, backgroundColor: `${theme.gradientTo}0c` }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                x: [0, 5, -10, 0],
                y: [0, -5, 8, 0],
              }}
              transition={{
                x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>

          {/* Accent glow — top left */}
          <motion.div
            key={`orb4-${theme.slug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.8, delay: 0.3 } }}
            className="absolute top-20 left-1/3 w-56 h-56 rounded-full blur-3xl"
            style={{ x: springX, y: springY, backgroundColor: `${theme.primaryColor}08` }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                x: [0, 8, -3, 0],
                y: [0, 5, -8, 0],
              }}
              transition={{
                x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </>
      )}

      {/* Floating Particles */}
      {showParticles && particles.map((p) => (
        <FloatingParticle
          key={p.id}
          color={theme.primaryColor}
          size={p.size}
          initialX={p.initialX}
          initialY={p.initialY}
          duration={p.duration}
          delay={p.delay}
        />
      ))}

      {/* Pattern Overlay — more visible */}
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
  showPatternOnHover?: boolean;
  className?: string;
}

export function CategoryCardBackground({
  theme,
  showPatternOnHover = true,
  className = "",
}: CategoryCardBackgroundProps) {
  const uid = useId();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient tint — more visible */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
        }}
      />

      {/* Pattern — visible on hover */}
      {showPatternOnHover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500">
          <CategoryPattern pattern={theme.pattern} color={theme.primaryColor} uid={uid} />
        </div>
      )}
    </div>
  );
}

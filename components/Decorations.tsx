"use client";

import { motion } from "framer-motion";

export function GypsophilaSprig({
  className = "",
  mirror = false,
  delay = 0,
}: {
  className?: string;
  mirror?: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 180 240"
      fill="none"
      aria-hidden
      className={`pointer-events-none origin-bottom will-change-transform ${className}`}
      style={{ scaleX: mirror ? -1 : 1 }}
      animate={{ rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path
        d="M88 232 C84 170 98 132 78 96 C62 68 78 42 86 12"
        stroke="#6F8F74"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M86 160 C108 146 124 132 142 108" stroke="#6F8F74" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M84 122 C58 108 42 90 28 68" stroke="#6F8F74" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M82 88 C104 74 118 54 128 34" stroke="#6F8F74" strokeWidth="1.05" strokeLinecap="round" />
      <ellipse cx="118" cy="78" rx="14" ry="7" fill="#9BB59A" transform="rotate(24 118 78)" opacity="0.85" />
      <ellipse cx="52" cy="98" rx="12" ry="6" fill="#B5C9B4" transform="rotate(-28 52 98)" opacity="0.9" />
      {[
        [86, 16],
        [76, 30],
        [96, 38],
        [68, 52],
        [104, 56],
        [48, 70],
        [120, 72],
        [34, 84],
        [132, 90],
        [60, 104],
        [110, 112],
        [74, 128],
        [98, 140],
        [84, 154],
        [140, 106],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3.4" fill="#FFFFFF" stroke="#D7E6D6" strokeWidth="0.55" />
          <circle cx={cx} cy={cy} r="1.15" fill="#E8F0E7" />
        </g>
      ))}
    </motion.svg>
  );
}

export function EucalyptusLeaf({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 90 140"
      className={`pointer-events-none ${className}`}
      animate={{ y: [0, -12, 0], rotate: [-6, 8, -6] }}
      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    >
      <path d="M44 132 C42 96 48 64 44 22" stroke="#6F8F74" strokeWidth="1.5" fill="none" />
      <ellipse cx="58" cy="48" rx="18" ry="9" fill="#9BB59A" transform="rotate(28 58 48)" />
      <ellipse cx="30" cy="72" rx="16" ry="8" fill="#B5C9B4" transform="rotate(-30 30 72)" />
      <ellipse cx="56" cy="96" rx="15" ry="7.5" fill="#8EAE8D" transform="rotate(22 56 96)" />
    </motion.svg>
  );
}

export function WaveDivider({
  top = "#F7FAF4",
  bottom = "#E4EDE2",
  flip = false,
}: {
  top?: string;
  bottom?: string;
  flip?: boolean;
}) {
  return (
    <div className="pointer-events-none relative z-10 -my-[1px] w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 600 70"
        preserveAspectRatio="none"
        className={`block h-[48px] w-full ${flip ? "rotate-180" : ""}`}
      >
        <rect width="600" height="70" fill={top} />
        <path
          d="M0 28 C90 8 150 52 240 30 C330 8 390 54 480 28 C540 12 575 34 600 24 L600 70 L0 70 Z"
          fill={bottom}
        />
        <path
          d="M20 34 C100 16 160 48 250 32 C340 16 400 50 490 34 C545 22 575 40 590 34"
          stroke="#6F8F74"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}

export function SectionOrnament({ invert = false }: { invert?: boolean }) {
  const color = invert ? "#E4EDE2" : "#6F8F74";
  return (
    <div className="mx-auto flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10" style={{ background: color, opacity: 0.55 }} />
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
        <circle cx="10" cy="10" r="3.2" fill={invert ? "#F7FAF4" : "#4F6F52"} />
        <circle cx="10" cy="10" r="6.5" fill="none" stroke={color} strokeWidth="1" opacity="0.55" />
      </svg>
      <span className="h-px w-10" style={{ background: color, opacity: 0.55 }} />
    </div>
  );
}

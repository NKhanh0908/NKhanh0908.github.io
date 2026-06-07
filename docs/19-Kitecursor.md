"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── SVG kite shapes (asymmetric like a real paper kite, ~48px) ──────────────
function KiteSVG({ color, stroke }: { color: string; stroke: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="48" height="58">
      {/* Main body: asymmetric diamond */}
      <polygon
        points="48,4 95,38 62,95 5,52"
        fill={color}
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Cross spine lines */}
      <line x1="48" y1="4" x2="62" y2="95" stroke={stroke} strokeWidth="2" />
      <line x1="5" y1="52" x2="95" y2="38" stroke={stroke} strokeWidth="2" />
      {/* Two dot "eyes" */}
      <circle cx="38" cy="50" r="7" fill={stroke} />
      <circle cx="68" cy="38" r="6" fill={stroke} />
      {/* Tail flap */}
      <polygon
        points="62,95 78,112 48,118 38,105"
        fill={color}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Color palette ─────────────────────────────────────────────────────────────
const KITE_PALETTE = [
  { key: "yellow", fill: "#F5A623", stroke: "#cc7a00", bit: "#F5A623" },
  { key: "blue",   fill: "#2196F3", stroke: "#0d47a1", bit: "#2196F3" },
  { key: "red",    fill: "#E53935", stroke: "#7f0000", bit: "#E53935" },
  { key: "green",  fill: "#43A047", stroke: "#1b5e20", bit: "#43A047" },
];

interface Bit {
  id: number;
  x: number;
  y: number;
  value: string;
  opacity: number;
  vy: number;
  vx: number;
  color: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function KiteCursor() {
  const [paletteIdx, setPaletteIdx] = useState(1); // start blue
  const [bits, setBits] = useState<Bit[]>([]);
  const [kitePos, setKitePos] = useState({ x: -200, y: -200 });
  const [angle, setAngle] = useState(0);

  const palette = KITE_PALETTE[paletteIdx];

  const mouseRef    = useRef({ x: -200, y: -200 });
  const currentPos  = useRef({ x: -200, y: -200 });
  const prevPos     = useRef({ x: -200, y: -200 });
  const bitIdRef    = useRef(0);
  const frameRef    = useRef<number>(0);
  const lastBitTime = useRef(0);
  const paletteRef  = useRef(paletteIdx);

  // keep ref in sync so animate closure reads latest color
  useEffect(() => { paletteRef.current = paletteIdx; }, [paletteIdx]);

  const animate = useCallback(() => {
    const target = mouseRef.current;
    const curr   = currentPos.current;

    // Smooth lerp
    curr.x += (target.x - curr.x) * 0.13;
    curr.y += (target.y - curr.y) * 0.13;

    // Tilt angle from velocity
    const dx = curr.x - prevPos.current.x;
    const dy = curr.y - prevPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed > 0.4) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
      setAngle((prev) => {
        const diff = ((targetAngle - prev + 540) % 360) - 180;
        return prev + diff * 0.1;
      });
    }
    prevPos.current = { x: curr.x, y: curr.y };
    setKitePos({ x: curr.x, y: curr.y });

    // Spawn binary bits
    const now = Date.now();
    if (speed > 1.2 && now - lastBitTime.current > 55) {
      lastBitTime.current = now;
      const col = KITE_PALETTE[paletteRef.current].bit;
      setBits((prev) => [
        ...prev.slice(-55),
        {
          id:      bitIdRef.current++,
          x:       curr.x + (Math.random() - 0.5) * 14,
          y:       curr.y + 28,
          value:   Math.random() > 0.5 ? "1" : "0",
          opacity: 0.9,
          vy:      1.2 + Math.random() * 1.8,
          vx:      (Math.random() - 0.5) * 1.2,
          color:   col,
        },
      ]);
    }

    // Physics tick
    setBits((prev) =>
      prev
        .map((b) => ({ ...b, y: b.y + b.vy, x: b.x + b.vx, opacity: b.opacity - 0.018 }))
        .filter((b) => b.opacity > 0)
    );

    frameRef.current = requestAnimationFrame(animate);
  }, []); // stable — reads refs, not state

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animate]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onClick = () =>
      setPaletteIdx((i) => (i + 1) % KITE_PALETTE.length);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Binary bits trail */}
      {bits.map((b) => (
        <span
          key={b.id}
          style={{
            position:      "fixed",
            left:          b.x,
            top:           b.y,
            opacity:       b.opacity,
            color:         b.color,
            fontFamily:    "'Courier New', monospace",
            fontWeight:    700,
            fontSize:      "11px",
            pointerEvents: "none",
            userSelect:    "none",
            transform:     "translate(-50%, -50%)",
            textShadow:    `0 0 6px ${b.color}88`,
            zIndex:        9998,
          }}
        >
          {b.value}
        </span>
      ))}

      {/* Kite cursor */}
      <div
        style={{
          position:      "fixed",
          left:          kitePos.x,
          top:           kitePos.y,
          transform:     `translate(-50%, -50%) rotate(${angle}deg)`,
          pointerEvents: "none",
          userSelect:    "none",
          zIndex:        9999,
          filter:        "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
        }}
      >
        <KiteSVG color={palette.fill} stroke={palette.stroke} />
      </div>

      {/* Hint pill */}
      <div
        style={{
          position:      "fixed",
          bottom:        18,
          left:          "50%",
          transform:     "translateX(-50%)",
          background:    "rgba(0,0,0,0.55)",
          backdropFilter:"blur(6px)",
          color:         "#fff",
          padding:       "5px 14px",
          borderRadius:  20,
          fontSize:      12,
          fontFamily:    "monospace",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       0.65,
          whiteSpace:    "nowrap",
        }}
      >
        Click to change kite · Move to drop bits
      </div>
    </>
  );
}
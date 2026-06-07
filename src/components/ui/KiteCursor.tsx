"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import kiteBlue from "@/assets/mouses/kite-blue.svg";
import kiteGreen from "@/assets/mouses/kite-green.svg";
import kiteRed from "@/assets/mouses/kite-red.svg";
import kiteYellow from "@/assets/mouses/kite-yellow.svg";

// ── Color palette mapping to static SVG assets ──────────────────────────────
const KITE_PALETTE = [
  { key: "blue",   src: kiteBlue,   bit: "#2196F3" },
  { key: "green",  src: kiteGreen,  bit: "#43A047" },
  { key: "red",    src: kiteRed,    bit: "#E53935" },
  { key: "yellow", src: kiteYellow, bit: "#F5A623" },
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

export default function KiteCursor() {
  return null; // Temporarily disabled - restores default mouse cursor

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [paletteIdx, setPaletteIdx] = useState(0); // Start with Blue
  const [bits, setBits] = useState<Bit[]>([]);
  const [kitePos, setKitePos] = useState({ x: -200, y: -200 });
  const [angle, setAngle] = useState(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [clickAnimation, setClickAnimation] = useState(false);

  const palette = KITE_PALETTE[paletteIdx];

  const mouseRef    = useRef({ x: -200, y: -200 });
  const currentPos  = useRef({ x: -200, y: -200 });
  const prevPos     = useRef({ x: -200, y: -200 });
  const bitIdRef    = useRef(0);
  const frameRef    = useRef<number>(0);
  const lastBitTime = useRef(0);
  const paletteRef  = useRef(paletteIdx);

  // Keep ref in sync so animate closure reads latest index
  useEffect(() => {
    paletteRef.current = paletteIdx;
  }, [paletteIdx]);

  // 1. Detect environment / mobile on mount
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  // 2. Accessibility & Activation Listeners
  useEffect(() => {
    if (!mounted || isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsCursorActive(true);
    };

    const onKeyDown = () => {
      // Restore native cursor on keyboard events (e.g. Tab navigation)
      setIsCursorActive(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, isMobile]);

  // 3. Hovering Interactive Elements Detection
  useEffect(() => {
    if (!mounted || isMobile) return;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, .cursor-pointer") !== null;
      setIsHoveringInteractive(isInteractive);
    };

    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mounted, isMobile]);

  // 4. Color Cycling on Click
  useEffect(() => {
    if (!mounted || isMobile) return;

    const onClick = () => {
      setPaletteIdx((i) => (i + 1) % KITE_PALETTE.length);
      setClickAnimation(false);
      setTimeout(() => {
        setClickAnimation(true);
      }, 10);
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [mounted, isMobile]);

  // Clean up click animation state after completion
  useEffect(() => {
    if (clickAnimation) {
      const timer = setTimeout(() => {
        setClickAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [clickAnimation]);

  // 5. Inject CSS Class on html element based on cursor state
  useEffect(() => {
    if (!mounted || isMobile) return;

    if (isCursorActive) {
      document.documentElement.classList.add("kite-cursor-active");
    } else {
      document.documentElement.classList.remove("kite-cursor-active");
    }

    return () => {
      document.documentElement.classList.remove("kite-cursor-active");
    };
  }, [mounted, isMobile, isCursorActive]);

  // 6. Hint Pill Fadeout timer
  useEffect(() => {
    if (isCursorActive && showHint) {
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isCursorActive, showHint]);

  // 7. Animation loop definition
  const animate = useCallback(() => {
    const target = mouseRef.current;
    const curr   = currentPos.current;

    // Smooth lerp movement
    curr.x += (target.x - curr.x) * 0.13;
    curr.y += (target.y - curr.y) * 0.13;

    // Tilt angle from velocity
    const dx = curr.x - prevPos.current.x;
    const dy = curr.y - prevPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.4) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      setAngle((prev) => {
        const diff = ((targetAngle - prev + 540) % 360) - 180;
        return prev + diff * 0.1;
      });
    }
    prevPos.current = { x: curr.x, y: curr.y };
    setKitePos({ x: curr.x, y: curr.y });

    // Spawn binary trail elements with constraints for rendering performance
    const now = Date.now();
    if (speed > 1.2 && now - lastBitTime.current > 55) {
      lastBitTime.current = now;
      const col = KITE_PALETTE[paletteRef.current].bit;
      
      // Calculate tail position dynamically based on direction of movement
      const tailOffset = 10; // approx distance from center to tail for even smaller kite
      const tailX = curr.x - (dx / speed) * tailOffset;
      const tailY = curr.y - (dy / speed) * tailOffset;

      setBits((prev) => {
        const newBits = [
          ...prev,
          {
            id:      bitIdRef.current++,
            x:       tailX + (Math.random() - 0.5) * 8,
            y:       tailY + (Math.random() - 0.5) * 8,
            value:   Math.random() > 0.5 ? "1" : "0",
            opacity: 0.9,
            vy:      1.2 + Math.random() * 1.8,
            vx:      (Math.random() - 0.5) * 1.2,
            color:   col,
          },
        ];
        // Hard cap at 40 bits to limit DOM element footprint
        return newBits.length > 40 ? newBits.slice(-40) : newBits;
      });
    }

    // Physics tick
    setBits((prev) =>
      prev
        .map((b) => ({ ...b, y: b.y + b.vy, x: b.x + b.vx, opacity: b.opacity - 0.018 }))
        .filter((b) => b.opacity > 0)
    );

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  // 8. Animation Frame Control / Cleanup
  useEffect(() => {
    if (!mounted || isMobile || !isCursorActive) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      return;
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };
  }, [mounted, isMobile, isCursorActive, animate]);

  // Don't render server-side or on mobile/touch screens
  if (!mounted || isMobile) return null;

  // Resolve SVG source string cleanly, whether imported as string or Next StaticImageData object
  const imageSrc = typeof palette.src === "string" ? palette.src : palette.src?.src;

  return (
    <>
      <style>{`
        .kite-cursor-active, 
        .kite-cursor-active * { 
          cursor: none !important; 
        }
        @keyframes kiteClickPulse {
          0% { transform: scale(1); filter: brightness(1); }
          35% { transform: scale(1.35); filter: brightness(1.3) drop-shadow(0 0 6px var(--bit-color)); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        .kite-click-pulse {
          animation: kiteClickPulse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Binary bits trail */}
      {isCursorActive && bits.map((b) => (
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
      {isCursorActive && (
        <div
          style={{
            position:      "fixed",
            left:          kitePos.x,
            top:           kitePos.y,
            transform:     `translate(-50%, -50%) rotate(${angle}deg) scale(${isHoveringInteractive ? 1.25 : 1.0})`,
            pointerEvents: "none",
            userSelect:    "none",
            zIndex:        9999,
            filter:        "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
            transition:    "transform 0.15s ease-out",
          }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt={`Kite Cursor ${palette.key}`}
              width="22"
              height="26"
              className={clickAnimation ? "kite-click-pulse" : ""}
              style={{
                display: "block",
                width: "22px",
                height: "26px",
                transformOrigin: "center center",
                transition: "transform 0.1s ease-out",
                "--bit-color": palette.bit,
              } as React.CSSProperties}
            />
          )}
        </div>
      )}

      {/* Hint pill */}
      {isCursorActive && showHint && (
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
            opacity:       showHint ? 0.65 : 0,
            transition:    "opacity 1s ease-in-out",
            whiteSpace:    "nowrap",
          }}
        >
          Click to change kite · Move to drop bits
        </div>
      )}
    </>
  );
}

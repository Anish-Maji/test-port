import React, { useEffect, useRef } from 'react';

// ============================================================================
// PIXEL TILE
// A tile that fills with a grid of tiny twinkling pixels on hover. Pixels
// switch on in a ripple from the centre, shimmer while the pointer stays, and
// shrink away on leave. Colours are shades of the tile's `color`.
// The canvas loop only runs while pixels are animating.
// ============================================================================

const GAP = 5; // px between pixel centres
const SPEED = 0.035; // shimmer speed
const RIPPLE = 0.9; // delay frames per px of distance from the centre

const hexToHsl = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s * 100, l * 100];
};

// The tool's colour plus a lighter tint and two neighbouring hues
const paletteFor = (hex) => {
  const [h, s, l] = hexToHsl(hex);
  const sat = Math.max(s, 55);
  return [
    hex,
    `hsl(${h} ${sat}% ${Math.min(l + 18, 78)}%)`,
    `hsl(${(h + 28) % 360} ${sat}% ${Math.min(l + 6, 68)}%)`,
    `hsl(${(h + 332) % 360} ${sat}% ${Math.max(l - 4, 38)}%)`,
  ];
};

class Pixel {
  constructor(x, y, color, delay) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.delay = delay;
    this.counter = 0;
    this.size = 0;
    this.maxSize = 1 + Math.random() * 1.6;
    this.minSize = 0.5;
    this.step = Math.random() * SPEED + SPEED / 2;
    this.growing = true;
    this.idle = false;
  }

  appear() {
    this.idle = false;
    if (this.counter <= this.delay) {
      this.counter += 1;
      return;
    }
    if (this.size >= this.maxSize) this.growing = false;
    if (this.size <= this.minSize) this.growing = true;
    this.size += this.growing ? this.step : -this.step;
  }

  disappear() {
    this.counter = 0;
    if (this.size <= 0) {
      this.idle = true;
      this.size = 0;
      return;
    }
    this.size -= 0.1;
  }

  draw(ctx) {
    if (this.size <= 0) return;
    const offset = (GAP - this.size) / 2;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }
}

export default function PixelTile({ color, className = '', children }) {
  const tileRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef(null);
  const frameRef = useRef(null);
  const modeRef = useRef('idle');

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build the pixel grid at the tile's current size (and screen pixel density)
  const setup = () => {
    const tile = tileRef.current;
    const canvas = canvasRef.current;
    const { width, height } = tile.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = paletteFor(color);
    const pixels = [];
    for (let x = 0; x < width; x += GAP) {
      for (let y = 0; y < height; y += GAP) {
        const dist = Math.hypot(x - width / 2, y - height / 2);
        const tint = palette[Math.floor(Math.random() * palette.length)];
        pixels.push(new Pixel(x, y, tint, dist * RIPPLE));
      }
    }
    pixelsRef.current = { pixels, width, height };
  };

  const loop = () => {
    const ctx = canvasRef.current.getContext('2d');
    const { pixels, width, height } = pixelsRef.current;
    ctx.clearRect(0, 0, width, height);
    let allIdle = true;
    for (const p of pixels) {
      if (modeRef.current === 'appear') p.appear();
      else p.disappear();
      if (!p.idle) allIdle = false;
      p.draw(ctx);
    }
    if (modeRef.current === 'disappear' && allIdle) {
      frameRef.current = null;
      return;
    }
    frameRef.current = requestAnimationFrame(loop);
  };

  const start = (mode) => {
    if (reducedMotion()) return;
    // A fresh hover rebuilds the grid, so it always matches the tile's size
    if (!frameRef.current && mode === 'appear') setup();
    if (!pixelsRef.current) return;
    modeRef.current = mode;
    if (!frameRef.current) frameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div
      ref={tileRef}
      className={`pixel-tile ${className}`}
      style={{ '--tile-color': color }}
      onPointerEnter={() => start('appear')}
      onPointerLeave={() => start('disappear')}
    >
      <canvas ref={canvasRef} className="pixel-tile-canvas" aria-hidden="true" />
      {children}
    </div>
  );
}

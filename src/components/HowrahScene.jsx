import React, { useEffect, useRef } from 'react';

// ============================================================================
// HOWRAH SCENE
// An animated pixel-art Howrah Bridge over the Hooghly, drawn as a dot-matrix
// grid behind the footer. Dusk in light mode, night (lit bridge, stars, moon)
// in dark mode. Clicking anywhere launches a firework from the bridge, which
// bursts where you clicked (if that's in the sky) and reflects in the river.
//
// How it draws: the scene is computed into a tiny image (one pixel per dot),
// scaled up without smoothing, then thin gaps are cut between the dots. The
// sky, city and bridge are built once per size/theme; each frame only adds
// the moving parts (clouds, birds, boats, water, fireworks).
// ============================================================================

const CELL = 5; // css px per dot, including the 1px gap
const FPS = 30;

const PALETTES = {
  light: {
    sky: [[238, 233, 247], [247, 229, 233], [253, 216, 196]],
    sun: [255, 168, 84],
    sunEdge: [255, 204, 138],
    cloud: [255, 244, 240],
    cityFar: [205, 198, 226],
    cityNear: [176, 168, 208],
    windows: null,
    trees: [104, 150, 140],
    bank: [196, 176, 196],
    steel: [124, 128, 172],
    steelLight: [154, 158, 198],
    pier: [150, 140, 170],
    lamp: null,
    water: [[221, 214, 238], [240, 236, 248]],
    sparkle: [255, 246, 236],
    boat: [82, 84, 122],
    bird: [96, 98, 136],
    star: null,
    moon: null,
  },
  dark: {
    sky: [[9, 10, 22], [22, 22, 52], [62, 44, 84]],
    sun: null,
    sunEdge: null,
    cloud: [40, 38, 72],
    cityFar: [34, 34, 62],
    cityNear: [26, 27, 50],
    windows: [255, 196, 110],
    trees: [24, 44, 48],
    bank: [32, 30, 52],
    steel: [52, 58, 98],
    steelLight: [74, 80, 126],
    pier: [38, 36, 60],
    lamp: [255, 214, 120],
    water: [[24, 22, 48], [12, 12, 26]],
    sparkle: [150, 140, 210],
    boat: [10, 10, 20],
    bird: [70, 66, 110],
    star: [226, 226, 255],
    moon: [244, 238, 216],
  },
};

const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Small deterministic noise so the city and stars look the same every visit
const hash = (x, y) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

function buildScene(cols, rows, pal) {
  const hz = Math.round(rows * 0.76); // waterline
  const deck = hz - Math.max(5, Math.round(rows * 0.06));
  const cx = cols / 2;
  // Towers sit out to the sides so the contact text has open sky between
  // them; their height follows the real bridge's proportions to its span
  const half = Math.min(cols * 0.33, rows * 1.3);
  const towerH = Math.round(Math.min(rows * 0.24, half * 0.36));
  const xa = Math.round(cx - half);
  const xb = Math.round(cx + half);
  const anchor = Math.round(half * 0.55);
  const L = xa - anchor; // left end of the bridge; the right end mirrors it
  const xs = (xa + (cx - xa) * 0.6); // left cantilever tip
  const hs = Math.round(towerH * 0.28); // suspended span height

  // Height of the bridge's top chord above the deck at column x
  const chord = (x) => {
    const mx = x <= cx ? x : cols - x; // mirror for the right half
    if (mx < L || mx > cols - L) return 0;
    if (mx <= xa) return 2 + (towerH - 2) * Math.pow(clamp01((mx - L) / (xa - L)), 1.5);
    if (mx <= xs) return hs + (towerH - hs) * Math.pow(1 - (mx - xa) / (xs - xa), 2);
    const u = (mx - cx) / (cx - xs);
    return hs + 3 * (1 - u * u);
  };

  const size = cols * rows;
  const sky = new Float32Array(size * 3);
  const fg = new Float32Array(size * 4); // rgb + alpha
  const isSky = new Uint8Array(size);

  const setSky = (x, y, c) => {
    const i = (y * cols + x) * 3;
    sky[i] = c[0];
    sky[i + 1] = c[1];
    sky[i + 2] = c[2];
  };
  const setFg = (x, y, c) => {
    if (x < 0 || y < 0 || x >= cols || y >= hz) return;
    const i = (y * cols + x) * 4;
    fg[i] = c[0];
    fg[i + 1] = c[1];
    fg[i + 2] = c[2];
    fg[i + 3] = 1;
  };
  const line = (x0, y0, x1, y1, c) => {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      setFg(x0, y0, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  };

  // Sky: banded gradient with ordered dithering for the pixel-art look
  for (let y = 0; y < hz; y += 1) {
    const t = y / hz;
    for (let x = 0; x < cols; x += 1) {
      const d = BAYER[(y % 4) * 4 + (x % 4)];
      const q = Math.min(1, Math.floor(t * 9 + d * 0.9) / 9);
      const c = q < 0.5 ? mix(pal.sky[0], pal.sky[1], q * 2) : mix(pal.sky[1], pal.sky[2], (q - 0.5) * 2);
      setSky(x, y, c);
      isSky[y * cols + x] = 1;
    }
  }

  // Sun behind the bridge (dusk) or moon and stars (night)
  if (pal.sun) {
    const sr = Math.max(4, Math.round(Math.min(rows * 0.12, half * 0.3)));
    const sy = deck - Math.round(sr * 0.35);
    for (let y = sy - sr; y <= sy + sr; y += 1) {
      for (let x = Math.round(cx - sr); x <= cx + sr; x += 1) {
        const d = Math.hypot(x - cx, (y - sy) * 1.05) / sr;
        if (d <= 1 && y >= 0 && y < hz) setSky(x, y, mix(pal.sun, pal.sunEdge, clamp01((y - (sy - sr)) / (sr * 2)) * 0.8 + d * 0.2));
      }
    }
  }
  if (pal.moon) {
    const mxp = Math.round(cols * 0.82);
    const myp = Math.round(rows * 0.2);
    for (let y = myp - 3; y <= myp + 3; y += 1) {
      for (let x = mxp - 3; x <= mxp + 3; x += 1) {
        const lit = Math.hypot(x - mxp, y - myp) <= 3.2;
        const shadow = Math.hypot(x - mxp - 1.6, y - myp + 0.8) <= 2.6; // crescent
        if (lit && !shadow) setSky(x, y, pal.moon);
      }
    }
  }

  // Far city across the whole width (also the far bank seen under the deck)
  for (let x = 0; x < cols; x += 1) {
    const block = Math.floor(x / 3);
    const h = 2 + Math.floor(hash(block, 3) * 6) + (hash(block, 9) > 0.92 ? 4 : 0);
    for (let y = hz - h; y < hz; y += 1) setFg(x, y, pal.cityFar);
  }

  // Near city and ghats on each bank, outside the anchor piers
  for (let x = 0; x < cols; x += 1) {
    const onBank = x < L + 1 || x > cols - L - 2;
    if (!onBank) continue;
    const block = Math.floor(x / 4);
    let h = 4 + Math.floor(hash(block, 21) * 12);
    if (hash(block, 33) > 0.85) h += 6;
    const top = deck - h;
    for (let y = top; y < hz; y += 1) {
      let c = y > deck + 1 ? pal.bank : pal.cityNear;
      if (pal.windows && y < deck - 1 && y > top + 1 && x % 2 === 0 && y % 3 === 0 && hash(x, y) > 0.55) c = pal.windows;
      setFg(x, y, c);
    }
    // Domes on a few buildings
    if (hash(block, 47) > 0.86 && x % 4 === 1) {
      line(x - 1, top - 1, x + 2, top - 1, pal.cityNear);
      line(x, top - 2, x + 1, top - 2, pal.cityNear);
    }
    // Trees along the riverbank
    if (hash(x, 61) > 0.35) {
      const th = 1 + Math.floor(hash(x, 71) * 3);
      for (let y = deck + 2 - th; y <= deck + 2; y += 1) setFg(x, y, pal.trees);
    }
  }

  // The bridge: piers, deck, truss and towers
  const lamps = [];
  for (const px of [xa, xb]) {
    for (let y = deck + 2; y < hz; y += 1) for (let x = px - 2; x <= px + 2; x += 1) setFg(x, y, pal.pier);
  }
  for (const px of [L, cols - L]) {
    for (let y = deck; y < hz; y += 1) for (let x = px - 2; x <= px + 2; x += 1) setFg(x, y, pal.pier);
  }

  // Truss: posts every P columns with one diagonal per panel, leaning towards
  // the nearest tower, which keeps the lattice light behind the text
  const P = 5;
  let prev = null;
  for (let x = Math.round(L); x <= Math.round(cols - L); x += 1) {
    const top = deck - Math.round(chord(x));
    if (prev) line(prev[0], prev[1], x, top, pal.steel);
    prev = [x, top];
    if ((x - Math.round(L)) % P === 0) {
      const nx = Math.min(x + P, Math.round(cols - L));
      const ntop = deck - Math.round(chord(nx));
      line(x, deck, x, top, pal.steelLight);
      const towardsLeftTower = Math.abs(x - xa) < Math.abs(x - xb) ? x > xa : x > xb;
      if (towardsLeftTower) line(x, top, nx, deck, pal.steel);
      else line(x, deck, nx, ntop, pal.steel);
      if (pal.lamp && ((x - Math.round(L)) / P) % 2 === 0) lamps.push([x, top - 1]);
    }
  }
  for (let x = Math.round(L) - 2; x <= Math.round(cols - L) + 2; x += 1) {
    setFg(x, deck, pal.steel);
    setFg(x, deck + 1, pal.steelLight);
    if (pal.lamp && x % 3 === 0) lamps.push([x, deck - 1]);
  }
  for (const tx of [xa, xb]) {
    const tt = deck - towerH;
    for (let y = tt; y <= deck; y += 1) for (let x = tx - 1; x <= tx + 1; x += 1) setFg(x, y, x === tx ? pal.steelLight : pal.steel);
    line(tx - 2, tt, tx + 2, tt, pal.steel);
    setFg(tx, tt - 1, pal.steel);
    setFg(tx, tt - 2, pal.steelLight);
    for (let y = tt + 3; y < deck; y += 5) { line(tx - 2, y, tx + 2, y, pal.steel); }
    if (pal.lamp) lamps.push([tx, tt - 3]);
  }

  // Where a firework launches from: the top of the bridge nearest column x
  const launchPoint = (x) => {
    const bx = Math.max(Math.round(L) + 1, Math.min(Math.round(cols - L) - 1, Math.round(x)));
    return [bx, deck - Math.round(chord(bx)) - 1];
  };

  return { cols, rows, hz, deck, sky, fg, isSky, lamps, pal, cx, launchPoint };
}

// Firework colours: bright enough for the dusk sky, glowing at night
const FIREWORK_COLOURS = [
  [[255, 92, 138], [255, 196, 214]],
  [[255, 196, 64], [255, 240, 180]],
  [[84, 214, 255], [200, 244, 255]],
  [[168, 230, 60], [226, 255, 170]],
  [[178, 120, 255], [228, 206, 255]],
  [[255, 128, 60], [255, 214, 170]],
];

export default function HowrahScene({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const small = document.createElement('canvas');
    const sctx = small.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let scene = null;
    let img = null;
    let gapPattern = null;
    let themeName = null;
    let visible = false;
    let frame = null;
    let lastDraw = 0;
    let dpr = 1;
    const rockets = [];
    const sparks = [];
    let clouds = [];
    let boats = [];
    let birds = [];
    let nextAutoFirework = performance.now() + 3000;

    const currentTheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    const setup = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      small.width = cols;
      small.height = rows;
      img = sctx.createImageData(cols, rows);
      themeName = currentTheme();
      scene = buildScene(cols, rows, PALETTES[themeName]);

      // Transparent gaps between the dots
      const p = document.createElement('canvas');
      const cell = CELL * dpr;
      p.width = Math.round(cell);
      p.height = Math.round(cell);
      const pc = p.getContext('2d');
      pc.fillStyle = '#000';
      const gap = Math.max(1, Math.round(dpr));
      pc.fillRect(p.width - gap, 0, gap, p.height);
      pc.fillRect(0, p.height - gap, p.width, gap);
      gapPattern = ctx.createPattern(p, 'repeat');

      // Moving parts, placed by grid size
      clouds = Array.from({ length: Math.max(3, Math.round(cols / 60)) }, (_, i) => ({
        x: hash(i, 5) * cols,
        y: Math.round(rows * (0.12 + hash(i, 6) * 0.3)),
        len: 10 + Math.round(hash(i, 7) * 22),
        speed: 0.6 + hash(i, 8) * 0.8,
      }));
      boats = Array.from({ length: Math.max(2, Math.round(cols / 110)) }, (_, i) => ({
        x: hash(i, 15) * cols,
        y: scene.hz + 4 + Math.round(hash(i, 16) * (rows - scene.hz - 9)),
        speed: (0.8 + hash(i, 17) * 1.2) * (i % 2 ? -1 : 1),
      }));
      birds = Array.from({ length: 4 }, (_, i) => ({
        x: hash(i, 25) * cols,
        y: Math.round(rows * (0.18 + hash(i, 26) * 0.2)),
        speed: 2 + hash(i, 27) * 2,
        phase: hash(i, 28) * 6,
      }));
    };

    const draw = (time) => {
      if (!scene) return;
      if (currentTheme() !== themeName) setup();
      const { cols, rows, hz, sky, fg, isSky, lamps, pal } = scene;
      const t = time / 1000;
      const data = img.data;
      const upper = new Float32Array(cols * hz * 3);

      // Sky
      upper.set(sky.subarray(0, cols * hz * 3));
      const put = (x, y, c, a = 1) => {
        x = Math.round(x);
        y = Math.round(y);
        if (x < 0 || y < 0 || x >= cols || y >= hz) return;
        const i = (y * cols + x) * 3;
        upper[i] += (c[0] - upper[i]) * a;
        upper[i + 1] += (c[1] - upper[i + 1]) * a;
        upper[i + 2] += (c[2] - upper[i + 2]) * a;
      };

      // Stars twinkle at night
      if (pal.star) {
        for (let i = 0; i < cols * 0.5; i += 1) {
          const sx = Math.floor(hash(i, 81) * cols);
          const sy = Math.floor(hash(i, 82) * hz * 0.55);
          const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * (1 + hash(i, 83) * 2) + i));
          if (isSky[sy * cols + sx]) put(sx, sy, pal.star, tw * 0.9);
        }
      }

      // Clouds drift behind the bridge
      for (const c of clouds) {
        const x0 = ((c.x + t * c.speed) % (cols + c.len * 2)) - c.len;
        for (let k = 0; k < c.len; k += 1) {
          const edge = Math.min(k, c.len - 1 - k);
          put(x0 + k, c.y, pal.cloud, edge < 2 ? 0.45 : 0.85);
          if (k > 3 && k < c.len - 5) put(x0 + k + 2, c.y - 1, pal.cloud, 0.55);
        }
      }

      // City and bridge on top
      for (let i = 0, j = 0; i < cols * hz; i += 1, j += 4) {
        if (fg[j + 3] > 0) {
          upper[i * 3] = fg[j];
          upper[i * 3 + 1] = fg[j + 1];
          upper[i * 3 + 2] = fg[j + 2];
        }
      }

      // Bridge lamps flicker gently at night
      for (let k = 0; k < lamps.length; k += 1) {
        const [lx, ly] = lamps[k];
        put(lx, ly, pal.lamp, 0.75 + 0.25 * Math.sin(t * 3 + k));
      }

      // Birds flap across the sky
      for (const b of birds) {
        const bx = ((b.x + t * b.speed) % (cols + 20)) - 10;
        const flap = Math.sin(t * 6 + b.phase) > 0 ? -1 : 0;
        put(bx, b.y, pal.bird);
        put(bx - 1, b.y + flap, pal.bird, 0.9);
        put(bx + 1, b.y + flap, pal.bird, 0.9);
      }

      // Fireworks, drawn into the sky so the river reflects them.
      // Rockets: a bright head with a short fading trail.
      for (const r of rockets) {
        put(r.x, r.y, [255, 248, 220], 1);
        for (let k = 1; k <= 4; k += 1) put(r.x, r.y + k, r.colour[0], 0.7 - k * 0.15);
      }
      // Sparks: each leaves a dim trail and twinkles as it fades out
      for (const s of sparks) {
        const life = s.age / s.life;
        const twinkle = life > 0.6 ? (Math.sin(t * 30 + s.seed * 50) > 0 ? 1 : 0.3) : 1;
        const a = (1 - life) * twinkle;
        put(s.x, s.y, life < 0.25 ? s.colour[1] : s.colour[0], a);
        put(s.x - s.vx * 0.04, s.y - s.vy * 0.04, s.colour[0], a * 0.45);
      }

      // Write the upper half
      for (let i = 0; i < cols * hz; i += 1) {
        data[i * 4] = upper[i * 3];
        data[i * 4 + 1] = upper[i * 3 + 1];
        data[i * 4 + 2] = upper[i * 3 + 2];
        data[i * 4 + 3] = 255;
      }

      // Water: wobbly reflection of everything above, fading with depth,
      // with drifting sparkles
      const depthRows = rows - hz;
      for (let y = hz; y < rows; y += 1) {
        const d = y - hz;
        const fade = 0.32 + 0.55 * (d / depthRows);
        const base = mix(pal.water[0], pal.water[1], d / depthRows);
        const wob = Math.sin(d * 0.9 - t * 1.8) * (0.4 + d * 0.05);
        const srcY = hz - 1 - d;
        for (let x = 0; x < cols; x += 1) {
          let c = base;
          if (srcY >= 0) {
            const sx = Math.max(0, Math.min(cols - 1, Math.round(x + wob + Math.sin(x * 0.3 + t) * 0.4)));
            const si = (srcY * cols + sx) * 3;
            c = mix([upper[si], upper[si + 1], upper[si + 2]], base, fade);
          }
          const sparkle = hash(Math.floor(x / 3 + t * 1.5), y) > 0.965 && (x + y) % 2 === 0;
          if (sparkle) c = mix(c, pal.sparkle, 0.6);
          const o = (y * cols + x) * 4;
          data[o] = c[0];
          data[o + 1] = c[1];
          data[o + 2] = c[2];
          data[o + 3] = 255;
        }
      }

      // Boats (country boats with a curved hood) and their reflections
      const putW = (x, y, c, a = 1) => {
        x = Math.round(x);
        y = Math.round(y);
        if (x < 0 || y < hz || x >= cols || y >= rows) return;
        const o = (y * cols + x) * 4;
        data[o] += (c[0] - data[o]) * a;
        data[o + 1] += (c[1] - data[o + 1]) * a;
        data[o + 2] += (c[2] - data[o + 2]) * a;
      };
      for (const b of boats) {
        const span = cols + 30;
        const bx = (((b.x + t * b.speed) % span) + span) % span - 15;
        const by = b.y + Math.round(Math.sin(t * 1.4 + b.x) * 0.5);
        const shape = [
          [-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
          [-5, -1], [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [5, -1],
          [-1, -1], [0, -1], [1, -1], [-1, -2], [0, -2], [1, -2], [-2, -1], [2, -1],
        ];
        for (const [ox, oy] of shape) {
          putW(bx + ox, by + oy, pal.boat);
          putW(bx + ox, by + 3 - oy, pal.boat, 0.25);
        }
        if (pal.lamp) putW(bx + 2, by - 2, pal.lamp, 0.9);
      }

      sctx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(small, 0, 0, cols * CELL * dpr, rows * CELL * dpr);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gapPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    };

    const step = (time) => {
      frame = null;
      if (!visible) return;
      if (time - lastDraw >= 1000 / FPS) {
        const dt = lastDraw ? Math.min(0.1, (time - lastDraw) / 1000) : 0;
        lastDraw = time;
        // Rockets climb, slowing down, and burst at their target height
        for (let i = rockets.length - 1; i >= 0; i -= 1) {
          const r = rockets[i];
          r.y -= dt * r.speed;
          r.speed = Math.max(14, r.speed - dt * 22);
          if (r.y <= r.targetY) {
            burst(r);
            rockets.splice(i, 1);
          }
        }
        // Sparks spread out, slow down, fall and fade
        for (let i = sparks.length - 1; i >= 0; i -= 1) {
          const s = sparks[i];
          s.age += dt;
          s.vx *= 1 - dt * 1.4;
          s.vy = s.vy * (1 - dt * 1.4) + dt * 9;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.age >= s.life) sparks.splice(i, 1);
        }
        // Now and then a firework goes off on its own
        if (time > nextAutoFirework) {
          nextAutoFirework = time + 7000 + Math.random() * 7000;
          launch(Math.random() * scene.cols, null);
        }
        draw(time);
      }
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame === null && visible && !reduced) frame = requestAnimationFrame(step);
    };

    // A rocket leaves the bridge below `gx` and bursts at `gy` if that's up
    // in the sky, otherwise somewhere high up
    function launch(gx, gy) {
      if (!scene || rockets.length > 8) return;
      const [x, y] = scene.launchPoint(gx);
      // Not above ~18% of the height: the scene fades out at the top
      const highest = scene.rows * 0.18;
      const skyTarget = gy !== null && gy < y - 12 ? Math.max(highest, gy) : null;
      rockets.push({
        x,
        y,
        targetY: skyTarget ?? highest + Math.random() * scene.rows * 0.2,
        speed: 46 + Math.random() * 10,
        colour: FIREWORK_COLOURS[Math.floor(Math.random() * FIREWORK_COLOURS.length)],
      });
    }

    function burst(r) {
      const count = 50 + Math.floor(Math.random() * 20);
      const power = 24 + Math.random() * 10;
      // Some bursts mix in a second colour
      const second = Math.random() < 0.4 ? FIREWORK_COLOURS[Math.floor(Math.random() * FIREWORK_COLOURS.length)] : r.colour;
      for (let k = 0; k < count; k += 1) {
        const angle = (k / count) * Math.PI * 2 + Math.random() * 0.2;
        // A spread of speeds fills the burst instead of leaving a thin ring
        const speed = power * (0.2 + Math.sqrt(Math.random()) * 0.8);
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life: 1.1 + Math.random() * 0.7,
          seed: Math.random(),
          colour: k % 2 ? second : r.colour,
        });
      }
      if (sparks.length > 500) sparks.splice(0, sparks.length - 500);
    }

    // Clicking anywhere in the scene launches a firework
    const toGrid = (e) => {
      const r = canvas.getBoundingClientRect();
      return [(e.clientX - r.left) / CELL, (e.clientY - r.top) / CELL];
    };
    const onClick = (e) => {
      if (!scene || reduced) return;
      const [gx, gy] = toGrid(e);
      launch(gx, gy);
    };
    const onMove = () => {
      canvas.style.cursor = reduced ? 'default' : 'pointer';
    };

    setup();
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      setup();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    // Redraw straight away when the theme flips (e.g. reduced motion, or off-screen)
    const themeObserver = new MutationObserver(() => {
      setup();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

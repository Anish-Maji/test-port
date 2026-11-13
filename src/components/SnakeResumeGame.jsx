import React, { useEffect, useRef, useState } from 'react';
import downloadIcon from '../assets/home/nitendo-switches/download-icon.svg';
import '../styles/SnakeResumeGame.css';

// ============================================================================
// SNAKE RESUME GAME
// A snake game on the Game Boy screen: the snake eats little resumes and grows.
// The scene is a 192x128 pixel space: a title band on top, then a 24x13 grid
// of 8px cells. This component puts two functions in `controlsRef` for App.jsx:
// steer('top' | 'bottom' | 'left' | 'right') and love(), which pauses the game
// on a thank-you heart until the next steer.
// ============================================================================

const CELL = 8;
const COLS = 24;
const ROWS = 13;
const GRID_TOP = 24;
// Starts slow and gets faster with every resume eaten, topping out after 20
const START_SPEED = 260; // ms per step
const MIN_SPEED = 100;
const SPEED_UP_PER_RESUME = 8;

const DIRS = {
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

const randomFreeCell = (snake) => {
  const taken = new Set(snake.map((s) => `${s.x},${s.y}`));
  const free = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)];
};

const newGame = () => {
  const snake = [
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
  ];
  return {
    snake,
    dir: 'right',
    queue: [],
    food: { x: 15, y: 6 },
    score: 0,
    status: 'ready',
    // While showing the thank-you heart, the status to return to
    statusBeforeThanks: null,
    thanksCount: 0,
  };
};

function PixelHeart({ className }) {
  return (
    <svg className={className} viewBox="0 0 13 11" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#0e1b44" d="M2 0h3v1h1v1h1V1h1V0h3v1h1v1h1v4h-1v1h-1v1H9v1H8v1H7v1H6v-1H5V9H4V8H3V7H2V6H1V2h1z" />
      <path fill="#ff3b5c" d="M2 1h3v1h1v1h1V2h1V1h3v1h1v4h-1v1H9v1H8v1H7v1H6V9H5V8H4V7H3V6H2z" />
      <path fill="#ff8aa0" d="M3 2h2v1H4v1H3zM9 2h1v1H9z" />
      <path fill="#c81e3f" d="M10 5h1v1h-1v1H9v1H8v1H7v1H6V9h1V8h1V7h1V6h1z" />
    </svg>
  );
}

// Checkerboard of slightly lighter cells so the grid reads on the sky
const GRID_PATH = (() => {
  let d = '';
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = (y % 2); x < COLS; x += 2) {
      d += `M${x * CELL} ${GRID_TOP + y * CELL}h${CELL}v${CELL}h-${CELL}z`;
    }
  }
  return d;
})();

function SnakeSegment({ seg, isHead, dir }) {
  const px = seg.x * CELL;
  const py = GRID_TOP + seg.y * CELL;
  if (!isHead) {
    return (
      <g>
        <path fill="#1f6b1c" d={`M${px} ${py}h8v8h-8z`} />
        <path fill="#3fb52f" d={`M${px + 1} ${py + 1}h6v6h-6z`} />
        <path fill="#7ee03a" d={`M${px + 2} ${py + 2}h2v2h-2z`} />
      </g>
    );
  }
  // Eyes sit on the side the head is facing
  const eyes = {
    right: [[5, 1], [5, 5]],
    left: [[1, 1], [1, 5]],
    top: [[1, 1], [5, 1]],
    bottom: [[1, 5], [5, 5]],
  }[dir];
  return (
    <g>
      <path fill="#1f6b1c" d={`M${px} ${py}h8v8h-8z`} />
      <path fill="#5bd02a" d={`M${px + 1} ${py + 1}h6v6h-6z`} />
      {eyes.map(([ex, ey]) => (
        <g key={`${ex}-${ey}`}>
          <path fill="#ffffff" d={`M${px + ex} ${py + ey}h2v2h-2z`} />
          <path fill="#0a0a14" d={`M${px + ex + (dir === 'left' ? 0 : 1)} ${py + ey + (dir === 'top' ? 0 : 1)}h1v1h-1z`} />
        </g>
      ))}
    </g>
  );
}

function ResumeFood({ cell }) {
  const px = cell.x * CELL;
  const py = GRID_TOP + cell.y * CELL;
  return (
    <g className="snake-game-food">
      <path fill="#233a6b" d={`M${px + 1} ${py}h6v8h-6z`} />
      <path fill="#ffffff" d={`M${px + 2} ${py + 1}h4v6h-4z`} />
      <path fill="#9bb4e8" d={`M${px + 2} ${py + 2}h3v1h-3z`} />
      <path fill="#2f6fe0" d={`M${px + 3} ${py + 4}h2v2h-2z`} />
    </g>
  );
}

export default function SnakeResumeGame({ controlsRef }) {
  const gameRef = useRef(newGame());
  const [, setFrame] = useState(0);
  const redraw = () => setFrame((f) => f + 1);

  // Expose steering (D-pad) and the thank-you heart (B button) to the Game Boy
  useEffect(() => {
    const love = () => {
      const g = gameRef.current;
      if (g.status !== 'thanks') {
        g.statusBeforeThanks = g.status;
        g.status = 'thanks';
      }
      // Bumping the count replays the heart pop on every press
      g.thanksCount += 1;
      redraw();
    };

    const steer = (dirName) => {
      let g = gameRef.current;
      if (g.status === 'thanks') {
        g.status = g.statusBeforeThanks;
        g.statusBeforeThanks = null;
        if (g.status === 'playing') {
          g.queue = dirName !== g.dir && dirName !== OPPOSITE[g.dir] ? [dirName] : [];
          redraw();
          return;
        }
      }
      if (g.status === 'over') {
        gameRef.current = newGame();
        g = gameRef.current;
      }
      if (g.status === 'ready') {
        g.status = 'playing';
        if (dirName !== OPPOSITE[g.dir]) g.dir = dirName;
        redraw();
        return;
      }
      // Queue turns so quick taps aren't lost; ignore repeats and reversals
      const last = g.queue.length ? g.queue[g.queue.length - 1] : g.dir;
      if (dirName !== last && dirName !== OPPOSITE[last] && g.queue.length < 3) {
        g.queue.push(dirName);
      }
    };

    controlsRef.current = { steer, love };
    return () => {
      controlsRef.current = null;
    };
  }, [controlsRef]);

  const { status, score } = gameRef.current;

  useEffect(() => {
    if (status !== 'playing') return undefined;
    let timer;

    const step = () => {
      const g = gameRef.current;
      if (g.queue.length) g.dir = g.queue.shift();
      const head = g.snake[0];
      const move = DIRS[g.dir];
      // The snake wraps around the screen edges; only biting itself ends the game
      const next = {
        x: (head.x + move.x + COLS) % COLS,
        y: (head.y + move.y + ROWS) % ROWS,
      };
      const eats = next.x === g.food.x && next.y === g.food.y;
      const body = eats ? g.snake : g.snake.slice(0, -1);

      if (body.some((s) => s.x === next.x && s.y === next.y)) {
        g.status = 'over';
        redraw();
        return;
      }

      g.snake = [next, ...body];
      if (eats) {
        g.score += 1;
        g.food = randomFreeCell(g.snake);
      }
      redraw();
      timer = setTimeout(step, Math.max(MIN_SPEED, START_SPEED - g.score * SPEED_UP_PER_RESUME));
    };

    timer = setTimeout(step, START_SPEED);
    return () => clearTimeout(timer);
  }, [status]);

  const g = gameRef.current;

  return (
    <div className="snake-game">
      <svg
        className="snake-game-scene"
        viewBox="0 0 192 128"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Sky */}
        <path fill="#1766d8" d="M0 0h192v24h-192z" />
        <path fill="#2a80e8" d="M0 24h192v26h-192z" />
        <path fill="#3a8fee" d="M0 50h192v26h-192z" />
        <path fill="#4a9ff2" d="M0 76h192v26h-192z" />
        <path fill="#5eb0f5" d="M0 102h192v26h-192z" />

        {/* Cloud in the title band (the score sits in the right corner) */}
        <path fill="#ffffff" d="M2 14h18v3h-18zM5 11h12v3h-12zM9 9h6v2h-6z" />
        <path fill="#c5dcf4" d="M2 17h18v1h-18z" />

        {/* Play area */}
        <path fill="#ffffff" fillOpacity="0.06" d={GRID_PATH} />
        <path fill="#0e1b44" fillOpacity="0.35" d="M0 23h192v1h-192z" />

        <ResumeFood cell={g.food} />
        {g.snake
          .slice()
          .reverse()
          .map((seg, i) => (
            <SnakeSegment
              key={`${seg.x}-${seg.y}-${i}`}
              seg={seg}
              isHead={i === g.snake.length - 1}
              dir={g.dir}
            />
          ))}
      </svg>

      <h2 className="snake-game-title">
        <span className="snake-game-title-download">
          <span aria-hidden="true" className="snake-game-title-download-shadow">DOWNLOAD</span>
          <span className="snake-game-title-download-fill">DOWNLOAD</span>
        </span>
        <span className="snake-game-title-resume">MY RESUME</span>
      </h2>

      <p className="snake-game-score" aria-live="polite">
        <svg viewBox="0 0 8 8" aria-hidden="true" shapeRendering="crispEdges">
          <path fill="#233a6b" d="M1 0h6v8H1z" />
          <path fill="#ffffff" d="M2 1h4v6H2z" />
          <path fill="#2f6fe0" d="M3 4h2v2H3z" />
        </svg>
        x{score}
      </p>

      {status === 'thanks' && (
        <div className="snake-game-overlay snake-game-thanks" key={g.thanksCount}>
          <span className="snake-game-thanks-hearts" aria-hidden="true">
            <PixelHeart className="snake-game-mini-heart snake-game-mini-heart-1" />
            <PixelHeart className="snake-game-big-heart" />
            <PixelHeart className="snake-game-mini-heart snake-game-mini-heart-2" />
          </span>
          <p className="snake-game-overlay-title">THANK YOU</p>
          <p className="snake-game-overlay-line">FOR SPENDING TIME HERE!</p>
          <p className="snake-game-overlay-line snake-game-blink">
            {g.statusBeforeThanks === 'playing' ? 'PRESS ARROWS TO KEEP PLAYING' : 'PRESS ARROWS TO PLAY'}
          </p>
        </div>
      )}

      {(status === 'ready' || status === 'over') && (
        <div className="snake-game-overlay">
          <p className="snake-game-overlay-title">{status === 'over' ? 'GAME OVER' : 'RESUME SNAKE'}</p>
          {status === 'over' && (
            <p className="snake-game-overlay-line">
              YOU ATE {score} RESUME{score === 1 ? '' : 'S'}
            </p>
          )}
          <p className="snake-game-overlay-line snake-game-blink">PRESS ARROWS TO PLAY</p>
          <p className="snake-game-overlay-line">
            PRESS
            <img src={downloadIcon} alt="download button" className="snake-game-download-icon" />
            FOR MY RESUME
          </p>
        </div>
      )}

      <div className="snake-game-scanlines" aria-hidden="true" />
    </div>
  );
}

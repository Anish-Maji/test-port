import React, { useEffect, useRef, useState } from 'react';
import downloadIcon from '../assets/home/nitendo-switches/download-icon.svg';
import '../styles/PixelResumeGame.css';

// ============================================================================
// PIXEL RESUME GAME
// A tiny platformer rendered inside the Game Boy screen. The scene is drawn in
// a 192x128 pixel space. Movement is driven by `inputRef`, which the Game Boy
// D-pad in App.jsx writes to: { left, right, down, jump }.
// ============================================================================

const WALK_SPEED = 60; // px per second
const GRAVITY = 420; // px per second^2
const JUMP_VELOCITY = -170; // px per second, enough to clear the pond from its last ~12px of grass
const MIN_X = 8;
const MAX_X = 184;
const START_X = 84;

// Ground heights: left grass platform, the pond gap, then the raised right platform
const LEFT_GROUND = { end: 110, y: 103 };
const RIGHT_GROUND = { start: 144, y: 98 };
const POND_FALL_DEPTH = 140;

const groundAt = (x) => {
  if (x <= LEFT_GROUND.end) return LEFT_GROUND.y;
  if (x >= RIGHT_GROUND.start) return RIGHT_GROUND.y;
  return null;
};

const initialPlayer = () => ({ x: START_X, y: LEFT_GROUND.y, vy: 0, grounded: true });

export default function PixelResumeGame({ inputRef }) {
  const playerRef = useRef(initialPlayer());
  const [view, setView] = useState({
    x: START_X,
    y: LEFT_GROUND.y,
    facing: 1,
    crouch: false,
    walkFrame: 0,
    airborne: false,
  });

  useEffect(() => {
    let rafId;
    let last = performance.now();
    let walkClock = 0;
    let facing = 1;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const input = inputRef.current;
      const p = playerRef.current;
      const crouch = input.down && p.grounded;
      const dir = crouch ? 0 : (input.right ? 1 : 0) - (input.left ? 1 : 0);

      if (dir !== 0) facing = dir;

      if (input.jump) {
        input.jump = false;
        if (p.grounded) {
          p.vy = JUMP_VELOCITY;
          p.grounded = false;
        }
      }

      // Horizontal movement, blocked by the platform walls when below their top
      let nextX = Math.min(MAX_X, Math.max(MIN_X, p.x + dir * WALK_SPEED * dt));
      if (nextX >= RIGHT_GROUND.start && p.x < RIGHT_GROUND.start && p.y > RIGHT_GROUND.y + 0.5) {
        nextX = RIGHT_GROUND.start - 0.1;
      }
      if (nextX <= LEFT_GROUND.end && p.x > LEFT_GROUND.end && p.y > LEFT_GROUND.y + 0.5) {
        nextX = LEFT_GROUND.end + 0.1;
      }
      p.x = nextX;

      // Vertical movement
      const ground = groundAt(p.x);
      if (p.grounded && ground !== null && ground >= p.y) {
        // Walking off a ledge onto lower ground (or into the pond) starts a fall
        if (ground > p.y) p.grounded = false;
      } else if (p.grounded && ground === null) {
        p.grounded = false;
      }

      if (!p.grounded) {
        p.vy += GRAVITY * dt;
        const nextY = p.y + p.vy * dt;
        if (ground !== null && p.vy >= 0 && p.y <= ground && nextY >= ground) {
          p.y = ground;
          p.vy = 0;
          p.grounded = true;
        } else {
          p.y = nextY;
        }
      }

      // Fell into the pond: respawn at the start
      if (p.y > POND_FALL_DEPTH) {
        playerRef.current = initialPlayer();
        facing = 1;
      }

      const moving = dir !== 0 && p.grounded;
      walkClock = moving ? walkClock + dt : 0;
      const walkFrame = moving ? Math.floor(walkClock / 0.12) % 2 : 0;
      const cur = playerRef.current;

      setView((prev) => {
        const next = {
          x: Math.round(cur.x),
          y: Math.round(cur.y),
          facing,
          crouch,
          walkFrame,
          airborne: !cur.grounded,
        };
        const same = Object.keys(next).every((k) => next[k] === prev[k]);
        return same ? prev : next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inputRef]);

  const idle = !view.airborne && !view.crouch && view.walkFrame === 0;
  const scaleY = view.crouch ? 0.7 : 1;

  return (
    <div className="pixel-game">
      <svg
        className="pixel-game-scene"
        viewBox="0 0 192 128"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Sky */}
        <path fill="#1766d8" d="M0 0h192v13h-192z" />
        <path fill="#1d72e0" d="M0 13h192v13h-192z" />
        <path fill="#2a80e8" d="M0 26h192v13h-192z" />
        <path fill="#3a8fee" d="M0 39h192v13h-192z" />
        <path fill="#4a9ff2" d="M0 52h192v13h-192z" />
        <path fill="#5eb0f5" d="M0 65h192v13h-192z" />
        <path fill="#75c0f7" d="M0 78h192v13h-192z" />
        <path fill="#8fd0f9" d="M0 91h192v17h-192z" />

        {/* Clouds */}
        <path fill="#ffffff" d="M2 31h26v4h-26zM6 27h18v4h-18zM12 23h10v4h-10zM20 25h8v3h-8z" />
        <path fill="#c5dcf4" d="M2 35h26v2h-26z" />
        <path fill="#ffffff" d="M168 22h24v3h-24zM172 18h14v4h-14zM178 16h6v2h-6z" />
        <path fill="#c5dcf4" d="M168 25h24v1h-24z" />
        <path fill="#ffffff" d="M158 55h34v4h-34zM164 49h28v6h-28zM172 43h16v6h-16zM178 41h8v2h-8z" />
        <path fill="#c5dcf4" d="M158 59h34v2h-34z" />
        <path fill="#ffffff" d="M36 66h20v3h-20zM40 62h12v4h-12zM46 60h4v2h-4z" />
        <path fill="#c5dcf4" d="M36 69h20v1h-20z" />
        <path fill="#ffffff" d="M58 72h12v2h-12zM62 70h6v2h-6z" />
        <path fill="#ffffff" d="M118 84h24v3h-24zM122 80h14v4h-14zM126 78h6v2h-6z" />
        <path fill="#c5dcf4" d="M118 87h24v1h-24z" />

        {/* Distant hills and mesa */}
        <path fill="#6a7fb9" d="M100 104V99H108V95H116V91H122V94H128V92H134V96H142V99H150V104Z" />
        <path fill="#6a7fb9" d="M150 104V98H160V96H168V92H176V90H184V93H192V104Z" />
        <path fill="#a99bbb" d="M116 91h6v2h-6zM128 92h6v2h-6zM176 90h8v2h-8zM168 92h8v2h-8z" />
        <path fill="#2a7fe6" d="M100 102h92v6h-92z" />
        <path fill="#7a5f8e" d="M28 104V90H32V84H36V78H42V74H50V76H54V82H56V88H60V84H64V82H68V88H72V104Z" />
        <path fill="#c9a49a" d="M44 78h6v26h-6zM38 84h4v20h-4z" />
        <path fill="#5a4670" d="M32 90h6v14h-6zM56 90h6v14h-6zM64 88h6v16h-6z" />
        <path fill="#4fae2a" d="M40 73h12v3h-12zM36 76h6v2h-6zM52 75h4v3h-4zM62 81h6v2h-6z" />

        {/* Pond */}
        <path fill="#1f6fd8" d="M106 103h42v25h-42z" />
        <path fill="#cfe9ff" d="M108 103h38v1h-38z" />
        <path fill="#4a95ee" d="M112 108h10v1h-10zM126 111h14v1h-14zM114 114h8v1h-8zM130 117h10v1h-10zM110 120h6v1h-6z" />

        {/* Left grass platform */}
        <path fill="#b0642a" d="M0 111h108v17h-108z" />
        <path fill="#8a4a22" d="M6 116h6v3h-6zM30 120h8v3h-8zM56 114h6v3h-6zM80 119h10v3h-10zM98 114h8v3h-8zM18 125h8v3h-8zM64 124h10v3h-10z" />
        <path fill="#d58a45" d="M14 122h6v2h-6zM44 118h8v2h-8zM70 112h8v2h-8zM92 123h8v2h-8zM2 112h6v2h-6z" />
        <path fill="#2f9a2a" d="M0 108h110v3h-110z" />
        <path fill="#5bd02a" d="M0 103h110v5h-110z" />
        <path fill="#8be83a" d="M0 103h110v1h-110z" />
        <path fill="#2f9a2a" d="M2 111h8v2h-8zM20 111h10v2h-10zM44 111h8v2h-8zM66 111h10v2h-10zM90 111h12v2h-12z" />

        {/* Right raised platform */}
        <path fill="#b0642a" d="M146 106h46v22h-46z" />
        <path fill="#7a3f1c" d="M145 106h2v22h-2zM147 110h2v18h-2z" />
        <path fill="#8a4a22" d="M152 112h8v3h-8zM172 118h8v3h-8zM160 123h10v3h-10zM184 110h6v3h-6z" />
        <path fill="#d58a45" d="M164 112h6v2h-6zM150 120h6v2h-6zM178 124h8v2h-8z" />
        <path fill="#2f9a2a" d="M144 103h48v3h-48zM150 94h10v4h-10zM166 92h14v6h-14zM182 94h10v4h-10z" />
        <path fill="#5bd02a" d="M144 98h48v5h-48z" />
        <path fill="#8be83a" d="M144 98h48v1h-48z" />
        <path fill="#3fb52f" d="M38 98h12v6h-12zM48 96h10v8h-10z" />
        <path fill="#55c23a" d="M40 98h6v2h-6zM50 96h4v2h-4z" />

        {/* Tree and bush */}
        <path fill="#7a4318" d="M13 70h8v22h-8zM10 88h14v4h-14zM20 66h6v6h-6z" />
        <path fill="#a8631f" d="M13 70h2v18h-2z" />
        <path fill="#2d8f2b" d="M10 46h16v4h-16zM6 50h26v6h-26zM4 56h36v12h-36zM8 68h30v4h-30z" />
        <path fill="#3fb52f" d="M12 47h12v3h-12zM8 52h22v5h-22zM6 58h30v6h-30zM10 65h24v4h-24z" />
        <path fill="#7ee03a" d="M14 48h6v2h-6zM10 53h8v3h-8zM22 56h6v3h-6zM8 60h6v3h-6zM26 62h8v3h-8zM16 66h8v2h-8z" />
        <path fill="#2f9a2a" d="M6 88h34v15h-34z" />
        <path fill="#5bd02a" d="M8 86h30v4h-30zM6 90h6v3h-6z" />
        <path fill="#ffffff" d="M10 95h6v2h-6zM12 93h2v6h-2z" />
        <path fill="#ffd23a" d="M12 95h2v2h-2z" />
        <path fill="#ff8a1a" d="M22 96h4v4h-4zM28 93h4v4h-4z" />
        <path fill="#ffd23a" d="M23 97h2v2h-2zM29 94h2v2h-2z" />

        {/* Goal flag */}
        <path fill="#a8631f" d="M152 70h4v28h-4z" />
        <path fill="#d8903a" d="M152 70h1v28h-1z" />
        <path fill="#8a4a1a" d="M151 69h6v3h-6z" />
        <path fill="#3a1a10" d="M155 73H171V75H175V79H177V83H173V85H169V87H163V89H155Z" />
        <path fill="#f2561c" d="M156 74H170V76H174V80H176V82H172V84H168V86H162V88H156Z" />
        <path fill="#ff7a30" d="M156 74h14v2h-14z" />
        <path fill="#c93a12" d="M156 86h6v2h-6z" />
        <path fill="#ffffff" d="M162 76h3v4h-3zM160 80h7v1h-7zM161 81h5v1h-5zM162 82h3v1h-3zM163 83h1v1h-1z" />

        {/* Title sparkle rays */}
        <path fill="none" stroke="#ffb320" strokeWidth="2" d="M35 24L39 27M33 31H37M35 38L39 36M157 24L153 27M159 31H155M157 38L153 36" />

        {/* Player: drawn around its feet (86,103) so it can flip and crouch in place */}
        <g transform={`translate(${view.x} ${view.y}) scale(${view.facing} ${scaleY})`}>
          {/* The bob animates a CSS transform, so it can't share a group with an SVG transform attribute */}
          <g className={idle ? 'pixel-game-bob' : undefined}>
          <g transform="translate(-86 -103)">
            <path fill="#c8782a" d="M72 84h8v10h-8z" />
            <path fill="#e09a3a" d="M72 84h8v3h-8z" />
            <path fill="#8a4a1a" d="M76 86h2v8h-2z" />
            <path fill="#5b3a2e" d="M80 85h10v9h-10zM78 88h4v8h-4z" />
            {view.walkFrame === 0 ? (
              <>
                <path fill="#3a5fb8" d="M78 94h12v4h-12zM88 96h4v4h-4zM76 96h4v4h-4z" />
                <path fill="#2c4a96" d="M84 94h4v4h-4z" />
                <path fill="#7a4a2a" d="M90 100h8v3h-8zM70 98h8v3h-8z" />
              </>
            ) : (
              <>
                <path fill="#3a5fb8" d="M79 94h11v4h-11zM80 98h4v3h-4zM85 98h4v3h-4z" />
                <path fill="#2c4a96" d="M84 94h4v4h-4z" />
                <path fill="#7a4a2a" d="M78 101h7v2h-7zM85 101h7v2h-7z" />
              </>
            )}
            <path fill="#f2b88a" d="M80 77h12v8h-12z" />
            <path fill="#5a301a" d="M78 72h14v3h-14zM76 74h16v3h-16zM74 76h4v3h-4zM80 70h6v2h-6zM84 68h4v2h-4zM78 77h2v4h-2z" />
            <path fill="#1b1b2a" d="M88 79h2v3h-2z" />
            <path fill="#b5603a" d="M88 83h3v1h-3z" />
            {/* Resume card */}
            <path fill="#233a6b" d="M91 77h16v21h-16z" />
            <path fill="#ffffff" d="M92 78h14v19h-14z" />
            <path fill="#9bb4e8" d="M94 81h6v1h-6zM94 84h9v1h-9zM94 87h9v1h-9z" />
            <path fill="#2f6fe0" d="M95 90h8v5h-8z" />
            <path fill="#ffffff" d="M98 91h2v2h-2zM97 93h4v1h-4zM98 94h2v1h-2z" />
            <path fill="#5b3a2e" d="M86 86h6v4h-6z" />
            <path fill="#f2b88a" d="M90 86h3v4h-3z" />
          </g>
          </g>
        </g>

        {/* Pond reeds sit in front of the player so a fall reads as a splash */}
        <path fill="#2f9a2a" d="M108 122h14v6h-14zM120 119h10v9h-10zM132 121h14v7h-14z" />
        <path fill="#55c23a" d="M110 122h8v2h-8zM122 119h6v2h-6zM134 121h8v2h-8z" />
      </svg>

      <h2 className="pixel-game-title">
        <span className="pixel-game-title-top">
          <span aria-hidden="true" className="pixel-game-title-top-shadow">DOWNLOAD</span>
          <span className="pixel-game-title-top-fill">DOWNLOAD</span>
        </span>
        <span className="pixel-game-title-bottom">MY RESUME</span>
      </h2>

      <p className="pixel-game-prompt">
        <span className="pixel-game-blink">
          PRESS
          <img src={downloadIcon} alt="download button" className="pixel-game-prompt-icon" />
        </span>
      </p>

      <div className="pixel-game-scanlines" aria-hidden="true" />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import './RetroDesktop.css';

// ============================================================================
// RETRO DESKTOP
// A Windows 98 style desktop that lives inside the CRT screen. It is laid out
// at a fixed virtual size and scaled to fit the screen, so all the window
// maths below works in virtual pixels.
// ============================================================================

export const DESKTOP_WIDTH = 520;
export const DESKTOP_HEIGHT = 394;
const TASKBAR_HEIGHT = 28;
const WORKAREA_HEIGHT = DESKTOP_HEIGHT - TASKBAR_HEIGHT;

// Window definitions. `defaults` is where each window opens when restored.
const WINDOWS = {
  video: {
    title: 'How to play.webm - Media Player',
    taskLabel: 'How to play',
    defaults: { x: 118, y: 22, w: 372, h: 262 },
  },
  game: {
    title: 'Skyline Tycoon - Web Browser',
    taskLabel: 'Skyline Tycoon',
    defaults: { x: 60, y: 16, w: 430, h: 330 },
  },
};

function VideoFileIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#ffffff" d="M6 2h14l6 6v22H6z" />
      <path fill="#000000" d="M5 1h16v1H5zM5 2h1v29H5zM6 30h21v1H6zM26 8h1v22h-1zM20 2h1v6h6v1h-7z" />
      <path fill="#c0c0c0" d="M21 3h1v1h1v1h1v1h1v1h1v1h-5z" />
      <path fill="#202020" d="M9 12h14v12H9z" />
      <path fill="#ffffff" d="M10 13h2v2h-2zM10 21h2v2h-2zM20 13h2v2h-2zM20 21h2v2h-2zM10 17h2v2h-2zM20 17h2v2h-2z" />
      <path fill="#3aa0ff" d="M13 13h6v10h-6z" />
      <path fill="#ffffff" d="M15 15h1v6h-1zM16 16h1v4h-1zM17 17h1v2h-1z" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#1f5fd8" d="M11 3h10v2h4v2h2v4h2v10h-2v4h-2v2h-4v2H11v-2H7v-2H5v-4H3V11h2V7h2V5h4z" />
      <path fill="#5fb8ff" d="M11 5h6v2h-4v2h-2v4H7v-2h2V7h2z" />
      <path fill="#3fb52f" d="M13 9h6v4h4v4h-2v4h-4v4h-4v-6h-2v-4h2zM23 21h2v2h-2zM7 15h2v4H7z" />
      <path fill="#ffd23a" d="M20 18h10v10H20z" />
      <path fill="#000000" d="M19 17h12v1H19zM19 18h1v11h-1zM20 28h11v1H20zM30 18h1v10h-1z" />
      <path fill="#f2561c" d="M22 24h2v3h-2zM25 22h2v5h-2zM28 20h1v7h-1z" />
    </svg>
  );
}

function StartIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#000000" d="M2 2h12v9H2z" />
      <path fill="#008080" d="M3 3h10v7H3z" />
      <path fill="#ffd23a" d="M5 5h2v2H5z" />
      <path fill="#3fb52f" d="M8 6h3v2H8z" />
      <path fill="#808080" d="M6 11h4v2H6zM4 13h8v1H4z" />
    </svg>
  );
}

function NewTabIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#000000" d="M3 6h22v20H3z" />
      <path fill="#ffffff" d="M4 11h20v14H4z" />
      <path fill="#000080" d="M4 7h20v3H4z" />
      <path fill="#c0c0c0" d="M21 8h2v1h-2z" />
      <path fill="#1f5fd8" d="M7 14h8v1H7zM7 17h6v1H7zM7 20h8v1H7z" />
      <path fill="#000000" d="M17 15h12v12H17z" />
      <path fill="#ffd23a" d="M18 16h10v10H18z" />
      <path fill="#000000" d="M22 18h5v5h-2v-2h-1v1h-1v1h-1v1h-1v-1h-1v-1h1v-1h1v-1h1v-1h-1z" />
    </svg>
  );
}

function StartMenu({ onOpenVideo, onOpenGame, onOpenNewTab }) {
  const items = [
    { label: 'How to play', icon: <VideoFileIcon />, onClick: onOpenVideo },
    { label: 'Skyline Tycoon', icon: <GameIcon />, onClick: onOpenGame },
    { label: 'Open in new tab', icon: <NewTabIcon />, onClick: onOpenNewTab, divider: true },
  ];
  return (
    <div className="r98-start-menu" role="menu" aria-label="Start menu" onClick={(e) => e.stopPropagation()}>
      <div className="r98-start-menu-banner" aria-hidden="true">
        <span>
          a.niche<b>98</b>
        </span>
      </div>
      <ul className="r98-start-menu-items">
        {items.map((item) => (
          <li key={item.label} className={item.divider ? 'has-divider' : undefined}>
            <button type="button" role="menuitem" className="r98-start-menu-item" onClick={item.onClick}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopIcon({ label, icon, selected, onSelect, onOpen }) {
  return (
    <button
      type="button"
      className={`r98-icon ${selected ? 'is-selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        onOpen();
      }}
    >
      <span className="r98-icon-image">{icon}</span>
      <span className="r98-icon-label">{label}</span>
    </button>
  );
}

function Win98Window({ id, state, active, onFocus, onClose, onMinimize, onToggleMaximize, onMove, children }) {
  const dragRef = useRef(null);
  const def = WINDOWS[id];
  const frame = state.maximized
    ? { x: 0, y: 0, w: DESKTOP_WIDTH, h: WORKAREA_HEIGHT }
    : { x: state.x, y: state.y, w: def.defaults.w, h: def.defaults.h };

  const handleTitlePointerDown = (e) => {
    onFocus();
    if (state.maximized || e.button !== 0 || e.target.closest('button')) return;
    const scale = e.currentTarget.getBoundingClientRect().width / frame.w || 1;
    dragRef.current = { startX: e.clientX, startY: e.clientY, x: frame.x, y: frame.y, scale };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleTitlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = (e.clientX - drag.startX) / drag.scale;
    const dy = (e.clientY - drag.startY) / drag.scale;
    // Keep part of the title bar reachable at all times
    const x = Math.min(DESKTOP_WIDTH - 60, Math.max(60 - frame.w, drag.x + dx));
    const y = Math.min(WORKAREA_HEIGHT - 18, Math.max(0, drag.y + dy));
    onMove(Math.round(x), Math.round(y));
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  return (
    <section
      className={`r98-window ${active ? 'is-active' : ''} ${state.minimized ? 'is-minimized' : ''}`}
      style={{ left: frame.x, top: frame.y, width: frame.w, height: frame.h, zIndex: state.z }}
      onPointerDown={onFocus}
      aria-label={def.title}
    >
      <header
        className="r98-titlebar"
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onToggleMaximize}
      >
        <span className="r98-titlebar-text">{def.title}</span>
        <span className="r98-titlebar-buttons">
          <button type="button" className="r98-title-btn" onClick={onMinimize} aria-label="Minimize">
            <svg viewBox="0 0 8 7" width="8" height="7" aria-hidden="true"><path d="M1 5h6v2H1z" /></svg>
          </button>
          <button
            type="button"
            className="r98-title-btn"
            onClick={onToggleMaximize}
            aria-label={state.maximized ? 'Restore' : 'Maximize'}
          >
            {state.maximized ? (
              <svg viewBox="0 0 9 9" width="9" height="9" aria-hidden="true">
                <path d="M2 0h7v6H7V2H2zM2 1h7v1H2z" />
                <path d="M0 3h7v6H0zM1 5v3h5V5z" fillRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 9 9" width="9" height="9" aria-hidden="true">
                <path d="M0 0h9v9H0zM1 2v6h7V2z" fillRule="evenodd" />
              </svg>
            )}
          </button>
          <button type="button" className="r98-title-btn r98-title-btn-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 8 7" width="8" height="7" aria-hidden="true">
              <path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0z" />
            </svg>
          </button>
        </span>
      </header>
      <div className="r98-window-body">{children}</div>
    </section>
  );
}

function MediaPlayer({ src, visible }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Only play while the window is on screen and the desktop is in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && playing) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [visible, playing]);

  return (
    <div className="r98-player">
      <div className="r98-player-screen">
        <video
          ref={videoRef}
          src={src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label="Skyline Tycoon gameplay video"
        />
      </div>
      <div className="r98-player-controls">
        <button type="button" className="r98-button" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="r98-button" onClick={() => setMuted((m) => !m)}>
          {muted ? 'Sound on' : 'Mute'}
        </button>
        <span className="r98-player-status">{playing ? 'Playing' : 'Paused'}</span>
      </div>
    </div>
  );
}

// The game switches to its phone layout at 820px and below, so the page is
// rendered at a desktop width and scaled down to fit the window
const GAME_VIEWPORT_WIDTH = 960;

function Browser({ url }) {
  const pageRef = useRef(null);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    // contentRect is in layout px, unaffected by the desktop's scale transform
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setPageSize({ width, height });
    });
    observer.observe(page);
    return () => observer.disconnect();
  }, []);

  const zoom = pageSize ? pageSize.width / GAME_VIEWPORT_WIDTH : 0;

  return (
    <div className="r98-browser">
      <div className="r98-browser-toolbar">
        <button type="button" className="r98-button" disabled>Back</button>
        <button type="button" className="r98-button" disabled>Forward</button>
        <span className="r98-browser-address-label">Address</span>
        <span className="r98-browser-address">{url || 'about:blank'}</span>
      </div>
      <div className="r98-browser-page">
        <div className="r98-browser-viewport" ref={pageRef} />
        {url ? (
          zoom > 0 && (
            <iframe
              src={url}
              title="Skyline Tycoon game"
              allow="autoplay; fullscreen"
              style={{
                width: GAME_VIEWPORT_WIDTH,
                height: pageSize.height / zoom,
                transform: `scale(${zoom})`,
              }}
            />
          )
        ) : (
          <div className="r98-browser-placeholder">
            <p>Skyline Tycoon is loading soon.</p>
            <p>The game will run right here in this window.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatClock(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function RetroDesktop({ videoSrc, gameUrl, inView }) {
  const [windows, setWindows] = useState(() => ({
    video: { open: true, minimized: false, maximized: false, ...WINDOWS.video.defaults, z: 2 },
    game: { open: false, minimized: false, maximized: true, ...WINDOWS.game.defaults, z: 1 },
  }));
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const topZ = useRef(2);

  useEffect(() => {
    const timer = setInterval(() => setClock(formatClock(new Date())), 30000);
    return () => clearInterval(timer);
  }, []);

  const update = (id, patch) => setWindows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const focus = (id) => {
    if (windows[id].z === topZ.current) return;
    topZ.current += 1;
    update(id, { z: topZ.current });
  };

  const open = (id) => {
    topZ.current += 1;
    update(id, { open: true, minimized: false, z: topZ.current });
  };

  // Closing resets the window, so the game always reopens maximized
  const close = (id) => {
    update(id, { open: false, minimized: false, maximized: id === 'game', ...WINDOWS[id].defaults });
  };

  const openWindows = Object.keys(windows).filter((id) => windows[id].open);
  const visibleWindows = openWindows.filter((id) => !windows[id].minimized);
  const activeId = visibleWindows.reduce(
    (top, id) => (top === null || windows[id].z > windows[top].z ? id : top),
    null
  );

  const handleTaskClick = (id) => {
    const w = windows[id];
    if (w.minimized) {
      open(id);
    } else if (id === activeId) {
      update(id, { minimized: true });
    } else {
      focus(id);
    }
  };

  const launchFromStart = (id) => {
    setStartOpen(false);
    open(id);
  };

  const openGameInNewTab = () => {
    setStartOpen(false);
    if (gameUrl) window.open(gameUrl, '_blank', 'noopener,noreferrer');
  };

  // Any click elsewhere on the desktop, or Escape, closes the Start menu
  return (
    <div
      className="r98-desktop"
      onClick={() => {
        setSelectedIcon(null);
        setStartOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setStartOpen(false);
      }}
    >
      <div className="r98-icons">
        <DesktopIcon
          label="How to play"
          icon={<VideoFileIcon />}
          selected={selectedIcon === 'video'}
          onSelect={() => setSelectedIcon('video')}
          onOpen={() => open('video')}
        />
        <DesktopIcon
          label="Skyline Tycoon"
          icon={<GameIcon />}
          selected={selectedIcon === 'game'}
          onSelect={() => setSelectedIcon('game')}
          onOpen={() => open('game')}
        />
      </div>

      {openWindows.map((id) => (
        <Win98Window
          key={id}
          id={id}
          state={windows[id]}
          active={id === activeId}
          onFocus={() => focus(id)}
          onClose={() => close(id)}
          onMinimize={() => update(id, { minimized: true })}
          onToggleMaximize={() => update(id, { maximized: !windows[id].maximized })}
          onMove={(x, y) => update(id, { x, y })}
        >
          {id === 'video' ? (
            <MediaPlayer src={videoSrc} visible={inView && !windows.video.minimized} />
          ) : (
            <Browser url={gameUrl} />
          )}
        </Win98Window>
      ))}

      {startOpen && (
        <StartMenu
          onOpenVideo={() => launchFromStart('video')}
          onOpenGame={() => launchFromStart('game')}
          onOpenNewTab={openGameInNewTab}
        />
      )}

      <footer className="r98-taskbar">
        <button
          type="button"
          className={`r98-button r98-start ${startOpen ? 'is-pressed' : ''}`}
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((o) => !o);
          }}
        >
          <StartIcon />
          <span>Start</span>
        </button>
        <span className="r98-taskbar-divider" aria-hidden="true" />
        <span className="r98-tasks">
          {openWindows.map((id) => (
            <button
              key={id}
              type="button"
              className={`r98-button r98-task ${id === activeId ? 'is-pressed' : ''}`}
              onClick={() => handleTaskClick(id)}
            >
              {id === 'video' ? <VideoFileIcon /> : <GameIcon />}
              <span>{WINDOWS[id].taskLabel}</span>
            </button>
          ))}
        </span>
        <span className="r98-tray">{clock}</span>
      </footer>
    </div>
  );
}

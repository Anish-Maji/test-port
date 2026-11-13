import React, { useEffect, useRef, useState } from 'react';
import RetroDesktop, { DESKTOP_WIDTH } from './RetroDesktop';
import { playStartupChime } from '../lib/startupChime';
import crtMonitor from '../assets/sidequests/crt-monitor.webp';
import skylineVideo from '../assets/sidequests/skyline-tycoon.webm';
import './SidequestsSection.css';

// ============================================================================
// SIDEQUESTS
// A drifting pattern of board game pieces fills the section and an old CRT in
// the middle runs a Windows 98 style desktop with the gameplay video and the
// game itself. The monitor's power button really works: it shuts the desktop
// down (red LED) and boots it back up with a startup chime (green LED).
// GAME_URL is the game's website, loaded in the in-screen browser.
// ============================================================================
const GAME_URL = 'https://skylinetycoon.vercel.app/';

const SHUTDOWN_MS = 1800;
const BOOT_TEXT_MS = 900;
const BOOT_SPLASH_MS = 2600;

export default function SidequestsSection() {
  const sectionRef = useRef(null);
  const screenRef = useRef(null);
  const timersRef = useRef([]);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);
  // 'on' | 'shutting-down' | 'off' | 'boot-text' | 'boot-splash'. Starts off so
  // visitors switch it on themselves.
  const [power, setPower] = useState('off');
  // False until the first boot: the off screen invites visitors to power on,
  // and after a shutdown it shows the classic "safe to turn off" message
  const [hasBooted, setHasBooted] = useState(false);
  // Bumped on every boot so the desktop comes back fresh
  const [bootCount, setBootCount] = useState(0);

  // Scale the fixed-size desktop to whatever size the CRT screen renders at
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESKTOP_WIDTH);
    });
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  // Only play the video while the section is on screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const later = (fn, ms) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  const handlePower = () => {
    if (power === 'on') {
      setPower('shutting-down');
      later(() => setPower('off'), SHUTDOWN_MS);
    } else if (power === 'off') {
      setPower('boot-text');
      setHasBooted(true);
      later(() => {
        setPower('boot-splash');
        playStartupChime();
      }, BOOT_TEXT_MS);
      later(() => {
        setBootCount((n) => n + 1);
        setPower('on');
      }, BOOT_TEXT_MS + BOOT_SPLASH_MS);
    }
  };

  const isOn = power !== 'off' && power !== 'shutting-down';
  const busy = power !== 'on' && power !== 'off';

  return (
    <section className="sidequests-section" id="sidequests" ref={sectionRef}>
      <h2 className="sidequests-heading">Take a look at my lil' Sidequests</h2>

      <div className="sidequests-pattern" aria-hidden="true">
        <div className="sidequests-pattern-tiles" />
      </div>

      <div className="sidequests-crt">
        <img className="sidequests-crt-frame" src={crtMonitor} alt="" loading="lazy" draggable={false} />
        <div className={`sidequests-crt-screen is-${power}`} ref={screenRef}>
          {power === 'on' && (
            <div className="sidequests-crt-desktop" style={{ transform: `scale(${scale})` }}>
              <RetroDesktop key={bootCount} videoSrc={skylineVideo} gameUrl={GAME_URL} inView={inView} />
            </div>
          )}

          {power === 'shutting-down' && (
            <div className="crt-system-screen crt-sky">
              <p className="crt-sky-title">
                a.niche <span>98</span>
              </p>
              <p className="crt-sky-text">Please wait while your computer shuts down.</p>
            </div>
          )}

          {power === 'off' &&
            (hasBooted ? (
              <div className="crt-system-screen crt-safe-off">
                <p>It's now safe to turn off</p>
                <p>your computer.</p>
              </div>
            ) : (
              <div className="crt-system-screen crt-safe-off crt-power-prompt">
                <p className="crt-power-prompt-title">SKYLINE TYCOON</p>
                <p>Power on the computer</p>
                <p>to play.</p>
                <p className="crt-power-prompt-hint">
                  PRESS POWER
                  <svg viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
                    <path fill="currentColor" d="M0 0h2v1h1v1h1v1h1V1h2v6H1V5h2V4H2V3H1V2H0z" />
                  </svg>
                </p>
              </div>
            ))}

          {power === 'boot-text' && (
            <div className="crt-system-screen crt-boot-text">
              <p>a.niche BIOS v1.98</p>
              <p>Memory test: 65536K OK</p>
              <p>Starting a.niche 98...</p>
            </div>
          )}

          {power === 'boot-splash' && (
            <div className="crt-system-screen crt-sky">
              <p className="crt-sky-title">
                a.niche <span>98</span>
              </p>
              <div className="crt-boot-progress" aria-hidden="true">
                <span />
              </div>
            </div>
          )}

          <div className="sidequests-crt-glass" aria-hidden="true" />
        </div>

        <span className={`sidequests-crt-led ${isOn ? 'is-on' : 'is-off'}`} aria-hidden="true" />
        <button
          type="button"
          className="sidequests-crt-power"
          onClick={handlePower}
          disabled={busy}
          aria-pressed={power === 'on'}
          aria-label={isOn ? 'Turn the computer off' : 'Turn the computer on'}
        />
      </div>
    </section>
  );
}

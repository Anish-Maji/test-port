import React, { useState, useEffect } from 'react';
import '../styles/WebsiteLoader.css';

// Images preloaded during the intro. Only list images the site actually shows,
// since every first-time visitor downloads all of them before the site appears.
// (Photography photos load lazily as visitors scroll to them, so they're not
// here: the intro would get slower with every photo added to that folder.)
import frameImg from '../assets/Frame 34768.png';

const defaultImagesToPreload = [
  frameImg,
];

// Module-level flag: persists across SPA page switches (Work, Play, About, CV),
// but resets automatically whenever the user refreshes the browser page (F5 / reload).
let hasLoadedInSession = false;

export default function WebsiteLoader({ onFinish }) {
  const [isDone, setIsDone] = useState(() => hasLoadedInSession);
  const [progress, setProgress] = useState(hasLoadedInSession ? 100 : 0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // If the loader has already executed in this session, skip execution
    if (hasLoadedInSession) {
      if (onFinish) onFinish();
      return;
    }

    let loadedCount = 0;
    const totalCount = defaultImagesToPreload.length;
    const startTime = Date.now();
    const minDisplayDuration = 1000; // 1 second minimum display
    let isFinished = false;

    // Smooth progress tick while loading
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeRatioPct = Math.min(95, Math.round((elapsedTime / minDisplayDuration) * 100));
      setProgress((prev) => Math.max(prev, timeRatioPct));
    }, 30);

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      clearInterval(progressInterval);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayDuration - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            hasLoadedInSession = true;
            setIsDone(true);
            if (onFinish) onFinish();
          }, 500); // 500ms fade-out transition
        }, 150);
      }, remainingTime);
    };

    // Preload each image asset
    defaultImagesToPreload.forEach((src) => {
      const img = new Image();
      const onAssetLoad = () => {
        loadedCount++;
        const currentAssetPct = Math.round((loadedCount / totalCount) * 100);
        setProgress((prev) => Math.max(prev, Math.min(95, currentAssetPct)));

        if (loadedCount >= totalCount) {
          finishLoading();
        }
      };
      img.onload = onAssetLoad;
      img.onerror = onAssetLoad;
      img.src = src;
    });

    // Safety fallback timeout (3.5s max)
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(safetyTimer);
    };
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div className={`website-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-center-content">
        <h1 className="loader-text">
          Loading your <span className="loader-highlight">niche</span>
        </h1>
        <div className="loader-line-track">
          <div
            className="loader-line-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

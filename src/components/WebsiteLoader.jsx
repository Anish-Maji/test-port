import React, { useState, useEffect } from 'react';
import '../styles/WebsiteLoader.css';

// Import essential images for preloading
import swapMockupImg from '../assets/home/projects-ss.webp';
import crimsonImg from '../assets/brand logos/crimson_healthcare_pvt_ltd_cover.jpeg';
import globalEsportsImg from '../assets/brand logos/Global esports.webp';
import kioskScreenImg from '../assets/swap_flow_kiosk_screen.png';
import historyScreenImg from '../assets/swap_flow_history_screen.png';
import frameImg from '../assets/Frame 34768.png';

import project1 from '../assets/playground/project-1.webp';
import project2 from '../assets/playground/project-2.webp';
import project3 from '../assets/playground/project-3.webp';
import project4 from '../assets/playground/project-4.webp';
import project5 from '../assets/playground/project-5.webp';
import project6 from '../assets/playground/project-6.webp';

import post1 from '../assets/instagram/post 1.webp';
import post2 from '../assets/instagram/post 2.webp';
import post3 from '../assets/instagram/post 3.webp';
import post4 from '../assets/instagram/post 4.webp';
import post5 from '../assets/instagram/post 5.webp';

const defaultImagesToPreload = [
  swapMockupImg,
  crimsonImg,
  globalEsportsImg,
  kioskScreenImg,
  historyScreenImg,
  frameImg,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  post1,
  post2,
  post3,
  post4,
  post5,
];

export default function WebsiteLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalCount = defaultImagesToPreload.length;
    const startTime = Date.now();
    const minDisplayDuration = 1000; // 1 second minimum default timer
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
            setIsDone(true);
            if (onFinish) onFinish();
          }, 100); // 500ms fade-out transition
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

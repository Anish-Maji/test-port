import React from 'react';
import './EmojiBurst.css';

export default function EmojiBurst({ particles }) {
  if (!particles || particles.length === 0) return null;

  return (
    <div className="emoji-burst-container">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="emoji-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            '--drift-x': `${particle.driftX}px`,
            '--float-y': `${particle.floatY}px`,
            '--scale': particle.scale,
            '--rotate': `${particle.rotate}deg`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
}

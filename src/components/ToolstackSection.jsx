import React, { useState } from 'react';
import '../styles/ToolstackSection.css';

const toolsData = [
  // Design & Brand
  { id: 1, symbol: 'Fi', name: 'figma', category: 'design & brand', color: '#F24E1E' },
  { id: 2, symbol: 'Ps', name: 'photoshop', category: 'design & brand', color: '#31A8FF' },
  { id: 3, symbol: 'Ai', name: 'illustrator', category: 'design & brand', color: '#FF9A00' },
  { id: 4, symbol: 'Af', name: 'affinity', category: 'design & brand', color: '#00C4CC' },
  { id: 5, symbol: 'Id', name: 'indesign', category: 'design & brand', color: '#FF3366' },
  { id: 6, symbol: 'Ca', name: 'canva', category: 'design & brand', color: '#00C4CC' },

  // Motion & Video
  { id: 7, symbol: 'Ae', name: 'after effects', category: 'motion & video', color: '#9999FF' },
  { id: 8, symbol: 'Pr', name: 'premiere pro', category: 'motion & video', color: '#EA77FF' },
  { id: 9, symbol: 'Ji', name: 'Jitter', category: 'motion & video', color: '#228BE6' },
  { id: 10, symbol: 'Lo', name: 'lottie', category: 'motion & video', color: '#00DDB3' },
  { id: 11, symbol: 'Ri', name: 'rive', category: 'motion & video', color: '#FF5722' },

  // Build & Web
  { id: 12, symbol: 'Wf', name: 'webflow', category: 'build & web', color: '#146EF5' },
  { id: 13, symbol: 'Fr', name: 'Framer', category: 'build & web', color: '#FF4081' },
  // { id: 14, symbol: 'Ve', name: 'vercel', category: 'build & web', color: '#111827' },
  // { id: 15, symbol: 'Su', name: 'supabase', category: 'build & web', color: '#3ECF8E' },
  { id: 16, symbol: 'Cc', name: 'claude code', category: 'build & web', color: '#D97706' },
  { id: 17, symbol: 'Ag', name: 'antigravity', category: 'build & web', color: '#0D9488' },

  // AI & Assist
  { id: 18, symbol: 'Mj', name: 'midjourney', category: 'ai & assist', color: '#2563EB' },
  { id: 19, symbol: 'Ff', name: 'firefly', category: 'ai & assist', color: '#FF2A00' },
  { id: 20, symbol: 'Nb', name: 'runway', category: 'ai & assist', color: '#10B981' },
  { id: 21, symbol: 'Hf', name: 'huggingface', category: 'ai & assist', color: '#EAB308' },
  { id: 22, symbol: 'Ch', name: 'chatgpt', category: 'ai & assist', color: '#10A37F' },
  { id: 23, symbol: 'Ge', name: 'gemini', category: 'ai & assist', color: '#6366F1' },
  { id: 24, symbol: 'Cl', name: 'claude', category: 'ai & assist', color: '#EA580C' },
  { id: 25, symbol: '11', name: 'elevenlabs', category: 'ai & assist', color: '#64748B' },
  // { id: 26, symbol: 'We', name: 'v0', category: 'ai & assist', color: '#111827' },
  // { id: 27, symbol: 'Ni', name: 'notebooklm', category: 'ai & assist', color: '#2563EB' },
];

const categories = [
  'all tools',
  'design & brand',
  'motion & video',
  'build & web',
  'ai & assist'
];

export function ToolstackSection() {
  const [activeCategory, setActiveCategory] = useState('all tools');

  const groups = [
    { name: 'design & brand', tools: toolsData.filter(t => t.category === 'design & brand') },
    { name: 'motion & video', tools: toolsData.filter(t => t.category === 'motion & video') },
    { name: 'build & web', tools: toolsData.filter(t => t.category === 'build & web') },
    { name: 'ai & assist', tools: toolsData.filter(t => t.category === 'ai & assist') },
  ];

  const getGridColumns = (count) => {
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    if (count <= 8) return 4;
    return 5;
  };

  return (
    <section className="toolstack-section container">
      <div className="toolstack-header">
        <h2 className="toolstack-title">what's in my toolstack</h2>
        <p className="toolstack-subtitle">
          the handy manny of design: name the tool, know the job, let it do the talking. and a few tools i forgot the name of.
        </p>
      </div>

      {/* Grid of Tool Groups */}
      <div className="toolstack-groups-grid">
        {groups.map((group) => {
          const isGroupDimmed = activeCategory !== 'all tools' && activeCategory !== group.name;
          const columnsCount = getGridColumns(group.tools.length);

          return (
            <div
              key={group.name}
              className={`toolstack-group-card ${isGroupDimmed ? 'dimmed' : ''}`}
            >
              <div
                className="tool-tiles-grid"
                style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
              >
                {group.tools.map((tool) => {
                  const isToolActive = activeCategory === 'all tools' || activeCategory === tool.category;
                  return (
                    <div
                      key={tool.id}
                      className={`tool-tile ${!isToolActive ? 'tile-dimmed' : ''}`}
                    >
                      <span className="tool-number">{tool.id}</span>
                      <span className="tool-symbol" style={{ color: tool.color }}>
                        {tool.symbol}
                      </span>
                      <span className="tool-name">{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Category Pills */}
      <div className="toolstack-filter-bar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`toolstack-filter-pill ${isActive ? 'active' : ''}`}
            >
              <span className={`pill-radio-dot ${isActive ? 'active' : ''}`}></span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ToolstackSection;

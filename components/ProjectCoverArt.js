import React from 'react';

// Get monogram initials from project title
function getMonogram(title) {
  if (!title) return 'PJ';
  let words = title.split(/\s+/).filter(w => w.length > 0);
  
  // Ignore "buildinbyte" prefix
  if (words.length > 1) {
    words = words.filter(w => !/^buildinbyte$/i.test(w));
  }
  // Ignore common suffix terms like "template", "website", "app"
  if (words.length > 1) {
    words = words.filter(w => !/^(template|website|app)$/i.test(w));
  }
  if (words.length === 0) return 'PJ';
  if (words.length === 1) {
    return words[0].substring(0, Math.min(2, words[0].length)).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Simple hash generator
function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function ProjectCoverArt({ project }) {
  if (!project) return null;

  const monogram = getMonogram(project.title);
  const hash = getHash(String(project.id || '') + String(project.title || ''));
  const category = (project.industry || project.category || 'Custom').toUpperCase();

  // Deterministically decide parameters based on hash
  // Zone 1 parameters (Left area)
  const z1Choice = hash % 3;
  const z1Color = (hash >> 1) % 3;
  const z1Size = 25 + ((hash >> 2) % 15); // 25 to 40
  const z1X = 40 + ((hash >> 3) % 40); // 40 to 80
  const z1Y = 35 + ((hash >> 4) % 65); // 35 to 100

  // Zone 2 parameters (Right area)
  const z2Choice = (hash >> 5) % 3;
  const z2Color = (hash >> 6) % 3;
  const z2Size = 25 + ((hash >> 7) % 15); // 25 to 40
  const z2X = 220 + ((hash >> 8) % 40); // 220 to 260
  const z2Y = 35 + ((hash >> 9) % 65); // 35 to 100

  // Zone 3 parameters (Optional center area background)
  const hasZ3 = ((hash >> 10) % 2) === 0;
  const z3Choice = (hash >> 11) % 3;
  const z3Color = (hash >> 12) % 3;
  const z3Size = 35 + ((hash >> 13) % 20); // 35 to 55
  const z3X = 130 + ((hash >> 14) % 60); // 130 to 190
  const z3Y = 40 + ((hash >> 15) % 60); // 40 to 100

  const getShape = (choice, colorIdx, size, x, y, rotateDeg) => {
    const colors = ['#1D4FF7', '#000000', '#FFFFFF'];
    const fillVal = colors[colorIdx];
    
    // If fill is white, we must have a border so it stands out against grid
    const strokeVal = fillVal === '#FFFFFF' ? '#000000' : 'none';
    const strokeWidth = strokeVal !== 'none' ? 2 : 0;

    switch (choice) {
      case 0: // Circle
        return (
          <circle
            cx={x}
            cy={y}
            r={size / 2}
            fill={fillVal}
            stroke={strokeVal}
            strokeWidth={strokeWidth}
          />
        );
      case 1: // Square outline or solid
        {
          const isOutline = colorIdx === 2;
          return (
            <rect
              x={x - size / 2}
              y={y - size / 2}
              width={size}
              height={size}
              fill={isOutline ? 'none' : fillVal}
              stroke={isOutline ? (colorIdx === 0 ? '#1D4FF7' : '#000000') : strokeVal}
              strokeWidth={2}
            />
          );
        }
      case 2: // Diagonal bar
      default:
        {
          const width = 6 + (size % 4);
          const height = size * 1.5;
          const barColor = fillVal === '#FFFFFF' ? '#000000' : fillVal;
          return (
            <rect
              x={x - width / 2}
              y={y - height / 2}
              width={width}
              height={height}
              fill={barColor}
              transform={`rotate(${rotateDeg}, ${x}, ${y})`}
            />
          );
        }
    }
  };

  return (
    <div className="w-full h-36 border-b-4 border-brutal-black relative overflow-hidden select-none bg-white shrink-0">
      {/* SVG Cover Art */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 144"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#FFFFFF" />
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />

        {/* Shape 1 (Left background) */}
        {getShape(z1Choice, z1Color, z1Size, z1X, z1Y, 45)}

        {/* Shape 2 (Right background) */}
        {getShape(z2Choice, z2Color, z2Size, z2X, z2Y, -45)}

        {/* Shape 3 (Optional center background) */}
        {hasZ3 && getShape(z3Choice, z3Color, z3Size, z3X, z3Y, 30)}

        {/* Centered Massive Monogram */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="#000000"
          className="font-display font-black tracking-tighter"
          style={{
            fontSize: '92px',
            userSelect: 'none',
          }}
        >
          {monogram}
        </text>
      </svg>

      {/* Category Pill Tag */}
      <div className="absolute top-3 left-3 bg-white border-2 border-black px-2 py-0.5 text-[9px] font-black tracking-widest text-black uppercase z-10 shadow-none rounded-none">
        {category}
      </div>

      {/* Scan Sweep Bar */}
      <div className="scan-bar" />
    </div>
  );
}

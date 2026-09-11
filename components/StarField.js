const STAR_COLORS = ['#f7f5ef', '#b8d4ff', '#c6c5ff', '#b8e8e4'];
const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const STARS = Array.from({ length: 240 }, (_, index) => ({
  left: `${(seededRandom(index + 1) * 96 + 2).toFixed(2)}%`,
  top: `${(seededRandom(index + 241) * 96 + 2).toFixed(2)}%`,
  size: `${seededRandom(index + 481) > 0.91 ? 4 : seededRandom(index + 721) > 0.65 ? 3 : seededRandom(index + 961) > 0.4 ? 2.5 : 2}px`,
  opacity: (0.48 + (index % 7) * 0.05).toFixed(2),
  dimOpacity: ((0.48 + (index % 7) * 0.05) * 0.32).toFixed(2),
  duration: `${3.2 + seededRandom(index + 1201) * 7}s`,
  delay: `${-(seededRandom(index + 1441) * 12).toFixed(2)}s`,
  color: seededRandom(index + 1681) > 0.83 ? STAR_COLORS[Math.floor(seededRandom(index + 1921) * STAR_COLORS.length)] : STAR_COLORS[0],
  bright: seededRandom(index + 2161) > 0.93,
  sparkle: seededRandom(index + 2401) > 0.88,
  drifting: seededRandom(index + 2641) > 0.9,
}));

export default function StarField() {
  return (
    <div className="site-star-field" aria-hidden="true">
      {STARS.map((star, index) => (
        <span
          key={index}
          className={`site-star${star.bright ? ' site-star--bright' : ''}${star.drifting ? ' site-star--drifting' : ''}${star.sparkle ? ' site-star--sparkle' : ''}`}
          style={{
            '--star-left': star.left,
            '--star-top': star.top,
            '--star-size': star.size,
            '--star-opacity': star.opacity,
            '--star-dim-opacity': star.dimOpacity,
            '--star-duration': star.duration,
            '--star-delay': star.delay,
            '--star-color': star.color,
          }}
        />
      ))}
    </div>
  );
}

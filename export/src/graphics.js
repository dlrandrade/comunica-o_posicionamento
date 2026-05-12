// Reusable decorative SVG snippets

window.GFX = {
  // Black asterisk (sharp star)
  asterisk(opts = {}) {
    const { size = 200, color = '#0A0A0A', rotate = 0 } = opts;
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="transform: rotate(${rotate}deg)">
      <g fill="${color}">
        <rect x="44" y="2" width="12" height="96" rx="1"/>
        <rect x="44" y="2" width="12" height="96" rx="1" transform="rotate(45 50 50)"/>
        <rect x="44" y="2" width="12" height="96" rx="1" transform="rotate(90 50 50)"/>
        <rect x="44" y="2" width="12" height="96" rx="1" transform="rotate(135 50 50)"/>
      </g>
    </svg>`;
  },

  // Glassy 3D-ish lightning bolt with subtle gradient
  bolt(opts = {}) {
    const { size = 200, tint = 'yellow', rotate = 0 } = opts;
    const id = 'bg' + Math.random().toString(36).slice(2, 8);
    let stops, stroke;
    if (tint === 'yellow') {
      stops = `<stop offset="0%" stop-color="#F8FFB0" stop-opacity="0.6"/>
               <stop offset="50%" stop-color="#DEFF1A" stop-opacity="0.3"/>
               <stop offset="100%" stop-color="#A8C200" stop-opacity="0.5"/>`;
      stroke = '#9DB800';
    } else if (tint === 'glass') {
      stops = `<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
               <stop offset="50%" stop-color="#E0E0E0" stop-opacity="0.25"/>
               <stop offset="100%" stop-color="#A0A0A0" stop-opacity="0.45"/>`;
      stroke = 'rgba(255,255,255,0.6)';
    } else {
      stops = `<stop offset="0%" stop-color="#3A3A3A" stop-opacity="0.85"/>
               <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.95"/>`;
      stroke = '#000';
    }
    return `<svg width="${size}" height="${size * 1.4}" viewBox="0 0 100 140" style="transform: rotate(${rotate}deg); filter: drop-shadow(0 8px 18px rgba(0,0,0,0.18));">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient>
      </defs>
      <path d="M58 4 L18 70 L42 70 L34 136 L82 56 L58 56 Z"
            fill="url(#${id})"
            stroke="${stroke}"
            stroke-width="1.5"
            stroke-linejoin="round"/>
      <path d="M55 10 L26 64 L40 66 L36 124"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            stroke-width="1.2"
            stroke-linecap="round"/>
    </svg>`;
  },

  // Big white S-swoosh curve (the white squiggle in the prints)
  swoosh(opts = {}) {
    const { width = 600, height = 800, color = '#FFFFFF', rotate = 0 } = opts;
    return `<svg width="${width}" height="${height}" viewBox="0 0 300 400" style="transform: rotate(${rotate}deg)" preserveAspectRatio="none">
      <path d="M 60 20 Q 240 100 150 200 Q 60 300 240 380"
            fill="none"
            stroke="${color}"
            stroke-width="34"
            stroke-linecap="square"/>
    </svg>`;
  },

  // Arrow up-right inside square
  arrowSquare(opts = {}) {
    const { size = 56, bg = '#0A0A0A', fg = '#DEFF1A' } = opts;
    return `<svg width="${size}" height="${size}" viewBox="0 0 56 56">
      <rect width="56" height="56" fill="${bg}"/>
      <path d="M18 38 L38 18 M22 18 L38 18 L38 34" stroke="${fg}" stroke-width="3.5" fill="none" stroke-linecap="square"/>
    </svg>`;
  }
};

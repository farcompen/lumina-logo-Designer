import { LogoRequest, ServiceResponse, LogoStyle } from "../types";

// Predefined palettes for color mapping
const PALETTES: Record<string, string[]> = {
  blue: ['#0ea5e9', '#0284c7', '#0369a1'], // Brand colors
  red: ['#ef4444', '#b91c1c', '#7f1d1d'],
  green: ['#22c55e', '#15803d', '#14532d'],
  purple: ['#a855f7', '#7e22ce', '#581c87'],
  orange: ['#f97316', '#c2410c', '#7c2d12'],
  gold: ['#fbbf24', '#d97706', '#78350f'],
  grayscale: ['#94a3b8', '#475569', '#1e293b'],
  pastel: ['#fca5a5', '#86efac', '#93c5fd'],
  dark: ['#1e293b', '#0f172a', '#020617'],
};

const DEFAULT_PALETTE = PALETTES.blue;

// Helper to get palette based on user input string
const getPalette = (input: string): string[] => {
  const lowerInput = input.toLowerCase();
  for (const [key, colors] of Object.entries(PALETTES)) {
    if (lowerInput.includes(key)) return colors;
  }
  // If no match, check for specific vibe keywords
  if (lowerInput.includes('warm') || lowerInput.includes('fire')) return PALETTES.orange;
  if (lowerInput.includes('cool') || lowerInput.includes('water')) return PALETTES.blue;
  if (lowerInput.includes('nature') || lowerInput.includes('earth')) return PALETTES.green;
  if (lowerInput.includes('luxury') || lowerInput.includes('elegant')) return PALETTES.gold;
  
  // Random fallback
  const keys = Object.keys(PALETTES);
  return PALETTES[keys[Math.floor(Math.random() * keys.length)]];
};

// SVG Shape Templates based on style
const getShapeTemplate = (style: LogoStyle, color: string): string => {
  const opacity = 0.8;
  switch (style) {
    case LogoStyle.MINIMALIST:
      return `
        <circle cx="0" cy="0" r="60" fill="none" stroke="url(#grad1)" stroke-width="12" />
        <circle cx="0" cy="0" r="30" fill="url(#grad1)" opacity="${opacity}" />
      `;
    case LogoStyle.TECH:
      return `
        <path d="M-50 0 L-25 -43.3 L25 -43.3 L50 0 L25 43.3 L-25 43.3 Z" fill="none" stroke="url(#grad1)" stroke-width="4" />
        <circle cx="0" cy="0" r="15" fill="url(#grad1)" />
        <line x1="-50" y1="0" x2="-70" y2="0" stroke="${color}" stroke-width="4" />
        <line x1="50" y1="0" x2="70" y2="0" stroke="${color}" stroke-width="4" />
      `;
    case LogoStyle.ABSTRACT:
      return `
        <rect x="-50" y="-50" width="100" height="100" rx="20" transform="rotate(45)" fill="url(#grad1)" opacity="0.6" />
        <rect x="-50" y="-50" width="100" height="100" rx="20" transform="rotate(22.5)" fill="url(#grad1)" opacity="0.6" />
      `;
    case LogoStyle.PLAYFUL:
      return `
        <circle cx="-30" cy="-20" r="40" fill="url(#grad1)" opacity="0.8" />
        <circle cx="30" cy="10" r="50" fill="${color}" fill-opacity="0.5" />
        <path d="M-20 50 Q0 70 20 50" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" />
      `;
    case LogoStyle.LUXURY:
      return `
        <rect x="-50" y="-50" width="100" height="100" fill="none" stroke="url(#grad1)" stroke-width="2" />
        <rect x="-40" y="-40" width="80" height="80" fill="none" stroke="url(#grad1)" stroke-width="1" transform="rotate(45)" />
        <text x="0" y="15" text-anchor="middle" font-family="serif" font-size="40" fill="url(#grad1)">L</text>
      `;
    case LogoStyle.FUTURISTIC:
      return `
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path d="M-60 0 L-30 -50 L30 -50 L60 0 L30 50 L-30 50 Z" fill="none" stroke="url(#grad1)" stroke-width="2" filter="url(#glow)" />
        <circle cx="0" cy="0" r="10" fill="url(#grad1)" filter="url(#glow)" />
      `;
    case LogoStyle.VINTAGE:
      return `
        <circle cx="0" cy="0" r="70" fill="none" stroke="url(#grad1)" stroke-width="2" stroke-dasharray="5,5" />
        <path d="M-60 10 L0 -20 L60 10" fill="none" stroke="url(#grad1)" stroke-width="3" />
        <line x1="-40" y1="30" x2="40" y2="30" stroke="url(#grad1)" stroke-width="2" />
      `;
    default: // Modern
      return `
        <path d="M-40 40 L0 -40 L40 40 Z" fill="url(#grad1)" stroke-linejoin="round" stroke-width="10" stroke="url(#grad1)" opacity="0.8"/>
        <path d="M-40 40 L40 -40" stroke="white" stroke-width="4" opacity="0.5" />
      `;
  }
};

const getFontFamily = (style: LogoStyle): string => {
  switch (style) {
    case LogoStyle.LUXURY:
    case LogoStyle.VINTAGE:
      return '"Times New Roman", serif';
    case LogoStyle.TECH:
    case LogoStyle.FUTURISTIC:
      return '"Courier New", monospace';
    case LogoStyle.PLAYFUL:
      return '"Comic Sans MS", "Chalkboard SE", sans-serif';
    default:
      return '"Outfit", sans-serif';
  }
};

export const generateLogoDesign = async (request: LogoRequest): Promise<ServiceResponse> => {
  // 1. Simulate API Latency to make it feel like "work" is being done
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 2. Determine Parameters
  const palette = getPalette(request.colors);
  const primaryColor = palette[0];
  const secondaryColor = palette[1] || palette[0];
  const textColor = palette[2] || '#cbd5e1'; // Slate-300ish
  
  const shapeSvg = getShapeTemplate(request.style, primaryColor);
  const fontFamily = getFontFamily(request.style);
  
  // 3. Construct SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background (Optional, kept transparent for logos usually, but useful for contrast testing) -->
      <!-- <rect width="512" height="512" fill="#0f172a" opacity="0" /> -->

      <!-- Main Icon Group -->
      <g transform="translate(256, 220) scale(1.8)">
        ${shapeSvg}
      </g>

      <!-- Brand Name Text -->
      <text 
        x="50%" 
        y="420" 
        text-anchor="middle" 
        font-family=${fontFamily} 
        font-size="48" 
        font-weight="bold" 
        letter-spacing="2"
        fill="${primaryColor}"
      >
        ${request.brandName}
      </text>
      
      <!-- Industry/Tagline suggestion (Visual decoration only) -->
      <text 
        x="50%" 
        y="460" 
        text-anchor="middle" 
        font-family="sans-serif" 
        font-size="16" 
        font-weight="400" 
        letter-spacing="4"
        fill="${textColor}"
        opacity="0.7"
        style="text-transform: uppercase;"
      >
        ${request.industry.split(' ')[0]}
      </text>
    </svg>
  `;

  return {
    svg: svg.trim(),
    concept: `A ${request.style.toLowerCase()} design utilizing a ${palette === PALETTES.blue ? 'trustworthy blue' : palette === PALETTES.red ? 'bold red' : 'custom'} palette to represent ${request.industry}.`,
    palette: palette
  };
};
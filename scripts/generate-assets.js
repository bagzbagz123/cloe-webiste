const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'public/sequence');
const TOTAL_FRAMES = 60;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} frames in ${OUTPUT_DIR}...`);

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const progress = i / TOTAL_FRAMES;
  // Animate a circle growing and changing color slightly
  const radius = 50 + (progress * 150); // 50 to 200
  const opacity = 0.5 + (progress * 0.5); // 0.5 to 1.0
  const cx = 50 + (progress * 20); // Move slightly x
  
  // Color from dark blue/grey to white/silver? 
  // Let's use clean white stroke with varying opacity on dark background (actually background is transparent or matches #050505)
  // The user said "Image edges must be invisible so Cloe appears to move within a pure, high-end void."
  // So bg should be #050505 or transparent. Transparent is safer for overlays.
  
  const svgContent = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#050505" />
  <circle cx="${960 + (Math.sin(progress * Math.PI) * 100)}" cy="${540}" r="${radius}" 
    fill="none" stroke="rgba(255, 255, 255, ${opacity})" stroke-width="2" />
  <text x="50%" y="90%" text-anchor="middle" fill="#333" font-family="sans-serif" font-size="24">
    Frame ${i}/${TOTAL_FRAMES}
  </text>
  <!-- Simulating a "pose" with simple lines -->
  <line x1="960" y1="540" x2="${960 + (Math.cos(progress * Math.PI * 2) * 200)}" y2="${540 + (Math.sin(progress * Math.PI * 2) * 200)}" stroke="white" stroke-width="5" />
</svg>`;

  const fileName = String(i).padStart(3, '0') + '.svg';
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), svgContent.trim());
}

console.log('Done.');

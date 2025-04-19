interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

interface Dot {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
  color: string;
  rotation: number;
}

interface Bounds {
  width: number;
  height: number;
}

let dots: Dot[] = [];
let bounds: Bounds;
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

// Generate random color in the teal-green spectrum
const getRandomColor = () => {
  // Various shades of teal and green
  const colors = [
    'rgba(54, 215, 183, 0.2)', // Light teal
    'rgba(46, 204, 113, 0.2)',  // Light green
    'rgba(26, 188, 156, 0.2)',  // Teal
    'rgba(39, 174, 96, 0.2)',   // Green
    'rgba(22, 160, 133, 0.2)',  // Dark teal
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Create points with random starting positions
const createPoints = (): Point[] => {
  const points: Point[] = [];
  const numberOfPoints = Math.floor((bounds.width * bounds.height) / 25000); // Adjust density here
  
  for (let i = 0; i < numberOfPoints; i++) {
    const x = Math.random() * bounds.width;
    const y = Math.random() * bounds.height;
    
    points.push({
      x,
      y,
      originX: x,
      originY: y,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
    });
  }
  
  return points;
};

// Create polygon dots
const createDots = (points: Point[]): Dot[] => {
  const tempDots: Dot[] = [];
  
  for (let i = 0; i < points.length; i++) {
    const p0 = points[i];
    const p1 = points[(i + 1) % points.length];
    const p2 = points[(i + 2) % points.length];
    const p3 = points[(i + 3) % points.length];
    
    tempDots.push({
      p0,
      p1,
      p2,
      p3,
      color: getRandomColor(),
      rotation: Math.random() * Math.PI * 2,
    });
  }
  
  return tempDots;
};

// Update point positions
const updatePoints = (points: Point[]) => {
  for (const point of points) {
    // Random movement
    point.x += point.vx;
    point.y += point.vy;
    
    // Boundaries check and bounce
    if (point.x > bounds.width || point.x < 0) {
      point.vx *= -1;
    }
    if (point.y > bounds.height || point.y < 0) {
      point.vy *= -1;
    }
    
    // Slight attraction to original position
    point.x += (point.originX - point.x) * 0.01;
    point.y += (point.originY - point.y) * 0.01;
  }
};

// Draw everything
const draw = () => {
  if (!ctx) return;
  
  ctx.clearRect(0, 0, bounds.width, bounds.height);
  
  for (const dot of dots) {
    ctx.beginPath();
    ctx.fillStyle = dot.color;
    
    // Draw quadrilateral
    ctx.moveTo(dot.p0.x, dot.p0.y);
    ctx.lineTo(dot.p1.x, dot.p1.y);
    ctx.lineTo(dot.p2.x, dot.p2.y);
    ctx.lineTo(dot.p3.x, dot.p3.y);
    
    // Apply rotation and slightly update it
    dot.rotation += 0.001;
    ctx.translate((dot.p0.x + dot.p2.x) / 2, (dot.p0.y + dot.p2.y) / 2);
    ctx.rotate(dot.rotation);
    ctx.translate(-(dot.p0.x + dot.p2.x) / 2, -(dot.p0.y + dot.p2.y) / 2);
    
    ctx.fill();
    ctx.resetTransform();
  }
  
  // Draw connecting lines for depths
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 0.5;
  
  for (let i = 0; i < dots.length; i += 3) {
    const dot = dots[i];
    
    for (let j = 0; j < dots.length; j += 5) {
      if (i !== j) {
        const dot2 = dots[j];
        const dx = (dot.p0.x + dot.p2.x) / 2 - (dot2.p0.x + dot2.p2.x) / 2;
        const dy = (dot.p0.y + dot.p2.y) / 2 - (dot2.p0.y + dot2.p2.y) / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < bounds.width / 8) {
          ctx.beginPath();
          ctx.moveTo((dot.p0.x + dot.p2.x) / 2, (dot.p0.y + dot.p2.y) / 2);
          ctx.lineTo((dot2.p0.x + dot2.p2.x) / 2, (dot2.p0.y + dot2.p2.y) / 2);
          ctx.stroke();
        }
      }
    }
  }
};

// Animation loop
const animate = () => {
  const points = dots.map(dot => dot.p0).concat(dots.map(dot => dot.p1))
    .concat(dots.map(dot => dot.p2)).concat(dots.map(dot => dot.p3));
  
  // Filter out duplicates
  const uniquePoints = Array.from(new Set(points));
  
  updatePoints(uniquePoints);
  draw();
  animationFrameId = requestAnimationFrame(animate);
};

// Initialize
export const init = (canvas: HTMLCanvasElement) => {
  ctx = canvas.getContext('2d');
  
  // Handle resize
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bounds = { width: canvas.width, height: canvas.height };
    
    const points = createPoints();
    dots = createDots(points);
  };
  
  window.addEventListener('resize', resize);
  resize();
  animate();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(animationFrameId);
  };
};

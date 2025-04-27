interface PolygonBackgroundOptions {
  particleCount?: number;
  connectionRadius?: number;
  animationSpeed?: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export function init(canvas: HTMLCanvasElement, options: PolygonBackgroundOptions = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Default options with reasonable values
  const settings = {
    particleCount: options.particleCount || 100,
    connectionRadius: options.connectionRadius || 120,
    animationSpeed: options.animationSpeed || 1
  };

  // Resize handling
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // Generate particles with Z-depth for 3D effect
  const particles: Particle[] = [];
  for (let i = 0; i < settings.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 500,
      vx: (Math.random() - 0.5) * 0.3 * settings.animationSpeed,
      vy: (Math.random() - 0.5) * 0.3 * settings.animationSpeed,
      vz: (Math.random() - 0.5) * 0.5 * settings.animationSpeed
    });
  }

  // Set up a more efficient render loop with requestAnimationFrame
  let animationFrameId: number;

  // Use a buffer for drawing the connections to improve performance
  const renderFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      
      // Boundary checks with smoother wraparound
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      if (p.z < 0) p.z = 500;
      if (p.z > 500) p.z = 0;
      
      // Scale based on depth
      const scale = 1 - p.z / 1000;
      
      // Draw dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(54, 215, 183, ${scale * 0.8})`;
      ctx.arc(p.x, p.y, 1.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections (with fewer checks for better performance)
      // Only check a subset of particles for connections
      const checkCount = Math.min(particles.length, 30);
      for (let j = (i + 1) % checkCount; j < particles.length; j += Math.max(1, Math.floor(particles.length / checkCount))) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < settings.connectionRadius * scale) {
          const opacity = (1 - distance / (settings.connectionRadius * scale)) * 0.3 * scale;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(54, 215, 183, ${opacity})`;
          ctx.lineWidth = 0.5 * scale;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(renderFrame);
  };

  // Start animation
  renderFrame();
  
  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}

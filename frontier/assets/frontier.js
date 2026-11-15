/* Decorative orbital field. One short entrance; reading needs no JavaScript. */
(() => {
  const canvas = document.getElementById('frontier-field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const points = [];
  for (let ring = 0; ring < 33; ring++) {
    const latitude = Math.PI * (ring / 32);
    for (let i = 0; i < 62; i++) {
      const angle = 2 * Math.PI * i / 62;
      points.push([Math.sin(latitude) * Math.cos(angle), Math.cos(latitude), Math.sin(latitude) * Math.sin(angle)]);
    }
  }
  let size = 0;
  let frame = 0;
  const draw = (rotation = .45) => {
    ctx.clearRect(0, 0, size, size);
    const center = size / 2;
    const radius = size * .32;
    const glow = ctx.createRadialGradient(center, center, 0, center, center, radius * 1.5);
    glow.addColorStop(0, '#17355455'); glow.addColorStop(1, '#080f1c00');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, size, size);
    ctx.save(); ctx.translate(center, center); ctx.rotate(-.48);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.ellipse(0, 0, radius * (1.36 + i * .07), radius * (.28 + i * .05), 0, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? '#78d5f780' : '#78d5f726'; ctx.lineWidth = .7; ctx.stroke();
    }
    ctx.restore();
    for (const [x, y, z] of points) {
      const rx = x * Math.cos(rotation) + z * Math.sin(rotation);
      const rz = -x * Math.sin(rotation) + z * Math.cos(rotation);
      const ty = y * .94 - rz * .34;
      const depth = y * .34 + rz * .94;
      ctx.beginPath();
      ctx.arc(center + rx * radius, center + ty * radius, depth > 0 ? 1.05 : .65, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(140,213,251,${.18 + (depth + 1) * .35})`; ctx.fill();
    }
    [[.13, .68], [.83, .27], [.7, .82]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x * size, y * size, 2, 0, Math.PI * 2); ctx.fillStyle = '#d3f3ff'; ctx.fill();
    });
  };
  const resize = () => {
    size = canvas.clientWidth;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(); canvas.parentElement.classList.add('is-rendered');
  };
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas.parentElement);
  else window.addEventListener('resize', resize, { passive: true });
  const start = performance.now();
  const animate = now => {
    const elapsed = Math.min((now - start) / 3000, 1);
    draw(.05 + .4 * (1 - Math.pow(1 - elapsed, 3)));
    if (elapsed < 1 && !reduced.matches && !document.hidden) frame = requestAnimationFrame(animate);
  };
  if (!reduced.matches) frame = requestAnimationFrame(animate);
  const stop = () => { cancelAnimationFrame(frame); draw(); };
  reduced.addEventListener('change', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();

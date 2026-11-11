/* Navigation enhances a fully readable static article. No external dependencies. */
(() => {
  const toc = document.querySelector('.fr-toc');
  if (!toc) return;
  const details = toc.querySelector('details');
  const desktop = window.matchMedia('(min-width: 901px)');
  const syncLayout = () => { details.open = desktop.matches; };
  syncLayout();
  desktop.addEventListener('change', syncLayout);

  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const targets = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
  const progress = document.querySelector('.fr-progress > div');
  let queued = false;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${total > 0 ? Math.min(100, window.scrollY / total * 100) : 100}%`;
    let current = 0;
    targets.forEach((target, index) => {
      if (target && target.getBoundingClientRect().top <= 140) current = index;
    });
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    queued = false;
  };
  const schedule = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  toc.addEventListener('click', event => {
    if (event.target.closest('a') && !desktop.matches) details.open = false;
  });
  update();
})();

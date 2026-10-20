(() => {
  const video = document.querySelector('.hero-video');
  const hero = document.querySelector('.hero');
  const button = document.querySelector('.ambient-toggle');
  if (!video || !hero || !button) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reducedMotion.matches;
  let inView = true;
  video.muted = true;
  video.defaultMuted = true;

  function updateButton() {
    const paused = video.paused;
    button.setAttribute('aria-pressed', String(paused));
    const label = paused ? '播放背景动画' : '暂停背景动画';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.querySelector('.motion-label').textContent = paused ? '播放背景' : '暂停背景';
  }

  function syncPlayback() {
    if (userPaused || !inView || document.hidden) {
      video.pause();
      updateButton();
      return;
    }
    video.play().catch(updateButton);
  }

  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => {
    video.pause();
    button.hidden = true;
  });
  button.addEventListener('click', () => {
    userPaused = !video.paused;
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    userPaused = reducedMotion.matches;
    syncPlayback();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }).observe(hero);
  }

  button.hidden = false;
  updateButton();
  syncPlayback();
})();

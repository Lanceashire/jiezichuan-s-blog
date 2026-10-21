(() => {
  'use strict';
  const id = String(window.BLOG_MUSIC_CONFIG?.playerId || 'demo').trim();
  function script(src, attributes = {}) {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.src = src;
      for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
      element.onload = resolve; element.onerror = reject;
      document.body.append(element);
    });
  }
  async function load() {
    try {
      if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error('Invalid player ID');
      if (!window.jQuery) await script('https://myhkw.cn/player/js/jquery.min.js');
      await script('https://myhkw.cn/api/player/' + encodeURIComponent(id), {
        id: 'myhk', key: id, m: '1', au: '0', lr: 'l', skin: 'player', op: '0', sg: '0'
      });
      if (!document.getElementById('myhkplayer')) throw new Error('Player unavailable');
    } catch (_) {
      const retry = document.createElement('button');
      retry.type = 'button'; retry.className = 'blog-music-retry';
      retry.textContent = '♫ 重新连接音乐';
      retry.title = '若已在其他博客标签页打开音乐，请先关闭该页再重试。';
      retry.addEventListener('click', () => location.reload());
      document.body.append(retry);
    }
  }
  load();
})();

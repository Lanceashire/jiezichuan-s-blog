(() => {
  // Give the vendor's icon controls readable labels and keyboard access.
  const controls = [
    ['.myhkplay', '播放音乐'], ['.myhkpause', '暂停音乐'],
    ['.myhknext', '下一首'], ['.myhkprev', '上一首'],
    ['.myhkanext', '下一个歌单'], ['.myhkaprev', '上一个歌单'],
    ['.switch-player', '展开或收起音乐播放器'],
    ['.switch-playlist', '切换音乐歌单'], ['.random', '切换播放模式']
  ];
  function labelControls() {
    const player = document.querySelector('#myhkplayer');
    if (!player) return;
    player.setAttribute('aria-label', '在线音乐播放器');
    for (const [selector, label] of controls) {
      for (const control of player.querySelectorAll(selector)) {
        if (control.dataset.blogMusicControl) continue;
        control.dataset.blogMusicControl = 'true';
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute('aria-label', label);
        control.title = label;
        control.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            control.click();
          }
        });
      }
    }
  }
  labelControls();
  new MutationObserver(labelControls).observe(document.body, {childList: true, subtree: true});
})();

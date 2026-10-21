(() => {
  // Give the vendor's icon controls readable labels and keyboard access.
  const controls = [
    ['.myhkplay', '播放音乐'], ['.myhkpause', '暂停音乐'],
    ['.myhknext', '下一首'], ['.myhkprev', '上一首'],
    ['.myhkanext', '下一个歌单'], ['.myhkaprev', '上一个歌单'],
    ['.switch-player', '展开或收起音乐播放器'],
    ['.switch-playlist', '切换音乐歌单'], ['.qhms', '切换播放模式'], ['.volume', '调节音量'], ['.switch-ksclrc', '开关歌词']
  ];
  function labelControls() {
    const player = document.querySelector('#myhkplayer');
    if (!player) return;
    player.setAttribute('aria-label', '夜之乐章 · 在线音乐播放器');
    const toggle = player.querySelector('.switch-player');
    const playlist = player.querySelector('.switch-playlist');
    toggle?.setAttribute('aria-expanded', String(player.classList.contains('myhkshow')));
    playlist?.setAttribute('aria-expanded', String(player.classList.contains('showList') || player.classList.contains('showAlbumList')));
    if (!player.dataset.blogMusicObserved) {
      player.dataset.blogMusicObserved = 'true';
      new MutationObserver(labelControls).observe(player, {attributes:true, attributeFilter:['class']});
    }
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

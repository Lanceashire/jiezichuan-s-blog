(() => {
  'use strict';
  const labelled = new WeakSet();
  const controls = [
    ['.myhkplay', '播放音乐'], ['.myhkpause', '暂停音乐'],
    ['.myhknext', '下一首'], ['.myhkprev', '上一首'],
    ['.myhkanext', '下一个歌单'], ['.myhkaprev', '上一个歌单'],
    ['.switch-player', '展开或收起音乐播放器'],
    ['.switch-playlist', '选择歌单'], ['.qhms', '切换播放模式'],
    ['.volume', '静音或恢复声音'], ['.switch-ksclrc', '开关歌词'],
    ['.song-list .musicheader', '返回歌单']
  ];
  let installed = null;
  function enhance() {
    const player = document.getElementById('myhkplayer');
    const audio = document.getElementById('myhkaudio');
    if (!player || !audio) return;
    if (installed !== player) { installed = player; install(player, audio); }
    for (const [selector, label] of controls) {
      for (const control of player.querySelectorAll(selector)) {
        if (labelled.has(control)) continue;
        labelled.add(control);
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute('aria-label', label);
        control.title = label;
        control.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); event.stopPropagation(); control.click();
          }
        });
      }
    }
    for (const row of player.querySelectorAll('.myhklist li')) {
      const listOpen = player.classList.contains('showAlbumList') || player.classList.contains('showList');
      const songList = player.classList.contains('showSongList');
      row.tabIndex = listOpen && (songList ? !!row.closest('.song-list') : !!row.closest('.album-list')) ? 0 : -1;
      if (labelled.has(row)) continue;
      labelled.add(row); row.setAttribute('role', 'button');
      row.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); row.click(); }
      });
    }
    syncControls(player, audio);
  }
  function syncControls(player, audio) {
    player.setAttribute('aria-label', '夜之乐章 · 在线音乐播放器');
    player.classList.toggle('playing', !audio.paused);
    player.querySelector('.switch-player')?.setAttribute('aria-expanded', String(player.classList.contains('myhkshow')));
    player.querySelector('.switch-playlist')?.setAttribute('aria-expanded', String(player.classList.contains('showList') || player.classList.contains('showAlbumList')));
    const mode = player.querySelector('.qhms');
    const text = player.querySelector('.myhkmoshi')?.textContent.trim() || '播放模式';
    if (mode) { mode.dataset.controlText = text; mode.setAttribute('aria-label', '播放模式：' + text + '，点击切换'); }
    player.querySelector('.switch-ksclrc')?.setAttribute('data-control-text', '歌词');
    player.querySelector('.switch-playlist')?.setAttribute('data-control-text', '歌单');
    const volume = player.querySelector('.volume');
    volume?.setAttribute('aria-pressed', String(audio.muted || audio.volume === 0));
    volume?.setAttribute('aria-label', audio.muted ? '恢复声音' : '静音');
    player.querySelector('.myhkplay')?.setAttribute('tabindex', audio.paused ? '0' : '-1');
    player.querySelector('.myhkpause')?.setAttribute('tabindex', audio.paused ? '-1' : '0');
  }
  function install(player, audio) {
    const main = player.querySelector('.myhkplayer');
    const header = document.createElement('div');
    header.className = 'blog-music-heading'; header.setAttribute('aria-hidden', 'true');
    header.innerHTML = '<span>NOCTURNE</span><strong>夜之乐章</strong><i></i>';
    const equalizer = document.createElement('span');
    equalizer.className = 'blog-music-equalizer';
    equalizer.setAttribute('aria-hidden', 'true');
    equalizer.innerHTML = '<i></i><i></i><i></i><i></i>';
    header.append(equalizer);
    main.prepend(header);
    const volumeRow = document.createElement('div');
    volumeRow.className = 'blog-volume-row';
    volumeRow.innerHTML = '<label for="blog-music-volume">音量</label><input id="blog-music-volume" type="range" min="0" max="100" step="1" aria-label="音乐音量"><output for="blog-music-volume"></output>';
    main.append(volumeRow);
    const volumeInput = volumeRow.querySelector('input');
    const volumeOutput = volumeRow.querySelector('output');
    volumeInput.addEventListener('input', () => {
      audio.muted = false; audio.volume = Number(volumeInput.value) / 100;
      try { localStorage.setItem('myhk_player_volume', String(audio.volume)); } catch (_) {}
    });
    player.querySelector('.volume').addEventListener('click', () => { audio.muted = !audio.muted; updateVolume(); });
    function updateVolume() {
      const value = audio.muted ? 0 : Math.round(audio.volume * 100);
      volumeInput.value = value; volumeOutput.value = value + '%';
      syncControls(player, audio);
    }
    audio.addEventListener('volumechange', updateVolume); updateVolume();
    const progress = player.querySelector('.playprogress');
    progress.setAttribute('role', 'slider'); progress.tabIndex = 0;
    progress.setAttribute('aria-label', '播放进度'); progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    let dragging = false;
    function seekAt(event) {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const rect = progress.getBoundingClientRect();
      audio.currentTime = audio.duration * Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      updateProgress();
    }
    progress.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      event.preventDefault(); event.stopImmediatePropagation();
      dragging = true; progress.focus({preventScroll:true}); progress.setPointerCapture(event.pointerId); seekAt(event);
    }, true);
    progress.addEventListener('pointermove', event => { if (dragging) seekAt(event); });
    progress.addEventListener('pointerup', event => { if (dragging) seekAt(event); dragging = false; });
    progress.addEventListener('pointercancel', () => { dragging = false; });
    progress.addEventListener('lostpointercapture', () => { dragging = false; });
    // The old thumb uses mouse-only drag handlers and a 5px track.
    progress.addEventListener('mousedown', event => { event.stopImmediatePropagation(); }, true);
    progress.addEventListener('click', event => { event.stopImmediatePropagation(); }, true);
    progress.addEventListener('keydown', event => {
      if (!Number.isFinite(audio.duration)) return;
      let next;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = audio.currentTime - 5;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = audio.currentTime + 5;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = audio.duration;
      else return;
      event.preventDefault(); audio.currentTime = Math.max(0, Math.min(audio.duration, next)); updateProgress();
    });
    function updateProgress() {
      const fraction = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0;
      progress.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
      progress.setAttribute('aria-valuetext', Math.floor(audio.currentTime || 0) + ' 秒');
      progress.setAttribute('aria-disabled', String(!Number.isFinite(audio.duration)));
    }
    ['timeupdate', 'loadedmetadata', 'durationchange', 'emptied'].forEach(name => audio.addEventListener(name, updateProgress));
    ['play', 'pause'].forEach(name => audio.addEventListener(name, () => syncControls(player, audio)));
    updateProgress();
    new MutationObserver(enhance).observe(player, {attributes:true, attributeFilter:['class'], childList:true, subtree:true});
  }
  enhance();
  new MutationObserver(enhance).observe(document.body, {childList:true, subtree:true});
})();

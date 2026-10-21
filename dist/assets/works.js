    (function() {
      'use strict';

      // 背景图路径（部署时放置于 dist/assets/ecclesia-chamber-bg.jpg）
      const CHAMBER_BG_SRC = 'assets/ecclesia-chamber-bg.jpg';

      // 密室桌台上的烛台项目配置（可在此直接增改你的项目、说明与跳转链接）
      const CANDLESTICKS = [
        {
          id: 'altar-01',
          number: '01 / WEBSITE',
          glyphName: 'Vol Nocturne · 夜之刻印',
          glyphSymbol: '印',
          category: '个人博客 · Website',
          title: '夜之手记',
          desc: '像素哥特个人博客。以黑曜石与古铜烛火构筑的私人数字密室，收录代码实践、随笔手记与器物收藏。',
          tags: ['HTML', 'CSS', 'JavaScript'],
          href: 'site-notes.html',
          linkText: '站点记录',
          external: false,
          x: 0.224,
          y: 0.645,
          tableBounds: { x0: 0.165, x1: 0.282, y0: 0.580, y1: 0.875 },
          flames: [
            { x: 0.1781, y: 0.620, size: 1.15 },
            { x: 0.1932, y: 0.604, size: 1.25 },
            { x: 0.2089, y: 0.620, size: 1.1 },
            { x: 0.2220, y: 0.658, size: 1.0 },
            { x: 0.2347, y: 0.632, size: 1.15 },
            { x: 0.2482, y: 0.653, size: 1.0 },
            { x: 0.2696, y: 0.617, size: 1.2 },
            { x: 0.2404, y: 0.840, size: 1.05 },
            { x: 0.2660, y: 0.808, size: 1.3 }
          ]
        },
        {
          id: 'altar-02',
          number: '02 / ARCHITECTURE',
          glyphName: 'Macir Structura · 构筑之印',
          glyphSymbol: '构',
          category: '建设笔记 · Engineering',
          title: '密室建设笔记',
          desc: '记录《夜之手记》从零构建的静态架构演进、像素哥特排版规范与 GitHub Pages 部署链路。',
          tags: ['Static Web', 'CSS Grid', 'GitHub Actions'],
          href: 'building-notes.html',
          linkText: '建设笔记',
          external: false,
          x: 0.412,
          y: 0.625,
          tableBounds: { x0: 0.350, x1: 0.478, y0: 0.565, y1: 0.785 },
          flames: [
            { x: 0.3610, y: 0.594, size: 1.15 },
            { x: 0.3786, y: 0.582, size: 1.25 },
            { x: 0.3953, y: 0.594, size: 1.15 },
            { x: 0.4063, y: 0.623, size: 1.1 },
            { x: 0.4205, y: 0.610, size: 1.2 },
            { x: 0.4352, y: 0.622, size: 1.1 },
            { x: 0.4446, y: 0.677, size: 1.15 },
            { x: 0.4651, y: 0.653, size: 1.2 },
            { x: 0.3631, y: 0.745, size: 1.1 }
          ]
        },
        {
          id: 'altar-03',
          number: '03 / SANCTUM OS',
          glyphName: 'Dominus Quietum · 静谧主宰',
          glyphSymbol: '寂',
          category: '沉浸模式 · Interactive',
          title: '静谧桌面终端',
          desc: '博客内置的沉浸式暗夜桌面体验与背景音乐巡礼空间，将像素哥特美学与低干扰阅读氛围融为一体。',
          tags: ['HTML5 Canvas', 'Audio', 'Pixel UI'],
          href: 'quiet-desktop.html',
          linkText: '静谧桌面',
          external: false,
          x: 0.668,
          y: 0.585,
          tableBounds: { x0: 0.585, x1: 0.752, y0: 0.520, y1: 0.740 },
          flames: [
            { x: 0.5999, y: 0.596, size: 1.2 },
            { x: 0.6164, y: 0.573, size: 1.25 },
            { x: 0.6337, y: 0.591, size: 1.15 },
            { x: 0.6448, y: 0.638, size: 1.3 },
            { x: 0.6542, y: 0.556, size: 1.25 },
            { x: 0.6719, y: 0.538, size: 1.4 },
            { x: 0.6899, y: 0.557, size: 1.25 },
            { x: 0.6952, y: 0.657, size: 1.25 },
            { x: 0.7110, y: 0.595, size: 1.2 },
            { x: 0.7235, y: 0.573, size: 1.25 },
            { x: 0.7370, y: 0.596, size: 1.2 }
          ]
        },
        {
          id: 'altar-04',
          number: '04 / REPOSITORY',
          glyphName: 'Umbra Codex · 暗影法典',
          glyphSymbol: '典',
          category: '开源代码 · GitHub',
          title: 'Lanceashire 代码圣殿',
          desc: '通往 Lanceashire 的 GitHub 开源仓库与完整工程档案，收录个人博客源码与更多前端实践项目。',
          tags: ['GitHub', 'Open Source', 'Repositories'],
          href: 'https://github.com/Lanceashire',
          linkText: '前往 GitHub',
          external: true,
          x: 0.872,
          y: 0.630,
          tableBounds: { x0: 0.835, x1: 0.915, y0: 0.585, y1: 0.720 },
          flames: [
            { x: 0.8518, y: 0.616, size: 1.25 },
            { x: 0.8770, y: 0.612, size: 1.25 },
            { x: 0.8894, y: 0.659, size: 1.15 }
          ]
        }
      ];

      const AMBIENT_PILLAR_FLAMES = [
        { x: 0.022, y: 0.574, size: 1.0 },
        { x: 0.057, y: 0.602, size: 1.2 },
        { x: 0.942, y: 0.588, size: 1.15 },
        { x: 0.969, y: 0.547, size: 1.3 }
      ];

      const PALETTES = [
        { name: '圣教幽蓝', core: '#ffffff', inner: '#7ef9ff', outer: '#2b7de9', glow: 'rgba(92, 225, 230, 0.36)', rune: '#5ce1e6' },
        { name: '多米纳斯深红', core: '#fff5f5', inner: '#ff6b7b', outer: '#c91e32', glow: 'rgba(217, 56, 74, 0.40)', rune: '#ff5c70' },
        { name: '古铜暖烛', core: '#fffdf5', inner: '#ffe082', outer: '#e67e22', glow: 'rgba(245, 215, 142, 0.35)', rune: '#f5d78e' }
      ];
      let currentPaletteIdx = 0;

      // Web Audio 古钢琴与刻印音效
      let audioCtx = null;
      let audioEnabled = false;
      let bgmInterval = null;
      let bgmStep = 0;
      const BAROQUE_NOTES = [
        293.66, 349.23, 440.00, 587.33, 523.25, 440.00, 349.23, 440.00,
        277.18, 329.63, 440.00, 554.37, 523.25, 440.00, 329.63, 440.00,
        261.63, 311.13, 392.00, 523.25, 466.16, 392.00, 311.13, 392.00,
        220.00, 277.18, 329.63, 440.00, 349.23, 329.63, 277.18, 220.00
      ];

      function initAudio() {
        if (!audioCtx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) audioCtx = new AC();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      }

      function playGlyphChime() {
        if (!audioEnabled || !audioCtx || audioCtx.state !== 'running') return;
        try {
          const now = audioCtx.currentTime;
          [523.25, 659.25, 1046.5].forEach((f, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + idx * 0.055);
            gain.gain.setValueAtTime(0.001, now + idx * 0.055);
            gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.055 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.055 + 0.4);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + idx * 0.055);
            osc.stop(now + idx * 0.055 + 0.42);
          });
        } catch (e) {}
      }

      const canvas = document.getElementById('chamber-canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const scene = document.querySelector('.chamber-scene');
      const followControl = document.getElementById('chk-auto-follow');
      const floatingPlaque = document.getElementById('floating-plaque');

      const bgImg = new Image();
      let bgLoaded = false;
      bgImg.onload = function() {
        bgLoaded = true;
        canvas.dataset.background = 'ready';
      };
      bgImg.onerror = function() {
        canvas.dataset.background = 'error';
        document.getElementById('chamber-hint').textContent = '背景暂时未加载，可使用下方作品链接。';
      };
      bgImg.src = CHAMBER_BG_SRC;

      const FLOOR_Y = 0.908;
      const player = {
        x: 0.224,
        y: FLOOR_Y,
        vx: 0,
        vy: 0,
        targetX: 0.224,
        facing: 1,
        walkFrame: 0,
        isJumping: false,
        isAbsorbing: false,
        absorbTimer: 0
      };

      const keys = { left: false, right: false, up: false };
      let activeAltarIdx = 0;
      let hoveredAltarIdx = -1;
      let autoFollowMouse = true;
      let lastRenderedAltarIdx = -99;

      const dustMotes = Array.from({ length: 45 }, () => ({
        x: Math.random(),
        y: Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.00025,
        vy: -0.00015 - Math.random() * 0.00035,
        size: Math.random() < 0.6 ? 2 : 3,
        alpha: 0.2 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2
      }));

      const glyphSparks = [];
      function spawnGlyphSpark(nx, ny, color, count) {
        for (let i = 0; i < count; i++) {
          glyphSparks.push({
            x: nx + (Math.random() - 0.5) * 0.018,
            y: ny + (Math.random() - 0.5) * 0.012,
            vx: (Math.random() - 0.5) * 0.0008,
            vy: -0.0007 - Math.random() * 0.0012,
            life: 1.0,
            decay: 0.018 + Math.random() * 0.02,
            color: color,
            size: Math.random() < 0.5 ? 2 : 4
          });
        }
      }

      // 点击烛台后跳转到目标项目地址
      function navigateToCandlestickProject(item) {
        playGlyphChime();
        if (item.external) {
          window.open(item.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = item.href;
        }
      }

      function updateFloatingPlaque(idx) {
        if (idx < 0 || idx >= CANDLESTICKS.length) {
          floatingPlaque.classList.add('hidden-plaque');
          floatingPlaque.hidden = true;
          lastRenderedAltarIdx = -1;
          return;
        }
        const item = CANDLESTICKS[idx];
        floatingPlaque.classList.remove('hidden-plaque');
        floatingPlaque.hidden = false;

        if (lastRenderedAltarIdx !== idx) {
          lastRenderedAltarIdx = idx;
          document.getElementById('plaque-glyph-icon').textContent = item.glyphSymbol;
          document.getElementById('plaque-number').textContent = item.number;
          document.getElementById('plaque-glyph-name').textContent = item.glyphName;
          document.getElementById('plaque-meta-badge').textContent = item.category;
          document.getElementById('plaque-title').textContent = item.title;
          document.getElementById('plaque-desc').textContent = item.desc;

          const tagsEl = document.getElementById('plaque-tags');
          tagsEl.innerHTML = (item.tags || []).map(t => `<span class="plaque-tag">${t}</span>`).join('');

          const linkEl = document.getElementById('plaque-link');
          linkEl.href = item.href;
          if (item.external) {
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
          } else {
            linkEl.removeAttribute('target');
          }
          document.getElementById('plaque-link-text').textContent = item.linkText || '查看项目';
          document.querySelectorAll('#altar-quick-pills button').forEach((button, index) => {
            button.setAttribute('aria-pressed', String(index === idx));
          });
          document.querySelectorAll('.grimoire-card').forEach((card, index) => {
            card.classList.toggle('active-card', index === idx);
          });
          canvas.dataset.activeAltar = item.id;
          canvas.setAttribute('aria-label', `密室场景，当前作品：${item.title}。方向键或 A、D 移动，W 跳跃，R 吸印，回车进入作品。`);
          positionPlaque(item);

        }
      }

      function positionPlaque(item = CANDLESTICKS[activeAltarIdx]) {
        if (!item || !scene.clientWidth) return;
        const gutter = 12;
        const center = item.x * scene.clientWidth;
        const width = floatingPlaque.offsetWidth;
        floatingPlaque.style.left = Math.max(gutter, Math.min(scene.clientWidth - width - gutter, center - width / 2)) + 'px';
        const preferredTop = Math.max(8, item.tableBounds.y0 * 100 - 42) / 100 * canvas.clientHeight;
        floatingPlaque.style.top = Math.max(gutter, Math.min(canvas.clientHeight - floatingPlaque.offsetHeight - gutter, preferredTop)) + 'px';
      }
      new ResizeObserver(() => positionPlaque()).observe(scene);

      function drawPixelFlame(px, py, scale, time, isResonant, palette) {
        const snap = 2;
        const sx = Math.round(px / snap) * snap;
        const sy = Math.round(py / snap) * snap;
        const flicker = Math.sin(time * 0.011 + px * 0.13) * 1.8 + Math.cos(time * 0.019 + py * 0.07) * 1.2;
        const heightBoost = isResonant ? 1.55 : 1.0;

        const radius = (isResonant ? 54 : 32) * scale;
        const grad = ctx.createRadialGradient(sx, sy - 4, 2, sx, sy - 4, radius);
        grad.addColorStop(0, isResonant ? palette.glow : 'rgba(255, 195, 100, 0.24)');
        grad.addColorStop(0.6, isResonant ? 'rgba(245, 215, 142, 0.14)' : 'rgba(210, 110, 35, 0.08)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy - 4, radius, 0, Math.PI * 2);
        ctx.fill();

        const sway = Math.round((flicker * 0.55) / snap) * snap;
        const h = Math.round((8 * scale * heightBoost + Math.abs(flicker)) / snap) * snap;

        ctx.fillStyle = isResonant ? palette.outer : '#e67e22';
        ctx.fillRect(sx - 2 + sway, sy - h, 4, h);
        ctx.fillRect(sx - 4, sy - Math.max(4, h - 4), 8, Math.max(4, h - 4));

        ctx.fillStyle = isResonant ? palette.inner : '#ffd166';
        ctx.fillRect(sx - 2 + sway, sy - h + 2, 4, Math.max(2, h - 2));

        ctx.fillStyle = palette.core;
        ctx.fillRect(sx - 1, sy - 4, 2, 4);
      }

      function drawEcclesiaGlyphSeal(cx, cy, time, palette, symbol, isAbsorbing) {
        ctx.save();
        ctx.translate(cx, cy);
        const pulse = 1 + Math.sin(time * 0.006) * 0.08 + (isAbsorbing ? 0.25 : 0);
        const r = 34 * pulse;

        ctx.strokeStyle = palette.rune;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.78;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.save();
        ctx.rotate(time * 0.0015);
        ctx.strokeStyle = palette.inner;
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 2; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.strokeRect(-r * 0.68, -r * 0.68, r * 1.36, r * 1.36);
        }
        ctx.restore();

        ctx.fillStyle = palette.core;
        ctx.shadowColor = palette.rune;
        ctx.shadowBlur = 12;
        ctx.font = 'bold 16px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol || '印', 0, 1);
        ctx.restore();
      }

      // CC0 Gothic Hero by ansimuz. See THIRD-PARTY-NOTICES.md.
      const heroImage = new Image();
      let heroReady = false;
      canvas.dataset.character = 'loading';
      heroImage.onload = () => { heroReady = true; canvas.dataset.character = 'ready'; };
      heroImage.onerror = () => { canvas.dataset.character = 'error'; };
      heroImage.src = 'assets/characters/gothic-hero.png';
      const HERO_ANIMATIONS = {"idle": {"width": 38, "height": 48, "count": 4, "pivotX": 19, "pivotY": 48, "frameMs": 130, "x": 0, "y": 0}, "run": {"width": 66, "height": 48, "count": 12, "pivotX": 33, "pivotY": 48, "frameMs": 70, "x": 0, "y": 48}, "jump": {"width": 61, "height": 77, "count": 5, "pivotX": 30, "pivotY": [76, 67, 48, 42, 60], "frameMs": 100, "x": 0, "y": 96}, "attack": {"width": 96, "height": 48, "count": 6, "pivotX": 43, "pivotY": 48, "frameMs": 130, "x": 0, "y": 173}};
      let heroAction = '';
      let heroElapsed = 0;

      function drawHeroSprite(px, py, facing, action, dt, time, palette) {
        if (action !== heroAction) {
          heroAction = action;
          heroElapsed = 0;
          canvas.dataset.animation = action;
        } else if (!reducedMotion.matches || action !== 'idle') {
          heroElapsed += dt;
        }
        canvas.dataset.facing = facing > 0 ? 'right' : 'left';
        if (!heroReady) return;
        const clip = HERO_ANIMATIONS[action];
        let frame = Math.floor(heroElapsed / clip.frameMs) % clip.count;
        if (action === 'jump') {
          frame = heroElapsed < 70 ? 0 : player.vy < -0.003 ? (heroElapsed < 170 ? 1 : 2) : player.vy <= 0.003 ? 3 : 4;
        }
        canvas.dataset.spriteFrame = String(frame);
        const pivotY = Array.isArray(clip.pivotY) ? clip.pivotY[frame] : clip.pivotY;
        const scale = 2;
        const x = Math.round(px / scale) * scale;
        const y = Math.round(py / scale) * scale;
        ctx.save();
        ctx.translate(x, y);
        if (!player.isJumping) {
          ctx.fillStyle = 'rgba(0,0,0,.5)';
          ctx.fillRect(-20, -2, 40, 4);
        }
        if (action === 'attack') {
          ctx.strokeStyle = palette.rune;
          ctx.lineWidth = 2;
          ctx.shadowColor = palette.rune;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, -42, 40 + Math.sin(time * .015) * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        ctx.scale(facing, 1);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(heroImage, clip.x + frame * clip.width, clip.y, clip.width, clip.height,
          -clip.pivotX * scale, -pivotY * scale, clip.width * scale, clip.height * scale);
        ctx.restore();
      }

      let lastTime = performance.now();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      function animate(now) {
        requestAnimationFrame(animate);
        if (document.hidden || now - lastTime < 1000 / 30) return;
        const dt = Math.min(50, now - lastTime);
        lastTime = now;
        const frameScale = dt / 16.67;
        const effectTime = reducedMotion.matches ? 0 : now;
        const W = canvas.width;
        const H = canvas.height;
        const palette = PALETTES[currentPaletteIdx];

        const moveSpeed = 0.0026 * (dt / 16.67);
        if (keys.left) {
          player.vx = -moveSpeed;
          player.facing = -1;
          player.walkFrame += 0.35 * frameScale;
        } else if (keys.right) {
          player.vx = moveSpeed;
          player.facing = 1;
          player.walkFrame += 0.35 * frameScale;
        } else if (autoFollowMouse && Math.abs(player.targetX - player.x) > 0.012) {
          const dir = Math.sign(player.targetX - player.x);
          player.vx = dir * moveSpeed * 0.85;
          player.facing = dir;
          player.walkFrame += 0.28 * frameScale;
        } else {
          player.vx = 0;
        }
        player.x = Math.max(0.08, Math.min(0.92, player.x + player.vx));

        if (player.isJumping) {
          player.y += player.vy * frameScale;
          player.vy += 0.00065 * (dt / 16.67);
          if (player.y >= FLOOR_Y) {
            player.y = FLOOR_Y;
            player.vy = 0;
            player.isJumping = false;
          }
        }

        if (player.absorbTimer > 0) {
          player.absorbTimer -= dt;
          player.isAbsorbing = true;
        } else {
          player.isAbsorbing = keys.up;
        }

        let closestIdx = -1;
        let minDist = 999;
        CANDLESTICKS.forEach((c, idx) => {
          const d = Math.abs(player.x - c.x);
          if (d < 0.105 && d < minDist) {
            minDist = d;
            closestIdx = idx;
          }
        });

        if (hoveredAltarIdx !== -1) activeAltarIdx = hoveredAltarIdx;
        else if (closestIdx !== -1) activeAltarIdx = closestIdx;

        updateFloatingPlaque(activeAltarIdx);

        ctx.clearRect(0, 0, W, H);
        if (bgLoaded) {
          ctx.drawImage(bgImg, 0, 0, W, H);
        } else {
          ctx.fillStyle = '#0b0e15';
          ctx.fillRect(0, 0, W, H);
        }

        dustMotes.forEach(m => {
          if (!reducedMotion.matches) {
            m.x += (m.vx + Math.sin(now * 0.001 + m.phase) * 0.0001) * frameScale;
            m.y += m.vy * frameScale;
          }
          if (m.y < 0.05) { m.y = 0.88; m.x = Math.random(); }
          ctx.fillStyle = `rgba(180, 215, 255, ${m.alpha * (0.6 + 0.4 * Math.sin(effectTime * 0.003 + m.phase))})`;
          ctx.fillRect(Math.round(m.x * W), Math.round(m.y * H), m.size, m.size);
        });

        AMBIENT_PILLAR_FLAMES.forEach(f => drawPixelFlame(f.x * W, f.y * H, f.size, effectTime, false, palette));

        CANDLESTICKS.forEach((altar, idx) => {
          const isResonant = (idx === activeAltarIdx);
          const tb = altar.tableBounds;
          if (isResonant) {
            const cx = altar.x * W, cy = altar.y * H;
            const aura = ctx.createRadialGradient(cx, cy, 12, cx, cy, 155);
            aura.addColorStop(0, palette.glow);
            aura.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(cx, cy, 155, 0, Math.PI * 2);
            ctx.fill();

            if (!reducedMotion.matches && Math.random() < 0.45) {
              const rf = altar.flames[Math.floor(Math.random() * altar.flames.length)];
              spawnGlyphSpark(rf.x, rf.y - 0.01, palette.rune, 1);
            }
            drawEcclesiaGlyphSeal(altar.x * W, (tb.y0 - 0.045) * H + Math.sin(effectTime * 0.004) * 5, effectTime, palette, altar.glyphSymbol, player.isAbsorbing);
          }

          altar.flames.forEach(f => drawPixelFlame(f.x * W, f.y * H, f.size, effectTime, isResonant, palette));
        });

        for (let i = glyphSparks.length - 1; i >= 0; i--) {
          const sp = glyphSparks[i];
          sp.x += sp.vx * frameScale;
          sp.y += sp.vy * frameScale;
          sp.life -= sp.decay * frameScale;
          if (sp.life <= 0) { glyphSparks.splice(i, 1); continue; }
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.life);
          ctx.fillRect(Math.round(sp.x * W), Math.round(sp.y * H), sp.size, sp.size);
        }
        ctx.globalAlpha = 1.0;

        const action = player.isAbsorbing ? 'attack' : player.isJumping ? 'jump' : player.vx !== 0 ? 'run' : 'idle';
        drawHeroSprite(player.x * W, player.y * H, player.facing, action, dt, effectTime, palette);
      }

      function getNormCoords(evt) {
        const rect = canvas.getBoundingClientRect();
        const cx = evt.touches ? evt.touches[0].clientX : evt.clientX;
        const cy = evt.touches ? evt.touches[0].clientY : evt.clientY;
        return {
          x: Math.max(0, Math.min(1, (cx - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (cy - rect.top) / rect.height))
        };
      }

      function findAltarAt(nx, ny) {
        for (let i = 0; i < CANDLESTICKS.length; i++) {
          const b = CANDLESTICKS[i].tableBounds;
          if (nx >= b.x0 - 0.02 && nx <= b.x1 + 0.02 && ny >= b.y0 - 0.08 && ny <= b.y1 + 0.05) return i;
        }
        return -1;
      }

      canvas.addEventListener('mousemove', function(evt) {
        const pt = getNormCoords(evt);
        if (autoFollowMouse) player.targetX = pt.x;
        const hit = findAltarAt(pt.x, pt.y);
        if (hit !== hoveredAltarIdx) {
          hoveredAltarIdx = hit;
          canvas.style.cursor = hit !== -1 ? 'pointer' : 'crosshair';
          if (hit !== -1) {
            playGlyphChime();
            spawnGlyphSpark(CANDLESTICKS[hit].x, CANDLESTICKS[hit].y, PALETTES[currentPaletteIdx].rune, 8);
          }
        }
      });

      canvas.addEventListener('click', function(evt) {
        canvas.focus({preventScroll: true});
        const pt = getNormCoords(evt);
        const hit = findAltarAt(pt.x, pt.y);
        if (hit !== -1) {
          navigateToCandlestickProject(CANDLESTICKS[hit]);
        } else {
          player.targetX = pt.x;
        }
      });

      function setAutoFollow(enabled) {
        autoFollowMouse = enabled;
        followControl.checked = enabled;
        if (!enabled) hoveredAltarIdx = -1;
      }
      function resetKeys() {
        keys.left = keys.right = keys.up = false;
      }
      function jump() {
        if (!player.isJumping) { player.isJumping = true; player.vy = -0.0115; }
      }
      canvas.addEventListener('mouseleave', () => { hoveredAltarIdx = -1; });
      canvas.addEventListener('keydown', function(evt) {
        if (evt.altKey || evt.ctrlKey || evt.metaKey) return;
        const key = evt.key.toLowerCase();
        if (!['arrowleft', 'arrowright', 'arrowup', 'a', 'd', 'w', ' ', 'r', 'enter'].includes(key)) return;
        evt.preventDefault();
        if (key === 'arrowleft' || key === 'a') { keys.left = true; setAutoFollow(false); }
        else if (key === 'arrowright' || key === 'd') { keys.right = true; setAutoFollow(false); }
        else if (key === 'w' || key === ' ') { if (!evt.repeat) jump(); }
        else if (key === 'arrowup' || key === 'r') { keys.up = true; player.absorbTimer = 500; }
        else if (key === 'enter' && !evt.repeat && activeAltarIdx !== -1) navigateToCandlestickProject(CANDLESTICKS[activeAltarIdx]);
      });
      window.addEventListener('keyup', function(evt) {
        const key = evt.key.toLowerCase();
        if (key === 'arrowleft' || key === 'a') keys.left = false;
        if (key === 'arrowright' || key === 'd') keys.right = false;
        if (key === 'arrowup' || key === 'r') keys.up = false;
      });
      canvas.addEventListener('blur', resetKeys);
      window.addEventListener('blur', resetKeys);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          resetKeys();
          if (audioCtx) audioCtx.suspend();
        } else {
          lastTime = performance.now();
          if (audioEnabled && audioCtx) audioCtx.resume();
        }
      });

      document.getElementById('btn-palette-toggle').addEventListener('click', function() {
        currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length;
        document.getElementById('palette-label').textContent = PALETTES[currentPaletteIdx].name;
        playGlyphChime();
      });

      document.getElementById('btn-audio-toggle').addEventListener('click', function() {
        initAudio();
        if (!audioCtx) return;
        audioEnabled = !audioEnabled;
        this.setAttribute('aria-pressed', String(audioEnabled));
        document.getElementById('audio-icon').textContent = audioEnabled ? '🔊' : '🔇';
        document.getElementById('audio-label').textContent = audioEnabled ? '古琴奏鸣' : '密室古琴';
        if (audioEnabled) {
          playGlyphChime();
          bgmInterval = setInterval(() => {
            if (!audioEnabled || !audioCtx || audioCtx.state !== 'running') return;
            const freq = BAROQUE_NOTES[bgmStep++ % BAROQUE_NOTES.length];
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.03, now + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.32);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.34);
          }, 260);
        } else if (bgmInterval) {
          clearInterval(bgmInterval);
          bgmInterval = null;
        }
      });

      document.getElementById('chk-auto-follow').addEventListener('change', function(e) {
        setAutoFollow(e.target.checked);
      });

      document.getElementById('btn-absorb-glyph').addEventListener('click', function() {
        player.absorbTimer = 900;
        playGlyphChime();
      });

      function bindDirection(id, direction) {
        const button = document.getElementById(id);
        let pointerStart = null;
        button.addEventListener('pointerdown', event => {
          if (event.button !== 0) return;
          setAutoFollow(false);
          pointerStart = player.x;
          keys[direction] = true;
          button.setPointerCapture(event.pointerId);
        });
        function release() {
          keys[direction] = false;
          if (pointerStart !== null && Math.abs(player.x - pointerStart) < 0.01) {
            player.x = Math.max(0.08, Math.min(0.92, player.x + (direction === 'left' ? -0.025 : 0.025)));
          }
          pointerStart = null;
        }
        button.addEventListener('pointerup', release);
        button.addEventListener('pointercancel', () => { keys[direction] = false; pointerStart = null; });
        button.addEventListener('lostpointercapture', () => { keys[direction] = false; });
        button.addEventListener('click', event => {
          if (event.detail === 0) {
            setAutoFollow(false);
            player.x = Math.max(0.08, Math.min(0.92, player.x + (direction === 'left' ? -0.04 : 0.04)));
          }
        });
      }
      bindDirection('ctrl-left', 'left');
      bindDirection('ctrl-right', 'right');
      document.getElementById('ctrl-jump').addEventListener('click', jump);
      document.getElementById('ctrl-enter').addEventListener('click', () => {
        if (activeAltarIdx !== -1) navigateToCandlestickProject(CANDLESTICKS[activeAltarIdx]);
      });

      // 初始化快捷按钮与下方图鉴卡片
      const pillsWrap = document.getElementById('altar-quick-pills');
      const gridWrap = document.getElementById('grimoire-grid');
      CANDLESTICKS.forEach((item, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'ecclesia-btn';
        pill.textContent = `🕯️ 0${idx + 1} ${item.title}`;
        pill.setAttribute('aria-pressed', String(idx === activeAltarIdx));
        pill.addEventListener('click', () => {
          activeAltarIdx = idx;
          hoveredAltarIdx = -1;
          player.targetX = item.x;
          player.x = item.x;
          updateFloatingPlaque(idx);
        });
        pillsWrap.appendChild(pill);

        const card = document.createElement('article');
        card.className = 'grimoire-card work-entry';
        card.innerHTML = `
          <div>
            <div class="work-number">${item.number}</div>
            <div class="post-meta"><span>${item.category}</span><span>${item.glyphName}</span></div>
            <h2>🕯️ ${item.title}</h2>
            <p>${item.desc}</p>
            <div class="work-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
          </div>
          <a class="aside-link" href="${item.href}" ${item.external ? 'target="_blank" rel="noreferrer"' : ''}>${item.linkText}<span>↗</span></a>
        `;
        card.addEventListener('click', (e) => {
          if (e.target.closest('a')) return;
          activeAltarIdx = idx;
          hoveredAltarIdx = -1;
          player.targetX = item.x;
          player.x = item.x;
          updateFloatingPlaque(idx);
          document.getElementById('chamber-viewport').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
        });
        gridWrap.appendChild(card);
      });

      updateFloatingPlaque(0);
      requestAnimationFrame(animate);
    })();

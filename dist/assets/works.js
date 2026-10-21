    (function() {
      'use strict';

      // 背景图路径（部署时放置于 dist/assets/ecclesia-chamber-bg.jpg）
      const CHAMBER_BG_SRC = 'assets/ecclesia-chamber-bg.jpg';

      // 密室桌台上的烛台项目配置（可在此直接增改你的项目、说明与跳转链接）
      const CANDLESTICKS = [
        {
          id: 'altar-01',
          glyphSymbol: '巡',
          category: '机器人',
          title: '智慧社区',
          desc: 'ROS 巡检导航与视觉识别。',
          href: 'https://github.com/Lanceashire/smart-community-',
          linkText: '查看源码',
          external: true,
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
          glyphSymbol: '知',
          category: '笔记应用',
          title: 'NeuroNotes',
          desc: '知识图谱式笔记应用。',
          href: 'https://github.com/Lanceashire/neuro-notes',
          linkText: '查看源码',
          external: true,
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
          glyphSymbol: '账',
          category: 'Android 应用',
          title: '记账星',
          desc: '加工记账与 Excel 导出。',
          href: 'https://github.com/Lanceashire/garment-accounting',
          linkText: '查看源码',
          external: true,
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
          glyphSymbol: '印',
          category: '网站',
          title: '夜之手记',
          desc: '像素哥特风格的个人博客。',
          href: 'https://github.com/Lanceashire/jiezichuan-s-blog',
          linkText: '查看源码',
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

      const PALETTE = {core:'#ffffff',inner:'#7ef9ff',outer:'#2b7de9',glow:'rgba(92,225,230,.3)',rune:'#5ce1e6'};

      const canvas = document.getElementById('chamber-canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const projectLinks = [...document.querySelectorAll('[data-work]')];

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
      const ALTAR_ACTIVATION_RADIUS = 0.16;


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

      // 烛台原生链接和回车均打开对应 GitHub 作品。
      function navigateToCandlestickProject(item) {

        if (item.external) {
          window.open(item.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = item.href;
        }
      }

      function selectWork(idx, move = true) {
        if (!CANDLESTICKS[idx]) return;
        activeAltarIdx = idx;
        const item = CANDLESTICKS[idx];
        projectLinks.forEach((link, i) => { link.dataset.selected = String(i === idx); });
        canvas.dataset.activeAltar = item.id;
        const fragment = idx === 0 ? location.pathname + location.search : '#' + item.id;
        if (location.hash !== (idx === 0 ? '' : '#' + item.id)) history.replaceState(null, '', fragment);
        canvas.setAttribute('aria-label', `密室场景，当前作品：${item.title}。点击烛台或按回车打开 GitHub 作品。`);
        if (move) { resetKeys(); autoFollowMouse = true; player.targetX = item.x; }
      }

      function updateActiveAltarFromPlayer() {
        let nearestIdx = -1;
        let nearestDistance = Infinity;
        CANDLESTICKS.forEach((item, idx) => {
          const distance = Math.abs(player.x - item.x);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIdx = idx;
          }
        });
        if (nearestDistance > ALTAR_ACTIVATION_RADIUS || nearestIdx === activeAltarIdx) return;
        selectWork(nearestIdx, false);
      }

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
        ctx.font = '16px Zpix, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol || '印', 0, 1);
        ctx.restore();
      }

      // User-supplied Shanoa sprite sheet. See THIRD-PARTY-NOTICES.md.
      const heroImage = new Image();
      let heroReady = false;
      canvas.dataset.character = 'loading';
      heroImage.onload = () => { heroReady = true; canvas.dataset.character = 'shanoa-ready'; };
      heroImage.onerror = () => { canvas.dataset.character = 'shanoa-error'; };
      heroImage.src = 'assets/characters/shanoa.png';
      const HERO_ANIMATIONS = {"idle": {"width": 96, "height": 64, "count": 6, "pivotX": 48, "pivotY": 60, "frameMs": 180, "x": 0, "y": 0}, "run": {"width": 96, "height": 64, "count": 5, "pivotX": 48, "pivotY": 60, "frameMs": 60, "x": 0, "y": 64}, "jump": {"width": 96, "height": 64, "count": 6, "pivotX": 48, "pivotY": 60, "frameMs": 100, "x": 0, "y": 128}, "attack": {"width": 96, "height": 64, "count": 6, "pivotX": 48, "pivotY": 60, "frameMs": 110, "x": 0, "y": 192}};
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
        const scale = 3;
        const x = Math.round(px / scale) * scale;
        const y = Math.round(py / scale) * scale;
        ctx.save();
        ctx.translate(x, y);
        if (!player.isJumping) {
          ctx.fillStyle = 'rgba(0,0,0,.5)';
          ctx.fillRect(-32, -2, 64, 4);
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
        const palette = PALETTE;

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
        updateActiveAltarFromPlayer();

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
          const isResonant = (idx === activeAltarIdx || idx === hoveredAltarIdx);
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
        const hit = findAltarAt(pt.x, pt.y);
        if (hit !== hoveredAltarIdx) {
          hoveredAltarIdx = hit;
          canvas.style.cursor = hit !== -1 ? 'pointer' : 'crosshair';
          if (hit !== -1) {

            spawnGlyphSpark(CANDLESTICKS[hit].x, CANDLESTICKS[hit].y, PALETTE.rune, 8);
          }
        }
      });

      canvas.addEventListener('click', function(evt) {
        canvas.focus({preventScroll: true});
        const pt = getNormCoords(evt);
        const hit = findAltarAt(pt.x, pt.y);
        if (hit !== -1) {
          selectWork(hit);
          navigateToCandlestickProject(CANDLESTICKS[hit]);
        } else {
          autoFollowMouse = true;
          player.targetX = pt.x;
        }
      });

      function setAutoFollow(enabled) {
        autoFollowMouse = enabled;
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
        } else {
          lastTime = performance.now();
        }
      });

      document.getElementById('ctrl-attack').addEventListener('click', () => { player.absorbTimer = 780; });

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
      const tooltip = document.getElementById('work-tooltip');
      let tooltipIndex = -1;
      let touchPreview = -1;
      const projectDetails = [["机器人 · ROS / Gazebo", "巡检导航、地图构建与视觉识别。"], ["应用 · 知识图谱", "把笔记与知识点连接成图谱。"], ["应用 · Android", "加工记账、金额统计与 Excel 导出。"], ["网站 · 个人博客", "代码、随笔与收藏，留在月夜里。"]];
      function hideProjectInfo() {
        tooltip.hidden = true;
        tooltipIndex = -1;
        hoveredAltarIdx = -1;
        projectLinks.forEach(link => link.removeAttribute('aria-describedby'));
      }
      function showProjectInfo(idx) {
        const item = CANDLESTICKS[idx];
        tooltip.querySelector('.tooltip-category').textContent = projectDetails[idx][0];
        tooltip.querySelector('.tooltip-title').textContent = item.title;
        tooltip.querySelector('.tooltip-description').textContent = projectDetails[idx][1];
        tooltip.hidden = false;
        tooltipIndex = hoveredAltarIdx = idx;
        projectLinks.forEach((link, i) => {
          if (i === idx) link.setAttribute('aria-describedby', 'work-tooltip');
          else link.removeAttribute('aria-describedby');
        });
        const scene = canvas.parentElement.getBoundingClientRect();
        const anchor = projectLinks[idx].getBoundingClientRect();
        const box = tooltip.getBoundingClientRect();
        const left = Math.max(12, Math.min(scene.width - box.width - 12, anchor.left - scene.left + anchor.width / 2 - box.width / 2));
        const top = Math.max(10, anchor.top - scene.top - box.height - 14);
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      }
      projectLinks.forEach((link, idx) => {
        link.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') showProjectInfo(idx); });
        link.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') hideProjectInfo(); });
        link.addEventListener('focus', () => { selectWork(idx, false); showProjectInfo(idx); });
        link.addEventListener('blur', hideProjectInfo);
        link.addEventListener('pointerdown', event => {
          if (event.pointerType === 'touch' && touchPreview !== idx) {
            touchPreview = idx;
            link.dataset.previewOnly = 'true';
            showProjectInfo(idx);
          }
        });
        link.addEventListener('click', event => {
          if (link.dataset.previewOnly) { event.preventDefault(); delete link.dataset.previewOnly; return; }
          selectWork(idx);
        });
      });
      document.addEventListener('pointerdown', event => {
        if (!event.target.closest('.chamber-project')) { touchPreview = -1; hideProjectInfo(); }
      });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') { touchPreview = -1; hideProjectInfo(); } });
      window.addEventListener('resize', () => { if (tooltipIndex !== -1) showProjectInfo(tooltipIndex); });
      document.querySelector('.works-help').addEventListener('toggle', resetKeys);
      const initialWork = CANDLESTICKS.findIndex(item => '#' + item.id === location.hash);
      selectWork(Math.max(0, initialWork), false);
      player.x = player.targetX = CANDLESTICKS[activeAltarIdx].x;
      updateActiveAltarFromPlayer();
      requestAnimationFrame(animate);
    })();

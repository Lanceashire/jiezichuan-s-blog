# 夜之手记 · Lanceashire

像素哥特风格的个人博客，使用原生 HTML、CSS 和 JavaScript。

- 月夜城堡视频背景
- 文章目录、分类与搜索
- 作品、收藏与作者页面
- 在线音乐浮窗

## 本地预览

需要 Python 3。在仓库根目录运行：

```sh
python3 -m http.server 4173 --directory dist
```

访问 http://localhost:4173 。`dist/` 可直接部署到静态网站托管服务，无需安装依赖或构建。

## 文件

- `dist/index.html`：首页
- `dist/archive.html`：Blog
- `dist/works.html`、`dist/collect.html`、`dist/about.html`：作品、收藏、作者
- `dist/assets/style.css`：页面样式
- `dist/assets/library.css`、`dist/assets/library.js`：文章目录与搜索
- `dist/assets/works.css`、`dist/assets/works.js`：Works 密室布局、烛台项目与角色交互
- `dist/assets/ambient.js`：视频播放控制
- `dist/assets/music.js`、`dist/assets/music.css`：音乐控件、进度与音量交互、尖拱玫瑰窗主题
- `.openai/hosting.json`：当前 Sites 托管配置

## 资源

资源来源见 [ASSET-NOTES.txt](ASSET-NOTES.txt)。音乐使用[明月浩空](https://myhkw.cn/)官方公共在线歌单，播放依赖该服务。字体为 [Zpix](https://github.com/SolidZORO/zpix-pixel-font)。

## Works 密室

四处烛台分别链接到公开 GitHub 仓库：智慧社区、NeuroNotes、记账星、夜之手记。鼠标指向烛台或键盘聚焦时浮现项目说明框，移开、失焦或按 Escape 收起；点击在新标签页打开仓库。触屏首次轻触预览，再次轻触打开；无 JavaScript 时原生链接仍可使用。`dist/assets/works.js` 中的 `CANDLESTICKS` 与 `dist/works.html` 中的烛台链接应同步维护。点击空地移动角色，展开「角色操作」可使用方向、跳跃和挥剑按钮；键盘 A / D 移动、W 跳跃、R 挥剑、回车打开当前作品。

Works 人物采用用户提供的《恶魔城：被夺走的刻印》夏诺雅精灵表，含待机、奔跑、跳跃和攻击反馈，并以 3× 整数倍保持像素清晰度。来源与权利说明见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。重新生成人物图集可运行 `python3 scripts/build-works-shanoa.py`（需要 Pillow）；网站运行无需构建或安装依赖。

## 自定义歌单

当前使用官方公用 `demo` 歌单。申请自己的明月浩空播放器后，只需修改 `dist/assets/music-config.js` 的 `playerId`。完整步骤与操作说明见 [自定义音乐歌单](docs/music-playlist.md)。

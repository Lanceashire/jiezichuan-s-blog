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
- `dist/assets/music.js`：音乐控件键盘支持
- `.openai/hosting.json`：当前 Sites 托管配置

## 资源

资源来源见 [ASSET-NOTES.txt](ASSET-NOTES.txt)。音乐使用[明月浩空](https://myhkw.cn/)官方公共在线歌单，播放依赖该服务。字体为 [Zpix](https://github.com/SolidZORO/zpix-pixel-font)。

## Works 密室

`dist/assets/works.js` 中的 `CANDLESTICKS` 配置作品标题、简介和链接。点击烛台或目录选择作品，使用详情链接打开；选择时角色会走向对应烛台，悬停和角色移动不会更换选择。点击空地可移动角色，展开「角色操作」可使用方向、跳跃和挥剑按钮；键盘 A / D 移动、W 跳跃、R 挥剑、回车打开当前作品。

Works 人物采用 ansimuz 的 CC0 Gothic Hero 逐帧精灵，含站立、奔跑、跳跃和刻印攻击反馈。许可与来源见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。重新打包人物图集可运行 `python3 scripts/build-works-character.py`（需要 Pillow）；网站运行无需构建或安装依赖。

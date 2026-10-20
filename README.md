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
- `dist/assets/ambient.js`：视频播放控制
- `dist/assets/music.js`：音乐控件键盘支持
- `.openai/hosting.json`：当前 Sites 托管配置

## 资源

资源来源见 [ASSET-NOTES.txt](ASSET-NOTES.txt)。音乐使用[明月浩空](https://myhkw.cn/)官方公共在线歌单，播放依赖该服务。字体为 [Zpix](https://github.com/SolidZORO/zpix-pixel-font)。

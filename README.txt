Lanceashire · 夜之手记 / 月夜城堡视频背景版

预览：python -m http.server 4173 --directory dist
打开 http://localhost:4173

首页：dist/index.html
背景视频：dist/assets/moonlit-castle.mp4
静态封面：dist/assets/moonlit-castle-poster.png
播放控制：dist/assets/ambient.js
样式：dist/assets/style.css

背景使用用户提供的 castlevania_moonlit_blue_gothic_bg(7).mp4。
1376×768，15 fps，8 秒，无音轨；仅无损调整 MP4 加载顺序，未重新绘制或生成画面。
首页自动静音循环，支持暂停、系统减少动态偏好、离开视口与后台暂停。

文章、作者与三篇简短手记；GitHub 头像作为个人头像。

页面结构：Home 首页（视频封面与最近更新）、Blog 文章（站点 / 技术 / 折腾 / 随笔）、Works 作品、Collect 收藏（工具 / 文档 / 灵感）、Author 作者。
站点更新记录：dist/site-notes.html；收藏：dist/collect.html；作品：dist/works.html。
导航使用静态链接，不增加特效或前端框架。

页面文案已精简为短标题和简要说明，删除初稿、示例与开发进度提示。

Blog 采用目录式三栏：左侧分类目录，中间主题总览与文章，右侧页内导航。支持关键词搜索、分类、排序与手机目录。
样式：dist/assets/library.css；交互：dist/assets/library.js。

音乐：所有页面接入明月浩空官方浮窗播放器（https://myhkw.cn/）。默认使用官方免注册公共歌单 demo，点击播放，支持歌单、切歌与播放记忆。若需要专属歌单，使用官方控制台生成的播放器地址与 key 替换底部 myhk 脚本配置。

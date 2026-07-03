# episode1 — 第 1 集演示页

视频第 1 集《一个人管四十个项目，靠的不是记性》的录屏演示页（键盘步进式幻灯片）。内容策划归 `~/OpenSource/projects/content/ai-video/episodes/01-工作区配置/`（讲稿），本仓库只管页面本身。

## 技术栈

- Vite 6 + React 19 + TypeScript + Tailwind CSS v4（`@tailwindcss/vite`）
- 动画：`motion`（Framer Motion v12），全部由 `step` 状态驱动、可回退
- 单文件组件：`src/components/Presentation.tsx`（11 页幻灯片 + slides registry）

## 开发命令

```bash
npm install
npm run dev     # dev server @ :3000（工作区 launch.json 里用 :3199 跑）
npm run lint    # tsc --noEmit
npm run build   # 产物在 dist/，base './'（适配 GitHub Pages）
```

## 关键约定

- **step 驱动动画**：所有入场用 `animate`（非一次性 initial），保证 ← 回退无残留；打字机在 step 越过后直接显示终态
- **不用 AnimatePresence**：换页用 keyed remount（`key={currentIndex}`）。曾用 `mode="wait"` 在隐藏标签页/rAF 停帧时会卡死换页，勿加回
- **不用 StrictMode**：已从 main.tsx 移除（与动画库配合问题）
- **URL hash 定位**：`#4-2` = 第 4 页第 2 步，录制补录用；新增页面后 slides registry 的 `steps` 数必须与页内最大 `showAt`+1 一致
- 视觉体系：米白 `#FAF9F5` / 墨 `#1F1E1D` / 橘 `#D97757`，Anthropic 极简风，不加花哨特效

## 首次运行记录（2026-07-03）

- `npm install` 后 `npm run dev` 直接跑通，无需环境变量（`.env.example` 是 AI Studio 导出残留，页面不用 Gemini API）
- 工作区级 dev server：`.claude/launch.json`（根工作区）里配置为 `npm --prefix projects/web/episode1 run dev -- --port 3199 --strictPort`

## 首次发布记录（2026-07-03）

- **GitHub 仓库**：https://github.com/Oldcircle/episode1（public）
- **本地 = 仓库根**：`~/OpenSource/projects/web/episode1`（独立 .git，嵌套于 OpenSource 工作区）
- **在线页面**：https://oldcircle.github.io/episode1/（GitHub Pages，源 = `gh-pages` 分支根目录）
- **发布方式**：`npm run build && npx gh-pages -d dist`；源码 `git push origin main`
- vite `base: './'` 必须保留，否则 Pages 子路径下资源 404

## 活跃文档

| 文档 | 用途 |
|------|------|
| [README.md](./README.md) | 操作说明 + 部署方式 |
| 讲稿（外部） | `~/OpenSource/projects/content/ai-video/episodes/01-工作区配置/脚本.md` |

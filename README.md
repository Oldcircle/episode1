# 第 1 集 · 刚开始用 AI 编程助手？这个视频让你少走三个月弯路

AI 协作工作区组织方法的演示页（视频第 1 集录屏素材）。键盘步进式幻灯片，11 页，覆盖：组织层 / 规则层（AGENTS.md 渐进式加载）/ 记忆层 / 上下文 token 累积机制 / 「全套打包成一个 skill」的 CTA。

**在线访问**：https://oldcircle.github.io/episode1/

## 操作

- `→` / `空格`：下一步（页内动画逐步播放）
- `←`：上一步
- URL hash 直达：`/#4` 第 4 页，`/#4-2` 第 4 页第 2 步（补录时从任意画面开始）

## 本地运行

```bash
npm install
npm run dev   # http://localhost:3000
```

## 技术栈

Vite 6 + React 19 + Tailwind CSS v4 + motion（Framer Motion）。全部内容在 `src/components/Presentation.tsx`。

## 部署

```bash
npm run build
npx gh-pages -d dist   # 发布到 gh-pages 分支 → GitHub Pages
```

## 配套

- 全套方法打包成 skill `ai-workspace`（+ 配套 onboard / dev-init）：https://github.com/Oldcircle/workspace-setup
- 装上 skill，agent 直接内建三层工作区法；仓库同时含 `setup.sh` 一键铺环境

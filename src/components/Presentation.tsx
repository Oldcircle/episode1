import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

// Motif Icon
const Spark = ({ className = "w-6 h-6", style }: { className?: string, style?: any }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 1C12 7.07513 16.9249 12 23 12C16.9249 12 12 16.9249 12 23C12 16.9249 7.07513 12 1 12C7.07513 12 12 7.07513 12 1Z" />
  </svg>
);

// Helpers for animations
const FadeIn = ({ step, showAt, children, className = "", delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= showAt ? 1 : 0, y: step >= showAt ? 0 : 10 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: step >= showAt ? delay : 0 }}
    className={className}
  >
    {children}
  </motion.div>
);

const TerminalTypewriter = ({ text, step, showAt, speed = 0.015, className = "", prompt = "" }: any) => {
  if (step < showAt) return null;
  const skipAnim = step > showAt;

  return (
    <div className={className}>
      {prompt && <span className="text-[#D97757] mr-2">{prompt}</span>}
      {text.split('').map((char: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: skipAnim ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0, delay: skipAnim ? 0 : i * speed }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
};

// rAF number tween — deterministic, replays cleanly on step navigation
const useTweenNumber = (target: number, duration = 650) => {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    if (from === target) { setVal(target); return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); fromRef.current = target; };
  }, [target, duration]);
  return val;
};

const SlideLayout = ({ title, children, icon = true }: { title: string, children: React.ReactNode, icon?: boolean }) => (
  <div className="h-full w-full max-w-5xl flex flex-col justify-center">
    <motion.h2
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl md:text-3xl font-medium text-[#1F1E1D] mb-8 tracking-tight flex items-center gap-3"
    >
      {icon && <Spark className="w-5 h-5 text-[#D97757]" />}
      {title}
    </motion.h2>
    <div className="w-full relative z-10 flex-1 flex flex-col justify-center">
      {children}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Slide 1 · 标题（对齐讲稿定位）
// ---------------------------------------------------------------------------
const Slide1 = () => (
  <div className="flex flex-col justify-center h-full max-w-4xl relative z-10">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute -right-20 -top-20 z-0 pointer-events-none"
    >
      <Spark className="w-[500px] h-[500px] text-[#D97757]" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-sm font-mono text-[#D97757] mb-6 tracking-widest relative z-10"
    >
      EP.01 · 为 AI 协作组织工作区
    </motion.div>

    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1F1E1D] mb-8 leading-snug relative z-10">
      刚开始用 AI 编程助手？<br/>这个视频让你少走三个月弯路
    </h1>
    <p className="text-lg md:text-xl text-[#1F1E1D]/70 leading-relaxed max-w-2xl relative z-10">
      我一个人同时维护四十来个项目，靠的不是记性 ——<br/>
      该记的，全从脑子里、从对话里，挪进了文件。
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// Slide 2 · 冷开场终端
// ---------------------------------------------------------------------------
const Slide2 = ({ step }: { step: number }) => (
  <SlideLayout title="冷开场：无需回忆，直接接手" icon={false}>
    <div className="bg-[#1A1918] rounded-xl p-6 font-mono text-[13px] md:text-sm text-gray-300 shadow-2xl overflow-hidden border border-[#1F1E1D]/20 min-h-[380px] max-w-4xl relative">
      <div className="flex gap-2 mb-4 pb-4 border-b border-gray-700/50">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
      </div>
      <div className="space-y-3 leading-relaxed">
        <TerminalTypewriter prompt="~/OpenSource/projects/ai/paper-translator $" text="agent" step={step} showAt={0} />
        <FadeIn step={step} showAt={1}>
          <p><span className="text-purple-400">Agent:</span> 读取 AGENTS.md、STATUS.md …</p>
        </FadeIn>

        <div className="pl-4 border-l-2 border-emerald-500/30 my-3 py-1 text-gray-400 min-h-[70px]">
          <TerminalTypewriter text="STATUS.md" step={step} showAt={2} speed={0.02} className="text-emerald-400/80" />
          <TerminalTypewriter text="├ 当前进度：Phase 2 完成 —— PDF 解析 + 分段翻译已跑通" step={step} showAt={3} speed={0.02} />
          <TerminalTypewriter text="└ 下次入口：填 DeepSeek key，跑一篇真实论文验证端到端" step={step} showAt={4} speed={0.02} />
        </div>

        <FadeIn step={step} showAt={5}>
          <p><span className="text-purple-400">Agent:</span> 上次停在 Phase 2，下一步是端到端验证。</p>
          <p className="ml-16 text-gray-300">.env.local 里 key 还是空的 —— 要我带你配好、</p>
          <p className="ml-16 text-gray-300">然后跑一篇 PDF 试试吗？</p>
          <p className="mt-4"><span className="text-[#D97757]">❯</span> <span className="animate-pulse font-bold text-white">_</span></p>
        </FadeIn>
      </div>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 3 · 三层总览
// ---------------------------------------------------------------------------
const Slide3 = ({ step }: { step: number }) => (
  <SlideLayout title="为 AI 协作组织工作区" icon={false}>
    <FadeIn step={step} showAt={0}>
      <p className="text-[#1F1E1D]/70 text-base md:text-lg max-w-3xl mb-10">
        整个目录只为一个目标：<strong className="text-[#1F1E1D]">不管哪个 AI、隔了多久、进哪个项目，都能马上进入状态、自己干活。</strong>
      </p>
    </FadeIn>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      <FadeIn step={step} showAt={1} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-emerald-500"/> ① 组织层</div>
        <div className="text-[#1F1E1D]/60 text-sm">项目分类，权限分明</div>
        <div className="mt-3 text-xs font-mono text-emerald-700/70">目录给身份</div>
      </FadeIn>
      <FadeIn step={step} showAt={2} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-purple-500"/> ② 规则层</div>
        <div className="text-[#1F1E1D]/60 text-sm">渐进式加载，一进来就懂规矩</div>
        <div className="mt-3 text-xs font-mono text-purple-700/70">规则给边界</div>
      </FadeIn>
      <FadeIn step={step} showAt={3} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-[#D97757]"/> ③ 记忆层</div>
        <div className="text-[#1F1E1D]/60 text-sm">按需拉取，接住每次进度</div>
        <div className="mt-3 text-xs font-mono text-[#D97757]/80">记忆给连续性</div>
      </FadeIn>
    </div>

    <div className="max-w-5xl mt-8">
      <div className="relative h-[3px] rounded-full bg-[#1F1E1D]/5 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: step >= 4 ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-purple-400 to-[#D97757]"
        />
      </div>
      <FadeIn step={step} showAt={4} delay={0.5}>
        <p className="mt-5 text-center text-[#1F1E1D]/70 font-medium">
          目录给身份 <span className="text-[#D97757] mx-1">→</span> 规则给边界 <span className="text-[#D97757] mx-1">→</span> 记忆给连续性
          <span className="block mt-1 text-sm text-[#1F1E1D]/40 font-normal">一句话：该记的，全在文件里，不在脑子里、不在对话里。</span>
        </p>
      </FadeIn>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 4 · ① 组织层
// ---------------------------------------------------------------------------
const INDEX_ROWS = [
  ['Fable', 'projects/ai/fable', '活跃开发 · Phase 5'],
  ['paper-translator', 'projects/ai/paper-translator', 'MVP 完成 · 待验证'],
  ['ragflow', 'forks/ragflow', 'fork · 活跃分支 feat/agent-v2'],
];

const Slide4 = ({ step }: { step: number }) => (
  <SlideLayout title="① 组织层：项目分得清身份">
    <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-5xl">
      <div className="flex-1 bg-white p-4 rounded-2xl border border-rose-100 shadow-sm font-mono text-[12px] transition-opacity duration-500 relative overflow-hidden" style={{ opacity: step >= 1 ? 0.35 : 1 }}>
        <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
        <div className="text-rose-600 font-sans font-medium mb-2 flex items-center gap-2">
          <Spark className="w-4 h-4 opacity-50" /> Before: 全堆一块
        </div>
        <div className="text-[#1F1E1D]/40 mb-1">~/Workspace</div>
        <div className="pl-4 space-y-1 border-l-[1.5px] border-[#1F1E1D]/10 ml-1.5 text-[#1F1E1D]/70">
          <div>├── my-app/</div>
          <div>├── some-open-source-fork/</div>
          <div>├── learning-project/</div>
          <div>├── notes-vault/</div>
          <div>└── old-demo/</div>
        </div>
        <p className="mt-3 text-rose-700/80 font-sans text-xs bg-rose-50 p-2 rounded-lg border border-rose-100">
          三个月后分不清哪个能改，AI 也会误改参考项目。
        </p>
      </div>

      <FadeIn step={step} showAt={1} className="flex-[1.25] bg-white p-4 rounded-2xl border border-emerald-200 shadow-md font-mono text-[12px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Spark className="w-24 h-24 text-emerald-600"/></div>
        <div className="text-emerald-700 font-sans font-medium mb-2 relative z-10 flex items-center gap-2">
          <Spark className="w-4 h-4" /> After: 身份分明，AI 知分寸
        </div>
        <div className="text-[#1F1E1D]/40 mb-1 relative z-10">~/OpenSource</div>
        <div className="pl-4 space-y-1 border-l-[1.5px] border-[#1F1E1D]/10 ml-1.5 relative z-10">
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">├── projects/</span> <span className="text-emerald-600/80 ml-1 font-sans text-[11px]"># 原创（全权改）</span></div>
          <div className="pl-6 text-[#1F1E1D]/50 text-[11px]">└── ai/ · web/ · games/ · career/ …</div>
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">├── forks/</span> <span className="text-amber-600/90 ml-1 font-sans text-[11px]"># 改开源的（谨慎改，别偏离上游）</span></div>
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">├── vendor/</span> <span className="text-rose-500/90 ml-1 font-sans text-[11px]"># 纯参考（只读，绝不改）</span></div>
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">├── notes/</span> <span className="text-[#1F1E1D]/40 ml-1 font-sans text-[11px]"># 跨项目笔记</span></div>
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">├── configs/</span> <span className="text-[#1F1E1D]/40 ml-1 font-sans text-[11px]"># dotfiles + 工具配置</span></div>
          <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24 shrink-0">└── scripts/</span> <span className="text-[#1F1E1D]/40 ml-1 font-sans text-[11px]"># 工作区脚本</span></div>
        </div>
      </FadeIn>
    </div>

    <FadeIn step={step} showAt={2} className="max-w-5xl mt-4">
      <div className="bg-white rounded-2xl border border-[#1F1E1D]/5 shadow-sm p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-sm flex items-center gap-2">
          <Spark className="w-4 h-4 text-[#D97757]" /> 工作区根 AGENTS.md 里，还养着一张「项目索引」表（节选）
        </div>
        <div className="font-mono text-[12px] space-y-1">
          {INDEX_ROWS.map((r, i) => (
            <FadeIn key={r[0]} step={step} showAt={2} delay={0.25 + i * 0.2} className="flex items-center gap-3 bg-[#FAF9F5] border border-[#1F1E1D]/5 rounded-lg px-3 py-1">
              <span className="w-36 shrink-0 text-[#1F1E1D] font-medium truncate">{r[0]}</span>
              <span className="flex-1 text-[#1F1E1D]/50 truncate">{r[1]}</span>
              <span className="text-emerald-700/80 text-[11px] font-sans shrink-0">{r[2]}</span>
            </FadeIn>
          ))}
        </div>
        <FadeIn step={step} showAt={3} className="mt-2">
          <p className="text-sm text-[#1F1E1D]/70 bg-[#D97757]/10 border border-[#D97757]/20 rounded-lg px-3 py-1.5">
            <strong className="text-[#1F1E1D]">开场那次无缝接手，一半功劳是这张表</strong> —— AI 启动就读到它，四十来个项目瞬间知道在哪、什么状态、哪个正活跃。
          </p>
        </FadeIn>
      </div>
    </FadeIn>

    <div className="flex flex-col md:flex-row gap-4 max-w-5xl mt-4">
      {[
        ['目录即权限', 'AI 一看路径就知道能不能动'],
        ['索引即导航', 'AI 不用翻，一查表就知道去哪'],
        ['约定即模板', '新项目自动落对位置，AI 自己会放'],
      ].map((b, i) => (
        <FadeIn key={b[0]} step={step} showAt={4} delay={i * 0.15} className="flex-1 bg-white border border-[#1F1E1D]/5 rounded-xl px-3.5 py-2 shadow-sm flex items-center gap-3">
          <Spark className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="text-sm"><strong className="text-[#1F1E1D]">{b[0]}</strong><span className="text-[#1F1E1D]/50"> —— {b[1]}</span></div>
        </FadeIn>
      ))}
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 5 · ② 规则层：AGENTS.md
// ---------------------------------------------------------------------------
const DOC_ROWS = [
  { name: 'README-old.md', tag: '旧' },
  { name: 'PLAN-v1.md', tag: '过期' },
  { name: 'draft-笔记.md', tag: '草稿' },
  { name: 'STATUS.md', tag: '当前' },
];

const DocPanel = ({ mode, show, title, footer }: { mode: 'chaos' | 'direct', show: boolean, title: string, footer: string }) => (
  <motion.div
    initial={false}
    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{ duration: 0.35 }}
    className={`flex-1 bg-white rounded-xl border p-3 ${mode === 'chaos' ? 'border-rose-200' : 'border-emerald-200'}`}
  >
    <div className={`text-[11px] font-medium mb-2 ${mode === 'chaos' ? 'text-rose-600' : 'text-emerald-700'}`}>{title}</div>
    <div className="relative">
      {DOC_ROWS.map((f) => (
        <div key={f.name} className="h-7 mb-1.5 last:mb-0 flex items-center justify-between px-2 rounded-lg border border-[#1F1E1D]/8 bg-[#FAF9F5] font-mono text-[11px] text-[#1F1E1D]/70">
          <span>{f.name}</span>
          <span className="text-[9px] font-sans text-[#1F1E1D]/35">{f.tag}</span>
        </div>
      ))}
      {show && mode === 'chaos' && (
        <motion.div
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: [0, 102, 34, 102, 34], opacity: 1 }}
          transition={{ duration: 1.9, times: [0, 0.3, 0.55, 0.8, 1], ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-7 rounded-lg border-2 border-rose-400 bg-rose-400/10 pointer-events-none"
        />
      )}
      {show && mode === 'direct' && (
        <motion.div
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: 102, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute left-0 right-0 h-7 rounded-lg border-2 border-emerald-500 bg-emerald-500/10 pointer-events-none"
        />
      )}
    </div>
    <div className={`mt-2 text-[11px] ${mode === 'chaos' ? 'text-rose-600/90' : 'text-emerald-700/90'}`}>{footer}</div>
  </motion.div>
);

const Slide5 = ({ step }: { step: number }) => (
  <SlideLayout title="② 规则层：AI 一进来就懂规矩">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl items-start">
      <div className="space-y-5">
        <FadeIn step={step} showAt={0} className="bg-white p-5 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
          <div className="font-mono text-purple-800 font-medium mb-1 border-b border-purple-100 inline-block pb-0.5">每个项目一个 AGENTS.md</div>
          <p className="text-[#1F1E1D]/70 mt-2 text-sm leading-relaxed">
            就是个纯文本说明书：技术栈、目录约定、常用命令、哪些坑别踩。<br/>
            Agent 一启动先读它 —— 所以不用每次重新交代。
          </p>
          <p className="mt-3 text-xs text-[#1F1E1D]/40">
            * 这写法不是我发明的，Karpathy 也在用自己的 AGENTS.md —— 与其口头解释，不如写下来让 AI 自己读。
          </p>
        </FadeIn>

        <FadeIn step={step} showAt={4} className="bg-white p-5 rounded-2xl shadow-sm border border-[#1F1E1D]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]"></div>
          <div className="font-medium text-[#1F1E1D] text-sm mb-3 flex items-center gap-2">
            <Spark className="w-4 h-4 text-[#D97757]" /> AGENTS.md · 一份文件喂所有 Agent
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-2 shrink-0">
              {['Codex', 'Cursor', 'Gemini CLI'].map((t) => (
                <span key={t} className="text-[10px] font-mono bg-[#FAF9F5] border border-[#1F1E1D]/10 rounded-md px-2 py-1 text-[#1F1E1D]/70">{t}</span>
              ))}
            </div>
            <svg width="110" height="88" viewBox="0 0 110 88" fill="none" className="shrink-0">
              {['M2 12 C 55 12, 55 44, 106 44', 'M2 44 L 106 44', 'M2 76 C 55 76, 55 44, 106 44'].map((d, i) => (
                <motion.path
                  key={i} d={d} stroke="#D97757" strokeWidth="1.5" strokeDasharray="4 3"
                  initial={false}
                  animate={{ pathLength: step >= 4 ? 1 : 0, opacity: step >= 4 ? 1 : 0 }}
                  transition={{ duration: 0.7, delay: step >= 4 ? 0.2 + i * 0.12 : 0 }}
                />
              ))}
            </svg>
            <motion.div
              initial={false}
              animate={step >= 4 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: step >= 4 ? 0.8 : 0, type: 'spring', stiffness: 260, damping: 20 }}
              className="font-mono text-xs bg-purple-50 border border-purple-200 text-purple-800 rounded-lg px-3 py-2 shadow-sm"
            >
              AGENTS.md
            </motion.div>
          </div>
          <p className="mt-3 text-xs text-[#1F1E1D]/50">一份规则喂所有 Agent，换工具零迁移、不用每家维护一份。</p>
        </FadeIn>
      </div>

      <FadeIn step={step} showAt={1} className="bg-purple-50 p-5 rounded-2xl border border-purple-200 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4"><Spark className="w-48 h-48 text-purple-700"/></div>
        <div className="font-medium text-purple-800 mb-2 flex items-center gap-2 relative z-10">
          重点：活跃文档清单
        </div>
        <p className="text-purple-900/70 text-sm mb-4 relative z-10">
          AGENTS.md 里维护 <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-xs">## 活跃文档</code> 小节，列出当前有效的文档。
          AI 只读清单里的 —— 不猜、不乱翻。
        </p>
        <div className="flex gap-3 relative z-10">
          <DocPanel mode="chaos" show={step >= 2} title="没清单：AI 的视线乱跳" footer="最后翻到过期计划，读错上下文" />
          <DocPanel mode="direct" show={step >= 3} title="有清单：直达" footer="一步走到当前真相" />
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 6 · ② 规则层：渐进式加载（重点机制动画）
// ---------------------------------------------------------------------------
const TREE_COLORS = {
  blue: { bg: 'rgba(59,130,246,0.13)', text: '#1d4ed8' },
  purple: { bg: 'rgba(168,85,247,0.14)', text: '#7e22ce' },
  emerald: { bg: 'rgba(16,185,129,0.15)', text: '#047857' },
  orange: { bg: 'rgba(217,119,87,0.18)', text: '#c2410c' },
};

const TreeNode = ({ on, delay = 0, color, label }: any) => (
  <motion.span
    initial={false}
    animate={{
      backgroundColor: on ? color.bg : 'rgba(255,255,255,0)',
      color: on ? color.text : 'rgba(31,30,29,0.5)',
    }}
    transition={{ delay: on ? delay : 0, duration: 0.35 }}
    className="px-1.5 py-0.5 rounded-md font-mono"
  >
    {label}
  </motion.span>
);

const CtxBlock = ({ show, delay = 0, cls, label, tok, tag }: any) => (
  <motion.div
    initial={false}
    animate={show ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -70, scale: 0.92 }}
    transition={{ delay: show ? delay : 0, duration: 0.45, ease: 'easeOut' }}
    className={`p-2.5 rounded-xl border shadow-sm flex items-center justify-between gap-2 font-mono text-[11px] ${cls}`}
  >
    <span className="flex items-center gap-2 truncate"><Spark className="w-3 h-3 shrink-0" />{label}</span>
    <span className="flex items-center gap-1.5 shrink-0">
      {tag && <span className="text-[9px] font-sans border border-current px-1 py-px rounded">按需</span>}
      <span className="text-[10px] opacity-70 font-sans">{tok}</span>
    </span>
  </motion.div>
);

const Slide6 = ({ step }: { step: number }) => (
  <SlideLayout title="② 规则层 · 渐进式加载">
    <div className="bg-[#1A1918] rounded-xl px-4 py-2.5 font-mono text-[12px] text-gray-300 border border-[#1F1E1D]/20 mb-4 max-w-5xl space-y-1">
      <TerminalTypewriter prompt="$" text="cd ~/OpenSource/projects/ai/fable && agent" step={step} showAt={0} speed={0.012} />
      <TerminalTypewriter prompt="●" text="Read fable/engine/renderer.ts" step={step} showAt={2} speed={0.015} className="text-gray-400" />
    </div>

    <div className="flex flex-col md:flex-row gap-5 items-stretch max-w-5xl">
      {/* 文件树 */}
      <div className="flex-[0.95] border border-[#1F1E1D]/10 bg-white rounded-2xl p-4 font-mono text-[12px] shadow-sm relative overflow-hidden">
        <div className="text-[#1F1E1D]/40 mb-3 font-sans text-xs font-medium">文件树</div>
        {step >= 1 && (
          <motion.div
            initial={{ top: '72%', opacity: 0 }}
            animate={{ top: '12%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' }}
            className="absolute left-1.5 w-2 h-2 rounded-full bg-[#D97757] z-10"
          />
        )}
        <div className="space-y-2 relative z-0">
          <div className="flex items-center gap-2">
            <TreeNode on={step >= 1} delay={1.0} color={TREE_COLORS.blue} label="~/.agent/AGENTS.md" />
            <span className="text-[10px] font-sans text-[#1F1E1D]/35">全局偏好</span>
          </div>
          <div className="text-[#1F1E1D]/45">~/OpenSource/</div>
          <div className="pl-4 space-y-2">
            <div className="flex items-center gap-2">
              <TreeNode on={step >= 1} delay={0.5} color={TREE_COLORS.purple} label="├─ AGENTS.md" />
              <span className="text-[10px] font-sans text-[#1F1E1D]/35">工作区规范 + 项目索引</span>
            </div>
            <div className="text-[#1F1E1D]/45">└─ projects/ai/fable/ <span className="text-[#D97757] text-[10px] font-sans">← 启动目录</span></div>
            <div className="pl-4 space-y-2">
              <div className="flex items-center gap-2">
                <TreeNode on={step >= 1} delay={0} color={TREE_COLORS.emerald} label="├─ AGENTS.md" />
                <span className="text-[10px] font-sans text-[#1F1E1D]/35">项目说明书</span>
              </div>
              <div className="text-[#1F1E1D]/45">└─ engine/</div>
              <div className="pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <TreeNode on={step >= 2} delay={0.25} color={TREE_COLORS.orange} label="├─ AGENTS.md" />
                  <span className="text-[10px] font-sans text-[#1F1E1D]/35">子模块规则</span>
                </div>
                <div>
                  <span className={`px-1.5 py-0.5 rounded-md transition-colors duration-300 ${step >= 2 ? 'text-[#D97757] bg-[#D97757]/10' : 'text-[#1F1E1D]/45'}`}>└─ renderer.ts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 上下文窗口 */}
      <div className="flex-[1.05] border border-slate-200 bg-slate-50 rounded-2xl p-4 shadow-inner relative flex flex-col">
        <div className="text-slate-600 font-medium mb-3 text-xs">Agent 上下文窗口</div>
        <div className="flex-1 space-y-2">
          <CtxBlock show={step >= 1} delay={1.0} cls="bg-blue-50 border-blue-200 text-blue-800" label="~/.agent/AGENTS.md" tok="~0.3k tok" />
          <CtxBlock show={step >= 1} delay={0.5} cls="bg-purple-50 border-purple-200 text-purple-800" label="~/OpenSource/AGENTS.md" tok="~3k tok" />
          <CtxBlock show={step >= 1} delay={0} cls="bg-emerald-50 border-emerald-200 text-emerald-800" label="fable/AGENTS.md" tok="~1.5k tok" />
          <CtxBlock show={step >= 2} delay={0.4} cls="bg-[#D97757]/10 border-[#D97757]/40 text-[#9a3412]" label="fable/engine/AGENTS.md" tok="~0.8k tok" tag />
          {step < 1 && <div className="text-[11px] text-slate-400 font-mono pt-2">（空 —— 等待启动）</div>}
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-2.5 text-sm text-[#1F1E1D]/70 max-w-5xl">
      <FadeIn step={step} showAt={1} className="flex gap-3 items-start">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
        <p><strong className="text-[#1F1E1D]">启动即全量、向上递归：</strong>从当前目录一路向上到根，沿途每个 AGENTS.md <strong className="text-[#1F1E1D]">整份</strong>进入上下文（个人偏好 + 工作区规则 + 项目说明书，三层自动叠加）。</p>
      </FadeIn>
      <FadeIn step={step} showAt={2} className="flex gap-3 items-start">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D97757] mt-1.5 shrink-0"></div>
        <p><strong className="text-[#1F1E1D]">向下按需懒加载：</strong>启动目录之下的子目录 AGENTS.md 不随启动加载 —— AI 真去读那个目录的文件时，才拉进来。</p>
      </FadeIn>

      <FadeIn step={step} showAt={3}>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-rose-600 font-medium shrink-0">反例</span>
          <div className="flex-1 h-10 bg-white border border-rose-200 rounded-xl p-1 flex items-center gap-1 overflow-hidden">
            <div className="h-full px-2 rounded-lg bg-purple-100 border border-purple-200 text-[10px] font-mono flex items-center shrink-0 text-purple-800">System</div>
            <motion.div
              initial={false}
              animate={{ width: step >= 3 ? '82%' : '0%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-lg bg-rose-500 text-white text-[11px] font-medium flex items-center justify-center whitespace-nowrap overflow-hidden"
            >
              8000 行巨型 AGENTS.md —— 所有项目的所有规则
            </motion.div>
          </div>
          <span className="text-[11px] text-rose-600/80 shrink-0 leading-tight">每个会话每一轮<br/>都在为它付费</span>
        </div>
      </FadeIn>

      <FadeIn step={step} showAt={4}>
        <div className="p-4 bg-white border border-[#1F1E1D]/5 rounded-xl mt-2 shadow-sm border-l-4 border-l-emerald-500">
          <p className="font-medium text-emerald-800 mb-0.5">规则跟着目录走，token 只为正在碰的代码付。</p>
          <p className="text-[#1F1E1D]/60 text-sm">深层专属规则平时零成本，真干到那块才计费 —— 这就是「渐进式加载」的意义。</p>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 7 · ③ 记忆层：项目内文档分层
// ---------------------------------------------------------------------------
const Slide7 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 记忆层 · 项目内的文档分层">
    <div className="flex flex-col md:flex-row gap-10 items-start mt-4 max-w-5xl">
      <div className="flex-1 space-y-6 text-base text-[#1F1E1D]">
        <FadeIn step={step} showAt={0}>
          <p className="font-medium text-[#1F1E1D] text-lg mb-4">项目记忆是一组文档，不止是 STATUS：</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <code className="bg-purple-50 border border-purple-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-purple-800">AGENTS.md</code>
              <span className="text-[#1F1E1D]/60 pt-1">说明书（真相源）</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="bg-blue-50 border border-blue-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-blue-800">PLAN.md</code>
              <span className="text-[#1F1E1D]/60 pt-1">整体计划（稳定）</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="bg-emerald-50 border border-emerald-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-emerald-800">STATUS.md</code>
              <span className="text-[#1F1E1D]/60 pt-1">当前进度 + 下次入口（交接）</span>
            </li>
          </ul>
        </FadeIn>

        <FadeIn step={step} showAt={1}>
          <p className="text-sm text-[#1F1E1D]/40">按需存在：DESIGN.md、FORK.md（记与上游差异）</p>
        </FadeIn>

        <FadeIn step={step} showAt={3}>
          <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-200 text-sm">
            <p className="text-rose-700 font-medium mb-1 flex items-center gap-2"><Spark className="w-4 h-4"/> 没有索引的代价</p>
            <p className="text-rose-800/70">AI 要么瞎猜，要么全读一遍，慢、占 token，还容易读到过期的。</p>
          </div>
        </FadeIn>
      </div>

      <div className="flex-[1.1] bg-white p-6 rounded-2xl border border-[#1F1E1D]/5 shadow-sm relative min-h-[340px]">
        <div className="font-mono text-[#1F1E1D]/40 font-medium mb-6 pb-2 border-b border-[#1F1E1D]/5">~/project/</div>

        <FadeIn step={step} showAt={0} className="mb-6 relative z-10">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl shadow-sm text-sm">
            <span className="font-mono font-bold text-purple-800">AGENTS.md</span>
            <FadeIn step={step} showAt={2}>
              <div className="mt-3 text-xs bg-white p-3 rounded-lg border border-purple-100 shadow-sm space-y-2">
                <div className="font-medium text-purple-500 mb-1">## 活跃文档</div>
                <div className="text-emerald-600 flex items-center gap-2"><Spark className="w-3 h-3"/> 指向 STATUS.md</div>
                <div className="text-blue-600 flex items-center gap-2"><Spark className="w-3 h-3"/> 指向 PLAN.md</div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        <div className="space-y-3 relative z-0 pl-4 border-l-2 border-[#1F1E1D]/5 ml-4">
          {step >= 2 && (
            <motion.div
              initial={{ top: -8, opacity: 0 }}
              animate={{ top: 132, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.0, times: [0, 0.2, 0.85, 1], ease: 'easeInOut' }}
              className="absolute -left-[5px] w-2 h-2 rounded-full bg-purple-500"
            />
          )}
          <FadeIn step={step} showAt={0}>
            <div className={`p-2.5 rounded-lg border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-[#1F1E1D]/10 bg-white text-[#1F1E1D]/70'}`}>
              STATUS.md <span className="text-xs font-sans opacity-60">(当前交接)</span>
              {step >= 2 && <span className="text-[10px] font-sans text-emerald-600 ml-2">↖ 清单直达</span>}
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={0}>
            <div className={`p-2.5 rounded-lg border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-blue-300 bg-blue-50 text-blue-800' : 'border-[#1F1E1D]/10 bg-white text-[#1F1E1D]/70'}`}>
              PLAN.md <span className="text-xs font-sans opacity-60">(整体计划)</span>
              {step >= 2 && <span className="text-[10px] font-sans text-blue-600 ml-2">↖ 清单直达</span>}
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={1}>
            <div className={`p-2.5 rounded-lg border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-slate-200 bg-slate-50 text-slate-400 line-through' : 'border-[#1F1E1D]/10 bg-white text-[#1F1E1D]/70'}`}>
              PLAN-old.md <span className="text-xs font-sans opacity-60">(已过期)</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 8 · ③ 记忆层：跨项目经验 + 笔记
// ---------------------------------------------------------------------------
const Slide8 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 记忆层 · 跨项目经验 + 笔记">
    <div className="space-y-6 text-base md:text-lg text-[#1F1E1D] max-w-5xl">
      <FadeIn step={step} showAt={0}>
        <p className="text-[#1F1E1D]/70">项目 AGENTS.md = 说明书；Memory = 跨项目经验索引。</p>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Memory Box */}
        <FadeIn step={step} showAt={1} className="flex-[1.1] bg-white p-6 rounded-2xl border border-[#1F1E1D]/5 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[120px] font-bold text-[#1F1E1D]/5 leading-none -mt-4 -mr-4 pointer-events-none">19</div>
          <div className="font-mono text-[#1F1E1D]/40 font-medium mb-4">~/.agent/memory/</div>
          <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 mb-4 shadow-sm relative z-10">
            MEMORY.md <span className="text-xs font-sans text-slate-400 block mt-1">总索引，每次会话自动载入</span>
          </div>
          <div className="pl-4 space-y-2.5 border-l-2 border-[#1F1E1D]/5 ml-2 relative z-10">
            <FadeIn step={step} showAt={2} delay={0} className="flex items-center gap-3">
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md font-mono shadow-sm">user/</span> <span className="text-xs text-[#1F1E1D]/50">我是谁</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} delay={0.12} className="flex items-center gap-3">
              <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded-md font-mono shadow-sm">feedback/</span> <span className="text-xs text-[#1F1E1D]/50">纠正记录</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} delay={0.24} className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-md font-mono shadow-sm">project/</span> <span className="text-xs text-[#1F1E1D]/50">当前活动</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} delay={0.36} className="flex items-center gap-3">
              <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded-md font-mono shadow-sm">reference/</span> <span className="text-xs text-[#1F1E1D]/50">外部资源</span>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Notes Box */}
        <FadeIn step={step} showAt={3} className="flex-[0.9] bg-white p-6 rounded-2xl border border-[#1F1E1D]/5 shadow-sm">
          <div className="font-mono text-[#1F1E1D]/40 font-medium mb-4">~/OpenSource/notes/</div>
          <div className="space-y-3">
            <div className="bg-[#FAF9F5] p-3 border border-[#1F1E1D]/5 rounded-xl text-sm font-mono text-[#1F1E1D] flex items-center justify-between shadow-sm">
              <span>_index.md</span>
              <span className="text-xs font-sans text-[#1F1E1D]/40">跨项目知识沉淀</span>
            </div>
            <div className="bg-[#FAF9F5] p-3 border border-[#1F1E1D]/5 rounded-xl text-sm font-mono text-[#1F1E1D] flex items-center justify-between shadow-sm">
              <span>_template.md</span>
              <span className="text-xs font-sans text-[#1F1E1D]/40">格式模板</span>
            </div>
          </div>
          <FadeIn step={step} showAt={4} className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
            每篇笔记末尾带 <strong>“关键结论”</strong> 小节，专给 AI 快速提要点。
          </FadeIn>
        </FadeIn>
      </div>

      <FadeIn step={step} showAt={5}>
        <div className="mt-8 p-5 bg-[#1F1E1D] text-[#FAF9F5] rounded-2xl text-center shadow-lg font-medium tracking-wide relative">
          <div className="flex justify-center gap-3 mb-3">
            {['活跃文档清单', 'MEMORY.md', 'notes _index.md'].map((t, i) => (
              <motion.span
                key={t}
                initial={false}
                animate={step >= 5 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -16, scale: 0.85 }}
                transition={{ delay: step >= 5 ? 0.2 + i * 0.15 : 0, type: 'spring', stiffness: 260, damping: 20 }}
                className="text-[11px] font-mono bg-white/10 border border-white/20 px-2 py-1 rounded-md"
              >
                {t}
              </motion.span>
            ))}
          </div>
          全是同一个模式
          <span className="text-[#D97757] mt-2 block text-sm font-normal">「索引 + 按需读」。不硬塞进上下文，用索引指路、需要时才读。</span>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Slide 9 · 上下文为什么越用越贵（重点机制动画）
// ---------------------------------------------------------------------------
const TOKEN_ROWS = [
  { at: 1, label: '第 1 轮', blocks: ['S', 'R', 'U1'] },
  { at: 2, label: '第 2 轮', blocks: ['S', 'R', 'U1', 'A1', 'U2'] },
  { at: 3, label: '第 3 轮', blocks: ['S', 'R', 'U1', 'A1', 'U2', 'A2', 'U3'] },
  { at: 4, label: '第 4 轮', blocks: ['S', 'R', 'U1', 'A1', 'U2', 'A2', 'U3', 'F1', 'U4'] },
];

const BLOCK_STYLE: Record<string, { cls: string, label?: string, w: number }> = {
  S: { cls: 'bg-purple-100 border-purple-300 text-purple-800', label: 'System', w: 62 },
  R: { cls: 'bg-blue-100 border-blue-300 text-blue-800', label: '规则', w: 46 },
  U: { cls: 'bg-white border-slate-300 text-slate-600', w: 40 },
  A: { cls: 'bg-stone-200 border-stone-300 text-stone-600', w: 40 },
  F: { cls: 'bg-amber-200 border-amber-400 text-amber-900', label: '2000 行文件输出', w: 128 },
};

const PacketRow = ({ row, prevBlocks, show, dimPrefix }: any) => (
  <motion.div
    initial={false}
    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    transition={{ duration: 0.35 }}
    className="flex items-center gap-2"
  >
    <span className="w-14 shrink-0 text-[10px] font-mono text-[#1F1E1D]/40 text-right">{row.label}</span>
    <div className="flex items-center gap-1 flex-1 bg-white border border-[#1F1E1D]/10 rounded-lg p-1 overflow-hidden">
      {row.blocks.map((id: string, i: number) => {
        const t = BLOCK_STYLE[id[0]];
        const isNew = !prevBlocks.includes(id);
        const dim = dimPrefix && !isNew;
        return (
          <motion.span
            key={id}
            initial={false}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, delay: show ? i * 0.05 : 0 }}
            className={`h-6 rounded border text-[9px] font-mono flex items-center justify-center px-1 whitespace-nowrap shrink-0 transition-opacity duration-500 ${t.cls} ${isNew ? 'ring-2 ring-[#D97757]/40' : ''} ${dim ? 'opacity-30' : ''}`}
            style={{ minWidth: t.w }}
          >
            {t.label || id}
          </motion.span>
        );
      })}
    </div>
  </motion.div>
);

const TOKEN_TARGETS = [0, 2000, 9000, 31000, 87000, 87000, 87000, 87000];
const METER_W = ['6%', '15%', '32%', '54%', '80%', '80%', '100%', '100%'];

const Slide9 = ({ step }: { step: number }) => {
  const s = Math.min(step, 7);
  const tokens = useTweenNumber(TOKEN_TARGETS[s]);

  return (
    <SlideLayout title="上下文为什么越用越贵">
      {/* 计量区 */}
      <div className="flex items-end justify-between max-w-5xl mb-4 transition-opacity duration-500" style={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <div className="flex-1 mr-8">
          <div className="h-2 bg-white border border-[#1F1E1D]/10 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: METER_W[s], backgroundColor: step >= 6 ? '#f43f5e' : '#D97757' }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
            />
          </div>
          <div className="text-[10px] text-[#1F1E1D]/40 mt-1 font-mono uppercase tracking-wider">context window 占用</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-3xl font-semibold text-[#1F1E1D] tabular-nums leading-none">{tokens.toLocaleString()}</div>
          <div className="text-[10px] text-[#1F1E1D]/40 font-mono uppercase tracking-wider mt-1">累计输入 tokens（示意）</div>
        </div>
      </div>

      {/* 请求包区 */}
      <div className="relative max-w-5xl min-h-[168px]">
        {step < 6 ? (
          <div className="space-y-2">
            {TOKEN_ROWS.map((row, i) => (
              <PacketRow
                key={row.label}
                row={row}
                prevBlocks={i === 0 ? [] : TOKEN_ROWS[i - 1].blocks}
                show={step >= row.at}
                dimPrefix={step >= 5}
              />
            ))}
            <div className="flex items-center gap-2 pt-1 pl-16 text-[9px] font-mono text-[#1F1E1D]/35">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-purple-100 border border-purple-300"></span>System
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-100 border border-blue-300 ml-2"></span>规则
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-white border border-slate-300 ml-2"></span>你说的
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-stone-200 border border-stone-300 ml-2"></span>AI 回复
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-200 border border-amber-400 ml-2"></span>工具输出
              <span className="ml-3 text-[#D97757]/70">橙圈 = 这一轮新增，其余全是重发</span>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scaleX: 1.35 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="origin-left relative pt-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[10px] font-mono text-[#1F1E1D]/40 text-right">压缩后</span>
              <div className="flex items-center gap-1 bg-white border border-[#1F1E1D]/10 rounded-lg p-1">
                <span className="h-6 rounded border text-[9px] font-mono flex items-center justify-center px-2 bg-purple-100 border-purple-300 text-purple-800">System</span>
                <span className="h-6 rounded border text-[9px] font-mono flex items-center justify-center px-2 bg-blue-100 border-blue-300 text-blue-800">规则</span>
                <span className="h-6 rounded border text-[10px] font-mono flex items-center justify-center px-3 bg-slate-200 border-slate-300 text-slate-500 min-w-[176px]">摘要 —— 细节已丢失</span>
              </div>
            </div>
            {[...Array(7)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 44 + (i % 3) * 16 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08 }}
                className="absolute w-1.5 h-1.5 rounded-full bg-stone-400"
                style={{ left: `${16 + i * 11}%`, top: '55%' }}
              />
            ))}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ scale: 2.2, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="absolute right-4 top-6 border-[3px] border-emerald-600 text-emerald-700 rounded-lg px-3 py-1.5 font-bold text-sm bg-white/90 shadow-md z-20"
          >
            缓存命中 ≈ 1/10 价
          </motion.div>
        )}
      </div>

      {/* 说明区（随 step 切换） */}
      <div className="max-w-5xl mt-5 min-h-[96px]">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
            {s === 0 && (
              <div className="p-5 bg-white border border-[#1F1E1D]/5 border-l-4 border-l-purple-500 rounded-xl shadow-sm max-w-3xl">
                <p className="font-medium text-[#1F1E1D] mb-1">模型是无状态的。</p>
                <p className="text-sm text-[#1F1E1D]/60">每一轮对话，系统提示 + 工具定义 + 规则 + 到目前为止的全部历史，都要重新发一遍。你不是在为这句话付费 —— 是在为「这句话 + 全部历史」付费。</p>
              </div>
            )}
            {s === 1 && <p className="text-[#1F1E1D]/70 text-sm md:text-base">第 1 轮很便宜：系统提示 + 规则 + 你的一句话。</p>}
            {s === 2 && <p className="text-[#1F1E1D]/70 text-sm md:text-base">第 2 轮开始，<strong className="text-[#1F1E1D]">前面所有内容原样重发</strong>（橙圈外的块全是复制品）—— 你在反复为同样的内容付费。</p>}
            {s === 3 && <p className="text-[#1F1E1D]/70 text-sm md:text-base">单轮成本 ∝ 当前历史长度，<strong className="text-[#1F1E1D]">累计消耗是逐轮叠加的 —— 越聊越贵不是线性，是加速。</strong></p>}
            {s === 4 && <p className="text-[#1F1E1D]/70 text-sm md:text-base">读大文件、跑命令的输出（琥珀色大块）一旦进了历史，<strong className="text-[#1F1E1D]">之后每一轮都拖着它重发、重复计费。</strong></p>}
            {s === 5 && <p className="text-[#1F1E1D]/70 text-sm md:text-base">Prompt cache 让稳定前缀（变淡的部分）便宜约 10 倍 —— 但<strong className="text-[#1F1E1D]">窗口占用一点没少</strong>，且默认约 5 分钟不用就过期。</p>}
            {s === 6 && <p className="text-rose-700 text-sm md:text-base font-medium">窗口快满时触发自动压缩：早期历史被总结成摘要，细节永久丢失。</p>}
            {s === 7 && (
              <div className="p-5 bg-[#1F1E1D] text-[#FAF9F5] rounded-2xl shadow-lg">
                <p className="font-medium text-lg">别让重要的东西活在上下文里 —— 让它活在文件里。</p>
                <p className="text-[#FAF9F5]/60 text-sm mt-1.5">规则、进度、经验全部外置成文件，用索引按需读；上下文只装「当下这件事」。这就是前面三层的根本理由。</p>
              </div>
            )}
        </motion.div>
      </div>
    </SlideLayout>
  );
};

// ---------------------------------------------------------------------------
// Slide 10 · 收束
// ---------------------------------------------------------------------------
const Slide10 = () => (
  <div className="flex flex-col justify-center h-full max-w-3xl relative z-10 text-center items-center mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.03, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <Spark className="w-[600px] h-[600px] text-[#1F1E1D]" />
    </motion.div>

    <div className="relative z-10">
      <p className="text-3xl md:text-4xl text-[#1F1E1D] font-medium leading-relaxed mb-10 tracking-tight">
        对话会满、会被压缩、会忘；<br/>
        <span className="text-[#D97757] mt-2 block">文件不会。</span>
      </p>
      <div className="text-[#1F1E1D]/60 space-y-4 text-xl">
        <p>把该记的都交给文件、用索引按需取用 ——</p>
        <p className="font-medium text-[#1F1E1D]">AI 才不是聊天玩具，是真能替你干活的伙伴。</p>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Slide 11 · 结尾 CTA：全套打包成一个 skill
// ---------------------------------------------------------------------------
const AGENT_LINES = [
  '拉取 workspace-setup…',
  '把 ai-workspace 装进 ~/.agent/skills/…',
  '三层工作区法已加载：组织 · 规则 · 记忆…',
  '配套 onboard / dev-init 就位…',
];

const Slide11 = ({ step }: { step: number }) => (
  <SlideLayout title="这期讲的一切，本身就是一个 skill" icon={false}>
    <div className="flex flex-col lg:flex-row gap-6 max-w-5xl items-stretch">
      <FadeIn step={step} showAt={0} className="flex-1">
        <div className="bg-white rounded-2xl border border-[#1F1E1D]/10 shadow-sm p-6 relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]"></div>
          <div className="flex items-center gap-2.5 mb-1">
            <Spark className="w-5 h-5 text-[#D97757] shrink-0" />
            <span className="font-mono text-[15px] font-semibold text-[#1F1E1D]">skill · ai-workspace</span>
          </div>
          <p className="text-xs text-[#1F1E1D]/50 mb-4">装上它，你的 agent 直接内建：</p>
          <ul className="space-y-3 text-sm text-[#1F1E1D]/70">
            <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>三层法：目录即身份 / 规则渐进加载 / 记忆可续</li>
            <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>配套 onboard · dev-init skill</li>
            <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>setup.sh 一键铺目录 + 工作区规范</li>
            <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D97757] shrink-0"></span>笔记库骨架</li>
          </ul>
          <p className="mt-5 text-xs text-[#1F1E1D]/40 font-mono">github.com/Oldcircle/workspace-setup</p>
        </div>
      </FadeIn>

      <div className="flex-[1.35]">
        <FadeIn step={step} showAt={1} className="h-full">
          <div className="bg-[#1A1918] rounded-xl p-5 font-mono text-[12px] md:text-[13px] text-gray-300 shadow-2xl border border-[#1F1E1D]/20 h-full min-h-[260px]">
            <div className="flex gap-2 mb-4 pb-3 border-b border-gray-700/50">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="space-y-2.5 leading-relaxed">
              <TerminalTypewriter prompt="❯" text="把这个 skill 装上：github.com/Oldcircle/workspace-setup" step={step} showAt={1} speed={0.018} />
              {AGENT_LINES.map((line, i) => (
                <FadeIn key={line} step={step} showAt={2} delay={i * 0.35} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-gray-400">{line}</span>
                </FadeIn>
              ))}
              <FadeIn step={step} showAt={2} delay={AGENT_LINES.length * 0.35 + 0.2}>
                <p className="text-white font-medium mt-2">以后任何项目，说一句就接手 —— 不用再教。</p>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>

    <FadeIn step={step} showAt={3}>
      <div className="mt-6 p-5 bg-[#1F1E1D] text-[#FAF9F5] rounded-2xl text-center shadow-lg max-w-5xl">
        <p className="font-medium text-base md:text-lg">你不用记这期视频的任何东西 —— 这套方法本身就是个 skill。装上它，你的 agent 直接全会。</p>
        <p className="text-[#FAF9F5]/50 text-xs mt-3 font-mono">
          github.com/Oldcircle/workspace-setup
          <span className="mx-2 text-[#D97757]">·</span>
          下一集：AI 为什么老忘事 —— 上下文、压缩与开新会话
        </p>
      </div>
    </FadeIn>
  </SlideLayout>
);

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
const slides = [
  { Component: Slide1, steps: 1 },
  { Component: Slide2, steps: 6 },
  { Component: Slide3, steps: 5 },
  { Component: Slide4, steps: 5 },
  { Component: Slide5, steps: 5 },
  { Component: Slide6, steps: 5 },
  { Component: Slide7, steps: 4 },
  { Component: Slide8, steps: 6 },
  { Component: Slide9, steps: 8 },
  { Component: Slide10, steps: 1 },
  { Component: Slide11, steps: 4 },
];

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    const slide = slides[currentIndex];
    if (currentStep < slide.steps - 1) {
      setCurrentStep(prev => Math.min(prev + 1, slide.steps - 1));
    } else if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
      setCurrentStep(0);
    }
  }, [currentIndex, currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    } else if (currentIndex > 0) {
      const prevSlideIndex = currentIndex - 1;
      setCurrentIndex(prevSlideIndex);
      setCurrentStep(slides[prevSlideIndex].steps - 1);
    }
  }, [currentIndex, currentStep]);

  // URL hash 定位（#4 或 #4-2 = 第 4 页第 2 步），补录时直达任意画面
  useEffect(() => {
    const m = window.location.hash.match(/^#(\d+)(?:-(\d+))?$/);
    if (m) {
      const idx = Math.min(Math.max(parseInt(m[1], 10) - 1, 0), slides.length - 1);
      const stp = Math.min(Math.max(parseInt(m[2] || '0', 10), 0), slides[idx].steps - 1);
      setCurrentIndex(idx);
      setCurrentStep(stp);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${currentIndex + 1}${currentStep > 0 ? '-' + currentStep : ''}`);
  }, [currentIndex, currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextStep();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  const { Component: CurrentSlide } = slides[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF9F5] text-[#1F1E1D] flex flex-col font-sans selection:bg-[#D97757]/20">
      <motion.div
        initial={false}
        animate={{ width: `${(currentIndex / (slides.length - 1)) * 100}%` }}
        transition={{ duration: 0.35 }}
        className="absolute top-0 left-0 h-[3px] bg-[#D97757] z-50"
      />
      <div className="flex-1 relative w-full h-full p-8 md:p-16 lg:p-20 max-w-6xl mx-auto flex flex-col justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <CurrentSlide step={currentStep} />
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center px-12 z-50 text-[#1F1E1D]/30 font-mono text-sm gap-8">
        <button
          onClick={prevStep}
          disabled={currentIndex === 0 && currentStep === 0}
          className="hover:text-[#1F1E1D]/70 disabled:opacity-20 transition-colors"
        >
          &lt; prev
        </button>
        <span>
          {currentIndex + 1} / {slides.length} <span className="opacity-40 text-xs ml-1">({currentStep + 1}/{slides[currentIndex].steps})</span>
        </span>
        <button
          onClick={nextStep}
          disabled={currentIndex === slides.length - 1 && currentStep === slides[currentIndex].steps - 1}
          className="hover:text-[#1F1E1D]/70 disabled:opacity-20 transition-colors"
        >
          next &gt;
        </button>
      </div>
    </div>
  );
}

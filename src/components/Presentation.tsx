import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Motif Icon
const Spark = ({ className = "w-6 h-6", style }: { className?: string, style?: any }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 1C12 7.07513 16.9249 12 23 12C16.9249 12 12 16.9249 12 23C12 16.9249 7.07513 12 1 12C7.07513 12 12 7.07513 12 1Z" />
  </svg>
);

// Helpers for animations
const FadeIn = ({ step, showAt, children, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: step >= showAt ? 1 : 0, y: step >= showAt ? 0 : 10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
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

const SlideLayout = ({ title, children, icon = true }: { title: string, children: React.ReactNode, icon?: boolean }) => (
  <div className="h-full w-full max-w-5xl flex flex-col justify-center">
    <motion.h2 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl md:text-3xl font-medium text-[#1F1E1D] mb-10 tracking-tight flex items-center gap-3"
    >
      {icon && <Spark className="w-5 h-5 text-[#D97757]" />}
      {title}
    </motion.h2>
    <div className="w-full relative z-10 flex-1 flex flex-col justify-center">
      {children}
    </div>
  </div>
);

// Slide Components
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

    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1F1E1D] mb-8 leading-snug relative z-10">
      刚安装了claude code？<br/>这个视频让你少走三个月的弯路
    </h1>
    <p className="text-lg md:text-xl text-[#1F1E1D]/70 leading-relaxed max-w-2xl relative z-10">
      搁了三周的项目，起 claude 就能接着上次讲；<br/>
      进度不在脑子里，在文件里。
    </p>
  </div>
);

const Slide2 = ({ step }: { step: number }) => (
  <SlideLayout title="冷开场：无需回忆，直接接手" icon={false}>
    <div className="bg-[#1A1918] rounded-xl p-6 font-mono text-[13px] md:text-sm text-gray-300 shadow-2xl overflow-hidden border border-[#1F1E1D]/20 min-h-[380px] max-w-4xl relative">
      <div className="flex gap-2 mb-4 pb-4 border-b border-gray-700/50">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
      </div>
      <div className="space-y-3 leading-relaxed">
        <TerminalTypewriter prompt="~/OpenSource/projects/ai/paper-translator $" text="claude" step={step} showAt={0} />
        <FadeIn step={step} showAt={1}>
          <p><span className="text-purple-400">Claude:</span> 读取 CLAUDE.md、STATUS.md …</p>
        </FadeIn>
        
        <div className="pl-4 border-l-2 border-emerald-500/30 my-3 py-1 text-gray-400 min-h-[70px]">
          <TerminalTypewriter text="STATUS.md" step={step} showAt={2} speed={0.02} className="text-emerald-400/80" />
          <TerminalTypewriter text="├ 当前进度：Phase 2 完成 —— PDF 解析 + 分段翻译已跑通" step={step} showAt={3} speed={0.02} />
          <TerminalTypewriter text="└ 下次入口：填 DeepSeek key，跑一篇真实论文验证端到端" step={step} showAt={4} speed={0.02} />
        </div>
        
        <FadeIn step={step} showAt={5}>
          <p><span className="text-purple-400">Claude:</span> 上次停在 Phase 2，下一步是端到端验证。</p>
          <p className="ml-16 text-gray-300">.env.local 里 key 还是空的 —— 要我带你配好、</p>
          <p className="ml-16 text-gray-300">然后跑一篇 PDF 试试吗？</p>
          <p className="mt-4"><span className="text-[#D97757]">❯</span> <span className="animate-pulse font-bold text-white">_</span></p>
        </FadeIn>
      </div>
    </div>
  </SlideLayout>
);

const Slide3 = ({ step }: { step: number }) => (
  <SlideLayout title="为 AI 协作组织工作区" icon={false}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 text-base text-[#1F1E1D] max-w-4xl mt-4">
      <FadeIn step={step} showAt={1} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-blue-500"/> ① 环境层</div>
        <div className="text-[#1F1E1D]/60">锁死版本，随时复现</div>
      </FadeIn>
      <FadeIn step={step} showAt={2} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-emerald-500"/> ② 组织层</div>
        <div className="text-[#1F1E1D]/60">项目分类，权限分明</div>
      </FadeIn>
      <FadeIn step={step} showAt={3} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/30 group-hover:bg-purple-500 transition-colors"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-purple-500"/> ③ 规则层</div>
        <div className="text-[#1F1E1D]/60">渐进式加载，一进来就懂规矩</div>
      </FadeIn>
      <FadeIn step={step} showAt={4} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1F1E1D]/5 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]/30 group-hover:bg-[#D97757] transition-colors"></div>
        <div className="font-medium text-[#1F1E1D] mb-2 text-lg flex items-center gap-2"><Spark className="w-4 h-4 text-[#D97757]"/> ④ 记忆层</div>
        <div className="text-[#1F1E1D]/60">按需拉取，接住每次进度</div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide4 = ({ step }: { step: number }) => (
  <SlideLayout title="① 环境层：换台机器，照着能复现">
    <div className="space-y-10 text-base md:text-lg text-[#1F1E1D] max-w-4xl">
      <FadeIn step={step} showAt={0} className="flex gap-6 items-start">
         <div className="flex-1 bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
           <div className="font-mono text-blue-800 font-medium mb-2 border-b border-blue-100 inline-block pb-0.5">.mise.toml</div>
           <p className="text-[#1F1E1D]/70 mt-2">
             每个项目锁死自己版本的 Node / Python / Go。<br/>
             你或 AI <code className="bg-[#FAF9F5] px-1 rounded text-sm font-mono border border-[#1F1E1D]/5">cd</code> 进去，自动切到对的版本。
           </p>
         </div>
      </FadeIn>

      <FadeIn step={step} showAt={1}>
        <div className="flex gap-4">
           <div className="w-1.5 bg-rose-400 rounded-full"></div>
           <div className="bg-rose-50 p-5 rounded-xl border border-rose-100 flex-1">
             <span className="font-medium text-rose-700 block mb-2 flex items-center gap-2">
               <Spark className="w-4 h-4" /> 如果不锁版本：
             </span>
             <p className="text-rose-800/80 text-sm md:text-base leading-relaxed">
               换个项目还是旧环境，AI 按照它的习惯一装依赖就报错，<br/>
               然后反复道歉、反复重试，陷入死循环。
             </p>
           </div>
        </div>
      </FadeIn>

      <FadeIn step={step} showAt={2}>
        <p className="text-[#1F1E1D]/40 text-sm italic">
          * 整个环境的搭建规范记录在 <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#1F1E1D]/5 not-italic">ai-dev-guide.md</code> 里。
        </p>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide5 = ({ step }: { step: number }) => (
  <SlideLayout title="② 组织层：项目分得清身份">
     <div className="flex flex-col md:flex-row gap-8 items-stretch mt-4 max-w-5xl">
       
       <div className="flex-1 bg-white p-6 rounded-2xl border border-rose-100 shadow-sm font-mono text-[13px] transition-opacity duration-500 relative overflow-hidden" style={{ opacity: step >= 1 ? 0.4 : 1 }}>
         <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
         <div className="text-rose-600 font-sans font-medium mb-4 flex items-center gap-2">
           <Spark className="w-4 h-4 opacity-50" /> Before: 全堆一块
         </div>
         <div className="text-[#1F1E1D]/40 mb-2">~/Workspace</div>
         <div className="pl-4 space-y-2 border-l-[1.5px] border-[#1F1E1D]/10 ml-1.5 text-[#1F1E1D]/70">
           <div>├── my-app/</div>
           <div>├── some-open-source-fork/</div>
           <div>├── learning-project/</div>
           <div>├── notes-vault/</div>
           <div>└── old-demo/</div>
         </div>
         <FadeIn step={step} showAt={1}>
           <p className="mt-6 text-rose-700/80 font-sans text-sm bg-rose-50 p-3 rounded-lg border border-rose-100">
             三个月后分不清哪个能改，AI 也会误改了参考项目。
           </p>
         </FadeIn>
       </div>

       <FadeIn step={step} showAt={1} className="flex-[1.2] bg-white p-6 rounded-2xl border border-emerald-200 shadow-md font-mono text-[13px] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Spark className="w-24 h-24 text-emerald-600"/></div>
         <div className="text-emerald-700 font-sans font-medium mb-4 relative z-10 flex items-center gap-2">
           <Spark className="w-4 h-4" /> After: 身份分明，AI 知分寸
         </div>
         <div className="text-[#1F1E1D]/40 mb-2 relative z-10">~/Workspace</div>
         <div className="pl-4 space-y-2 border-l-[1.5px] border-[#1F1E1D]/10 ml-1.5 relative z-10">
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">├── projects/</span> <span className="text-[#1F1E1D]/40 ml-1 font-sans text-xs"># 原创 (全权改)</span></div>
           <div className="pl-6 space-y-1 border-l border-[#1F1E1D]/5 ml-2 mt-1 mb-2 text-[#1F1E1D]/60">
             <div>├── web/</div>
             <div>├── mobile/</div>
             <div>├── cli/</div>
             <div>├── ai/</div>
             <div>└── playground/</div>
           </div>
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">├── forks/</span>    <span className="text-[#1F1E1D]/40 ml-1 font-sans text-xs"># 改开源的 (谨慎改)</span></div>
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">├── vendor/</span>   <span className="text-[#1F1E1D]/40 ml-1 font-sans text-xs"># 纯参考学习 (只读)</span></div>
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">├── notes/</span>    <span className="text-[#1F1E1D]/40 ml-1 font-sans text-xs"># 知识笔记</span></div>
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">├── configs/</span>  </div>
           <div className="flex items-center"><span className="text-[#1F1E1D] font-medium w-24">└── scripts/</span>  </div>
         </div>
       </FadeIn>
     </div>
  </SlideLayout>
);

const Slide6 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 规则层：CLAUDE.md">
    <div className="space-y-8 text-base md:text-lg text-[#1F1E1D] max-w-4xl">
      <FadeIn step={step} showAt={0} className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <div className="font-mono text-purple-800 font-medium mb-1 border-b border-purple-100 inline-block pb-0.5">每个项目一个 CLAUDE.md</div>
        <p className="text-[#1F1E1D]/70 mt-2">技术栈、目录约定、开发命令、避坑指南。</p>
      </FadeIn>
      
      <FadeIn step={step} showAt={1} className="bg-purple-50 p-6 rounded-2xl border border-purple-200 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4"><Spark className="w-48 h-48 text-purple-700"/></div>
        <div className="font-medium text-purple-800 mb-3 flex items-center gap-2 relative z-10">
           重点：活跃文档清单 (Active Documents)
        </div>
        <p className="text-purple-900/70 text-sm md:text-base mb-4 relative z-10">
          在规则里维护 <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-sm">## 活跃文档</code> 小节，列出当前有效文档、用途和更新日期。
        </p>
        <div className="p-4 bg-white/80 rounded-xl border border-white shadow-sm relative z-10">
          <p className="text-[#1F1E1D] font-medium">AI 进项目只读清单里的文档，不猜、不乱翻。</p>
          <FadeIn step={step} showAt={2} className="mt-3 text-sm text-rose-600 flex gap-2">
            <span className="shrink-0 mt-0.5"><Spark className="w-4 h-4"/></span>
            <span>如果没清单：AI 极易翻到过期的 PLAN 或 README，读错上下文。</span>
          </FadeIn>
        </div>
      </FadeIn>

      <FadeIn step={step} showAt={3}>
        <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
          <div className="bg-white p-4 rounded-xl border border-[#1F1E1D]/5 shadow-sm">
            <div className="font-mono text-sm text-[#1F1E1D]/70">
              AGENTS.md <span className="text-[#D97757] mx-2">→</span> CLAUDE.md
            </div>
            <p className="text-[#1F1E1D]/50 mt-1 text-xs">软链接：一份规则喂所有工具。</p>
          </div>
          <div className="flex-1 text-sm text-[#1F1E1D]/40">
            * Karpathy 也在用自己的 CLAUDE.md。
          </div>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide7 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 规则层 · 渐进式加载">
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch mt-2 max-w-5xl">
      {/* Directory Tree */}
      <div className="flex-[0.9] border border-[#1F1E1D]/10 bg-white rounded-2xl p-6 font-mono text-[13px] shadow-sm relative overflow-hidden">
        <div className="text-[#1F1E1D]/40 mb-4 font-sans text-sm font-medium">文件树</div>
        <div className="space-y-4 relative z-10">
           <div className="flex items-center gap-3">
              <span className="text-[#1F1E1D]">~/.claude/CLAUDE.md</span>
              <FadeIn step={step} showAt={1}><Spark className="w-4 h-4 text-blue-500" /></FadeIn>
           </div>
           <div className="pl-3 border-l-[1.5px] border-[#1F1E1D]/10 ml-1.5">
             <div className="flex items-center gap-3 mt-3">
                <span className="text-[#1F1E1D]">~/Workspace/CLAUDE.md</span>
                <FadeIn step={step} showAt={1}><Spark className="w-4 h-4 text-purple-500" /></FadeIn>
             </div>
             <div className="pl-4 mt-3">
               <div className="flex items-center gap-2">
                 <span className="text-[#1F1E1D]/40">└── sub-module/</span>
               </div>
               <div className="flex items-center gap-3 ml-6 mt-2">
                 <span className="text-[#1F1E1D]">CLAUDE.md</span>
                 <FadeIn step={step} showAt={2}><Spark className="w-4 h-4 text-[#D97757]" /></FadeIn>
               </div>
               <div className="flex items-center gap-2 ml-6 mt-2">
                 <span className={step >= 2 ? "text-[#D97757] bg-[#D97757]/10 px-1.5 py-0.5 rounded transition-colors duration-300" : "text-[#1F1E1D]/50 transition-colors duration-300"}>file.ts</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Context Box */}
      <div className="flex-[1.1] border border-slate-200 bg-slate-50 rounded-2xl p-6 shadow-inner relative flex flex-col">
        <div className="text-slate-600 font-medium mb-5 text-sm flex items-center gap-2">Claude 上下文窗口</div>
        <div className="flex-1 space-y-3 font-mono text-[13px]">
          <FadeIn step={step} showAt={1}>
            <div className="bg-white border border-blue-200 p-3 rounded-xl shadow-sm text-blue-800 flex items-center gap-3">
               <Spark className="w-4 h-4 text-blue-500" /> 全局偏好
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={1}>
            <div className="bg-white border border-purple-200 p-3 rounded-xl shadow-sm text-purple-800 flex items-center gap-3">
               <Spark className="w-4 h-4 text-purple-500" /> 项目通用规则
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={2}>
            <div className="bg-[#D97757] border border-[#D97757] p-3 rounded-xl shadow-md text-white flex items-center gap-3">
               <Spark className="w-4 h-4 text-white" /> sub-module 专属规则
            </div>
          </FadeIn>
        </div>
      </div>
    </div>

    <div className="mt-8 space-y-4 text-sm text-[#1F1E1D]/70 max-w-4xl">
      <FadeIn step={step} showAt={1} className="flex gap-3 items-start">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
        <p><strong className="text-[#1F1E1D]">启动全量：</strong> 从当前目录一路往上到根，沿途每个 CLAUDE.md 启动时整份加载、叠加拼接到上下文。</p>
      </FadeIn>
      <FadeIn step={step} showAt={2} className="flex gap-3 items-start">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D97757] mt-1.5 shrink-0"></div>
        <p><strong className="text-[#1F1E1D]">子目录按需懒加载：</strong> 当前目录下的子目录 CLAUDE.md 不在启动时加载，只有去读该目录文件时才拉入。</p>
      </FadeIn>
      <FadeIn step={step} showAt={3}>
        <div className="p-4 bg-white border border-[#1F1E1D]/5 rounded-xl mt-2 shadow-sm border-l-4 border-l-emerald-500">
          <p className="font-medium text-emerald-800 mb-1">为什么重要？</p>
          <p>深层专属规则平时不占上下文、不烧 token，真干到那块才加载。</p>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide8 = ({ step }: { step: number }) => (
  <SlideLayout title="④ 记忆层 · 项目内的文档分层">
    <div className="flex flex-col md:flex-row gap-10 items-start mt-4 max-w-5xl">
      <div className="flex-1 space-y-6 text-base text-[#1F1E1D]">
        <FadeIn step={step} showAt={0}>
          <p className="font-medium text-[#1F1E1D] text-lg mb-4">项目记忆是一组文档，不止是 STATUS：</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <code className="bg-purple-50 border border-purple-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-purple-800">CLAUDE.md</code> 
              <span className="text-[#1F1E1D]/60 pt-1">说明书 (真相源)</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="bg-blue-50 border border-blue-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-blue-800">PLAN.md</code> 
              <span className="text-[#1F1E1D]/60 pt-1">整体计划 (稳定)</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="bg-emerald-50 border border-emerald-200 shadow-sm px-2 py-1 rounded-md font-mono text-sm text-emerald-800">STATUS.md</code> 
              <span className="text-[#1F1E1D]/60 pt-1">当前进度 + 下次入口 (交接)</span>
            </li>
          </ul>
        </FadeIn>
        
        <FadeIn step={step} showAt={1}>
          <p className="text-sm text-[#1F1E1D]/40">按需存在：DESIGN.md, FORK.md (记与上游差异)</p>
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
            <span className="font-mono font-bold text-purple-800">CLAUDE.md</span>
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
          <FadeIn step={step} showAt={0}>
            <div className={`p-2.5 rounded-lg border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-[#1F1E1D]/10 bg-white text-[#1F1E1D]/70'}`}>
              STATUS.md <span className="text-xs font-sans opacity-60">(当前交接)</span>
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={0}>
            <div className={`p-2.5 rounded-lg border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-blue-300 bg-blue-50 text-blue-800' : 'border-[#1F1E1D]/10 bg-white text-[#1F1E1D]/70'}`}>
              PLAN.md <span className="text-xs font-sans opacity-60">(整体计划)</span>
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

const Slide9 = ({ step }: { step: number }) => (
  <SlideLayout title="④ 记忆层 · 跨项目经验 + 笔记">
    <div className="space-y-6 text-base md:text-lg text-[#1F1E1D] max-w-5xl">
      <FadeIn step={step} showAt={0}>
        <p className="text-[#1F1E1D]/70">项目 CLAUDE.md = 说明书；Memory = 跨项目经验索引。</p>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Memory Box */}
        <FadeIn step={step} showAt={1} className="flex-[1.1] bg-white p-6 rounded-2xl border border-[#1F1E1D]/5 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[120px] font-bold text-[#1F1E1D]/5 leading-none -mt-4 -mr-4 pointer-events-none">19</div>
          <div className="font-mono text-[#1F1E1D]/40 font-medium mb-4">~/.claude/memory/</div>
          <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 mb-4 shadow-sm relative z-10">
            MEMORY.md <span className="text-xs font-sans text-slate-400 block mt-1">总索引, 每次仅载入前 200 行</span>
          </div>
          <div className="pl-4 space-y-2.5 border-l-2 border-[#1F1E1D]/5 ml-2 relative z-10">
            <FadeIn step={step} showAt={2} className="flex items-center gap-3">
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md font-mono shadow-sm">user/</span> <span className="text-xs text-[#1F1E1D]/50">我是谁</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-3">
              <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded-md font-mono shadow-sm">feedback/</span> <span className="text-xs text-[#1F1E1D]/50">纠正记录</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-md font-mono shadow-sm">project/</span> <span className="text-xs text-[#1F1E1D]/50">当前活动</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-3">
              <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded-md font-mono shadow-sm">reference/</span> <span className="text-xs text-[#1F1E1D]/50">外部资源</span>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Notes Box */}
        <FadeIn step={step} showAt={3} className="flex-[0.9] bg-white p-6 rounded-2xl border border-[#1F1E1D]/5 shadow-sm">
          <div className="font-mono text-[#1F1E1D]/40 font-medium mb-4">~/Workspace/notes/</div>
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
        <div className="mt-8 p-5 bg-[#1F1E1D] text-[#FAF9F5] rounded-2xl text-center shadow-lg font-medium tracking-wide">
          活跃文档清单 · MEMORY.md · notes 索引<br/>
          <span className="text-[#D97757] mt-2 block text-sm font-normal">全是“索引 + 按需读”。不硬塞进上下文，用索引指路、需要时才读。</span>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide10 = ({ step }: { step: number }) => (
  <SlideLayout title="上下文为什么越用越贵">
    <div className="max-w-4xl">
      <FadeIn step={step} showAt={0}>
        <p className="text-[#1F1E1D]/70 mb-8 text-sm md:text-base">模型无状态：每一轮，都要把整段上下文（系统提示+工具+记忆+全部对话历史）重发一遍。</p>
      </FadeIn>
      
      <div className="border border-[#1F1E1D]/10 bg-white h-20 w-full rounded-2xl flex items-center p-2 relative overflow-hidden shadow-sm mt-4">
        <span className="absolute right-4 text-[10px] font-mono text-[#1F1E1D]/30 z-10 top-2 uppercase tracking-widest">Context Window Limit</span>
        
        {/* System / Rules */}
        <motion.div 
          className="h-full bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-center text-xs text-purple-800 px-4 shrink-0 transition-all duration-700 font-mono shadow-sm"
        >
          System / Rules
        </motion.div>

        {/* Compression State */}
        {step >= 4 ? (
          <motion.div 
            initial={{ width: '80%', opacity: 0 }}
            animate={{ width: '30%', opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full bg-rose-500 rounded-xl flex items-center justify-center text-[11px] md:text-xs text-white mx-1.5 shrink-0 whitespace-nowrap overflow-hidden font-medium shadow-md relative"
          >
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
            摘要 (细节丢失)
          </motion.div>
        ) : (
          <>
            <motion.div 
              animate={{ opacity: step >= 1 ? 1 : 0, width: step >= 1 ? '15%' : '0%' }}
              className="h-full bg-slate-100 border border-slate-200 rounded-xl mx-1.5 flex items-center justify-center text-xs overflow-hidden shrink-0 text-slate-500 transition-all duration-500 font-mono"
            >
              Chat_1
            </motion.div>
            
            <motion.div 
              animate={{ opacity: step >= 2 ? 1 : 0, width: step >= 2 ? '45%' : '0%' }}
              className="h-full bg-amber-100 border border-amber-200 rounded-xl mx-1.5 flex items-center justify-center text-xs text-amber-800 overflow-hidden shrink-0 transition-all duration-500 font-mono"
            >
              跑一大坨命令 / 搜代码
            </motion.div>

            <motion.div 
              animate={{ opacity: step >= 3 ? 1 : 0, width: step >= 3 ? '15%' : '0%' }}
              className="h-full bg-slate-100 border border-slate-200 rounded-xl mx-1.5 flex items-center justify-center text-xs overflow-hidden shrink-0 text-slate-500 transition-all duration-500 font-mono"
            >
              Chat_3
            </motion.div>
          </>
        )}
      </div>

      <div className="mt-10 space-y-4 text-sm md:text-base text-[#1F1E1D]/70">
        <FadeIn step={step} showAt={1} className="flex gap-3 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
          <p>短会话便宜。Prompt caching 让稳定前缀便宜 (命中约 1/10)，但占用不变，且约 5 分钟过期。</p>
        </FadeIn>
        <FadeIn step={step} showAt={2} className="flex gap-3 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
          <p>读大文件、跑命令的输出，结果全堆进历史，之后每轮跟着重发。</p>
        </FadeIn>
        <FadeIn step={step} showAt={3} className="flex gap-3 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
          <p>长会话越用越贵，输入 token 累积加速上升。</p>
        </FadeIn>
        <FadeIn step={step} showAt={4}>
          <div className="p-5 bg-rose-50 rounded-2xl border border-rose-200 mt-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
            <p className="text-rose-800 font-medium mb-1">快满时触发自动压缩，早期历史被总结为摘要，细节丢失。</p>
            <p className="text-rose-900/70 text-sm mt-2">所以必须把规则/进度/知识外置成文件，用索引按需加载 —— 既省 token，又不至于被压缩弄丢细节。</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </SlideLayout>
);

const Slide11 = () => (
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

// Registry
const slides = [
  { Component: Slide1, steps: 1 },
  { Component: Slide2, steps: 6 },
  { Component: Slide3, steps: 5 },
  { Component: Slide4, steps: 3 },
  { Component: Slide5, steps: 2 },
  { Component: Slide6, steps: 4 },
  { Component: Slide7, steps: 4 },
  { Component: Slide8, steps: 4 },
  { Component: Slide9, steps: 6 },
  { Component: Slide10, steps: 5 },
  { Component: Slide11, steps: 1 }
];

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    const slide = slides[currentIndex];
    if (currentStep < slide.steps - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentStep(0);
    }
  }, [currentIndex, currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentIndex > 0) {
      const prevSlideIndex = currentIndex - 1;
      setCurrentIndex(prevSlideIndex);
      setCurrentStep(slides[prevSlideIndex].steps - 1);
    }
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
      <div className="flex-1 relative w-full h-full p-8 md:p-16 lg:p-24 max-w-6xl mx-auto flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <CurrentSlide step={currentStep} />
          </motion.div>
        </AnimatePresence>
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

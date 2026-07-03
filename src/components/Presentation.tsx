import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Helpers for animations
const FadeIn = ({ step, showAt, children, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: step >= showAt ? 1 : 0, y: step >= showAt ? 0 : 5 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

const TerminalTypewriter = ({ text, step, showAt, speed = 0.02, className = "", prompt = "" }: any) => {
  const isPast = step > showAt;
  if (step < showAt) return null;
  
  return (
    <div className={className}>
      {prompt && <span className="text-emerald-400 mr-2">{prompt}</span>}
      {text.split('').map((char: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: isPast ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0, delay: isPast ? 0 : i * speed }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
};

const SlideLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="h-full w-full max-w-5xl flex flex-col justify-center">
    <motion.h2 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl md:text-3xl font-medium text-slate-900 mb-10 tracking-tight"
    >
      {title}
    </motion.h2>
    <div className="w-full relative z-10 flex-1 flex flex-col justify-center">
      {children}
    </div>
  </div>
);

// Slide Components
const Slide1 = () => (
  <div className="flex flex-col justify-center h-full max-w-4xl">
    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-8 leading-snug">
      刚安装了claude code？<br/>这个视频让你少走三个月的弯路
    </h1>
    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
      搁三周的项目起 claude 直接接上<br/>
      进度不在脑子里，在文件里。
    </p>
  </div>
);

const Slide2 = ({ step }: { step: number }) => (
  <SlideLayout title="冷开场：无需回忆，直接接手">
    <div className="bg-[#1e1e1e] rounded-lg p-6 font-mono text-[13px] md:text-sm text-gray-300 shadow-xl overflow-hidden border border-gray-800 min-h-[360px] max-w-4xl">
      <div className="flex gap-2 mb-4 pb-4 border-b border-gray-700/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
      </div>
      <div className="space-y-3 leading-relaxed">
        <TerminalTypewriter prompt="~/Workspace/projects/legacy-app $" text="claude" step={step} showAt={0} />
        <FadeIn step={step} showAt={1}><p className="text-gray-500">Starting Claude Code...</p></FadeIn>
        <FadeIn step={step} showAt={2}><p><span className="text-blue-400">Claude:</span> I see this is a React project.</p></FadeIn>
        <FadeIn step={step} showAt={3}><p><span className="text-blue-400">Claude:</span> Reading STATUS.md...</p></FadeIn>
        
        <div className="pl-4 border-l-2 border-gray-600/50 my-3 py-1 text-gray-400 min-h-[55px]">
          <TerminalTypewriter text="# 当前进度: API 接口已打通，数据渲染正常。" step={step} showAt={4} speed={0.03} />
          <TerminalTypewriter text="# 下一步干嘛: 处理空状态 UI，修复边缘报错。" step={step} showAt={5} speed={0.03} />
        </div>
        
        <FadeIn step={step} showAt={6}>
          <p><span className="text-blue-400">Claude:</span> Got it. Let's work on the empty state UI next. What would you like to do?</p>
          <p className="mt-4"><span className="text-emerald-400">❯</span> <span className="animate-pulse font-bold">_</span></p>
        </FadeIn>
      </div>
    </div>
  </SlideLayout>
);

const Slide3 = ({ step }: { step: number }) => (
  <SlideLayout title="为 AI 协作组织工作区">
    <FadeIn step={step} showAt={0} className="text-lg text-slate-600 mb-12">
      <p>这四十来个项目，对 AI 来说是随时能进的。</p>
      <p>拆开是四层：</p>
    </FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 text-base text-slate-700 max-w-3xl">
      <FadeIn step={step} showAt={1} className="border-l-[3px] border-slate-200 pl-4">
        <div className="font-medium text-slate-900 mb-1 text-lg">① 环境层</div>
        <div className="text-slate-500">成文可复现，留好手脚</div>
      </FadeIn>
      <FadeIn step={step} showAt={2} className="border-l-[3px] border-slate-200 pl-4">
        <div className="font-medium text-slate-900 mb-1 text-lg">② 组织层</div>
        <div className="text-slate-500">项目分类，身份清楚</div>
      </FadeIn>
      <FadeIn step={step} showAt={3} className="border-l-[3px] border-slate-200 pl-4">
        <div className="font-medium text-slate-900 mb-1 text-lg">③ 规则层</div>
        <div className="text-slate-500">多层叠加，一进来就懂规矩</div>
      </FadeIn>
      <FadeIn step={step} showAt={4} className="border-l-[3px] border-slate-200 pl-4">
        <div className="font-medium text-slate-900 mb-1 text-lg">④ 记忆层</div>
        <div className="text-slate-500">项目内状态 + 跨项目记忆库</div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide4 = ({ step }: { step: number }) => (
  <SlideLayout title="① 环境层：换台机器，照着能复现">
    <div className="space-y-10 text-base md:text-lg text-slate-700 max-w-4xl">
      <FadeIn step={step} showAt={0}>
        <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">dev-setup-plan.md</div>
        <p className="text-slate-500 mt-2">一份“新机器怎么配到能干活”的可复现文档。</p>
      </FadeIn>

      <FadeIn step={step} showAt={1}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
           <div className="flex-1">
             <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">mise</div>
             <p className="text-slate-500 mt-2">统一管 Node/Python/Go。每个项目 <code className="text-sm bg-slate-100 px-1 rounded">.mise.toml</code> 锁版本。</p>
           </div>
           <FadeIn step={step} showAt={2} className="flex-1 bg-red-50/50 p-4 rounded-md border border-red-100 text-red-700 text-sm">
             <span className="font-medium block mb-1">如果不锁版本：</span>
             换个项目，AI 极易用错 Python 版本，装依赖、跑脚本疯狂报错。
           </FadeIn>
        </div>
      </FadeIn>

      <FadeIn step={step} showAt={3}>
        <div className="font-medium text-slate-900 mb-3">给 AI 留的手脚 (CLI 工具)</div>
        <div className="flex flex-wrap gap-3 font-mono text-sm">
          <FadeIn step={step} showAt={3}><span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">rg <span className="text-slate-400 font-sans">#搜代码</span></span></FadeIn>
          <FadeIn step={step} showAt={4}><span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">jq <span className="text-slate-400 font-sans">#啃JSON</span></span></FadeIn>
          <FadeIn step={step} showAt={5}><span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">gh <span className="text-slate-400 font-sans">#提PR</span></span></FadeIn>
          <FadeIn step={step} showAt={6}><span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">fd</span></FadeIn>
          <FadeIn step={step} showAt={7}><span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">bat</span></FadeIn>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide5 = ({ step }: { step: number }) => (
  <SlideLayout title="② 组织层：项目分得清身份">
     <div className="flex flex-col md:flex-row gap-8 items-stretch mt-4 max-w-5xl">
       
       <div className="flex-[0.8] bg-white p-6 rounded-lg border border-slate-200 shadow-sm font-mono text-[13px] transition-opacity duration-500" style={{ opacity: step >= 1 ? 0.4 : 1 }}>
         <div className="text-red-500 font-sans font-medium mb-4">Before: 全堆一个文件夹</div>
         <div className="text-slate-400 mb-2">~/Workspace</div>
         <div className="pl-4 space-y-2 border-l-[1.5px] border-slate-200 ml-1.5 text-slate-600">
           <div>├── my-app/</div>
           <div>├── some-open-source-fork/</div>
           <div>├── learning-project/</div>
           <div>├── notes-vault/</div>
           <div>└── old-demo/</div>
         </div>
         <FadeIn step={step} showAt={1}>
           <p className="mt-6 text-slate-600 font-sans text-sm bg-red-50 p-3 rounded">
             三个月后自己都分不清。AI 也会迷失：不知道哪个能随意重构，哪个只是参考。
           </p>
         </FadeIn>
       </div>

       <FadeIn step={step} showAt={1} className="flex-[1.2] bg-white p-6 rounded-lg border border-slate-200 shadow-sm font-mono text-[13px]">
         <div className="text-emerald-600 font-sans font-medium mb-4">After: 身份分明，AI 一看路径就知道分寸</div>
         <div className="text-slate-400 mb-2">~/Workspace</div>
         <div className="pl-4 space-y-2 border-l-[1.5px] border-slate-200 ml-1.5">
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">├── projects/</span> <span className="text-slate-400 ml-1 font-sans text-xs"># 原创 (全权改)</span></div>
           <div className="pl-6 space-y-1 border-l border-slate-100 ml-2 mt-1 mb-2 text-slate-500">
             <div>├── web/</div>
             <div>├── mobile/</div>
             <div>├── cli/</div>
             <div>├── ai/</div>
             <div>└── playground/</div>
           </div>
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">├── forks/</span>    <span className="text-slate-400 ml-1 font-sans text-xs"># 改开源的 (谨慎改)</span></div>
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">├── vendor/</span>   <span className="text-slate-400 ml-1 font-sans text-xs"># 纯参考学习 (只读)</span></div>
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">├── notes/</span>    <span className="text-slate-400 ml-1 font-sans text-xs"># 知识笔记</span></div>
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">├── configs/</span>  </div>
           <div className="flex items-center"><span className="text-slate-700 font-medium w-24">└── scripts/</span>  </div>
         </div>
       </FadeIn>
     </div>
  </SlideLayout>
);

const Slide6 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 规则层：AI 一进来就懂规矩">
    <div className="space-y-10 text-base md:text-lg text-slate-700 max-w-4xl">
      <FadeIn step={step} showAt={0}>
        <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">每个项目一个 CLAUDE.md</div>
        <p className="text-slate-500 mt-2">技术栈、目录约定、开发命令、避坑指南。</p>
      </FadeIn>
      
      <FadeIn step={step} showAt={1} className="bg-blue-50/50 p-5 rounded-md border border-blue-100">
        <div className="font-medium text-slate-900 mb-2 flex items-center gap-2">
          重点：活跃文档清单
        </div>
        <p className="text-slate-600 text-sm mb-3">在 CLAUDE.md 里维护 <code className="bg-white px-1 py-0.5 rounded border border-blue-100">## 活跃文档</code> 小节，列出当前有效文档、用途和“上次更新日期”。</p>
        <p className="text-slate-700 text-sm font-medium">AI 进项目只读清单里的文档，绝不瞎猜、不乱翻。</p>
        <FadeIn step={step} showAt={2} className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          如果没清单：AI 极易翻到过期的 PLAN 或 README，读错上下文，浪费大量 token。
        </FadeIn>
      </FadeIn>

      <FadeIn step={step} showAt={3}>
        <div className="flex items-center gap-6">
          <div>
            <div className="font-medium text-slate-900 mb-2">软链接复用</div>
            <div className="font-mono text-sm bg-white px-3 py-1.5 rounded inline-block border border-slate-200 shadow-sm text-slate-600">
              AGENTS.md <span className="text-slate-400 mx-2">→</span> CLAUDE.md
            </div>
            <p className="text-slate-500 mt-2 text-sm">一份规则喂所有工具。</p>
          </div>
          <div className="flex-1 pl-6 border-l border-slate-200 text-sm text-slate-400 italic">
            Karpathy 也在用自己的 CLAUDE.md，一个思路：写下来让 AI 自己读。
          </div>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide7 = ({ step }: { step: number }) => (
  <SlideLayout title="③ 规则层 · CLAUDE.md 是“渐进式加载”的">
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch mt-2 max-w-4xl">
      {/* Directory Tree */}
      <div className="flex-[0.9] border border-slate-200 bg-white rounded-md p-5 font-mono text-[13px] shadow-sm relative">
        <div className="text-slate-400 mb-3">文件树</div>
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <span className="text-slate-700">~/.claude/CLAUDE.md</span>
              <FadeIn step={step} showAt={1}><span className="text-blue-500 text-lg leading-none">●</span></FadeIn>
           </div>
           <div className="pl-2 border-l-[1.5px] border-slate-200 ml-1.5">
             <div className="flex items-center gap-3 mt-3">
                <span className="text-slate-700">~/Workspace/CLAUDE.md</span>
                <FadeIn step={step} showAt={1}><span className="text-blue-500 text-lg leading-none">●</span></FadeIn>
             </div>
             <div className="pl-4 mt-3">
               <div className="flex items-center gap-2">
                 <span className="text-slate-400">└── sub-module/</span>
               </div>
               <div className="flex items-center gap-3 ml-6 mt-2">
                 <span className="text-slate-700">CLAUDE.md</span>
                 <FadeIn step={step} showAt={2}><span className="text-emerald-500 text-lg leading-none">●</span></FadeIn>
               </div>
               <div className="flex items-center gap-2 ml-6 mt-2">
                 <span className={step >= 2 ? "text-slate-800 bg-yellow-100/80 px-1 rounded transition-colors duration-300" : "text-slate-500 transition-colors duration-300"}>file.ts</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Context Box */}
      <div className="flex-[1.1] border border-blue-200 bg-blue-50/40 rounded-md p-5 shadow-inner relative flex flex-col">
        <div className="text-blue-600 font-medium mb-4 text-sm">Claude 上下文窗口</div>
        <div className="flex-1 space-y-3 font-mono text-[13px]">
          <FadeIn step={step} showAt={1}>
            <div className="bg-white border border-blue-200 p-2.5 rounded shadow-sm text-slate-700 flex items-center gap-3">
               <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 全局偏好
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={1}>
            <div className="bg-white border border-blue-200 p-2.5 rounded shadow-sm text-slate-700 flex items-center gap-3">
               <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 项目通用规则
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={2}>
            <div className="bg-white border border-emerald-200 p-2.5 rounded shadow-sm text-slate-700 flex items-center gap-3">
               <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> sub-module 专属规则
            </div>
          </FadeIn>
        </div>
      </div>
    </div>

    <div className="mt-6 space-y-3 text-sm text-slate-600 max-w-4xl">
      <FadeIn step={step} showAt={1}>
        <p><strong className="text-slate-900">启动全量：</strong> 从当前目录一路往上到根，沿途每个 CLAUDE.md 启动时整份加载、叠加拼接到上下文。</p>
      </FadeIn>
      <FadeIn step={step} showAt={2}>
        <p><strong className="text-slate-900">子目录懒加载：</strong> 当前目录下的子目录 CLAUDE.md 不在启动时加载，只有去读该目录文件时才拉入。</p>
      </FadeIn>
      <FadeIn step={step} showAt={3}>
        <div className="p-3 bg-white border border-slate-200 rounded-md mt-2 shadow-sm">
          <p className="font-medium text-slate-900 mb-1">为什么重要？</p>
          <p>深层子模块的专属规则平时不占上下文、不烧 token，真干到那块才加载。全塞根目录 = 每次会话都为用不到的规则付 token。</p>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
          * 注：@path 导入启动时即展开(不省 token)；HTML 注释注入前被剥掉(省 token)；单个 CLAUDE.md 建议 &lt;200 行。
        </p>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide8 = ({ step }: { step: number }) => (
  <SlideLayout title="④-1 记忆层 · 项目内的文档分层">
    <div className="flex flex-col md:flex-row gap-8 items-start mt-4 max-w-5xl">
      <div className="flex-1 space-y-6 text-base text-slate-700">
        <FadeIn step={step} showAt={0}>
          <p className="font-medium text-slate-900 text-lg">项目记忆是一组文档，不仅是 STATUS：</p>
          <ul className="mt-4 space-y-3">
            <li><code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm text-slate-800">CLAUDE.md</code> — 说明书 (唯一真相源)</li>
            <li><code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm text-slate-800">PLAN.md</code> — 整体计划 (稳定, 少改)</li>
            <li><code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm text-slate-800">STATUS.md</code> — 会话交接文档，只写“当前进度+下次干嘛” (勤更新)</li>
          </ul>
        </FadeIn>
        
        <FadeIn step={step} showAt={1}>
          <p className="text-sm text-slate-500">按需存在：DESIGN.md, PLAN-xxx.md, FORK.md (记与上游差异)。</p>
        </FadeIn>

        <FadeIn step={step} showAt={3}>
          <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-100 text-sm">
            <p className="text-red-700 font-medium mb-1">失败态：进项目啥索引都没有</p>
            <p className="text-slate-600">AI 要么瞎猜，要么全读一遍，又慢又占 token，还容易读到过期的计划。</p>
          </div>
        </FadeIn>
      </div>

      <div className="flex-[0.8] bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative min-h-[300px]">
        <div className="font-mono text-slate-800 font-medium mb-4 pb-2 border-b border-slate-100">~/project/</div>
        
        <FadeIn step={step} showAt={0} className="mb-4 relative z-10">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded shadow-sm text-sm">
            <span className="font-mono font-bold text-blue-700">CLAUDE.md</span>
            <FadeIn step={step} showAt={2}>
              <div className="mt-2 text-xs bg-white p-2 rounded border border-blue-100 space-y-1">
                <div className="font-medium text-slate-500">## 活跃文档</div>
                <div className="text-emerald-600 flex items-center gap-1">→ 指向 STATUS.md</div>
                <div className="text-emerald-600 flex items-center gap-1">→ 指向 PLAN.md</div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        <div className="space-y-2 relative z-0">
          <FadeIn step={step} showAt={0}>
            <div className={`p-2 rounded border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              STATUS.md <span className="text-xs font-sans opacity-60">(当前交接)</span>
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={0}>
            <div className={`p-2 rounded border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              PLAN.md <span className="text-xs font-sans opacity-60">(整体计划)</span>
            </div>
          </FadeIn>
          <FadeIn step={step} showAt={1}>
            <div className={`p-2 rounded border font-mono text-sm transition-all duration-500 ${step >= 2 ? 'border-slate-100 bg-slate-50 text-slate-400 line-through' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              PLAN-phase1.md <span className="text-xs font-sans opacity-60">(已过期)</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </SlideLayout>
);

const Slide9 = ({ step }: { step: number }) => (
  <SlideLayout title="④-2 记忆层 · 跨项目记忆 + 笔记库">
    <div className="space-y-8 text-base md:text-lg text-slate-700 max-w-4xl">
      <FadeIn step={step} showAt={0}>
        <p className="font-medium text-slate-900 mb-2">两套记忆分工：</p>
        <p className="text-slate-600 text-sm">项目 CLAUDE.md = 项目说明书；Memory = 跨项目经验索引。</p>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Memory Box */}
        <FadeIn step={step} showAt={1} className="flex-1 bg-white p-5 rounded-md border border-slate-200 shadow-sm relative">
          <div className="font-mono text-slate-800 font-medium mb-3">~/.claude/memory/</div>
          <div className="bg-slate-50 p-2 border border-slate-200 rounded text-sm font-mono text-slate-600 mb-3">
            MEMORY.md <span className="text-xs font-sans opacity-60">(总索引, 每次仅载入前200行)</span>
          </div>
          <div className="pl-4 space-y-1.5 border-l-2 border-slate-100 ml-2">
            <FadeIn step={step} showAt={2} className="flex items-center gap-2">
              <span className="text-xs bg-purple-100 text-purple-700 px-1 rounded font-mono">user/</span> <span className="text-[11px] text-slate-400">我是谁</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-2">
              <span className="text-xs bg-orange-100 text-orange-700 px-1 rounded font-mono">feedback/</span> <span className="text-[11px] text-slate-400">纠正记录</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded font-mono">project/</span> <span className="text-[11px] text-slate-400">当前活动</span>
            </FadeIn>
            <FadeIn step={step} showAt={2} className="flex items-center gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-1 rounded font-mono">reference/</span> <span className="text-[11px] text-slate-400">外部资源</span>
            </FadeIn>
          </div>
          <FadeIn step={step} showAt={2}>
            <p className="text-[11px] text-slate-400 mt-3 italic text-right">现有约 19 个 topic 文件，按需查阅</p>
          </FadeIn>
        </FadeIn>

        {/* Notes Box */}
        <FadeIn step={step} showAt={3} className="flex-1 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
          <div className="font-mono text-slate-800 font-medium mb-3">~/Workspace/notes/</div>
          <div className="bg-slate-50 p-2 border border-slate-200 rounded text-sm font-mono text-slate-600 mb-3 flex items-center justify-between">
            <span>_index.md</span>
            <span className="text-xs font-sans opacity-60">知识索引</span>
          </div>
          <div className="bg-slate-50 p-2 border border-slate-200 rounded text-sm font-mono text-slate-600 mb-3 flex items-center justify-between">
            <span>_template.md</span>
            <span className="text-xs font-sans opacity-60">格式模板</span>
          </div>
          <FadeIn step={step} showAt={4} className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
            <span className="font-medium block mb-1">模板精髓：</span>
            每篇笔记末尾带 <strong>“关键结论”</strong> 小节，专给 AI 快速提要点。
          </FadeIn>
        </FadeIn>
      </div>

      <FadeIn step={step} showAt={5}>
        <div className="mt-8 p-4 bg-slate-900 text-slate-100 rounded-lg text-center shadow-lg font-medium tracking-wide">
          活跃文档清单 · MEMORY.md · notes 索引<br/>
          <span className="text-emerald-400 mt-2 block">全是“索引 + 按需读”。与渐进式加载同一哲学：不硬塞，用索引指路。</span>
        </div>
      </FadeIn>
    </div>
  </SlideLayout>
);

const Slide10 = ({ step }: { step: number }) => (
  <SlideLayout title="为什么外置记忆？上下文会变贵">
    <div className="max-w-4xl">
      <FadeIn step={step} showAt={0}>
        <p className="text-slate-600 mb-6 text-sm md:text-base">模型无状态：每一轮请求，都要把整段历史（系统提示+工具+记忆+全部对话）重发一遍。</p>
      </FadeIn>
      
      <div className="border border-slate-300 bg-slate-100 h-16 w-full rounded-md flex items-center p-1.5 relative overflow-hidden shadow-inner mt-4">
        <span className="absolute right-4 text-xs font-mono text-slate-400 z-10">窗口上限 (e.g. 200K)</span>
        
        {/* System / Rules */}
        <motion.div 
          className="h-full bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center text-xs text-blue-700 px-3 shrink-0 transition-all duration-700"
        >
          System / Rules
        </motion.div>

        {/* Compression State */}
        {step >= 4 ? (
          <motion.div 
            initial={{ width: '80%', opacity: 0 }}
            animate={{ width: '30%', opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full bg-orange-500/20 border border-orange-500/40 rounded flex items-center justify-center text-[11px] md:text-xs text-orange-800 mx-1 shrink-0 whitespace-nowrap overflow-hidden font-medium"
          >
            摘要 (细节已不可逆丢失)
          </motion.div>
        ) : (
          <>
            <motion.div 
              animate={{ opacity: step >= 1 ? 1 : 0, width: step >= 1 ? '15%' : '0%' }}
              className="h-full bg-slate-300 rounded mx-1 flex items-center justify-center text-xs overflow-hidden shrink-0 text-slate-600 transition-all duration-500"
            >
              Chat 1
            </motion.div>
            
            <motion.div 
              animate={{ opacity: step >= 2 ? 1 : 0, width: step >= 2 ? '45%' : '0%' }}
              className="h-full bg-emerald-500/20 border border-emerald-500/30 rounded mx-1 flex items-center justify-center text-xs text-emerald-700 overflow-hidden shrink-0 transition-all duration-500"
            >
              跑一大坨命令 / 搜代码
            </motion.div>

            <motion.div 
              animate={{ opacity: step >= 3 ? 1 : 0, width: step >= 3 ? '15%' : '0%' }}
              className="h-full bg-slate-300 rounded mx-1 flex items-center justify-center text-xs overflow-hidden shrink-0 text-slate-600 transition-all duration-500"
            >
              Chat 3
            </motion.div>
          </>
        )}
      </div>

      <div className="mt-8 space-y-3 text-sm md:text-base text-slate-600">
        <FadeIn step={step} showAt={1}><p>短会话便宜。Prompt caching 让稳定前缀便宜 (命中约 1/10)，但占用不变，且 5 分钟过期。</p></FadeIn>
        <FadeIn step={step} showAt={2}><p>读大文件、跑命令的输出，结果全堆进历史，之后每轮跟着重发。</p></FadeIn>
        <FadeIn step={step} showAt={3}><p>长会话越用越贵，输入 token 累积加速上升。</p></FadeIn>
        <FadeIn step={step} showAt={4}>
          <div className="p-4 bg-orange-50 rounded-md border border-orange-100 mt-5">
            <p className="text-orange-800 font-medium mb-1">快满时触发自动压缩，早期历史被总结为摘要，细节丢失。</p>
            <p className="text-slate-700 font-medium">所以必须把规则/进度/知识外置成文件，用索引按需加载。省 token，躲避压缩。(下一集细讲)</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </SlideLayout>
);

const Slide11 = () => (
  <div className="flex flex-col justify-center h-full max-w-2xl">
    <p className="text-2xl md:text-3xl text-slate-900 font-medium leading-relaxed mb-10">
      这不是整理癖，<br/>
      是让 AI 真能替我干活的前提。
    </p>
    <div className="text-slate-500 space-y-3 text-lg border-l-[3px] border-slate-200 pl-4">
      <p>模板放简介里，需要的自取。</p>
      <p>下一条讲 AI 为什么会忘事。</p>
    </div>
  </div>
);

// Registry
const slides = [
  { Component: Slide1, steps: 1 },
  { Component: Slide2, steps: 7 },
  { Component: Slide3, steps: 5 },
  { Component: Slide4, steps: 8 },
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
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col font-sans">
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

      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center px-12 z-50 text-slate-400 font-mono text-sm gap-8">
        <button 
          onClick={prevStep} 
          disabled={currentIndex === 0 && currentStep === 0}
          className="hover:text-slate-700 disabled:opacity-20 transition-colors"
        >
          &lt; prev
        </button>
        <span>
          {currentIndex + 1} / {slides.length} <span className="opacity-40 text-xs ml-1">({currentStep + 1}/{slides[currentIndex].steps})</span>
        </span>
        <button 
          onClick={nextStep} 
          disabled={currentIndex === slides.length - 1 && currentStep === slides[currentIndex].steps - 1}
          className="hover:text-slate-700 disabled:opacity-20 transition-colors"
        >
          next &gt;
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const SlideLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <motion.div variants={container} initial="hidden" animate="show" className="h-full w-full max-w-4xl flex flex-col justify-center">
    <motion.h2 variants={item} className="text-2xl md:text-3xl font-medium text-slate-900 mb-12 tracking-tight">
      {title}
    </motion.h2>
    <div className="w-full">
      {children}
    </div>
  </motion.div>
);

const slides = [
  // Slide 1: Title
  () => (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col justify-center h-full max-w-4xl">
      <motion.h1 variants={item} className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-8 leading-snug">
        刚安装好claude code？<br/>这个视频让你少走三个月的弯路
      </motion.h1>
      <motion.p variants={item} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
        一个搁了三周没碰的项目，起 claude 就能接着上次讲。<br/>
        进度不在我脑子里，在文件里。
      </motion.p>
    </motion.div>
  ),

  // Slide 2: Terminal Demo
  () => (
    <SlideLayout title="冷开场：无需回忆，直接接手">
      <motion.div variants={item} className="bg-[#1e1e1e] rounded-lg p-6 font-mono text-[13px] md:text-sm text-gray-300 shadow-xl overflow-hidden border border-gray-800">
        <div className="flex gap-2 mb-4 pb-4 border-b border-gray-700/50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <div className="space-y-3 leading-relaxed">
          <p><span className="text-emerald-400">~/Workspace/projects/legacy-app $</span> claude</p>
          <p className="text-gray-500">Starting Claude Code...</p>
          <p><span className="text-blue-400">Claude:</span> I see this is a React project.</p>
          <p><span className="text-blue-400">Claude:</span> Reading STATUS.md...</p>
          <div className="pl-4 border-l-2 border-gray-600/50 my-3 py-1 text-gray-400">
            # 当前进度: API 接口已打通，数据渲染正常。<br/>
            # 下一步干嘛: 处理空状态 UI，修复边缘报错。
          </div>
          <p><span className="text-blue-400">Claude:</span> Got it. Let's work on the empty state UI next. What would you like to do?</p>
          <p className="mt-4"><span className="text-emerald-400">❯</span> <span className="animate-pulse">_</span></p>
        </div>
      </motion.div>
    </SlideLayout>
  ),

  // Slide 3: Concept (4 layers)
  () => (
    <SlideLayout title="为 AI 协作组织工作区">
      <motion.p variants={item} className="text-lg text-slate-600 mb-12">
        这四十来个项目，对 AI 来说是随时能进的。<br/>
        拆开是四层：
      </motion.p>
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 text-base text-slate-700 max-w-3xl">
        <motion.div variants={item} className="border-l-[3px] border-slate-200 pl-4">
          <div className="font-medium text-slate-900 mb-1 text-lg">① 环境层</div>
          <div className="text-slate-500">成文可复现，留好手脚</div>
        </motion.div>
        <motion.div variants={item} className="border-l-[3px] border-slate-200 pl-4">
          <div className="font-medium text-slate-900 mb-1 text-lg">② 组织层</div>
          <div className="text-slate-500">项目分类，身份清楚</div>
        </motion.div>
        <motion.div variants={item} className="border-l-[3px] border-slate-200 pl-4">
          <div className="font-medium text-slate-900 mb-1 text-lg">③ 规则层</div>
          <div className="text-slate-500">多层叠加，一进来就懂规矩</div>
        </motion.div>
        <motion.div variants={item} className="border-l-[3px] border-slate-200 pl-4">
          <div className="font-medium text-slate-900 mb-1 text-lg">④ 记忆层</div>
          <div className="text-slate-500">接住上次的进度，文件一直在</div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  ),

  // Slide 4: Environment
  () => (
    <SlideLayout title="① 环境层：换台机器，照着能复现">
      <motion.div variants={container} className="space-y-10 text-base md:text-lg text-slate-700">
        <motion.div variants={item}>
          <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">dev-setup-plan.md</div>
          <p className="text-slate-500 mt-2">整个开发环境写成文档，用什么语言、怎么装，一份记全。</p>
        </motion.div>
        <motion.div variants={item}>
          <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">mise</div>
          <p className="text-slate-500 mt-2">统一管语言版本。每个项目锁自己的版本，AI 切过来自动用对的 Node / Python。</p>
        </motion.div>
        <motion.div variants={item}>
          <div className="font-medium text-slate-900 mb-3">给 AI 留的工具</div>
          <div className="flex gap-4 font-mono text-sm">
            <span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">rg <span className="text-slate-400">#搜代码</span></span>
            <span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">jq <span className="text-slate-400">#处理JSON</span></span>
            <span className="bg-white px-2.5 py-1.5 rounded border border-slate-200 shadow-sm text-slate-600">gh <span className="text-slate-400">#提PR</span></span>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  ),

  // Slide 5: Organization
  () => (
    <SlideLayout title="② 组织层：项目分得清身份">
       <motion.div variants={container} className="flex flex-col md:flex-row gap-12 text-base md:text-lg text-slate-700 items-start">
         <motion.div variants={item} className="flex-1 space-y-4">
           <p>分开摆放，我不乱。</p>
           <p className="text-slate-500">AI 一看路径就知道这项目该怎么对待——是能随便改，还是只能读。</p>
         </motion.div>
         <motion.div variants={item} className="flex-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm font-mono text-sm w-full">
           <div className="text-slate-400 mb-3">~/Workspace</div>
           <div className="pl-4 space-y-3 border-l-[1.5px] border-slate-200 ml-1.5">
             <div className="flex items-center"><span className="text-slate-700 font-medium w-28">├── projects/</span> <span className="text-slate-400"># 自己写的 (全权改)</span></div>
             <div className="flex items-center"><span className="text-slate-700 font-medium w-28">├── forks/</span>    <span className="text-slate-400"># 改开源的 (谨慎改)</span></div>
             <div className="flex items-center"><span className="text-slate-700 font-medium w-28">├── vendor/</span>   <span className="text-slate-400"># 纯参考学习 (只读)</span></div>
             <div className="flex items-center"><span className="text-slate-700 font-medium w-28">└── notes/</span>    <span className="text-slate-400"># 笔记文档</span></div>
           </div>
         </motion.div>
       </motion.div>
    </SlideLayout>
  ),

  // Slide 6: Rules
  () => (
    <SlideLayout title="③ 规则层：AI 一进来就懂规矩">
      <motion.div variants={container} className="space-y-10 text-base md:text-lg text-slate-700">
        <motion.div variants={item}>
          <div className="font-mono text-slate-900 font-medium mb-1 border-b border-slate-200 inline-block pb-0.5">CLAUDE.md</div>
          <p className="text-slate-500 mt-2">每个项目放一个，写明技术栈、目录约定、避坑指南。不用每次重新交代。</p>
        </motion.div>
        
        <motion.div variants={item}>
          <div className="font-medium text-slate-900 mb-2">三层叠加</div>
          <p className="text-slate-500 mb-2">最外层通用偏好 + 中间层共享规则 + 最里层专属规则。写一次，处处生效。</p>
          <div className="text-slate-400 text-sm italic">Karpathy 也在用自己的 CLAUDE.md，一个思路：写下来让 AI 自己读。</div>
        </motion.div>

        <motion.div variants={item}>
          <div className="font-medium text-slate-900 mb-3">软链接复用</div>
          <div className="font-mono text-sm bg-white px-3 py-1.5 rounded inline-block border border-slate-200 shadow-sm text-slate-600">
            AGENTS.md -&gt; CLAUDE.md
          </div>
          <p className="text-slate-500 mt-2 text-sm">有的工具认 AGENTS.md，软链指过去，一份规则喂所有。</p>
        </motion.div>
      </motion.div>
    </SlideLayout>
  ),

  // Slide 7: Memory
  () => (
    <SlideLayout title="④ 记忆层：接住上次的进度">
      <motion.div variants={container} className="space-y-10 text-base md:text-lg text-slate-700">
        <motion.div variants={item} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="font-mono text-slate-900 font-medium mb-3">STATUS.md</div>
          <p className="text-slate-500 mb-4">每个项目只写两行：现在到哪了、下次从哪接着干。</p>
          <div className="pl-4 border-l-[3px] border-slate-200 text-slate-500 font-mono text-sm leading-relaxed">
            # 当前进度: ...<br/>
            # 下一步干嘛: ...
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="font-medium text-slate-900 mb-1">跨会话记忆</div>
          <p className="text-slate-500">记住角色和踩过的坑，新开对话不用自我介绍。</p>
        </motion.div>
        
        <motion.div variants={item} className="pt-2">
          <p className="font-medium text-slate-900">对话可以随时扔，文件一直都在。</p>
        </motion.div>
      </motion.div>
    </SlideLayout>
  ),

  // Slide 8: Outro
  () => (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col justify-center h-full max-w-2xl">
      <motion.p variants={item} className="text-xl md:text-2xl text-slate-900 font-medium leading-relaxed mb-10">
        这不是整理癖，<br/>
        是让 AI 真能替我干活的前提。
      </motion.p>
      <motion.div variants={item} className="text-slate-500 space-y-2 text-base md:text-lg">
        <p>模板放简介里，需要的自取。</p>
        <p>下一条讲 AI 为什么会忘事。</p>
      </motion.div>
    </motion.div>
  )
];

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col font-sans">
      <div className="flex-1 relative w-full h-full p-8 md:p-24 lg:p-32 max-w-6xl mx-auto flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center px-12 z-50 text-slate-400 font-mono text-sm gap-8">
        <button 
          onClick={prevSlide} 
          disabled={currentIndex === 0}
          className="hover:text-slate-700 disabled:opacity-20 transition-colors"
        >
          &lt; prev
        </button>
        <span>{currentIndex + 1} / {slides.length}</span>
        <button 
          onClick={nextSlide} 
          disabled={currentIndex === slides.length - 1}
          className="hover:text-slate-700 disabled:opacity-20 transition-colors"
        >
          next &gt;
        </button>
      </div>
    </div>
  );
}

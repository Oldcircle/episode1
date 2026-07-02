import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderTree, 
  TerminalSquare, 
  FileCode2, 
  BrainCircuit,
  MonitorCheck,
  Zap,
  BookOpen,
  GitFork,
  FileText,
  Lock,
  Folder,
  Layers,
  Link as LinkIcon,
  MessageSquare,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const SlideLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <motion.div variants={container} initial="hidden" animate="show" className="h-full w-full max-w-[1400px] mx-auto flex flex-col justify-center">
    <motion.h2 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-16 tracking-tight border-b-2 border-slate-200 pb-8">
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
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center justify-center text-center h-full space-y-10">
      <motion.div variants={item} className="w-28 h-28 bg-blue-100 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-sm">
        <BrainCircuit size={64} strokeWidth={1.5} />
      </motion.div>
      <motion.h1 variants={item} className="text-6xl md:text-8xl font-display font-bold tracking-tight text-slate-900 leading-tight max-w-5xl">
        一个人管四十个项目<br/>
        <span className="text-blue-600 mt-4 block">靠的不是记性</span>
      </motion.h1>
      <motion.p variants={item} className="text-3xl md:text-4xl text-slate-500 font-medium mt-8">
        让 AI 零成本接手的工作区组织法
      </motion.p>
    </motion.div>
  ),

  // Slide 2: Core Concept
  () => (
    <motion.div variants={container} initial="hidden" animate="show" className="h-full w-full max-w-[1400px] mx-auto flex flex-col justify-center">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <motion.h2 variants={item} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-10 leading-tight tracking-tight">
          整个目录，是为 <span className="text-blue-600 bg-blue-50 px-6 py-2 rounded-[2rem] inline-block mt-4 md:mt-0">AI 协作</span> 组织的。
        </motion.h2>
        <motion.p variants={item} className="text-3xl md:text-4xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
          不管哪个 AI、隔了多久、进哪个项目，<br/>
          都能零成本接手、自己干活，<strong className="text-slate-800 font-bold border-b-[6px] border-blue-200 ml-2">不用我从头交代。</strong>
        </motion.p>
      </div>
      
      <motion.div variants={container} className="grid grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
        {[
          { icon: MonitorCheck, title: "① 环境层", desc: "成文可复现" },
          { icon: FolderTree, title: "② 组织层", desc: "身份清晰" },
          { icon: FileCode2, title: "③ 规则层", desc: "一进来就懂" },
          { icon: BrainCircuit, title: "④ 记忆层", desc: "接住进度" }
        ].map((layer, idx) => (
          <motion.div key={idx} variants={item} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 flex flex-col items-center text-center gap-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="p-5 bg-slate-50 rounded-[1.5rem] text-blue-600">
              <layer.icon size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{layer.title}</h3>
            <p className="text-xl text-slate-500 font-medium">{layer.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  ),

  // Slide 3: Environment Layer
  () => (
    <SlideLayout title="① 环境层：环境成文，随时复现">
      <ul className="space-y-14 text-3xl max-w-5xl">
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-blue-500 bg-blue-50 p-5 rounded-3xl shrink-0"><FileText size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-4 tracking-tight">开发环境全写进文档</strong>
            <code className="text-3xl bg-slate-100 text-slate-600 px-5 py-3 rounded-2xl font-mono shadow-sm">dev-setup-plan.md</code>
          </div>
        </motion.li>
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-emerald-500 bg-emerald-50 p-5 rounded-3xl shrink-0"><Lock size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-4 tracking-tight">统一工具锁死语言版本</strong>
            <span className="text-slate-600 leading-snug block">使用 <code className="text-emerald-600 bg-emerald-50 px-3 rounded-lg font-mono">mise</code> 管理，Node / Python 互不打架，<strong className="text-slate-800">AI 自动用对版本</strong>。</span>
          </div>
        </motion.li>
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-purple-500 bg-purple-50 p-5 rounded-3xl shrink-0"><TerminalSquare size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-6 tracking-tight">预留 AI 专用命令行工具</strong>
            <div className="flex flex-wrap gap-6 text-2xl font-mono text-slate-600">
              <span className="bg-slate-100 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">rg <span className="text-slate-400 font-sans text-xl font-medium">搜代码</span></span>
              <span className="bg-slate-100 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">jq <span className="text-slate-400 font-sans text-xl font-medium">啃 JSON</span></span>
              <span className="bg-slate-100 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">gh <span className="text-slate-400 font-sans text-xl font-medium">提 PR</span></span>
            </div>
          </div>
        </motion.li>
      </ul>
    </SlideLayout>
  ),

  // Slide 4: Organization Layer
  () => (
    <SlideLayout title="② 组织层：项目分得清身份">
      <div className="flex gap-20 items-center mt-8">
        <div className="flex-1 space-y-10 text-3xl text-slate-600 leading-relaxed">
          <motion.p variants={item}>项目一多，三个月后你自己都分不清哪个是原创、哪个是抄来学的。</motion.p>
          <motion.p variants={item}>分开摆放，我不乱，<strong className="text-slate-900 font-bold bg-yellow-100/80 px-3 py-1 rounded-xl">AI 一看路径就知道这项目该怎么对待</strong> ——是能随便改，还是只能读。</motion.p>
        </div>
        <motion.div variants={item} className="flex-1 bg-white border border-slate-200/60 rounded-[3rem] p-12 shadow-2xl shadow-slate-200/40 font-mono text-2xl text-slate-700">
          <div className="flex items-center gap-5 mb-12 font-bold text-slate-900 text-4xl"><FolderTree size={40} className="text-slate-400"/> ~/Workspace</div>
          <div className="pl-10 space-y-10 border-l-4 border-slate-100 ml-5 relative">
            {[
              { icon: Folder, colorClass: "blue", label: "/projects", desc: "自己写的 (全权改)" },
              { icon: GitFork, colorClass: "purple", label: "/forks", desc: "改开源的 (谨慎改)" },
              { icon: BookOpen, colorClass: "orange", label: "/vendor", desc: "纯参考学习 (只读)" },
              { icon: FileText, colorClass: "emerald", label: "/notes", desc: "个人笔记" }
            ].map((dir, idx) => {
              // Extract styling to avoid tailwind dynamic class issues
              let dot, box;
              if (dir.colorClass === 'blue') { dot = 'bg-blue-400'; box = 'bg-blue-50 text-blue-500'; }
              if (dir.colorClass === 'purple') { dot = 'bg-purple-400'; box = 'bg-purple-50 text-purple-500'; }
              if (dir.colorClass === 'orange') { dot = 'bg-orange-400'; box = 'bg-orange-50 text-orange-500'; }
              if (dir.colorClass === 'emerald') { dot = 'bg-emerald-400'; box = 'bg-emerald-50 text-emerald-500'; }

              return (
                <div key={idx} className="flex items-center gap-8 relative">
                  <div className={`absolute -left-[3rem] w-6 h-6 rounded-full border-[6px] border-white ${dot} shadow-md`} />
                  <div className={`w-20 h-20 ${box} rounded-[1.5rem] flex items-center justify-center shrink-0`}><dir.icon size={36} strokeWidth={2}/></div> 
                  <div>
                    <span className="font-bold text-slate-800 text-3xl">{dir.label}</span> 
                    <span className="block text-2xl font-sans text-slate-500 mt-2">{dir.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  ),

  // Slide 5: Rules Layer
  () => (
    <SlideLayout title="③ 规则层：AI 一进来就懂规矩">
      <ul className="space-y-16 text-3xl max-w-[1200px]">
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-blue-500 bg-blue-50 p-5 rounded-3xl shrink-0"><FileCode2 size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-4 tracking-tight">项目专属规则：<code className="text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">CLAUDE.md</code></strong>
            <span className="text-slate-600 leading-relaxed block text-[1.65rem]">纯文本记录技术栈、目录规范、避坑指南。<strong className="text-slate-800">AI 启动先读它，不用每次重新交代。</strong></span>
          </div>
        </motion.li>
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-indigo-500 bg-indigo-50 p-5 rounded-3xl shrink-0"><Layers size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-4 tracking-tight">三层规则，自动叠加</strong>
            <span className="text-slate-600 leading-relaxed block text-[1.65rem]">个人偏好 <span className="text-slate-400 mx-2 text-2xl">+</span> 通用规则 <span className="text-slate-400 mx-2 text-2xl">+</span> 专属规则。<br/><strong className="text-indigo-600 font-bold mt-3 block">写一次，处处生效。</strong></span>
          </div>
        </motion.li>
        <motion.li variants={item} className="flex gap-10 items-start">
          <span className="text-emerald-500 bg-emerald-50 p-5 rounded-3xl shrink-0"><LinkIcon size={48} strokeWidth={1.5}/></span>
          <div className="pt-2">
            <strong className="block text-slate-800 mb-6 tracking-tight">软链接复用规则</strong>
            <code className="text-3xl bg-slate-100 text-slate-600 px-5 py-3 rounded-2xl font-mono border border-slate-200 shadow-sm inline-block">AGENTS.md -&gt; CLAUDE.md</code>
            <span className="text-slate-500 block mt-5 font-medium text-[1.65rem]">一份规则喂所有 AI 工具，拒绝维护两份。</span>
          </div>
        </motion.li>
      </ul>
    </SlideLayout>
  ),

  // Slide 6: Memory Layer
  () => (
    <SlideLayout title="④ 记忆层：接住三周前的进度">
      <div className="grid grid-cols-2 gap-16 mt-8">
        <motion.div variants={item} className="bg-white border border-slate-200/60 p-12 rounded-[3rem] shadow-2xl shadow-slate-200/30">
          <div className="flex items-center gap-6 mb-10 border-b-2 border-slate-100 pb-8">
            <div className="p-5 bg-blue-50 text-blue-600 rounded-3xl"><Zap size={48} strokeWidth={1.5}/></div>
            <h3 className="text-5xl font-bold text-slate-800 font-mono tracking-tight">STATUS.md</h3>
          </div>
          <p className="text-3xl text-slate-600 mb-10 leading-relaxed">每个项目里，<strong className="text-slate-900 bg-yellow-100 px-2 rounded-lg">只写两行核心状态</strong>：</p>
          <div className="bg-slate-900 p-10 rounded-3xl font-mono text-2xl text-emerald-400 space-y-8 shadow-inner leading-relaxed tracking-wide">
            <div><span className="text-slate-500 block mb-3 font-bold uppercase tracking-widest text-xl"># 当前进度</span>API 接口已打通，数据渲染正常。</div>
            <div><span className="text-slate-500 block mb-3 font-bold uppercase tracking-widest text-xl"># 下一步干嘛</span>处理空状态 UI，修复边缘报错。</div>
          </div>
        </motion.div>

        <div className="space-y-12 flex flex-col justify-between">
          <motion.div variants={item} className="bg-white border border-slate-200/60 p-12 rounded-[3rem] shadow-2xl shadow-slate-200/30 flex-1">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-5 bg-purple-50 text-purple-600 rounded-3xl"><BrainCircuit size={40} strokeWidth={1.5}/></div>
              <h3 className="text-4xl font-bold text-slate-800 tracking-tight">跨会话记忆</h3>
            </div>
            <p className="text-3xl text-slate-600 leading-relaxed">让 Claude 记住角色背景、踩过的坑，<strong className="text-slate-900 block mt-4">新开对话免除"自我介绍"。</strong></p>
          </motion.div>

          <motion.div variants={item} className="bg-blue-600 p-12 rounded-[3rem] shadow-2xl shadow-blue-900/30 text-white">
            <div className="flex items-center gap-6 mb-8">
              <MessageSquare size={48} className="text-blue-200"/>
              <h3 className="text-4xl font-bold tracking-tight">对话是会丢细节的</h3>
            </div>
            <p className="text-2xl text-blue-100 leading-relaxed">我不指望 AI 在对话里记住一切。把该记的落到文件里。<br/><br/><strong className="text-white text-4xl font-bold tracking-tight bg-blue-700/60 px-6 py-4 rounded-2xl inline-block mt-4 shadow-inner">对话随时扔，文件一直都在。</strong></p>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  ),

  // Slide 7: Outro
  () => (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center justify-center text-center h-full space-y-14">
      <motion.div variants={item} className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 size={72} strokeWidth={2} />
      </motion.div>
      <motion.h2 variants={item} className="text-6xl md:text-8xl font-display font-bold text-slate-900 leading-tight tracking-tight">
        这不是整理癖，<br/>
        <span className="text-blue-600 mt-4 block">是让 AI 真能替我干活的前提。</span>
      </motion.h2>
      <motion.div variants={item} className="text-4xl text-slate-600 font-medium mt-12">
        <p>完整的目录结构模板，<strong className="text-slate-900 font-bold border-b-[6px] border-yellow-300 ml-2 pb-1">已放在简介</strong>，欢迎自取。</p>
      </motion.div>
      <motion.div variants={item} className="mt-20 p-10 bg-white rounded-[2.5rem] inline-block border border-slate-200/60 shadow-2xl shadow-slate-200/40">
        <span className="text-blue-600 uppercase tracking-widest text-2xl font-bold mb-6 flex justify-center items-center gap-3"><Zap size={28}/> 下一集预告</span>
        <span className="text-4xl md:text-5xl text-slate-800 font-bold tracking-tight block">你的 AI 为什么老忘事？上下文该怎么管？</span>
      </motion.div>
    </motion.div>
  )
];

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
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
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 flex flex-col font-sans">
      {/* Main Content Area */}
      <div className="flex-1 relative w-full h-full p-8 md:p-16 lg:p-24 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 100 : -100, position: 'absolute' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full px-12 lg:px-32 flex flex-col justify-center pb-24"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 border-t border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-3">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-3 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-16 bg-blue-600 shadow-sm' : 'w-3 bg-slate-300'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-8 text-slate-500 font-medium text-2xl font-mono">
          <span>{currentIndex + 1} / {slides.length}</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0} 
              className="p-4 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors shadow-sm bg-white border border-slate-200"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentIndex === slides.length - 1} 
              className="p-4 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors shadow-sm bg-white border border-slate-200"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

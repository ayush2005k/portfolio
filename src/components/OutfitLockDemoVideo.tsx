import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  LayoutDashboard,
  UploadCloud,
  Images,
  Settings,
  Film,
  MousePointer,
  Wand2,
  ChevronRight,
  Sliders,
  Check,
  Camera,
  Sun,
  User,
  Image as ImageIcon,
} from 'lucide-react';

interface ReferenceCategory {
  id: string;
  name: string;
  active: boolean;
}

export const OutfitLockDemoVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [mode, setMode] = useState<'video' | 'interactive'>('video');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'uploads' | 'gallery' | 'settings'>('dashboard');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Pose', 'Lighting']);
  const [aspectRatio, setAspectRatio] = useState('3:4 Portrait');
  const [outputsCount, setOutputsCount] = useState('1 Image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 35, clicking: false });

  const totalDuration = 10; // 10 seconds loop mirroring user's recording
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto timeline sequencer mirroring user's screen recording
  useEffect(() => {
    if (!isPlaying || mode !== 'video') return;

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev >= totalDuration ? 0 : Number((prev + 0.1).toFixed(1));

        // Milestones matching 00:00 - 00:08 video:
        // 0.0 - 1.2: On Dashboard -> cursor moves to "My Uploads"
        if (next < 1.2) {
          setCurrentTab('dashboard');
          setCursorPos({ x: 6, y: 18, clicking: next > 1.0 });
        }
        // 1.2 - 2.2: User clicks "My Uploads" -> Upload History view
        else if (next >= 1.2 && next < 2.2) {
          setCurrentTab('uploads');
          setCursorPos({ x: 6, y: 24, clicking: next > 2.0 });
        }
        // 2.2 - 3.4: User clicks "Output Gallery" -> Output Gallery view
        else if (next >= 2.2 && next < 3.4) {
          setCurrentTab('gallery');
          setCursorPos({ x: 6, y: 30, clicking: next > 3.1 });
        }
        // 3.4 - 4.2: User clicks "Settings"
        else if (next >= 3.4 && next < 4.4) {
          setCurrentTab('settings');
          setCursorPos({ x: 6, y: 12, clicking: next > 4.1 });
        }
        // 4.4 - 6.0: User clicks back to "Dashboard"
        else if (next >= 4.4 && next < 6.0) {
          setCurrentTab('dashboard');
          setCursorPos({ x: 26, y: 20, clicking: false });
        }
        // 6.0 - 8.0: Cursor hovers Reference Styles box and category pills
        else if (next >= 6.0 && next < 8.0) {
          setCurrentTab('dashboard');
          setCursorPos({ x: 25, y: 38, clicking: next > 6.8 && next < 7.2 });
        }
        // 8.0 - 10.0: Cursor moves down to Generate AI Outfits button
        else {
          setCurrentTab('dashboard');
          setCursorPos({ x: 25, y: 88, clicking: false });
        }

        return next;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, mode]);

  const handleTimelineSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setCurrentTab('dashboard');
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const allCategories = ['Pose', 'Lighting', 'Background', 'Model Style', 'Camera Angle', 'Aesthetic'];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#fdfcfd] text-[#1e1b22] select-none font-sans overflow-hidden rounded-xl border border-rose-200/60 shadow-sm">
      {/* Top Application Bar with Navigation & Video Controls */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border-b border-stone-200/80 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-stone-900 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
            ✦
          </div>
          <div>
            <span className="font-bold text-[13px] tracking-tight text-stone-900">OutfitLock AI</span>
            <span className="hidden sm:inline-block ml-2 text-[9px] font-mono-code font-semibold text-rose-600 uppercase tracking-widest bg-rose-50 px-1.5 py-0.5 rounded">
              FASHION IMAGE GENERATION
            </span>
          </div>
        </div>

        {/* Workspace Pill from video */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-mono-code">
          <span>Workspace</span>
          <span className="text-stone-300">/</span>
          <span className="font-medium text-stone-900">New Outfit Lock Session</span>
        </div>

        {/* Video Mode & Timeline Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-[11px] font-medium border border-stone-200">
            <button
              onClick={() => setMode('video')}
              className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'video'
                  ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Watch recorded video walkthrough"
            >
              <Film className="w-3 h-3" />
              <span>Video Demo</span>
            </button>
            <button
              onClick={() => {
                setMode('interactive');
                setIsPlaying(false);
              }}
              className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'interactive'
                  ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Click and interact manually"
            >
              <MousePointer className="w-3 h-3" />
              <span>Interactive</span>
            </button>
          </div>

          {/* Play/Pause */}
          {mode === 'video' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
              title={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Reset */}
          <button
            onClick={handleRestart}
            className="p-1 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
            title="Restart video walkthrough"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace Frame matching the video interface */}
      <div className="relative flex-1 flex overflow-hidden bg-[#faf9fb]">
        {/* Left Navigation Sidebar */}
        <div className="w-36 sm:w-44 bg-white border-r border-stone-200/80 p-2.5 sm:p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="px-1 py-0.5">
              <p className="font-bold text-[13px] text-stone-900 leading-tight">OutfitLock AI</p>
              <p className="text-[9px] text-stone-400 font-mono-code uppercase tracking-wider">
                FASHION IMAGE GEN
              </p>
            </div>

            <nav className="space-y-0.5">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  currentTab === 'dashboard'
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-stone-500" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentTab('uploads')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  currentTab === 'uploads'
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5 text-stone-500" />
                <span>My Uploads</span>
              </button>
              <button
                onClick={() => setCurrentTab('gallery')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  currentTab === 'gallery'
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Images className="w-3.5 h-3.5 text-stone-500" />
                <span>Output Gallery</span>
              </button>
              <button
                onClick={() => setCurrentTab('settings')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  currentTab === 'settings'
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5 text-stone-500" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* User Profile Footer */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-700">
              JD
            </div>
            <div className="truncate">
              <p className="text-[11px] font-semibold text-stone-800 leading-none">Studio Pro</p>
              <p className="text-[9px] text-emerald-600 font-mono-code mt-0.5">● Connected</p>
            </div>
          </div>
        </div>

        {/* Center Content Workspace */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Main Top Header */}
          <div className="px-4 py-2 bg-white border-b border-stone-200/80 flex items-center justify-between text-xs font-mono-code text-stone-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900">Workspace</span>
              <span className="text-stone-300">/</span>
              <span>New Outfit Lock Session</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-stone-400">0 TOTAL</span>
              <div className="w-5 h-5 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[10px] text-stone-600">
                JD
              </div>
            </div>
          </div>

          {/* TAB 1: DASHBOARD VIEW (Input Sources + Settings + Live Output Gallery) */}
          {currentTab === 'dashboard' && (
            <div className="flex-1 grid grid-cols-12 overflow-y-auto">
              {/* Left Column: Input Sources, Reference Categories & Settings */}
              <div className="col-span-12 lg:col-span-5 p-3 sm:p-4 border-r border-stone-200/80 space-y-4 bg-white/60">
                {/* 1. Input Sources */}
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <span>1. Input Sources</span>
                  </h3>

                  {/* Outfit Designs Upload Box */}
                  <div>
                    <label className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block mb-1">
                      OUTFIT DESIGNS
                    </label>
                    <div className="border border-dashed border-stone-300 rounded-lg p-3 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer">
                      <p className="text-xs text-stone-500">Click or drag files</p>
                      <div className="mt-1 flex justify-center gap-1">
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                      </div>
                    </div>
                  </div>

                  {/* Reference Styles Upload Box */}
                  <div>
                    <label className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block mb-1">
                      REFERENCE STYLES
                    </label>
                    <div className="border border-dashed border-stone-300 rounded-lg p-3 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer">
                      <p className="text-xs text-stone-500">Click or drag files</p>
                      <div className="mt-1 flex justify-center gap-1">
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                        <span className="w-4 h-4 rounded bg-stone-200/70 inline-block" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Reference Categories */}
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2.5">
                  <h3 className="text-xs font-bold text-stone-900">2. Reference Categories</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {allCategories.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-stone-900 text-white shadow-2xs'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Settings */}
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold text-stone-900">3. Settings</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-mono-code font-bold text-stone-500 uppercase block mb-1">
                        OUTPUTS
                      </label>
                      <select
                        value={outputsCount}
                        onChange={(e) => setOutputsCount(e.target.value)}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-mono-code focus:outline-hidden"
                      >
                        <option>1 Image</option>
                        <option>2 Images</option>
                        <option>4 Images</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono-code font-bold text-stone-500 uppercase block mb-1">
                        RATIO
                      </label>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-mono-code focus:outline-hidden"
                      >
                        <option>3:4 Portrait</option>
                        <option>1:1 Square</option>
                        <option>9:16 Story</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Button from video */}
                  <button
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => setIsGenerating(false), 1200);
                    }}
                    className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-rose-300" />
                    <span>{isGenerating ? 'Generating...' : 'Generate AI Outfits'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Output Gallery Canvas */}
              <div className="col-span-12 lg:col-span-7 p-4 sm:p-6 flex flex-col justify-start">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-stone-900">Live Output Gallery</h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-stone-200 bg-white/40 text-center min-h-[300px]">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 mb-2">
                    <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <p className="text-xs text-stone-400 italic">
                    No images generated yet. Configure settings and click generate!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY UPLOADS VIEW */}
          {currentTab === 'uploads' && (
            <div className="p-4 sm:p-6 flex-1 flex flex-col animate-fadeIn">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-stone-900">Upload History</h3>
                <p className="text-xs text-stone-500">
                  View all your past sessions, input designs, and reference images.
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-stone-200 bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 mb-2">
                  <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                </div>
                <p className="text-xs text-stone-400">No upload history yet.</p>
              </div>
            </div>
          )}

          {/* TAB 3: OUTPUT GALLERY VIEW */}
          {currentTab === 'gallery' && (
            <div className="p-4 sm:p-6 flex-1 flex flex-col animate-fadeIn">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-stone-900">Output Gallery</h3>
                <p className="text-xs text-stone-500">
                  Every single AI generated outfit generated in this session.
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-stone-200 bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 mb-2">
                  <Images className="w-6 h-6 stroke-[1.5]" />
                </div>
                <p className="text-xs text-stone-400">No results in gallery history.</p>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS VIEW */}
          {currentTab === 'settings' && (
            <div className="p-4 sm:p-6 flex-1 flex flex-col animate-fadeIn">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-stone-900">Account & Engine Settings</h3>
                <p className="text-xs text-stone-500">
                  Configure generation quality, model weights, and storage quotas.
                </p>
              </div>

              <div className="max-w-md p-4 rounded-xl bg-white border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-semibold text-stone-800">Diffusion Model</span>
                  <span className="font-mono-code text-stone-500">FLUX.1-Dev + LoRA</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-semibold text-stone-800">Garment Texture Retention</span>
                  <span className="font-mono-code text-emerald-600 font-bold">98.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Storage Region</span>
                  <span className="font-mono-code text-stone-500">AWS eu-west-1</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Animated Mouse Cursor (Visible in Video Mode) */}
        {mode === 'video' && (
          <div
            className="absolute pointer-events-none transition-all duration-300 z-50 transform -translate-x-1 -translate-y-1"
            style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
          >
            <div className="relative">
              <svg className="w-5 h-5 text-stone-900 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.438v-20.559z" />
              </svg>
              {cursorPos.clicking && (
                <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-rose-500/40 animate-ping" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Progress & Timeline Scrubber Bar */}
      <div className="px-3 sm:px-4 py-1.5 bg-white border-t border-stone-200 flex items-center justify-between gap-3 text-xs shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono-code text-[11px] text-stone-600 font-semibold">
            {Math.floor(currentTime / 60)}:{(currentTime % 60 < 10 ? '0' : '') + Math.floor(currentTime % 60)} / 0:10
          </span>
        </div>

        {/* Scrubber slider */}
        <div className="flex-1 max-w-md">
          <input
            type="range"
            min={0}
            max={totalDuration}
            step={0.1}
            value={currentTime}
            onChange={handleTimelineSeek}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
            title="Seek video position"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-500 font-mono-code hidden sm:inline">
            ● {currentTab.toUpperCase()}
          </span>
          <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded">
            Live Stream
          </span>
        </div>
      </div>
    </div>
  );
};

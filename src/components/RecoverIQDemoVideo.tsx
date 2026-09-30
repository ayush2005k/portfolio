import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  Building,
  RefreshCw,
  Film,
  MousePointer,
  Lock,
  Layers,
  FileText,
  DollarSign,
  Search,
  ExternalLink,
} from 'lucide-react';

interface AtRiskItem {
  id: string;
  merchant: string;
  amount: string;
  instrument: string;
  reason: string;
  mlProb: number;
  ev: string;
  action: string;
  priority: 'CRITICAL' | 'HIGH' | 'BLOCKED';
  actionClass: string;
}

const AT_RISK_ITEMS: AtRiskItem[] = [
  {
    id: 'pay_9f02e128',
    merchant: 'Zomato Merchant Ops',
    amount: '₹1,45,000',
    instrument: 'E-Mandate / SI',
    reason: 'Insufficient Funds',
    mlProb: 88.0,
    ev: '₹1,27,600',
    action: 'Retry Later (Smart Delay)',
    priority: 'CRITICAL',
    actionClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'pay_7d4a991c',
    merchant: 'UrbanPiper CloudTech',
    amount: '₹52,500',
    instrument: 'NetBanking',
    reason: 'Issuer / Gateway Glitch',
    mlProb: 84.0,
    ev: '₹37,550',
    action: 'Retry Later',
    priority: 'HIGH',
    actionClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'pay_c531ff0a',
    merchant: 'Swiggy Partner Cloud',
    amount: '₹38,000',
    instrument: 'UPI AutoPay',
    reason: 'Insufficient Funds',
    mlProb: 74.0,
    ev: '₹28,120',
    action: 'Send Customer Reminder',
    priority: 'HIGH',
    actionClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'pay_b018231e',
    merchant: 'Delhivery Hub 4',
    amount: '₹32,000',
    instrument: 'Credit / Debit Card',
    reason: 'Expired Card',
    mlProb: 68.0,
    ev: '₹18,400',
    action: 'Update Payment Method',
    priority: 'HIGH',
    actionClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'pay_091fc52b',
    merchant: 'Razorpay Test Merchant',
    amount: '₹15,000',
    instrument: 'NetBanking',
    reason: 'Issuer / Gateway Glitch',
    mlProb: 2.5,
    ev: '-₹30',
    action: 'Stop Recovery (Abandon)',
    priority: 'BLOCKED',
    actionClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'pay_44b1c87a',
    merchant: 'Licious Wholesale Ops',
    amount: '₹42,000',
    instrument: 'NetBanking',
    reason: 'OTP / 3DS Timeout',
    mlProb: 55.0,
    ev: '₹15,800',
    action: 'Escalate to Dedicated RM',
    priority: 'CRITICAL',
    actionClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'pay_e041982c',
    merchant: 'Dunzo Merchant Network',
    amount: '₹65,000',
    instrument: 'Credit / Debit Card',
    reason: 'Insufficient Funds',
    mlProb: 78.0,
    ev: '₹48,000',
    action: 'Send Instant Payment Link',
    priority: 'CRITICAL',
    actionClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
];

export const RecoverIQDemoVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [mode, setMode] = useState<'video' | 'interactive'>('video');
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'audit' | 'wizard'>('landing');
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, clicking: false });

  const totalDuration = 42; // 42 seconds timeline matching user video
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto timeline sequencer mirroring user's screen recording
  useEffect(() => {
    if (!isPlaying || mode !== 'video') return;

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev >= totalDuration ? 0 : Number((prev + 0.1).toFixed(1));

        // Milestones from video
        if (next < 13.0) {
          // Landing page walkthrough & scroll
          setActiveView('landing');
          setSelectedAuditId(null);
          if (next < 3.0) {
            setCursorPos({ x: 82, y: 22, clicking: false });
          } else if (next >= 3.0 && next < 6.0) {
            setCursorPos({ x: 50, y: 45, clicking: false });
          } else if (next >= 6.0 && next < 10.0) {
            setCursorPos({ x: 30, y: 70, clicking: false });
          } else {
            // Click "EXPLORE INTERACTIVE DEMO"
            setCursorPos({ x: 58, y: 38, clicking: next > 12.0 && next < 12.8 });
          }
        } else if (next >= 13.0 && next < 26.0) {
          // Dashboard view & inspecting metrics & queue
          setActiveView('dashboard');
          setSelectedAuditId(null);
          if (next < 17.0) {
            setCursorPos({ x: 25, y: 30, clicking: false });
          } else if (next >= 17.0 && next < 21.0) {
            setCursorPos({ x: 60, y: 48, clicking: false });
          } else if (next >= 21.0 && next < 25.0) {
            setCursorPos({ x: 88, y: 65, clicking: false });
          } else {
            // Switch to DECISION & AUDIT HISTORY tab
            setCursorPos({ x: 42, y: 15, clicking: next > 25.2 });
          }
        } else if (next >= 26.0 && next < 31.0) {
          // Decision & Audit History tab
          setActiveView('audit');
          setSelectedAuditId(null);
          if (next < 29.5) {
            setCursorPos({ x: 55, y: 38, clicking: false });
          } else {
            // Clicking first row (dec_933201 Zomato)
            setCursorPos({ x: 35, y: 42, clicking: true });
          }
        } else if (next >= 31.0 && next < 36.0) {
          // Decision Audit record drawer open
          setActiveView('audit');
          setSelectedAuditId('dec_933201');
          setCursorPos({ x: 80, y: 55, clicking: false });
        } else if (next >= 36.0 && next < 38.0) {
          // Back to landing / clicking CREATE WORKSPACE
          setActiveView('landing');
          setSelectedAuditId(null);
          setCursorPos({ x: 40, y: 38, clicking: next > 37.2 });
        } else {
          // Step 1 Merchant Onboarding Wizard modal
          setActiveView('wizard');
          setSelectedAuditId(null);
          setCursorPos({ x: 50, y: 65, clicking: false });
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
    setActiveView('landing');
    setSelectedAuditId(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#fdfcf9] text-[#1c1917] select-none font-sans overflow-hidden rounded-xl border border-stone-300 shadow-sm">
      {/* Top Application Bar (from user video) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white/95 backdrop-blur-xs border-b border-stone-200 shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#1c1917] flex items-center justify-center text-white text-xs font-serif font-black shadow-xs">
            R
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-[14px] tracking-tight text-stone-900">RecoverIQ</span>
            <span className="hidden sm:inline-block text-[9px] font-mono-code font-semibold text-stone-500 uppercase tracking-widest">
              AI REVENUE RECOVERY PLATFORM
            </span>
          </div>
        </div>

        {/* Global Nav Links from Video */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono-code text-stone-600">
          <button
            onClick={() => setActiveView('landing')}
            className={`hover:text-stone-900 transition-colors ${activeView === 'landing' ? 'font-bold text-stone-900 underline' : ''}`}
          >
            THE PROBLEM
          </button>
          <button
            onClick={() => setActiveView('landing')}
            className="hover:text-stone-900 transition-colors"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => setActiveView('landing')}
            className="hover:text-stone-900 transition-colors"
          >
            EXPECTED VALUE
          </button>
          <button
            onClick={() => setActiveView('landing')}
            className="hover:text-stone-900 transition-colors"
          >
            HUMAN CONTROL
          </button>
        </div>

        {/* Video Mode & Navigation Controls */}
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

          {/* Quick View Switches in Interactive Mode */}
          {mode === 'interactive' && (
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveView('landing')}
                className={`text-[10px] font-mono-code px-2 py-0.5 rounded border transition-colors ${
                  activeView === 'landing' ? 'bg-stone-900 text-white' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Landing
              </button>
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setSelectedAuditId(null);
                }}
                className={`text-[10px] font-mono-code px-2 py-0.5 rounded border transition-colors ${
                  activeView === 'dashboard' ? 'bg-stone-900 text-white' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveView('audit');
                  setSelectedAuditId(null);
                }}
                className={`text-[10px] font-mono-code px-2 py-0.5 rounded border transition-colors ${
                  activeView === 'audit' ? 'bg-stone-900 text-white' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Audit
              </button>
              <button
                onClick={() => setActiveView('wizard')}
                className={`text-[10px] font-mono-code px-2 py-0.5 rounded border transition-colors ${
                  activeView === 'wizard' ? 'bg-stone-900 text-white' : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                Wizard
              </button>
            </div>
          )}

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

      {/* Main Video Viewport Canvas */}
      <div className="relative flex-1 overflow-y-auto bg-[#faf8f5]">
        {/* VIEW 1: LANDING PAGE */}
        {activeView === 'landing' && (
          <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[10px] font-mono-code text-stone-500 pb-2 border-b border-stone-200">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                PLATFORM STATUS: ACTIVE
              </span>
              <span>EDITION: 2026.1</span>
            </div>

            {/* Hero Section */}
            <div className="text-center space-y-4 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-mono-code text-stone-700">
                <Sparkles className="w-3 h-3 text-amber-600" />
                AI-ASSISTED REVENUE RECOVERY FOR MODERN MERCHANTS
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-900 leading-[1.1]">
                Recover Failed Payments <br className="hidden sm:inline" />
                with Mathematical Precision.
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
                Connect your payment data, identify recoverable revenue, and get policy-verified recommendations for the single highest expected-value action.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveView('wizard')}
                  className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-mono-code text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>CREATE MERCHANT WORKSPACE</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-mono-code text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 text-stone-600 fill-stone-600" />
                  <span>EXPLORE INTERACTIVE DEMO</span>
                </button>
              </div>

              {/* Safe Evaluation Notice */}
              <div className="p-3 rounded-lg bg-stone-100/80 border border-stone-200 text-[11px] text-stone-600 max-w-xl mx-auto leading-normal">
                <strong>Safe Evaluation:</strong> Operates with human-in-the-loop oversight and test-mode simulation. Predictions and expected values are probabilistic estimates, not guaranteed outcomes.
              </div>
            </div>

            {/* The Status Quo Breakdown */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-amber-700">
                  THE STATUS QUO BREAKDOWN
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Why Traditional Recovery Fails Merchants
                </h2>
                <p className="text-xs text-stone-500">
                  Involuntary churn and transaction declines drain 3–12% of annual recurring revenue.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <span className="text-xs font-mono-code font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    01
                  </span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Blind, Naive Retries</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Retrying every 24 hours drains issuer goodwill, triggers card scheme fatigue penalties, and repeatedly fails on hard declines like expired cards or closed mandates.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <span className="text-xs font-mono-code font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    02
                  </span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Zero Signal Visibility</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Raw payment decline codes (e.g., ERR_51, DO_NOT_HONOR) are treated uniformly across gateways without context on customer lifetime value or recovery probability.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <span className="text-xs font-mono-code font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    03
                  </span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Compliance & Policy Risks</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Automated scripts often breach network quotas (e.g., maximum 3 retries in 72 hours under NPCI and card association guidelines), exposing merchants to scheme fines.
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Formula Box */}
            <div className="p-5 rounded-xl bg-stone-900 text-white space-y-3 shadow-sm">
              <span className="text-[10px] font-mono-code font-bold tracking-widest text-amber-400 uppercase">
                DECISION FORMULA
              </span>
              <h3 className="text-lg font-serif font-bold text-white">The Expected Value Framework</h3>
              <p className="text-xs text-stone-300">
                RecoverIQ replaces guesswork with an objective economic optimization equation:
              </p>
              <div className="p-3 rounded-lg bg-stone-800 border border-stone-700 font-mono-code text-xs sm:text-sm text-emerald-400 font-semibold text-center overflow-x-auto">
                Expected Value = (Probability of Recovery × Recoverable Amount) − Action Cost
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300 pt-1">
                <div>
                  <strong className="text-white font-mono-code">1. Recovery Likelihood (P):</strong> ML models scored against historical payment success.
                </div>
                <div>
                  <strong className="text-white font-mono-code">2. Recoverable Amount:</strong> Gross payment face value adjusted for relationship risk.
                </div>
                <div>
                  <strong className="text-white font-mono-code">3. Action Cost & Risk:</strong> Gateway fees, customer fatigue, and friction costs.
                </div>
              </div>
            </div>

            {/* Synthetic Benchmark Callout */}
            <div className="p-5 rounded-xl bg-white border border-stone-200 text-center space-y-2">
              <span className="text-[10px] font-mono-code font-bold text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded-full">
                ⚡ INTERACTIVE DEMO READY
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                See RecoverIQ in Action with 6,840 Synthetic Transactions
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Experience real-time recovery queues, expected-value scoring, policy verification, and simulation engine without configuring real gateways.
              </p>
              <button
                onClick={() => setActiveView('dashboard')}
                className="mt-2 px-4 py-2 rounded-lg bg-stone-900 text-white font-mono-code text-xs font-bold hover:bg-stone-800 cursor-pointer"
              >
                LAUNCH DEMO WORKSPACE →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: DASHBOARD */}
        {activeView === 'dashboard' && (
          <div className="p-3 sm:p-5 space-y-4 animate-fadeIn">
            {/* Dashboard Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                    Acme Global Commerce (Demo)
                  </h2>
                  <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    TEST MODE
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Subscription SaaS & E-commerce • Policy-verified recovery intelligence & expected-value optimization
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  ENGINE ONLINE
                </span>
                <button
                  onClick={() => setActiveView('wizard')}
                  className="px-3 py-1.5 rounded-md bg-stone-900 text-white text-xs font-mono-code font-bold hover:bg-stone-800 cursor-pointer"
                >
                  RUN AZ STRATEGY
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 text-xs font-mono-code">
              <button
                onClick={() => setActiveView('dashboard')}
                className="pb-2 border-b-2 border-stone-900 font-bold text-stone-900"
              >
                01. DASHBOARD
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className="pb-2 text-stone-500 hover:text-stone-900"
              >
                02. RECOVERY QUEUE (42)
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className="pb-2 text-stone-500 hover:text-stone-900"
              >
                03. BASELINE BENCHMARK
              </button>
              <button
                onClick={() => setActiveView('audit')}
                className="pb-2 text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                04. DECISION & AUDIT HISTORY
              </button>
            </div>

            {/* Hero Banner Quote */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                The Art of Strategic Recovery.
              </h3>
              <p className="text-xs text-stone-600 italic">
                "Blind retries merely consume authorization goodwill; intelligent routing treats every failure as an economic optimization problem."
              </p>
              <p className="text-[11px] text-stone-500 pt-1">
                Evaluating failure taxonomy, customer relationship capital, and deterministic regulatory guardrails to orchestrate the single highest expected-value intervention.
              </p>
            </div>

            {/* Executive Summary Cards (5 from Video) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block">
                  CAPITAL AT RISK
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono-code text-stone-900 block mt-1">
                  ₹84.20L
                </span>
                <span className="text-[10px] text-stone-500">1,420 Active Declines</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block">
                  PREDICTED RECOVERABLE
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono-code text-sky-700 block mt-1">
                  ₹63.15L
                </span>
                <span className="text-[10px] text-sky-700 font-semibold">75.0% yield · MAX EV</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block">
                  REVENUE RECOVERED
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono-code text-emerald-700 block mt-1">
                  ₹51.80L
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">+₹18.40L (55.1%) REALIZED</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block">
                  INCREMENTAL LIFT
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono-code text-indigo-700 block mt-1">
                  ₹18.40L
                </span>
                <span className="text-[10px] text-indigo-700 font-semibold">+55.1% vs static retry</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono-code font-bold uppercase text-stone-500 block">
                  RECOVERY RATE
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono-code text-stone-900 block mt-1">
                  61.5%
                </span>
                <span className="text-[10px] text-stone-500">vs 39.6% baseline</span>
              </div>
            </div>

            {/* Comparison Graph Mockup */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono-code font-bold text-stone-800">
                    RECOVERIQ AI STRATEGY VS. NAIVE BASELINE
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Cumulative recovered revenue comparison over current synthetic billing cycle
                  </p>
                </div>
                <span className="text-xs font-mono-code font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +₹18.40L (+55.1% Alpha)
                </span>
              </div>

              {/* Chart Line Visual */}
              <div className="h-24 sm:h-28 w-full relative pt-2">
                <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="500" y2="25" stroke="#f1f5f9" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeDasharray="3,3" />

                  {/* Baseline curve (gray dotted) */}
                  <path
                    d="M 0,85 Q 120,80 250,72 T 500,60"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* RecoverIQ AI Strategy Curve (emerald) */}
                  <path
                    d="M 0,85 Q 120,70 250,45 T 500,15"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                  />
                </svg>

                <div className="flex items-center justify-between text-[10px] font-mono-code text-stone-400 pt-1">
                  <span>5 AUG</span>
                  <span>12 AUG</span>
                  <span>19 AUG</span>
                  <span>26 AUG</span>
                  <span>CURRENT (SEP 28)</span>
                </div>
              </div>
            </div>

            {/* High-Priority At-Risk Queue Table */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-900">
                    High-Priority At-Risk Queue
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Payment failures requiring automated or operator-guided routing
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('audit')}
                  className="text-xs font-mono-code text-indigo-700 hover:underline cursor-pointer"
                >
                  View Full Audit Ledger →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-mono-code text-[10px] uppercase">
                      <th className="pb-2">Payment ID</th>
                      <th className="pb-2">Merchant Client</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Instrument</th>
                      <th className="pb-2">ML Prob</th>
                      <th className="pb-2">Expected Value</th>
                      <th className="pb-2">AI Recommended Action</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {AT_RISK_ITEMS.slice(0, 5).map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-2.5 font-mono-code text-stone-600">{item.id}</td>
                        <td className="py-2.5 font-semibold text-stone-900">{item.merchant}</td>
                        <td className="py-2.5 font-mono-code font-bold text-stone-900">{item.amount}</td>
                        <td className="py-2.5 text-stone-600 text-[11px]">{item.instrument}</td>
                        <td className="py-2.5 font-mono-code font-semibold text-emerald-700">
                          {item.mlProb}%
                        </td>
                        <td className="py-2.5 font-mono-code font-bold text-stone-900">{item.ev}</td>
                        <td className="py-2.5">
                          <span className={`text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded border ${item.actionClass}`}>
                            {item.action}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            onClick={() => {
                              setActiveView('audit');
                              setSelectedAuditId(item.id === 'pay_9f02e128' ? 'dec_933201' : 'dec_933200');
                            }}
                            className="text-[11px] font-mono-code font-semibold text-stone-800 hover:text-indigo-600 cursor-pointer"
                          >
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: DECISION & AUDIT HISTORY */}
        {activeView === 'audit' && (
          <div className="p-3 sm:p-5 space-y-4 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                  Decision & Audit History Ledger
                </h2>
                <p className="text-xs text-stone-500">
                  Immutable record of automated actions, policy overrides, and expected-value selections
                </p>
              </div>
              <button
                onClick={() => setActiveView('dashboard')}
                className="px-3 py-1.5 rounded bg-white border border-stone-300 text-xs font-mono-code text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                ← Back to Dashboard
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
              <span className="text-stone-500 text-[11px]">Filters:</span>
              <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                All Policy States
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                All Execution States
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                All Actions
              </span>
              <span className="ml-auto text-stone-500 text-[11px]">Showing 34 matching records</span>
            </div>

            {/* Decision records table */}
            <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono-code text-[10px] uppercase">
                      <th className="py-2.5 px-3">Decision ID</th>
                      <th className="py-2.5 px-3">Payment ID</th>
                      <th className="py-2.5 px-3">Customer Contact</th>
                      <th className="py-2.5 px-3">Gross Amount</th>
                      <th className="py-2.5 px-3">Model Score</th>
                      <th className="py-2.5 px-3">Recommended Action</th>
                      <th className="py-2.5 px-3">Expected Value</th>
                      <th className="py-2.5 px-3">Policy Verification</th>
                      <th className="py-2.5 px-3">Execution State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr
                      onClick={() => setSelectedAuditId('dec_933201')}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        selectedAuditId === 'dec_933201' ? 'bg-amber-50/80 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">dec_933201</td>
                      <td className="py-3 px-3 font-mono-code text-stone-600">pay_9f02e128</td>
                      <td className="py-3 px-3 font-semibold text-stone-900">Zomato Merchant Ops</td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹1,45,000</td>
                      <td className="py-3 px-3 font-mono-code text-emerald-700 font-bold">88.0%</td>
                      <td className="py-3 px-3">
                        <span className="font-mono-code text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          Retry Later (Smart Delay)
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹1,27,600</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          SATISFIED (4/4 gates)
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          SCHEDULED
                        </span>
                      </td>
                    </tr>

                    <tr
                      onClick={() => setSelectedAuditId('dec_933200')}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        selectedAuditId === 'dec_933200' ? 'bg-amber-50/80 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">dec_933200</td>
                      <td className="py-3 px-3 font-mono-code text-stone-600">pay_7d4a991c</td>
                      <td className="py-3 px-3 font-semibold text-stone-900">UrbanPiper CloudTech</td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹52,500</td>
                      <td className="py-3 px-3 font-mono-code text-emerald-700 font-bold">84.0%</td>
                      <td className="py-3 px-3">
                        <span className="font-mono-code text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          Retry Later
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹37,550</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          SATISFIED
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          SCHEDULED
                        </span>
                      </td>
                    </tr>

                    <tr
                      onClick={() => setSelectedAuditId('dec_933199')}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        selectedAuditId === 'dec_933199' ? 'bg-amber-50/80 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">dec_933199</td>
                      <td className="py-3 px-3 font-mono-code text-stone-600">pay_c531ff0a</td>
                      <td className="py-3 px-3 font-semibold text-stone-900">Swiggy Partner Cloud</td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹38,000</td>
                      <td className="py-3 px-3 font-mono-code text-emerald-700 font-bold">74.0%</td>
                      <td className="py-3 px-3">
                        <span className="font-mono-code text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                          Send Customer Reminder
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹28,120</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          SATISFIED
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          PENDING
                        </span>
                      </td>
                    </tr>

                    <tr
                      onClick={() => setSelectedAuditId('dec_933198')}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        selectedAuditId === 'dec_933198' ? 'bg-amber-50/80 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">dec_933198</td>
                      <td className="py-3 px-3 font-mono-code text-stone-600">pay_091fc52b</td>
                      <td className="py-3 px-3 font-semibold text-stone-900">Razorpay Test Merchant</td>
                      <td className="py-3 px-3 font-mono-code font-bold text-stone-900">₹15,000</td>
                      <td className="py-3 px-3 font-mono-code text-rose-700 font-bold">2.5%</td>
                      <td className="py-3 px-3">
                        <span className="font-mono-code text-[11px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                          Stop Recovery (Abandon)
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono-code font-bold text-rose-700">-₹30</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          BLOCKED
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono-code font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                          STOPPED
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Slide-over Audit Record Drawer when item selected */}
            {selectedAuditId && (
              <div className="p-4 sm:p-5 rounded-xl bg-stone-900 text-white shadow-xl space-y-4 border border-stone-800 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-xs font-bold text-amber-400">
                      DECISION AUDIT RECORD {selectedAuditId}
                    </span>
                    <span className="text-[10px] font-mono-code bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded">
                      SCHEDULED
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedAuditId(null)}
                    className="text-stone-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-white">Zomato Merchant Ops</h3>
                  <div className="text-right">
                    <span className="text-[10px] font-mono-code text-stone-400 block">PAYMENT AT-RISK GROSS</span>
                    <span className="text-base font-mono-code font-bold text-emerald-400">₹1,45,000</span>
                  </div>
                </div>

                {/* Audit Tabs */}
                <div className="flex gap-4 text-xs font-mono-code border-b border-stone-800 pb-2 text-stone-400">
                  <span className="text-white font-bold border-b border-amber-400 pb-1">
                    01. DECISION SUMMARY
                  </span>
                  <span>02. INPUT FEATURES</span>
                  <span>03. CANDIDATES & EV</span>
                  <span>04. POLICY CHECKS</span>
                </div>

                {/* Audit details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 space-y-1.5">
                    <span className="text-[10px] font-mono-code text-stone-400 uppercase block">
                      1. Decision-Time Payment Snapshot
                    </span>
                    <p className="text-stone-300">
                      Payment ID: <strong className="text-white font-mono-code">pay_9f02e128</strong>
                    </p>
                    <p className="text-stone-300">
                      Gross Amount: <strong className="text-white font-mono-code">₹1,45,000</strong>
                    </p>
                    <p className="text-stone-300">
                      Decline Reason:{' '}
                      <span className="text-rose-300 font-mono-code">ERR_INSUFFICIENT_FUNDS_51</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 space-y-1.5">
                    <span className="text-[10px] font-mono-code text-stone-400 uppercase block">
                      2. AI Recovery Decision Engine Selection
                    </span>
                    <p className="text-stone-300">
                      Selected Strategy:{' '}
                      <strong className="text-emerald-400">Retry Later (Smart Delay)</strong>
                    </p>
                    <p className="text-stone-300">
                      Model Recovery Probability: <strong className="text-white font-mono-code">88.0%</strong>
                    </p>
                    <p className="text-stone-300">
                      Expected Recovery (EV):{' '}
                      <strong className="text-emerald-400 font-mono-code">₹1,27,600</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-300 italic">
                  <strong>Why RecoverIQ Selected This Action:</strong> "Customer operates on a bimonthly treasury settlement cycle. Scheduled retry timed for 6 hours post-failure, aligning with afternoon liquidity clearing."
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: MERCHANT ONBOARDING WIZARD MODAL */}
        {activeView === 'wizard' && (
          <div className="min-h-full p-4 sm:p-8 flex items-center justify-center animate-fadeIn bg-stone-900/10">
            <div className="w-full max-w-lg rounded-xl bg-white border border-stone-300 shadow-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Merchant Onboarding Wizard
                  </h3>
                  <span className="text-[10px] font-mono-code text-stone-500 uppercase">
                    RECOVERIQ WORKSPACE SETUP • STEP 1 OF 4
                  </span>
                </div>
                <button
                  onClick={() => setActiveView('landing')}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-amber-700 block">
                    STEP 01: IDENTITY & JURISDICTION
                  </span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 mt-0.5">
                    Merchant Organization Details
                  </h4>
                  <p className="text-stone-500 text-[11px]">
                    Define your business entity and base operating currency for expected-value recovery calculations.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-mono-code text-[11px] font-bold text-stone-700 block">
                    MERCHANT / COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Global SaaS, Urban Retail, Bharat Payments"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono-code text-stone-800 bg-stone-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono-code text-[11px] font-bold text-stone-700 block">
                    PRIMARY CONTACT / LEAD NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    defaultValue="Aditi Sharma, Head of Payments"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono-code text-stone-800 bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-mono-code text-[10px] font-bold text-stone-700 block">
                      OPERATIVE COUNTRY
                    </label>
                    <div className="px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono-code bg-stone-50 text-stone-800">
                      India (IN)
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono-code text-[10px] font-bold text-stone-700 block">
                      OPERATING SETTLEMENT CURRENCY
                    </label>
                    <div className="px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono-code bg-stone-50 text-stone-800">
                      INR - Indian Rupee (₹)
                    </div>
                  </div>
                </div>

                {/* Data Sovereignty Notice */}
                <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Sovereignty Note:</strong> All recovery policies are automatically filtered according to local sovereign rules (e.g. RBI e-mandate guidelines, European PSD2 SCA exemptions).
                  </span>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <button
                  onClick={() => setActiveView('landing')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-code text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white font-mono-code text-xs font-bold hover:bg-stone-800 cursor-pointer"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </div>
        )}

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
                <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-amber-500/40 animate-ping" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Progress & Timeline Scrubber Bar (Matching Screen Recording) */}
      <div className="px-3 sm:px-4 py-1.5 bg-white border-t border-stone-200 flex items-center justify-between gap-3 text-xs shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono-code text-[11px] text-stone-600 font-semibold">
            {Math.floor(currentTime / 60)}:{(currentTime % 60 < 10 ? '0' : '') + Math.floor(currentTime % 60)} / 0:42
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
            ●{' '}
            {activeView === 'landing'
              ? 'Landing Page'
              : activeView === 'dashboard'
              ? 'Acme Global Commerce Dashboard'
              : activeView === 'audit'
              ? 'Decision & Audit Ledger'
              : 'Merchant Onboarding Wizard'}
          </span>
          <span className="text-[10px] font-bold font-mono-code text-stone-900 uppercase bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            Video Walkthrough
          </span>
        </div>
      </div>
    </div>
  );
};

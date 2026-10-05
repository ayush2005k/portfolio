import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Activity, CheckCircle, ChevronRight, Sliders, BarChart2, ShieldCheck, Film, MousePointer } from 'lucide-react';

interface PlayerData {
  id: string;
  name: string;
  role: 'FWD' | 'MID' | 'DEF' | 'GKP';
  team: string;
  price: string;
  form: string;
  pts: number;
  confidence: number;
  models: {
    linear: number;
    rf: number;
    xgb: number;
  };
  metrics: {
    mae: number;
    rmse: number;
    r2: number;
  };
  recommendation: string;
  recDescription: string;
  reasons: string[];
  summary: string;
  shap: { label: string; value: number }[];
  stats: {
    totalPts: number;
    goals: number;
    assists: number;
    ict: number;
  };
}

const PLAYERS: PlayerData[] = [
  {
    id: 'haaland',
    name: 'Erling Haaland',
    role: 'FWD',
    team: 'Man City',
    price: '£14.5m',
    form: '9.2',
    pts: 12.2,
    confidence: 69,
    models: { linear: 7.8, rf: 12.1, xgb: 13.1 },
    metrics: { mae: 1.48, rmse: 0.87, r2: 0.84 },
    recommendation: 'ESSENTIAL CAPTAIN',
    recDescription: 'Strongest statistical pick for this gameweek based on form and fixture.',
    reasons: [
      "Top-tier 'Hot Streak' detected (Form > 8.0)",
      'High tactical engagement: ICT Index indicates high involvement',
      'Model predicts positive regression vs current form',
    ],
    summary:
      'Erling Haaland is the most essential asset in Fantasy Premier League due to his elite goal-scoring frequency and league-leading expected points.',
    shap: [
      { label: 'Recent Form', value: 88 },
      { label: 'ICT Index', value: 65 },
      { label: 'xGI / Expected', value: 45 },
      { label: 'vs Opponent', value: 25 },
    ],
    stats: { totalPts: 185, goals: 22, assists: 3, ict: 15.2 },
  },
  {
    id: 'kdb',
    name: 'Kevin De Bruyne',
    role: 'MID',
    team: 'Man City',
    price: '£10.5m',
    form: '7.2',
    pts: 9.5,
    confidence: 63,
    models: { linear: 5.9, rf: 10.0, xgb: 10.3 },
    metrics: { mae: 1.52, rmse: 0.88, r2: 0.82 },
    recommendation: 'STRONG HOLD',
    recDescription: 'Creative engine with high assist probability and dead-ball threat.',
    reasons: [
      'Model predicts positive regression vs current form',
      'High shot-creation actions per 90 across recent appearances',
      'Expected assists (xA) significantly outperforming baseline midfield average',
    ],
    summary:
      'Kevin De Bruyne is currently showing strong form heading into a favorable gameweek fixture with high playmaking upside.',
    shap: [
      { label: 'Recent Form', value: 72 },
      { label: 'ICT Index', value: 85 },
      { label: 'xGI / Expected', value: 60 },
      { label: 'vs Opponent', value: 38 },
    ],
    stats: { totalPts: 85, goals: 4, assists: 12, ict: 11.5 },
  },
  {
    id: 'harrison',
    name: 'Jack Harrison',
    role: 'MID',
    team: 'Everton',
    price: '£5.5m',
    form: '6.0',
    pts: 6.3,
    confidence: 71.5,
    models: { linear: 4.3, rf: 6.8, xgb: 6.8 },
    metrics: { mae: 1.62, rmse: 0.9, r2: 0.8 },
    recommendation: 'MONITOR',
    recDescription: 'Budget differential with steady wing involvement and set-piece share.',
    reasons: [
      'Model predicts positive regression vs current form',
      'Cost-effective budget enabler with guaranteed starter minutes',
      'Slight increase in box entries over last 3 gameweeks',
    ],
    summary:
      'Jack Harrison is steadily showing form heading into a crucial gameweek match, offering strong budget value.',
    shap: [
      { label: 'Recent Form', value: 55 },
      { label: 'ICT Index', value: 48 },
      { label: 'xGI / Expected', value: 35 },
      { label: 'vs Opponent', value: 20 },
    ],
    stats: { totalPts: 82, goals: 3, assists: 3, ict: 7.2 },
  },
  {
    id: 'konate',
    name: 'Ibrahima Konate',
    role: 'DEF',
    team: 'Liverpool',
    price: '£5.4m',
    form: '6.0',
    pts: 6.1,
    confidence: 66.8,
    models: { linear: 4.0, rf: 7.2, xgb: 5.9 },
    metrics: { mae: 1.59, rmse: 0.84, r2: 0.9 },
    recommendation: 'STARTING DEFENDER',
    recDescription: 'High clean-sheet probability with aerial threat from attacking corners.',
    reasons: [
      'Top defensive solidity index and expected clean sheet probability > 48%',
      'Dominant aerial duel success rate (78%) in the penalty area',
      'Favorable defensive fixture difficulty rating for the upcoming run',
    ],
    summary:
      'Ibrahima Konate offers solid defensive stability and aerial threat on set-pieces for Liverpool with clean sheet upside.',
    shap: [
      { label: 'Defensive Form', value: 68 },
      { label: 'ICT Index', value: 32 },
      { label: 'xCS / Clean Sheet', value: 62 },
      { label: 'vs Opponent', value: 45 },
    ],
    stats: { totalPts: 88, goals: 1, assists: 0, ict: 4.8 },
  },
];

const TEAMS = ['ALL TEAMS', 'ARSENAL', 'ASTON VILLA', 'CHELSEA', 'EVERTON', 'LIVERPOOL', 'MAN CITY'];

export const ScoutAIDemoVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [mode, setMode] = useState<'video' | 'interactive' | 'mp4'>('video');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('haaland');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL TEAMS');
  const [cursorPos, setCursorPos] = useState({ x: 25, y: 35, clicking: false });

  const totalDuration = 36; // 36-second demo timeline matching user video
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto timeline sequencer mirroring user's screen recording
  useEffect(() => {
    if (!isPlaying || mode !== 'video') return;

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev >= totalDuration ? 0 : Number((prev + 0.1).toFixed(1));

        // Scripted interactions corresponding to video milestones
        if (next < 5.0) {
          setSelectedPlayerId('haaland');
          setSelectedTeam('MAN CITY');
          setCursorPos({ x: 18, y: 32, clicking: next > 4.5 && next < 5.0 });
        } else if (next >= 5.0 && next < 11.0) {
          setSelectedPlayerId('kdb');
          setSelectedTeam('MAN CITY');
          setCursorPos({ x: 18, y: 46, clicking: next > 10.2 && next < 10.8 });
        } else if (next >= 11.0 && next < 17.0) {
          setSelectedTeam('EVERTON');
          setSelectedPlayerId('harrison');
          setCursorPos({ x: 18, y: 42, clicking: next > 16.2 && next < 16.8 });
        } else if (next >= 17.0 && next < 25.0) {
          setSelectedTeam('LIVERPOOL');
          setSelectedPlayerId('konate');
          setCursorPos({ x: 18, y: 35, clicking: next > 24.0 && next < 24.6 });
        } else {
          // Inspecting SHAP analysis & stats
          setCursorPos({ x: 55, y: 72, clicking: false });
        }

        return next;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, mode]);

  const activePlayer = PLAYERS.find((p) => p.id === selectedPlayerId) || PLAYERS[0];

  const handleTimelineSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setSelectedPlayerId('haaland');
    setSelectedTeam('MAN CITY');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#f8fafc] text-[#0f172a] select-none font-sans overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      {/* Top Application Bar (from user video) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border-b border-slate-200 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
            ⚽
          </div>
          <div>
            <span className="font-bold text-[13px] tracking-tight text-slate-900">Scout AI Pro</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-1.5 py-0.5 rounded">
              Prediction Engine
            </span>
          </div>
        </div>

        {/* Search Mockup */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-400 w-64">
          <span>🔍</span>
          <span className="truncate">Find any player or team...</span>
        </div>

        {/* Video Mode & Timeline Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium border border-slate-200">
            <button
              onClick={() => setMode('video')}
              className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'video' ? 'bg-white text-indigo-600 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
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
                mode === 'interactive' ? 'bg-white text-indigo-600 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-900'
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
              className="p-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
              title={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Reset */}
          <button
            onClick={handleRestart}
            className="p-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            title="Restart video walkthrough"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="relative flex-1 grid grid-cols-12 overflow-hidden bg-slate-50/50">
        {/* Left Column: Players List & Team Filters */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Players <span className="text-indigo-600 font-mono">(198)</span>
            </span>
            <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
              ● Active
            </span>
          </div>

          {/* Quick Team Filter Bar */}
          <div className="p-2 border-b border-slate-100 flex gap-1 overflow-x-auto no-scrollbar">
            {TEAMS.map((team) => (
              <button
                key={team}
                onClick={() => {
                  setSelectedTeam(team);
                  if (mode === 'interactive') {
                    const match = PLAYERS.find((p) => p.team.toUpperCase() === team);
                    if (match) setSelectedPlayerId(match.id);
                  }
                }}
                className={`text-[9px] font-semibold px-2 py-0.5 rounded whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTeam === team
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Player Cards List */}
          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
            {PLAYERS.map((player) => {
              const isSelected = player.id === activePlayer.id;
              return (
                <div
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayerId(player.id);
                    setSelectedTeam(player.team.toUpperCase());
                  }}
                  className={`p-2.5 flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {player.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-900 leading-tight flex items-center gap-1">
                        {player.name}
                        <span className="text-[9px] font-normal text-slate-500 uppercase">({player.role})</span>
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {player.team} · <span className="font-medium text-slate-700">{player.price}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ★ {player.form}
                    </span>
                    <p className="text-[9px] font-semibold text-indigo-600 mt-0.5">
                      {player.pts} pts
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center / Right Content: Player Analytics & Forecast */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 p-3 sm:p-4 overflow-y-auto flex flex-col gap-3">
          {/* Player Header Banner */}
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {activePlayer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {activePlayer.name}
                  <span className="ml-2 text-xs font-semibold text-slate-500 uppercase">
                    {activePlayer.role}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {activePlayer.team} · {activePlayer.price} · Form: <strong className="text-slate-800">{activePlayer.form}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500 text-white shadow-2xs uppercase tracking-wide">
                {activePlayer.recommendation}
              </span>
              <span className="text-xs text-slate-400">GW26</span>
            </div>
          </div>

          {/* Forecast & XAI Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Ensemble Forecast Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Ensemble Forecast
                </span>
                <span className="text-[11px] font-bold text-indigo-600">
                  {activePlayer.confidence}% Confidence
                </span>
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                  {activePlayer.pts}
                </span>
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Predicted PTS
                </span>
              </div>

              {/* Confidence progress */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${activePlayer.confidence}%` }}
                />
              </div>

              {/* Model Consensus Bars */}
              <div className="space-y-1.5 pt-1 text-xs">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Model Consensus
                </p>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Linear Regression</span>
                  <span className="font-mono font-semibold text-slate-900">{activePlayer.models.linear}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Random Forest</span>
                  <span className="font-mono font-semibold text-slate-900">{activePlayer.models.rf}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-indigo-600">XGBoost (Optimal)</span>
                  <span className="font-mono font-bold text-indigo-600">{activePlayer.models.xgb}</span>
                </div>
              </div>
            </div>

            {/* Explainable AI & Scouting Summary */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Prediction Intelligence & XAI
                </span>
                <div className="space-y-1.5 mb-3">
                  {activePlayer.reasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 italic">
                "{activePlayer.summary}"
              </div>
            </div>
          </div>

          {/* Bottom Row: SHAP Feature Importance & Player Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Feature Importance (SHAP Analysis) */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Feature Importance (SHAP Analysis)
              </span>
              <div className="space-y-2">
                {activePlayer.shap.map((item) => (
                  <div key={item.label} className="text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-mono font-semibold text-indigo-600">+{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Player Stats */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Overall Player Stats
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Points</p>
                  <p className="text-xl font-bold text-slate-900 mt-0.5">{activePlayer.stats.totalPts}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Goals Scored</p>
                  <p className="text-xl font-bold text-emerald-600 mt-0.5">{activePlayer.stats.goals}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Assists</p>
                  <p className="text-xl font-bold text-amber-600 mt-0.5">{activePlayer.stats.assists}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">ICT Index</p>
                  <p className="text-xl font-bold text-indigo-600 mt-0.5">{activePlayer.stats.ict}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Mouse Cursor (Visible in Video Mode) */}
        {mode === 'video' && (
          <div
            className="absolute pointer-events-none transition-all duration-300 z-50 transform -translate-x-1 -translate-y-1"
            style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
          >
            <div className="relative">
              <svg className="w-5 h-5 text-slate-900 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.438v-20.559z" />
              </svg>
              {cursorPos.clicking && (
                <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-indigo-500/40 animate-ping" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Progress & Timeline Scrubber Bar (From Screen Recording) */}
      <div className="px-3 sm:px-4 py-1.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 text-xs shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-slate-600 font-semibold">
            {Math.floor(currentTime / 60)}:{(currentTime % 60 < 10 ? '0' : '') + Math.floor(currentTime % 60)} / 0:36
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
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            title="Seek video position"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            ● {activePlayer.name} ({activePlayer.pts} pts)
          </span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
            Live Stream
          </span>
        </div>
      </div>
    </div>
  );
};

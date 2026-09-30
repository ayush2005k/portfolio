import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Bookmark, Send, ExternalLink, MapPin, Briefcase, GraduationCap, Check, Sparkles } from 'lucide-react';

interface WallOfPortfoliosFrameProps {
  children: React.ReactNode;
  onContactClick: () => void;
  onCloseFrame: () => void;
}

export const WallOfPortfoliosFrame: React.FC<WallOfPortfoliosFrameProps> = ({
  children,
  onContactClick,
  onCloseFrame,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'profile' | 'projects'>('portfolio');

  return (
    <div className="min-h-screen bg-[#f4f3f6] flex flex-col font-sans-ui text-[#2a2438]">
      {/* Wall of Portfolios Top Header */}
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-[#e5e3e8] px-4 sm:px-8 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#f62477] text-white flex items-center justify-center font-extrabold text-xs">
              W
            </span>
            <span className="font-bold text-sm tracking-tight text-[#100e11]">
              Wall of Portfolios
            </span>
          </div>

          <span className="text-xs text-[#9da1aa] hidden md:inline">/</span>
          <span className="text-xs font-mono-code text-[#706c72] hidden md:inline">
            portfolios/ayush-kumar-singh
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCloseFrame}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#100e11] text-white hover:bg-[#2a2438] transition-colors"
          >
            Standalone Site View
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar + Embedded Portfolio Canvas */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        {/* Left Column: Creator Profile Card on Wall of Portfolios */}
        <aside className="h-fit bg-white rounded-2xl border border-[#e5e3e8] p-6 shadow-xs flex flex-col space-y-6">
          {/* Top Avatar & Status */}
          <div className="flex items-start justify-between">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#2a2438] to-[#5d2f78] text-white flex items-center justify-center font-display text-2xl font-bold border-2 border-white shadow-md">
                AS
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to Work</span>
            </div>
          </div>

          {/* Name & Title */}
          <div>
            <h1 className="font-display text-2xl font-bold text-[#100e11]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs font-semibold text-[#f62477] mt-0.5">
              {PERSONAL_INFO.shortRole}
            </p>
            <p className="text-xs text-[#706c72] mt-2 leading-relaxed">
              {PERSONAL_INFO.roleTitle}
            </p>
          </div>

          {/* Location & Quick Meta */}
          <div className="space-y-2 pt-3 border-t border-[#f0edf2] text-xs text-[#505054]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#a6a1a5]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-[#a6a1a5]" />
              <span>3 Technical Internships (Railways, Screener Buddy, Digital Soch)</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#a6a1a5]" />
              <span>B.Tech CSE (AI & ML) &middot; VIT Bhopal &rsquo;27</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onContactClick}
              className="w-full py-2.5 px-3 rounded-xl bg-[#100e11] text-white text-xs font-semibold hover:bg-[#2a2438] transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Message</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                bookmarked
                  ? 'bg-[#fff0f6] border-[#ffd1e3] text-[#c41457]'
                  : 'bg-white border-[#e5e3e8] text-[#505054] hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>

          {/* Club & Community Spotlight */}
          <div className="p-4 rounded-xl bg-[#faf8fb] border border-[#ece9ee]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#c41457] font-mono-code mb-1">
              <Sparkles className="w-3 h-3" />
              <span>FOUNDER SPOTLIGHT</span>
            </div>
            <p className="text-xs font-bold text-[#2a2438]">
              {PERSONAL_INFO.club.name}
            </p>
            <p className="text-[11px] text-[#706c72] mt-1 leading-normal">
              {PERSONAL_INFO.club.description}
            </p>
          </div>
        </aside>

        {/* Right Column: Embedded Canvas Window */}
        <main className="bg-white rounded-2xl border border-[#e5e3e8] shadow-xs overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FEATURED_PROJECTS, ADDITIONAL_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowRight, Sparkles, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { ScoutAIDemoVideo } from './ScoutAIDemoVideo';
import { RecoverIQDemoVideo } from './RecoverIQDemoVideo';
import { OutfitLockDemoVideo } from './OutfitLockDemoVideo';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <section id="work" className="pt-14 pb-4 border-b border-[#ece9ee]">
      {/* Section Label */}
      <div className="flex items-center gap-6 px-7 sm:px-10 mb-8">
        <span className="text-[#77737a] text-[13px] font-bold tracking-[0.08em] uppercase">
          Selected Work
        </span>
        <div className="flex-1 h-px bg-[#ece9ee]" />
      </div>

      {/* Featured Project Cards */}
      <div className="flex flex-col divide-y divide-[#ece9ee]">
        {FEATURED_PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="group px-7 sm:px-10 py-12 transition-colors hover:bg-[#fcfbfd]"
          >
            {/* Project Mockup / Visual Window */}
            <div
              className={`relative rounded-xl border border-[#ece9ee] overflow-hidden mb-6 shadow-xs group-hover:shadow-md transition-shadow bg-gradient-to-br ${
                project.id === 'scout-ai-pro' || project.id === 'recover-iq' || project.id === 'outfitlock-ai'
                  ? 'h-[540px] sm:h-[600px] md:h-[640px] p-0 flex flex-col'
                  : 'aspect-16/9 p-6 sm:p-8 flex flex-col justify-between cursor-pointer'
              } ${
                index === 0
                  ? 'from-[#f0fbf6] via-[#fafdfc] to-[#ffffff]'
                  : index === 1
                  ? 'from-[#fff2f7] via-[#fdfafb] to-[#ffffff]'
                  : 'from-[#faf9f6] via-[#fcfbf9] to-[#ffffff]'
              }`}
              onClick={
                project.id === 'scout-ai-pro' || project.id === 'recover-iq' || project.id === 'outfitlock-ai'
                  ? undefined
                  : () => onSelectProject(project)
              }
            >
              {/* Window Bar (only for cards other than scout-ai-pro, outfitlock-ai, and recover-iq which have their own top application bars) */}
              {project.id !== 'scout-ai-pro' && project.id !== 'recover-iq' && project.id !== 'outfitlock-ai' && (
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                    <span className="ml-2 font-mono-code text-[11px] text-[#706c72]">
                      {project.id}.ai/preview
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/5 text-[#505054]">
                    {project.category}
                  </span>
                </div>
              )}

              {/* Scout AI Pro: Real Video Demo & Interactive Prediction Engine */}
              {project.id === 'scout-ai-pro' && (
                <ScoutAIDemoVideo />
              )}

              {/* OutfitLock AI: Video Walkthrough & Interactive Fashion Generation Engine */}
              {project.id === 'outfitlock-ai' && (
                <OutfitLockDemoVideo />
              )}

              {/* RecoverIQ: Real Screen Recording Video Demo & Interactive Revenue Recovery Engine */}
              {project.id === 'recover-iq' && (
                <RecoverIQDemoVideo />
              )}

              {/* Bottom Tech Pills (for static cards) */}
              {project.id !== 'scout-ai-pro' && project.id !== 'recover-iq' && project.id !== 'outfitlock-ai' && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-white/75 text-[#505054] border border-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Meta Row */}
            <div className="flex items-center justify-between gap-4 mb-3 text-[13px] font-semibold tracking-wide uppercase font-sans-ui text-[#77737a]">
              <span>{project.subtitle}</span>
              <span className="text-[#9da1aa] font-normal">{project.year}</span>
            </div>

            {/* Title & Story Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h2 className="font-display text-[1.8rem] sm:text-[2.1rem] font-bold text-[#2a2438] leading-tight tracking-tight mb-3">
                  <span className="text-[#d10056]">{project.title}: </span>
                  {project.headline}
                </h2>
                <p className="text-[#505054] text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Key Contributions Bullet List */}
                <ul className="mt-4 space-y-1.5 text-[14px] sm:text-[15px] text-[#706c72]">
                  {project.keyContributions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#d10056] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Read Story CTA */}
              <button
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full border border-[#dedadd] text-[#100e11] text-[14px] font-semibold hover:border-[#100e11] hover:-translate-y-0.5 transition-all self-start"
                title={`Read case study for ${project.title}`}
              >
                <span>Read Story</span>
                <span className="w-8 h-8 rounded-full bg-[#171518] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Additional Projects Section */}
      <div className="px-7 sm:px-10 pt-8 pb-4">
        <button
          onClick={() => setShowAdditional(!showAdditional)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-[#ece9ee] bg-[#faf8fb] text-[#2a2438] hover:bg-[#f4f2f6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-[#d10056]" />
            <span className="font-semibold text-[14px]">
              More Projects ({ADDITIONAL_PROJECTS.length})
            </span>
            <span className="text-xs text-[#706c72]">
              CabShare, Resume Screening, Bengaluru FC Recruitment, Image-to-Video Multi-Agent
            </span>
          </div>
          {showAdditional ? (
            <ChevronUp className="w-4 h-4 text-[#706c72]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#706c72]" />
          )}
        </button>

        {showAdditional && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {ADDITIONAL_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="p-5 rounded-xl border border-[#ece9ee] bg-white hover:border-[#dedade] hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#706c72] mb-2 font-mono-code">
                    <span className="font-semibold text-[#c41457]">{proj.category}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#2a2438] group-hover:text-[#c41457] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-medium text-[#706c72] mt-0.5">
                    {proj.subtitle}
                  </p>
                  <p className="text-xs text-[#505054] mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-[#ece9ee]">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#faf8fb] text-[#706c72] border border-[#ece9ee]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

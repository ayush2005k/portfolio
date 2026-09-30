import React from 'react';
import { Project } from '../types';
import { X, CheckCircle2, Cpu, ExternalLink } from 'lucide-react';
import { ScoutAIDemoVideo } from './ScoutAIDemoVideo';
import { RecoverIQDemoVideo } from './RecoverIQDemoVideo';
import { OutfitLockDemoVideo } from './OutfitLockDemoVideo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-white rounded-2xl border border-[#ece9ee] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece9ee] bg-[#faf8fb]">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#706c72]">
            <span className="px-2 py-0.5 rounded bg-white border border-[#ece9ee] font-semibold text-[#2a2438]">
              {project.category}
            </span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-[#505054] transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Header */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2a2438]">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#c41457] font-medium mt-1">
              {project.subtitle}
            </p>
            <p className="text-base text-[#505054] mt-3 leading-relaxed">
              {project.headline}
            </p>
          </div>

          {/* Embedded Video Demo for Scout AI Pro */}
          {project.id === 'scout-ai-pro' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72]">
                  Live System Demonstration & Walkthrough
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Recorded Walkthrough (0:36)
                </span>
              </div>
              <div className="h-[480px] sm:h-[540px] rounded-xl overflow-hidden border border-[#ece9ee] shadow-sm">
                <ScoutAIDemoVideo />
              </div>
            </div>
          )}

          {/* Embedded Video Demo for OutfitLock AI */}
          {project.id === 'outfitlock-ai' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72]">
                  Live Fashion Generation Walkthrough
                </span>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  Recorded Walkthrough (0:10)
                </span>
              </div>
              <div className="h-[500px] sm:h-[560px] rounded-xl overflow-hidden border border-rose-200/80 shadow-sm">
                <OutfitLockDemoVideo />
              </div>
            </div>
          )}

          {/* Embedded Video Demo for RecoverIQ */}
          {project.id === 'recover-iq' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72]">
                  Live Platform Demonstration & Walkthrough
                </span>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Recorded Walkthrough (0:42)
                </span>
              </div>
              <div className="h-[500px] sm:h-[560px] rounded-xl overflow-hidden border border-stone-300 shadow-sm">
                <RecoverIQDemoVideo />
              </div>
            </div>
          )}

          {/* Overview Callout */}
          <div className="p-5 rounded-xl border border-[#ece9ee] bg-[#faf8fb]">
            <h3 className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72] mb-2">
              Project Overview
            </h3>
            <p className="text-[15px] text-[#2a2438] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Technical Contributions */}
          <div>
            <h3 className="font-display text-lg font-bold text-[#2a2438] mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0032f0]" /> Key Contributions & Implementation
            </h3>
            <div className="space-y-3">
              {project.keyContributions.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-[#ece9ee] bg-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <p className="text-[14px] text-[#505054] leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology & Frameworks */}
          <div>
            <h3 className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72] mb-3">
              Tech Stack & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono-code px-3 py-1 rounded-lg bg-[#faf8fb] text-[#2a2438] border border-[#ece9ee] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Architectural Tech Stack Table if present */}
          {project.techStackTable && (
            <div>
              <h3 className="text-xs font-bold font-mono-code uppercase tracking-wider text-[#706c72] mb-3">
                Architectural Breakdown
              </h3>
              <div className="overflow-hidden rounded-xl border border-[#ece9ee]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#faf8fb] border-b border-[#ece9ee] text-[#706c72] font-mono-code">
                      <th className="py-2.5 px-4 font-semibold uppercase tracking-wider w-1/3">Category</th>
                      <th className="py-2.5 px-4 font-semibold uppercase tracking-wider">Technologies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece9ee]">
                    {project.techStackTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#2a2438] bg-[#faf8fb]/40">{row.category}</td>
                        <td className="py-2.5 px-4 font-mono-code text-[#505054]">{row.technologies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Metrics if available */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#faf8fb] border border-[#ece9ee] text-center"
                >
                  <p className="text-xs text-[#706c72] font-mono-code">{m.label}</p>
                  <p className="text-sm sm:text-base font-bold text-[#2a2438] mt-1">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-4 border-t border-[#ece9ee] flex items-center justify-between text-xs text-[#706c72]">
            <span>Developed by Ayush Kumar Singh</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#100e11] text-white font-medium hover:bg-[#2a2438] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

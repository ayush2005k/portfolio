import React from 'react';
import { PERSONAL_INFO, ACHIEVEMENTS, CERTIFICATIONS } from '../data/portfolioData';
import { GraduationCap, Award, Trophy, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="px-7 sm:px-10 py-16 border-b border-[#ece9ee] bg-[#fdfdfc]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 sm:gap-14 items-start">
        {/* Left Column: Narrative Bio */}
        <div>
          <p className="text-[#858187] text-[13px] font-bold tracking-[0.09em] uppercase mb-2">
            About Me
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-[#2a2438] leading-tight tracking-tight mb-5">
            Engineering software at the intersection of AI, systems, and sports.
          </h2>

          <div className="space-y-4 text-[#505054] text-[15px] sm:text-[16px] leading-relaxed">
            <p>
              I am a final-year Computer Science undergraduate at{' '}
              <strong className="text-[#2a2438] font-semibold">VIT Bhopal University</strong>{' '}
              specializing in Artificial Intelligence and Machine Learning. My engineering focus lies in architecting dependable backend architectures, integrating predictive machine learning models, and building high-performance REST APIs.
            </p>
            <p>
              Beyond technical coursework, I founded{' '}
              <strong className="text-[#2a2438] font-semibold">Navi Mumbai United FC</strong>, where I channel my shared enthusiasm for football, data analytics, and grassroots community leadership. I actively apply data-driven approaches to player performance and scouting workflows.
            </p>
            <p>
              I believe in writing clean, maintainable code, respecting architectural boundaries, and delivering pragmatic solutions that solve real-world problems.
            </p>
          </div>

          {/* Education Box */}
          <div className="mt-8 p-5 rounded-xl border border-[#ece9ee] bg-[#faf8fb] flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-white border border-[#ece9ee] shrink-0 text-[#0032f0]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#706c72] uppercase tracking-wider font-mono-code">
                Education
              </p>
              <h3 className="font-display text-base font-bold text-[#2a2438] mt-0.5">
                {PERSONAL_INFO.education.institution}
              </h3>
              <p className="text-[14px] text-[#505054]">
                {PERSONAL_INFO.education.degree}
              </p>
              <p className="text-xs text-[#706c72] font-mono-code mt-1">
                {PERSONAL_INFO.education.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Certifications */}
        <div className="space-y-8">
          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-[#d10056]" />
              <h3 className="font-display text-[18px] font-bold text-[#2a2438]">
                Notable Achievement
              </h3>
            </div>
            <div className="space-y-3">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[#ece9ee] bg-white shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded bg-[#fff0f6] text-[#c41457] border border-[#ffd1e3]">
                      {ach.rank}
                    </span>
                    <span className="text-xs text-[#706c72] font-mono-code">
                      {ach.event}
                    </span>
                  </div>
                  <h4 className="font-bold text-[15px] text-[#2a2438]">
                    {ach.title}
                  </h4>
                  <p className="text-[13px] text-[#505054] mt-1 leading-relaxed">
                    {ach.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <h3 className="font-display text-[18px] font-bold text-[#2a2438]">
                Certifications
              </h3>
            </div>
            <div className="space-y-2.5">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#ece9ee] bg-white flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-semibold text-[14px] text-[#2a2438]">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[#706c72] mt-0.5">
                      Issued by {cert.issuer}
                    </p>
                  </div>
                  <Award className="w-4 h-4 text-[#9da1aa] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

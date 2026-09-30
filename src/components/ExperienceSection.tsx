import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { MapPin, Calendar } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="px-6 sm:px-10 md:px-14 py-20 border-b border-[#ece9ee] bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <p className="text-[#858187] text-[13px] font-bold tracking-[0.09em] uppercase mb-3">
            Experience
          </p>
          <h2 className="font-display text-[2.2rem] sm:text-[2.75rem] font-bold text-[#2a2438] leading-tight tracking-tight mb-3">
            Journey so far
          </h2>
          <p className="text-[#706c72] text-[15px] sm:text-[16px] max-w-2xl leading-relaxed">
            Hands-on technical internships and operational leadership across enterprise government systems, fintech engineering, web software architectures, and sports operations.
          </p>
        </div>

        {/* Vertical Career Timeline Container */}
        <div className="relative flex flex-col">
          {EXPERIENCES.map((exp, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === EXPERIENCES.length - 1;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-row items-stretch ${
                  isLast ? 'pb-0' : 'pb-14 sm:pb-18 md:pb-22'
                }`}
              >
                {/* 1. LEFT COLUMN: Company Logo on Desktop (approx 170–210px) */}
                <div className="hidden sm:flex sm:w-[170px] md:w-[190px] lg:w-[210px] shrink-0 items-start justify-center pr-2 md:pr-4">
                  <div className="w-full flex items-center justify-center h-[76px] sm:h-[80px] py-1">
                    <img
                      src={exp.logoUrl}
                      alt={exp.logoAlt}
                      className={`w-auto h-auto object-contain select-none transition-transform duration-200 hover:scale-[1.03] ${
                        exp.id === 'indian-railways'
                          ? 'max-h-[70px] sm:max-h-[76px] max-w-[85px] sm:max-w-[95px]'
                          : exp.id === 'screener-buddy'
                          ? 'max-h-[72px] sm:max-h-[78px] max-w-[130px] sm:max-w-[145px]'
                          : exp.id === 'digital-soch'
                          ? 'max-h-[74px] sm:max-h-[80px] max-w-[110px] sm:max-w-[125px]'
                          : 'max-h-[72px] sm:max-h-[78px] max-w-[80px] sm:max-w-[90px]'
                      }`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* 2. MIDDLE COLUMN: Continuous Vertical Timeline + Connected Node Dot */}
                <div className="w-6 sm:w-8 shrink-0 relative self-stretch flex justify-center">
                  {/* Continuous thin vertical light-gray dashed line connecting all 4 dots */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0 border-l-[1.5px] border-dashed border-[#cdc8d0] pointer-events-none ${
                      isFirst
                        ? 'top-[27px] sm:top-[40px] bottom-0'
                        : isLast
                        ? 'top-0 h-[27px] sm:h-[40px]'
                        : 'top-0 bottom-0'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Circular Timeline Node Dot: 10px diameter, light-gray outer border, white center, ring */}
                  <div
                    className="absolute top-[27px] sm:top-[40px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#76717e] ring-2 ring-white z-10 shrink-0 shadow-xs"
                    aria-hidden="true"
                  />
                </div>

                {/* 3. RIGHT COLUMN: Experience Content */}
                <div className="flex-1 w-full pl-3 sm:pl-5 md:pl-7 pt-0 sm:pt-2">
                  {/* Mobile-only logo displayed on top of the content, horizontally aligned with dot */}
                  <div className="sm:hidden flex items-center h-[54px] mb-2">
                    <img
                      src={exp.logoUrl}
                      alt={exp.logoAlt}
                      className="max-h-[48px] max-w-[120px] object-contain select-none"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Job / Role Title */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                    <h3 className="font-display text-[1.25rem] sm:text-[1.4rem] md:text-[1.5rem] font-bold text-[#2a2438] tracking-tight">
                      {exp.role}
                    </h3>

                    {/* Date / Duration */}
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-[#706c72] font-mono-code shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-[#9da1aa]" />
                      {exp.duration}
                    </span>
                  </div>

                  {/* Company Name · Employment Type · Location Metadata */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] sm:text-[14.5px] text-[#505054] mb-3.5">
                    <span className="font-semibold text-[#2a2438]">{exp.company}</span>
                    <span className="text-[#b5b1b8] font-light">·</span>
                    <span className="font-medium text-[#646068]">{exp.employmentType}</span>

                    {exp.companySubtitle && (
                      <>
                        <span className="text-[#b5b1b8] font-light">·</span>
                        <span className="text-[#726e76] text-[13.5px]">{exp.companySubtitle}</span>
                      </>
                    )}

                    <span className="text-[#b5b1b8] font-light">·</span>
                    <span className="inline-flex items-center gap-1 text-[#726e76]">
                      <MapPin className="w-3.5 h-3.5 text-[#a6a1a5]" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Technology / Skill Tags (if applicable) */}
                  {exp.techAreas && exp.techAreas.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {exp.techAreas.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11.5px] sm:text-[12px] font-mono-code px-2.5 py-0.5 rounded-full bg-[#f4edf5] text-[#5d2f78] border border-[#e8dcee]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Concise Description Bullet Points */}
                  <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-[#48454d]">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 leading-relaxed">
                        <span className="text-[#c41457] font-bold mt-1 text-xs shrink-0 select-none">
                          ▪
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

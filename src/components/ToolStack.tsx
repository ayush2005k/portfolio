import React, { useState } from 'react';
import { CORE_TECH_ICONS } from '../data/portfolioData';

export const ToolStack: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      className="py-5 px-6 sm:px-10 border-b border-[#ece9ee] bg-[#fdfdfc] select-none transition-colors"
      aria-label="Core Technology Stack"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Section Header & Active indicator */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <h2 className="text-[#706c72] text-[12px] font-bold tracking-[0.1em] uppercase whitespace-nowrap">
            Core Stack
          </h2>
          {hoveredTech && (
            <span className="text-[11px] font-semibold text-[#100e11] px-2.5 py-0.5 rounded-full bg-[#f3f0f4] border border-[#e5e1e7] transition-all">
              {hoveredTech}
            </span>
          )}
        </div>

        {/* Right: Circular badges with generous spacing and no scrollbar */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-3.5 py-1">
          {CORE_TECH_ICONS.map((tech) => (
            <div
              key={tech.name}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              onFocus={() => setHoveredTech(tech.name)}
              onBlur={() => setHoveredTech(null)}
              className="tool-icon-circle group relative cursor-pointer"
              tabIndex={0}
              aria-label={tech.name}
            >
              {/* Photo inside circle */}
              <div className="w-7 h-7 flex items-center justify-center">
                <img
                  src={tech.icon}
                  alt={`${tech.name} logo`}
                  className="w-5.5 h-5.5 sm:w-6 sm:h-6 object-contain group-hover:scale-115 transition-transform duration-200"
                  loading="eager"
                />
              </div>

              {/* Tooltip on hover displaying photo and full name */}
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#100e11] text-white text-[11px] font-medium opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-md flex items-center gap-1.5">
                <img src={tech.icon} alt="" className="w-3.5 h-3.5 object-contain" />
                <span>{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



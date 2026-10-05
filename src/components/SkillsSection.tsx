import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Server, Brain, Cpu, Database, Wrench, Layout, BarChart2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 className="w-4 h-4 text-[#0032f0]" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-[#059669]" />;
      case 'AI / Machine Learning':
        return <Brain className="w-4 h-4 text-[#d10056]" />;
      case 'AI Frameworks & APIs':
        return <Cpu className="w-4 h-4 text-[#7c3aed]" />;
      case 'Libraries & Analysis':
        return <BarChart2 className="w-4 h-4 text-[#ea580c]" />;
      case 'Frontend Development':
        return <Layout className="w-4 h-4 text-[#0284c7]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#0d9488]" />;
      case 'Tools & Platforms':
      default:
        return <Wrench className="w-4 h-4 text-[#475569]" />;
    }
  };

  return (
    <section id="skills" className="px-7 sm:px-10 py-16 border-b border-[#ece9ee] bg-[#faf8fb]">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#858187] text-[13px] font-bold tracking-[0.09em] uppercase mb-2">
          Technical Arsenal
        </p>
        <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-[#2a2438] leading-tight tracking-tight mb-3">
          Skills & Expertise
        </h2>
        <p className="text-[#706c72] text-[15px] sm:text-[16px] max-w-xl leading-relaxed">
          Structured across core languages, machine learning pipelines, backend services, and cloud engineering tools.
        </p>
      </div>

      {/* Grid of skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="p-5 sm:p-6 rounded-xl border border-[#ece9ee] bg-white shadow-xs hover:border-[#dedade] transition-all"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-[#faf8fb] border border-[#ece9ee]">
                {getCategoryIcon(cat.category)}
              </div>
              <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-[#2a2438]">
                {cat.category}
              </h3>
            </div>

            {/* Pills with sufficient spacing */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[13px] font-sans-ui px-3 py-1.5 rounded-lg bg-[#faf8fb] text-[#2a2438] border border-[#ece9ee] font-medium hover:border-[#dedade] hover:bg-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

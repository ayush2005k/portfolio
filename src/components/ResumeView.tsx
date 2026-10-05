import React, { useState } from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  FEATURED_PROJECTS,
  ADDITIONAL_PROJECTS,
  SKILL_CATEGORIES,
  ACHIEVEMENTS,
  CERTIFICATIONS,
} from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Printer,
  ArrowLeft,
  Check,
  Copy,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Trophy,
  Award,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from 'lucide-react';

interface ResumeViewProps {
  onClose: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [cassettePlaying, setCassettePlaying] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const allProjects = [...FEATURED_PROJECTS, ...ADDITIONAL_PROJECTS];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18171a]/80 backdrop-blur-md flex flex-col items-center py-4 sm:py-8 px-2 sm:px-4">
      {/* Top Floating Control Toolbar (Web Only - Hidden on Print) */}
      <div className="no-print w-full max-w-[960px] flex items-center justify-between gap-3 mb-4 px-4 py-2.5 rounded-2xl bg-[#222026] text-white border border-white/10 shadow-xl">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[13px] font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[12px] sm:text-[13px] text-gray-200 transition-colors"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-300" />
                <span className="hidden xs:inline">Copy Email</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1b432a] hover:bg-[#235837] text-white text-[13px] font-medium transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="resume-paper w-full max-w-[960px] bg-[#faf7f2] text-[#1c1a1f] shadow-2xl rounded-2xl border border-[#ded8cc] p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all">
        {/* Subtle Vintage Master Tape Header Stripe */}
        <div className="h-1.5 w-full bg-[#1b432a] absolute top-0 left-0" />

        {/* ======================================================== */}
        {/* HEADER SECTION WITH RETRO CASSETTE PLAYER ACCENT (~18%)   */}
        {/* ======================================================== */}
        <header className="border-b-2 border-[#1c1a1f] pb-7 mb-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Candidate Identification & Contact Details */}
            <div className="flex-1 min-w-0">
              {/* Metadata Tape Header Tag */}
              <div className="flex items-center gap-2.5 text-[11px] font-mono-code font-bold text-[#1b432a] uppercase tracking-wider mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1b432a]" />
                <span>SIDE A • CATALOG NO. AKS-2027</span>
                <span className="text-[#a49d92]">|</span>
                <span>DOLBY HX PRO • HI-FI STEREO</span>
              </div>

              {/* Full Name in Editorial Typography */}
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#141316] tracking-tight leading-tight">
                {PERSONAL_INFO.name}
              </h1>

              {/* Targeted Roles Title */}
              <p className="text-[13px] sm:text-[14px] font-bold font-mono-code text-[#1b432a] tracking-wide mt-1 uppercase">
                {PERSONAL_INFO.roleTitle}
              </p>

              {/* Contact Information Matrix (Selectable, ATS-Friendly) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-[#423f46]">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#1b432a] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1b432a]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#1b432a] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1b432a]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1b432a]" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1b432a]" />
                  <span>{PERSONAL_INFO.education.institution} (B.Tech &rsquo;27)</span>
                </span>
              </div>
            </div>

            {/* Right: Retro Cassette / Music-Player Component (Occupies ~18% visual weight) */}
            <div className="lg:w-[320px] shrink-0 self-center lg:self-auto">
              <div className="bg-[#1c1a1f] text-[#faf7f2] p-3 rounded-xl border border-[#38343f] shadow-md relative group">
                {/* Vintage Corner Screws */}
                <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#38343f] border border-[#524d5b]" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#38343f] border border-[#524d5b]" />
                <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#38343f] border border-[#524d5b]" />
                <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#38343f] border border-[#524d5b]" />

                {/* Inner Cassette Label (Warm Cream with Forest Green Accents) */}
                <div className="bg-[#f5f1e6] text-[#1c1a1f] rounded-lg p-2.5 border border-[#dfd8cc] relative">
                  {/* Cassette Header Bar */}
                  <div className="flex items-center justify-between text-[9.5px] font-mono-code font-bold uppercase tracking-wider text-[#1b432a] border-b border-[#1b432a]/30 pb-1 mb-2">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1b432a] animate-pulse" />
                      NOW PLAYING
                    </span>
                    <span>TYPE II • CHROME</span>
                    <span>03:24</span>
                  </div>

                  {/* Tape Label Title in Vintage Serif */}
                  <div className="text-center px-1">
                    <h2 className="font-editorial text-[15px] font-bold text-[#1b432a] tracking-tight leading-none uppercase">
                      AYUSH KUMAR SINGH
                    </h2>
                    <p className="text-[10px] font-mono-code text-[#545059] mt-0.5 tracking-tight uppercase">
                      ENGINEERING COMPILATION // 2023 - 2027
                    </p>
                  </div>

                  {/* Cassette Tape Spools & Central Window */}
                  <div className="my-2 bg-[#201e24] rounded-md p-1.5 flex items-center justify-around border border-[#3e3a47]">
                    {/* Left Spool */}
                    <div
                      className={`w-7 h-7 rounded-full bg-[#f5f1e6] border-2 border-[#827d89] flex items-center justify-center relative ${
                        cassettePlaying ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#201e24] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-white" />
                      </div>
                      <span className="absolute w-full h-[1.5px] bg-[#827d89]/50" />
                      <span className="absolute h-full w-[1.5px] bg-[#827d89]/50" />
                    </div>

                    {/* Center Tape Level Viewport */}
                    <div className="bg-[#141317] border border-[#403c49] px-2 py-0.5 rounded text-[8px] font-mono-code text-[#a49ea8] text-center">
                      <div className="text-[7.5px] text-[#1b432a] font-bold">100 • • • 50 • • • 0</div>
                      <div className="w-16 h-1 bg-[#472c1c] rounded-full mx-auto my-0.5" />
                    </div>

                    {/* Right Spool */}
                    <div
                      className={`w-7 h-7 rounded-full bg-[#f5f1e6] border-2 border-[#827d89] flex items-center justify-center relative ${
                        cassettePlaying ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#201e24] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-white" />
                      </div>
                      <span className="absolute w-full h-[1.5px] bg-[#827d89]/50" />
                      <span className="absolute h-full w-[1.5px] bg-[#827d89]/50" />
                    </div>
                  </div>

                  {/* Tape Bottom Forest Green Accent Bar */}
                  <div className="bg-[#1b432a] text-[#f5f1e6] rounded px-2 py-1 flex items-center justify-between text-[10px]">
                    <Shuffle className="w-2.5 h-2.5 opacity-80" />
                    <SkipBack className="w-2.5 h-2.5 opacity-80" />
                    <button
                      onClick={() => setCassettePlaying(!cassettePlaying)}
                      className="w-4 h-4 rounded-full bg-white text-[#1b432a] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      title={cassettePlaying ? 'Pause spool animation' : 'Spin tape spools'}
                    >
                      {cassettePlaying ? (
                        <Pause className="w-2.5 h-2.5 fill-current" />
                      ) : (
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                      )}
                    </button>
                    <SkipForward className="w-2.5 h-2.5 opacity-80" />
                    <Repeat className="w-2.5 h-2.5 opacity-80" />
                  </div>
                </div>

                {/* Sub-label Stamp */}
                <div className="flex items-center justify-between text-[9px] font-mono-code text-[#948f9b] px-1 mt-1.5">
                  <span>HI-FI AUDIO CASSETTE</span>
                  <span className="text-[#34d399] font-semibold">STEREO ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* RESUME BODY: TWO-COLUMN EDITORIAL GEOMETRIC COMPOSITION   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10 items-start">
          {/* ====================================================== */}
          {/* LEFT MAIN COLUMN: EXPERIENCE & TECHNICAL PROJECTS       */}
          {/* ====================================================== */}
          <div className="space-y-8">
            {/* SECTION 1: WORK EXPERIENCE */}
            <section aria-labelledby="section-experience">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-experience"
                    className="font-editorial text-xl font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Work Experience
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a] tracking-wider uppercase">
                  [TRACK LIST // EXP]
                </span>
              </div>

              <div className="space-y-5">
                {EXPERIENCES.map((exp, idx) => (
                  <article
                    key={exp.id}
                    className="relative pl-3 border-l-2 border-[#1b432a]/30 hover:border-[#1b432a] transition-colors"
                  >
                    {/* Header Row: Role & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-[15px] font-bold text-[#18161b]">
                        {exp.role}{' '}
                        <span className="text-[#1b432a] font-semibold font-editorial">
                          @ {exp.company}
                        </span>
                      </h3>
                      <span className="text-[12px] font-mono-code text-[#635f68] font-medium shrink-0">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Sub-row: Location & Type */}
                    <div className="text-[12px] text-[#716c77] font-medium mb-2">
                      <span>{exp.location}</span>
                      {exp.employmentType && (
                        <>
                          <span className="mx-1.5">•</span>
                          <span>{exp.employmentType}</span>
                        </>
                      )}
                    </div>

                    {/* Bullet Points */}
                    <ul className="list-disc list-outside pl-4 space-y-1 text-[13px] text-[#3c3941] leading-relaxed">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>

                    {/* Core Tech Stack */}
                    {exp.techAreas && exp.techAreas.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[11px] font-mono-code text-[#635f68] font-medium">
                          Tech:
                        </span>
                        {exp.techAreas.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono-code px-1.5 py-0.5 rounded bg-[#eee8db] text-[#1c1a1f] border border-[#ded5c5]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* SECTION 2: TECHNICAL PROJECTS */}
            <section aria-labelledby="section-projects">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-4">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-projects"
                    className="font-editorial text-xl font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Technical Projects
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a] tracking-wider uppercase">
                  [ENGINEERING RELEASES]
                </span>
              </div>

              <div className="space-y-4">
                {allProjects.map((project, idx) => (
                  <article
                    key={project.id}
                    className="p-3.5 rounded-xl border border-[#ded8cc] bg-white/70 hover:bg-white hover:border-[#1b432a]/50 transition-all shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono-code font-bold text-[#1b432a]">
                          0{idx + 1}.
                        </span>
                        <h3 className="text-[15px] font-bold text-[#161519]">
                          {project.title}
                        </h3>
                        <span className="text-[12px] text-[#635f68] font-normal hidden sm:inline">
                          — {project.subtitle}
                        </span>
                      </div>
                      <span className="text-[12px] font-mono-code text-[#635f68]">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-[13px] text-[#45424b] mb-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Contributions / Bullets */}
                    <ul className="list-disc list-outside pl-4 space-y-1 text-[12.5px] text-[#38353d] leading-relaxed mb-2.5">
                      {project.keyContributions.map((contrib, cIdx) => (
                        <li key={cIdx}>{contrib}</li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#eee7da]">
                      <span className="text-[10.5px] font-mono-code text-[#635f68] font-semibold">
                        Stack:
                      </span>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10.5px] font-mono-code px-1.5 py-0.2 rounded bg-[#f2ece0] text-[#1c1a1f] border border-[#dfd7c8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDEBAR: SKILLS, EDUCATION, AWARDS, CERTS         */}
          {/* ====================================================== */}
          <div className="space-y-7">
            {/* EDUCATION */}
            <section aria-labelledby="section-education">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-education"
                    className="font-editorial text-lg font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Education
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a]">
                  [ACADEMIC]
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#ded8cc] bg-white/70">
                <h3 className="text-[15px] font-bold text-[#18161a]">
                  {PERSONAL_INFO.education.institution}
                </h3>
                <p className="text-[13px] font-medium text-[#1b432a] mt-0.5">
                  {PERSONAL_INFO.education.degree}
                </p>
                <div className="flex items-center justify-between text-[11.5px] font-mono-code text-[#6a6671] mt-1.5 pt-1.5 border-t border-[#ece4d6]">
                  <span>{PERSONAL_INFO.education.duration}</span>
                  <span>Bhopal / Mumbai, IN</span>
                </div>
              </div>
            </section>

            {/* TECHNICAL SKILLS */}
            <section aria-labelledby="section-skills">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-skills"
                    className="font-editorial text-lg font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Technical Skills
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a]">
                  [TOOLKIT]
                </span>
              </div>

              <div className="space-y-3">
                {SKILL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-2.5 rounded-lg border border-[#ded8cc] bg-white/60"
                  >
                    <div className="text-[11px] font-mono-code font-bold text-[#1b432a] uppercase tracking-wide mb-1">
                      {cat.category}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11.5px] px-2 py-0.5 rounded bg-[#f0eae0] text-[#1c1a1f] border border-[#dcd4c5] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HONORS & ACHIEVEMENTS */}
            <section aria-labelledby="section-achievements">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-achievements"
                    className="font-editorial text-lg font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Achievements
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a]">
                  [RECORDS]
                </span>
              </div>

              <div className="space-y-2">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[#ded8cc] bg-white/70"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[13.5px] font-bold text-[#18161a]">
                        {ach.title}
                      </h3>
                      {ach.rank && (
                        <span className="text-[10.5px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-[#1b432a] text-white">
                          {ach.rank}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono-code text-[#1b432a] font-medium mt-0.5">
                      {ach.event}
                    </p>
                    <p className="text-[12px] text-[#4d4a53] mt-1 leading-relaxed">
                      {ach.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section aria-labelledby="section-certifications">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#1b432a]" />
                  <h2
                    id="section-certifications"
                    className="font-editorial text-lg font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Certifications
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a]">
                  [VERIFIED]
                </span>
              </div>

              <div className="space-y-2">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-[#ded8cc] bg-white/70 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-[13px] font-bold text-[#18161b]">
                        {cert.title}
                      </h3>
                      <p className="text-[11px] font-mono-code text-[#66626e]">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono-code text-[#1b432a] font-bold px-1.5 py-0.5 rounded bg-[#e8e2d4]">
                      CREDENTIAL
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* LEADERSHIP & COMMUNITY */}
            <section aria-labelledby="section-leadership">
              <div className="flex items-center justify-between border-b-2 border-[#1c1a1f] pb-1 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#1b432a] text-sm font-bold">⚽</span>
                  <h2
                    id="section-leadership"
                    className="font-editorial text-lg font-bold tracking-tight text-[#141316] uppercase"
                  >
                    Leadership
                  </h2>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#1b432a]">
                  [FOUNDER]
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#ded8cc] bg-white/70">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[14px] font-bold text-[#18161a]">
                    {PERSONAL_INFO.club.name}
                  </h3>
                  <span className="text-[11px] font-mono-code font-bold text-[#1b432a]">
                    {PERSONAL_INFO.club.role}
                  </span>
                </div>
                <p className="text-[12.5px] text-[#4a4751] mt-1.5 leading-relaxed">
                  {PERSONAL_INFO.club.description}
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FOOTER: RUN-OUT GROOVE METADATA                          */}
        {/* ======================================================== */}
        <footer className="mt-10 pt-4 border-t border-[#ded8cc] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-code text-[#736e7a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1b432a]" />
            <span>AYUSH KUMAR SINGH • RESUME MASTER TAPE • 2026 EDITION</span>
          </div>
          <div className="flex items-center gap-4">
            <span>ATS-READY FORMAT</span>
            <span>SIDE B CONTINUED AT AYUSH.DEV</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

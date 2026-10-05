import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Check, Copy } from 'lucide-react';
import ayushPhoto from '../assets/images/ayush_portrait_photo_1791188408556.jpg';

interface HeroProps {
  onContactClick: () => void;
  onResumeClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [copied, setCopied] = useState(false);

  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ayush_portfolio_photo');
      if (saved) return saved;
    }
    return ayushPhoto || '/ayush-singh.jpg';
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="home" className="relative pt-12 pb-16 px-6 sm:px-10 border-b border-[#ece9ee] overflow-hidden text-center isolate">
      {/* Background Interactive System Grid */}
      <div className="hero-system-grid" aria-hidden="true">
        {Array.from({ length: 96 }).map((_, i) => (
          <span key={i} className="hero-system-mark" />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center pointer-events-none">
        {/* Role Pill */}
        <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 border border-[#dedade] rounded-full bg-white/90 backdrop-blur-sm text-[#2a2438] text-[13px] sm:text-[14px] font-semibold shadow-xs pointer-events-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span>{PERSONAL_INFO.shortRole}</span>
          <span className="text-[#9da1aa]">·</span>
          <span className="text-[#505054] font-normal">VIT Bhopal &rsquo;27</span>
        </div>

        {/* Intro */}
        <p className="text-[1.25rem] sm:text-[1.5rem] font-medium text-[#2a2438] tracking-tight mb-1 pointer-events-none select-none">
          Hey there, I’m
        </p>

        {/* Big Display Name */}
        <h1 className="font-display text-[3.25rem] sm:text-[5rem] lg:text-[5.5rem] font-extrabold leading-[0.9] tracking-tight text-[#d10056] mb-8 whitespace-nowrap pointer-events-none select-none">
          {PERSONAL_INFO.name}
          <span className="text-[#100e11]">.</span>
        </h1>

        {/* Profile Card / Polaroid Frame with Doodles */}
        <div className="relative w-full max-w-[560px] my-2 pointer-events-none">
          {/* Floating Minimalist Hand-Drawn Style Doodles */}
          {/* Coffee doodle */}
          <div className="absolute -top-4 -left-2 sm:left-4 text-[#a6a1a5] opacity-75 hidden xs:block pointer-events-none transform -rotate-12">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h22v10.5A8.5 8.5 0 0 1 25.5 39h-5A8.5 8.5 0 0 1 12 30.5V20Z" />
              <path d="M34 23h2.5a5.5 5.5 0 0 1 0 11H33" />
              <path d="M18 14c-1.5-2 1.5-3 0-5M26 14c-1.5-2 1.5-3 0-5" />
              <path d="M10 40h28" />
            </svg>
          </div>

          {/* Football / NMUFC doodle */}
          <div className="absolute top-1/4 -right-3 sm:right-2 text-[#a6a1a5] opacity-80 hidden xs:block pointer-events-none transform rotate-12">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="24" r="18" />
              <polygon points="24,14 31,19 28,27 20,27 17,19" />
              <line x1="24" y1="14" x2="24" y2="6" />
              <line x1="31" y1="19" x2="38" y2="15" />
              <line x1="28" y1="27" x2="34" y2="34" />
              <line x1="20" y1="27" x2="14" y2="34" />
              <line x1="17" y1="19" x2="10" y2="15" />
            </svg>
          </div>

          {/* Code / Terminal doodle */}
          <div className="absolute bottom-6 -left-3 sm:left-3 text-[#a6a1a5] opacity-75 hidden xs:block pointer-events-none transform -rotate-6">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="10" width="36" height="28" rx="4" />
              <path d="M14 20l5 4-5 4M24 28h10" />
            </svg>
          </div>

          {/* AI Sparkles doodle */}
          <div className="absolute -bottom-2 right-6 text-[#d10056] opacity-75 hidden xs:block pointer-events-none transform rotate-8">
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M24 6v36M6 24h36M12 12l24 24M36 12L12 36" />
            </svg>
          </div>

          {/* Polaroid Frame */}
          <figure className="polaroid-frame pointer-events-auto">
            <div className="aspect-4/3 overflow-hidden rounded-xs bg-[#100e11] border border-[#ece9ee] relative group select-none shadow-inner">
              <img
                src={photoSrc}
                alt="Ayush Kumar Singh"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  if (photoSrc !== ayushPhoto && photoSrc !== '/ayush-singh.jpg') {
                    setPhotoSrc(ayushPhoto);
                  } else {
                    (e.target as HTMLImageElement).src = '/ayush-singh.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] pointer-events-none font-medium drop-shadow-sm">
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ayush Kumar Singh
                </span>
                <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20 font-mono-code text-[10px]">
                  Mumbai, IN
                </span>
              </div>
            </div>

            <figcaption className="pt-3 pb-0.5 text-center text-[#505054] font-handwritten text-[1.4rem] font-medium leading-none">
              Based in Mumbai, India 🇮🇳
            </figcaption>
          </figure>
        </div>

        {/* Hero Meta Row */}
        <div className="w-full max-w-xl flex flex-wrap items-center justify-between gap-3 text-[13px] sm:text-[14px] font-semibold text-[#2a2438] mt-6 px-4 py-2 border-y border-[#ece9ee] pointer-events-auto">
          <span>{PERSONAL_INFO.education.degree}</span>
          <span className="text-[#9da1aa] hidden sm:inline">•</span>
          <span>Founder, Navi Mumbai United FC</span>
        </div>

        {/* Hero Narrative Copy */}
        <p className="max-w-2xl mt-5 text-[#505054] text-[1rem] sm:text-[1.0625rem] leading-relaxed text-center text-pretty pointer-events-auto">
          I build robust backend systems, AI-powered applications, and full-stack products using{' '}
          <strong className="text-[#2a2438] font-semibold">Python, Java, Django, REST APIs</strong>, and modern AI frameworks.
          Passionate about artificial intelligence, sports analytics, and engineering software that creates real community impact.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7 pointer-events-auto">
          <button
            onClick={onContactClick}
            className="shimmer-button text-[14px] sm:text-[15px]"
            id="hero-contact-button"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-[#dedade] bg-[#faf8fb] text-[#2a2438] hover:bg-[#f1f2ff] hover:border-[#0032f0]/30 transition-all text-[14px] font-medium"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#706c72]" />
                <span>{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>

          <a
            href="#work"
            className="inline-flex items-center min-h-[44px] px-4 py-2 text-[14px] font-medium text-[#c41457] hover:underline underline-offset-4"
          >
            Explore Projects &darr;
          </a>
        </div>
      </div>
    </section>
  );
};

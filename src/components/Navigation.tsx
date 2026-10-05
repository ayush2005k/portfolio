import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Menu, X, Mail } from 'lucide-react';

interface NavigationProps {
  onContactClick: () => void;
  onResumeClick: () => void;
  showWopFrame?: boolean;
  onToggleWopFrame?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onContactClick,
  onResumeClick,
  showWopFrame,
  onToggleWopFrame,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-nav" id="main-nav">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <a
          href="#home"
          className="font-mono-code text-[13px] font-bold tracking-wider text-[#5d2f78] uppercase hover:text-[#c41457] transition-colors"
          id="nav-brand-logo"
        >
          AYUSH.DEV
        </a>
      </div>

      {/* Center Nav Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-6 text-[14px] text-[#505054]" aria-label="Main Navigation">
        <a href="#work" className="hover:text-[#c41457] transition-colors py-1">
          Selected Work
        </a>
        <a href="#experience" className="hover:text-[#c41457] transition-colors py-1">
          Experience
        </a>
        <a href="#skills" className="hover:text-[#c41457] transition-colors py-1">
          Skills
        </a>
        <a href="#about" className="hover:text-[#c41457] transition-colors py-1">
          About
        </a>
        <button
          onClick={onResumeClick}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#1b432a]/40 bg-[#faf7f2] text-[#1b432a] hover:bg-[#1b432a] hover:text-white transition-all text-[12px] font-mono-code font-bold cursor-pointer"
          title="View Editorial Retro Resume"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b432a] group-hover:bg-white" />
          <span>RESUME</span>
        </button>
      </nav>

      {/* Right Actions (Social + Contact) */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">
        <button
          onClick={onResumeClick}
          className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#1b432a]/40 bg-[#faf7f2] text-[#1b432a] text-[11.5px] font-mono-code font-bold"
        >
          RESUME
        </button>

        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="hidden sm:inline-flex items-center gap-1 text-[13px] text-[#505054] hover:text-[#c41457] transition-colors"
          title="Email Ayush"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </a>

        <button
          onClick={onContactClick}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium rounded-full bg-[#100e11] text-white hover:bg-[#2a2438] transition-all"
          id="nav-contact-cta"
        >
          <span>Get in Touch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-[#505054] hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden col-span-3 pt-4 pb-3 border-t border-[#ece9ee] mt-2 flex flex-col gap-3">
          <button
            onClick={() => {
              onResumeClick();
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold text-[#1b432a] font-mono-code text-[13px] py-1 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#1b432a]" />
            VIEW REDESIGNED RESUME (SIDE A)
          </button>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[14px] text-[#505054] hover:text-[#c41457] py-1"
          >
            Selected Work
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[14px] text-[#505054] hover:text-[#c41457] py-1"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[14px] text-[#505054] hover:text-[#c41457] py-1"
          >
            Skills
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[14px] text-[#505054] hover:text-[#c41457] py-1"
          >
            About
          </a>
          <div className="flex items-center gap-3 pt-2">
            {onToggleWopFrame && (
              <button
                onClick={() => {
                  onToggleWopFrame();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 text-xs rounded-full border border-[#ece9ee] text-[#706c72]"
              >
                {showWopFrame ? 'Canvas View' : 'Frame View'}
              </button>
            )}
            <button
              onClick={() => {
                onContactClick();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs rounded-full bg-[#100e11] text-white"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

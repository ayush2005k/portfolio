import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, ExternalLink, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="px-7 sm:px-10 py-16 bg-[#fdfdfc]">
      {/* Top CTA & Contact Links */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12">
        <div>
          <p className="text-[#858187] text-[13px] font-bold tracking-[0.09em] uppercase mb-2">
            Get in Touch
          </p>
          <h2 className="font-display text-[2.4rem] sm:text-[3.2rem] font-bold text-[#2a2438] leading-tight tracking-tight">
            Let’s build something <span className="text-[#d10056]">together.</span>
          </h2>
          <p className="text-[#706c72] text-[15px] sm:text-[16px] mt-2 max-w-md">
            Always open to discussing software engineering opportunities, AI systems, or football analytics collaborations.
          </p>
        </div>

        {/* Action Buttons & Links */}
        <nav className="flex flex-wrap items-center gap-3" aria-label="Contact links">
          {/* Email button with copy */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#dedade] bg-white text-[#2a2438] hover:border-[#2a2438] transition-all text-[14px] font-medium shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#d10056]" />
            <span>Email</span>
          </a>

          {/* Phone button */}
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#dedade] bg-white text-[#2a2438] hover:border-[#2a2438] transition-all text-[14px] font-medium shadow-xs"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          {/* LinkedIn Profile */}
          <a
            href={PERSONAL_INFO.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#dedade] bg-white text-[#2a2438] hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all text-[14px] font-medium shadow-xs group cursor-pointer"
            title="Ayush Singh on LinkedIn"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4 text-[#0a66c2] group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#858187] group-hover:text-[#0a66c2] transition-colors" />
          </a>

          {/* GitHub Profile */}
          <a
            href={PERSONAL_INFO.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#dedade] bg-white text-[#2a2438] hover:border-[#24292f] hover:text-[#24292f] transition-all text-[14px] font-medium shadow-xs group cursor-pointer"
            title="Ayush Singh on GitHub"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4 text-[#24292f] group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#858187] group-hover:text-[#24292f] transition-colors" />
          </a>
        </nav>
      </div>

      <div className="w-full h-px bg-[#ece9ee] my-8" aria-hidden="true" />

      {/* Signature & Credits */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        {/* Hand-drawn styled digital signature */}
        <div className="flex items-center gap-3">
          <div className="font-handwritten text-[2rem] sm:text-[2.4rem] font-bold text-[#2a2438] leading-none select-none">
            {PERSONAL_INFO.name}
          </div>
          <span className="text-xs font-mono-code text-[#9da1aa]">
            / Mumbai, IN
          </span>
        </div>

        {/* Credit Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#706c72] font-sans-ui">
          <span>© 2026 {PERSONAL_INFO.name}</span>
        </div>
      </div>
    </footer>
  );
};

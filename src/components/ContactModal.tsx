import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { X, Mail, Phone, MapPin, Copy, Check, Send, Linkedin, Github } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Inquiry regarding software engineering / AI opportunities'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#ece9ee] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-[#505054] transition-colors"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs font-mono-code uppercase font-bold text-[#858187] mb-1">
          Direct Connect
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2a2438]">
          Get in touch with Ayush
        </h2>
        <p className="text-sm text-[#505054] mt-1.5 mb-6">
          Feel free to reach out for software engineering roles, collaboration, or sports tech conversations.
        </p>

        {/* Quick Contact Cards */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ece9ee] bg-[#faf8fb]">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#d10056]" />
              <div>
                <p className="text-xs text-[#706c72]">Email Address</p>
                <p className="text-sm font-semibold text-[#2a2438]">{PERSONAL_INFO.email}</p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#ece9ee] transition-all"
              title="Copy email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#706c72]" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ece9ee] bg-[#faf8fb]">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-xs text-[#706c72]">Phone / Mobile</p>
                <p className="text-sm font-semibold text-[#2a2438]">{PERSONAL_INFO.phone}</p>
              </div>
            </div>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-white border border-[#ece9ee] hover:bg-gray-50"
            >
              Call
            </a>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#ece9ee] bg-[#faf8fb]">
            <MapPin className="w-4 h-4 text-[#0032f0]" />
            <div>
              <p className="text-xs text-[#706c72]">Location</p>
              <p className="text-sm font-semibold text-[#2a2438]">{PERSONAL_INFO.location}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#ece9ee] bg-[#faf8fb] hover:bg-white hover:border-[#0a66c2] text-xs font-semibold text-[#2a2438] transition-all cursor-pointer shadow-2xs"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#ece9ee] bg-[#faf8fb] hover:bg-white hover:border-[#24292f] text-xs font-semibold text-[#2a2438] transition-all cursor-pointer shadow-2xs"
            >
              <Github className="w-3.5 h-3.5 text-[#24292f]" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Message Quick Form */}
        <form onSubmit={handleSendEmail} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#2a2438] mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Software engineering opportunity / Project discussion"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#ece9ee] focus:border-[#d10056] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2a2438] mb-1">
              Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note here..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#ece9ee] focus:border-[#d10056] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#100e11] text-white text-sm font-medium hover:bg-[#2a2438] transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Open Email Client</span>
          </button>
        </form>
      </div>
    </div>
  );
};

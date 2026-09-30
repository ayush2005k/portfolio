import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ToolStack } from './components/ToolStack';
import { MarqueeStrip } from './components/MarqueeStrip';
import { WorkSection } from './components/WorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { WallOfPortfoliosFrame } from './components/WallOfPortfoliosFrame';
import { CustomCursor } from './components/CustomCursor';
import { MusicPlayer } from './components/MusicPlayer';
import { ResumeView } from './components/ResumeView';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showWopFrame, setShowWopFrame] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash === '#resume';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setResumeOpen(window.location.hash === '#resume');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openResume = () => {
    setResumeOpen(true);
    if (window.location.hash !== '#resume') {
      window.history.pushState(null, '', '#resume');
    }
  };

  const closeResume = () => {
    setResumeOpen(false);
    if (window.location.hash === '#resume') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const portfolioContent = (
    <div className="shell-container min-h-screen">
      <Navigation
        onContactClick={() => setContactModalOpen(true)}
        onResumeClick={openResume}
        showWopFrame={showWopFrame}
        onToggleWopFrame={() => setShowWopFrame(!showWopFrame)}
      />
      <main id="main-content">
        <Hero
          onContactClick={() => setContactModalOpen(true)}
          onResumeClick={openResume}
        />
        <ToolStack />
        <MarqueeStrip />
        <WorkSection onSelectProject={(p) => setSelectedProject(p)} />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
      </main>
      <Footer onContactClick={() => setContactModalOpen(true)} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#fff0f6] selection:text-[#c41457]">
      <CustomCursor />

      {showWopFrame ? (
        <WallOfPortfoliosFrame
          onContactClick={() => setContactModalOpen(true)}
          onCloseFrame={() => setShowWopFrame(false)}
        >
          {portfolioContent}
        </WallOfPortfoliosFrame>
      ) : (
        portfolioContent
      )}

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Retro Music-Player Inspired Editorial Resume View */}
      {resumeOpen && <ResumeView onClose={closeResume} />}

      {/* Floating Ambient Music Player */}
      <MusicPlayer />
    </div>
  );
}


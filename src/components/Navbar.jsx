import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-xl shadow-black/60'
          : 'bg-[#0A0A0A]/40 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Personal Logo / Developer Initials */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="px-2.5 h-10 rounded-xl bg-[#141414] border border-[#252525] group-hover:border-[#007BA7] flex items-center justify-center transition-colors shadow-sm">
              <span className="font-mono font-bold text-sm tracking-tight text-white">
                <span className="text-[#007BA7]">&lt;</span>
                {personalInfo.initials}
                <span className="text-[#FF2D75]">/&gt;</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-[#007BA7] transition-colors">
                {personalInfo.displayName}
              </span>
              <span className="text-[11px] font-mono text-[#A1A1AA] flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF2D75] animate-pulse" />
                {personalInfo.currentEducation} • GTU
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 bg-[#141414]/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#252525]"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-[#007BA7] shadow-md shadow-[#007BA7]/30 font-semibold'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#252525]/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#007BA7] hover:bg-[#0090C2] text-white border border-[#007BA7] hover:border-[#FF2D75]/60 shadow-lg shadow-[#007BA7]/25 hover:shadow-[#007BA7]/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <FileDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </button>

            <button
              onClick={onOpenResume}
              className="sm:hidden p-2 text-white bg-[#007BA7] rounded-lg border border-[#007BA7]"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#141414] border border-[#252525] text-[#A1A1AA] hover:text-white hover:border-[#007BA7] transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden glass-nav border-t border-[#252525] mt-3"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="px-3 py-2 mb-2 rounded-lg bg-[#141414] border border-[#252525] flex items-center gap-2 text-xs text-[#A1A1AA]">
                <span className="w-2 h-2 rounded-full bg-[#FF2D75] animate-ping" />
                <span>{personalInfo.availability}</span>
              </div>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#007BA7]/20 text-white border border-[#007BA7]'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-[#141414]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] text-white text-sm font-semibold shadow-lg shadow-[#007BA7]/25 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

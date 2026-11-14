import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Navbar({ onOpenResume, theme = 'dark', onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isLight = theme === 'light';

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3.5 shadow-xl' : 'nav-top py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Personal Logo / Developer Initials */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group min-w-0"
          >
            <div className="px-2.5 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] flex items-center justify-center transition-colors shadow-sm shrink-0">
              <span className="font-mono font-bold text-sm tracking-tight text-[var(--text-primary)]">
                <span className="text-[var(--accent-primary)]">&lt;</span>
                {personalInfo.initials}
                <span className="text-[var(--accent-secondary)]">/&gt;</span>
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs xs:text-sm sm:text-base tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                <span className="sm:hidden">{personalInfo.name.trim()}</span>
                <span className="hidden sm:inline">{personalInfo.displayName}</span>
              </span>
              <span className="text-[10px] xs:text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5 truncate">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse shrink-0" />
                <span className="truncate">
                  <span className="sm:hidden">MCA Sem 3 • AIMIS</span>
                  <span className="hidden sm:inline">{personalInfo.currentEducation} • AIMIS</span>
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 bg-[var(--bg-card)]/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[var(--border-color)] transition-colors duration-300"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${isActive
                      ? 'text-white bg-[var(--accent-primary)] shadow-md font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions, Theme Toggle & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Clear Light / Dark Theme Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
              title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              data-testid="theme-toggle"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-primary)] transition-transform duration-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-secondary)] transition-transform duration-300" />
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white border border-[var(--accent-primary)] hover:border-[var(--accent-secondary)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <FileDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="hidden xs:inline-flex sm:hidden p-2 text-white bg-[var(--accent-primary)] rounded-lg border border-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
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
            role="dialog"
            aria-label="Mobile Navigation Menu"
            className="lg:hidden overflow-hidden glass-nav border-t border-[var(--border-color)] mt-3"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="px-3 py-2 mb-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-ping shrink-0" />
                  <span className="truncate">{personalInfo.availability}</span>
                </div>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-[11px] shrink-0"
                >
                  {isLight ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                  <span>{isLight ? 'Dark' : 'Light'}</span>
                </button>
              </div>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-[var(--accent-primary-soft)] text-[var(--text-primary)] border border-[var(--accent-primary)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-sm font-semibold shadow-lg transition-colors"
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

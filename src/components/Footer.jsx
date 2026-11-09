import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code2 } from 'lucide-react';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-[#252525] bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-[#252525]">

            {/* Developer Logo & Short Professional Tagline */}
            <div className="md:col-span-5 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-3">
                <div className="px-2.5 h-9 rounded-xl bg-[#141414] border border-[#252525] flex items-center justify-center">
                  <span className="font-mono font-bold text-xs text-white">
                    <span className="text-[#007BA7]">&lt;</span>
                    {personalInfo.initials}
                    <span className="text-[#FF2D75]">/&gt;</span>
                  </span>
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {personalInfo.displayName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm mx-auto md:mx-0">
                Engineering scalable full-stack web applications and clean backend architectures.
              </p>
            </div>

            {/* Navigation Shortcuts */}
            <div className="md:col-span-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs sm:text-sm text-[#A1A1AA] hover:text-[#007BA7] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#141414] border border-[#252525] text-white hover:border-[#007BA7] hover:text-[#007BA7] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#141414] border border-[#252525] text-[#007BA7] hover:border-[#007BA7] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {personalInfo.social.email && (
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="p-2.5 rounded-xl bg-[#141414] border border-[#252525] text-[#FF2D75] hover:border-[#FF2D75] hover:text-white transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
            <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5 font-medium text-white">
              <Code2 className="w-3.5 h-3.5 text-[#007BA7]" />
              <span>Built with React, Tailwind CSS &amp; Framer Motion</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-3 rounded-xl bg-[#141414] border border-[#252525] hover:border-[#FF2D75] text-[#007BA7] hover:text-white hover:bg-[#007BA7] shadow-xl shadow-black/60 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}

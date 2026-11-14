import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, Code2, Cpu, Database, Braces } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const [activeTab, setActiveTab] = useState('react');

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippets = {
    react: {
      filename: "HarshulProfile.jsx",
      language: "React / JSX",
      code: `const Developer = {
  name: "Solanki Harshul Rajnikant",
  role: "Full Stack Developer",
  education: "MCA Sem 3 @ AIMIS",
  location: "Nadiad, Gujarat, India",
  stack: {
    languages: ["Java", "Python", "C", "C++", "JS"],
    frontend: ["React.js", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Spring Boot", "FastAPI", "Node.js"],
    databases: ["MySQL", "MongoDB"]
  },
  openToInternship: true
};

export default Developer;`
    },
    springboot: {
      filename: "BookstoreController.java",
      language: "Java / Spring Boot",
      code: `@RestController
@RequestMapping("/api/bookstore")
public class BookstoreController {

    @GetMapping("/catalog")
    public ResponseEntity<List<Book>> listBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderReceipt> checkout(
            @RequestBody CartCheckoutRequest req) {
        return ResponseEntity.ok(paymentService.process(req));
    }
}`
    },
    fastapi: {
      filename: "umcao_analyzer.py",
      language: "Python / FastAPI",
      code: `from fastapi import FastAPI
from core.ast_engine import CodeAnalyzer

app = FastAPI(title="UMCAO Platform")

@app.post("/api/analyze")
async def analyze_source(source: str, lang: str):
    analyzer = CodeAnalyzer(language=lang)
    patterns = analyzer.detect_inefficiencies(source)
    return {
        "complexity": analyzer.estimate_complexity(source),
        "suggestions": analyzer.suggest_optimizations(patterns)
    }`
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">

          {/* Left Side: Badge, Headings, Highlighted Intro, 2 CTAs & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 min-w-0 space-y-5 sm:space-y-7 text-center lg:text-left"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs sm:text-sm font-medium text-[var(--text-primary)] shadow-sm transition-colors duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-secondary)]"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Heading & Title */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15] sm:leading-[1.12] transition-colors duration-300">
                Hi, I'm{" "}
                <span className="hero-name-gradient">
                  {personalInfo.name}
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2.5">
                <span className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-[var(--accent-primary)] transition-colors duration-300">
                  {personalInfo.role}
                </span>
                <span className="hidden sm:inline text-[var(--border-color)]">|</span>
                <span className="text-xs xs:text-sm sm:text-base font-mono font-medium text-[var(--text-secondary)]">
                  {personalInfo.currentEducation} • AIMIS
                </span>
              </div>
            </div>

            {/* Introduction with Theme Highlights */}
            <p className="text-sm xs:text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="text-[var(--text-primary)] font-semibold border-b border-[var(--accent-primary)]">MCA student</span> and aspiring{" "}
              <span className="text-[var(--accent-primary)] font-semibold">Full Stack Developer</span> passionate about building{" "}
              <span className="text-[var(--text-primary)] font-medium">scalable web applications</span>, developing{" "}
              <span className="text-[var(--accent-secondary)] font-semibold">backend systems</span>, and creating{" "}
              <span className="text-[var(--text-primary)] font-medium">modern user experiences</span>.
            </p>

            {/* Two Primary CTA Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 w-full xs:w-auto">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-semibold text-sm shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all w-full xs:w-auto"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-[var(--text-primary)] font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 w-full xs:w-auto"
              >
                <Download className="w-4 h-4 text-[var(--accent-secondary)]" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links: GitHub, LinkedIn, Email */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[var(--text-secondary)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mr-0.5">Connect:</span>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-all text-xs font-medium"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-[var(--text-primary)]" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-all text-xs font-medium"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>LinkedIn</span>
              </a>
              {personalInfo.social.email ? (
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] hover:text-[var(--text-primary)] transition-all text-xs font-medium"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-secondary)]" />
                  <span>Email</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] hover:text-[var(--text-primary)] transition-all text-xs font-medium"
                  aria-label="Contact Section"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-secondary)]" />
                  <span>Email</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Side: Abstract 3D-Styled Coding Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 min-w-0 relative pt-2 lg:pt-0"
          >
            {/* Subtle Animated Decorative Blobs behind card */}
            <div className="absolute top-4 left-0 w-36 h-36 rounded-full bg-[var(--accent-primary)]/20 blur-2xl animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-4 right-0 w-36 h-36 rounded-full bg-[var(--accent-secondary)]/15 blur-2xl animate-pulse-glow pointer-events-none" />

            {/* Top Floating Tech Pill */}
            <div className="hidden sm:flex justify-end mb-2.5">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--accent-primary-border)] shadow-lg text-xs font-mono text-[var(--text-primary)] transition-colors duration-300"
              >
                <Code2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>React.js • Tailwind CSS</span>
              </motion.div>
            </div>

            {/* Coding Terminal Window Card */}
            <div className="relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-card overflow-hidden transition-colors duration-300">
              {/* Subtle top gradient hairline */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: 'linear-gradient(to right, var(--accent-primary), transparent, var(--accent-secondary))',
                }}
              />

              {/* Terminal Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bg-primary)] border-b border-[var(--border-color)] transition-colors duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)]/50 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]/80 inline-block" />
                  <span className="ml-1.5 sm:ml-2 text-xs font-mono text-[var(--text-secondary)] hidden sm:inline">
                    harshul-dev ~ workspace
                  </span>
                </div>

                {/* Stack Switcher */}
                <div className="flex items-center gap-1">
                  {[
                    { key: 'react', label: 'React' },
                    { key: 'springboot', label: 'Spring' },
                    { key: 'fastapi', label: 'FastAPI' }
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded-md transition-colors ${activeTab === tab.key
                          ? 'bg-[var(--accent-primary)] text-white font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active File Subheader */}
              <div className="px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between text-xs font-mono transition-colors duration-300">
                <span className="flex items-center gap-1.5 text-[var(--accent-primary)]">
                  <Terminal className="w-3.5 h-3.5" />
                  {codeSnippets[activeTab].filename}
                </span>
                <span className="text-[11px] text-[var(--text-secondary)]">
                  {codeSnippets[activeTab].language}
                </span>
              </div>

              {/* Code Preview */}
              <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors duration-300">
                <pre>
                  <code>{codeSnippets[activeTab].code}</code>
                </pre>
              </div>

              {/* Bottom Status Strip */}
              <div className="px-4 py-2.5 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>MySQL • MongoDB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Braces className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                  <span>Full Stack</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Tech Pill */}
            <div className="hidden sm:flex justify-start mt-2.5">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--accent-secondary-border)] shadow-lg text-xs font-mono text-[var(--text-primary)] transition-colors duration-300"
              >
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                <span>Spring Boot • FastAPI • ASP.NET</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

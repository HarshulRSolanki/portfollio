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
  education: "MCA Sem 3 @ GTU",
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
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Side: Badge, Headings, Highlighted Intro, 2 CTAs & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 min-w-0 space-y-6 sm:space-y-7 text-center lg:text-left"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#252525] text-xs sm:text-sm font-medium text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D75] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D75]"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Heading & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#007BA7] to-[#FF2D75]">
                  {personalInfo.name}
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#007BA7]">
                  {personalInfo.role}
                </span>
                <span className="hidden sm:inline text-[#252525]">|</span>
                <span className="text-sm sm:text-base font-mono font-medium text-[#A1A1AA]">
                  {personalInfo.currentEducation} • GTU
                </span>
              </div>
            </div>

            {/* Introduction with Ocean Blue & Vibrant Pink highlights */}
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="text-white font-semibold border-b border-[#007BA7]/70">MCA student</span> and aspiring{" "}
              <span className="text-[#007BA7] font-semibold">Full Stack Developer</span> passionate about building{" "}
              <span className="text-white font-medium">scalable web applications</span>, developing{" "}
              <span className="text-[#FF2D75] font-semibold">backend systems</span>, and creating{" "}
              <span className="text-white font-medium">modern user experiences</span>.
            </p>

            {/* Two Primary CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] text-white font-semibold text-sm shadow-lg shadow-[#007BA7]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#252525] hover:border-[#FF2D75] text-white font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 text-[#FF2D75]" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links: GitHub, LinkedIn, Email */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-[#A1A1AA]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mr-1">Connect:</span>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#007BA7] hover:text-white transition-all text-xs font-medium"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-[#FFFFFF]" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#007BA7] hover:text-white transition-all text-xs font-medium"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#007BA7]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              {personalInfo.social.email ? (
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#FF2D75] hover:text-white transition-all text-xs font-medium"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 text-[#FF2D75]" />
                  <span className="hidden sm:inline">Email</span>
                </a>
              ) : (
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#FF2D75] hover:text-white transition-all text-xs font-medium"
                  aria-label="Contact Section"
                >
                  <Mail className="w-4 h-4 text-[#FF2D75]" />
                  <span className="hidden sm:inline">Email</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Side: Abstract 3D-Styled Coding Visual with Subtle Animated Blue & Pink Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 min-w-0 relative pt-2 lg:pt-0"
          >
            {/* Subtle Animated Decorative Blue & Pink Blobs behind card */}
            <div className="absolute top-4 left-0 w-36 h-36 rounded-full bg-[#007BA7]/20 blur-2xl animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-4 right-0 w-36 h-36 rounded-full bg-[#FF2D75]/15 blur-2xl animate-pulse-glow pointer-events-none" />

            {/* Top Floating Tech Pill (cleanly positioned above card without overlapping tabs) */}
            <div className="hidden sm:flex justify-end mb-2.5">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#007BA7]/60 shadow-lg text-xs font-mono text-white"
              >
                <Code2 className="w-3.5 h-3.5 text-[#007BA7]" />
                <span>React.js • Tailwind CSS</span>
              </motion.div>
            </div>

            {/* Coding Terminal Window Card */}
            <div className="relative rounded-2xl bg-[#141414] border border-[#252525] shadow-2xl shadow-black/90 overflow-hidden">
              {/* Subtle top gradient hairline */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#007BA7] via-[#007BA7]/40 to-[#FF2D75]" />

              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-[#252525]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D75]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A1A1AA]/50 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#007BA7]/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-[#A1A1AA] hidden sm:inline">
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
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-colors ${
                        activeTab === tab.key
                          ? 'bg-[#007BA7] text-white font-semibold'
                          : 'text-[#A1A1AA] hover:text-white hover:bg-[#141414]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active File Subheader */}
              <div className="px-4 py-2 bg-[#141414] border-b border-[#252525] flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#007BA7]">
                  <Terminal className="w-3.5 h-3.5" />
                  {codeSnippets[activeTab].filename}
                </span>
                <span className="text-[11px] text-[#A1A1AA]">
                  {codeSnippets[activeTab].language}
                </span>
              </div>

              {/* Code Preview */}
              <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono text-white/90 bg-[#0A0A0A]">
                <pre className="selection:bg-[#007BA7]/40">
                  <code>{codeSnippets[activeTab].code}</code>
                </pre>
              </div>

              {/* Bottom Status Strip */}
              <div className="px-4 py-2.5 bg-[#141414] border-t border-[#252525] flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#007BA7]" />
                  <span>MySQL • MongoDB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Braces className="w-3.5 h-3.5 text-[#FF2D75]" />
                  <span>Full Stack</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Tech Pill (cleanly placed outside status strip) */}
            <div className="hidden sm:flex justify-start mt-2.5">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#FF2D75]/50 shadow-lg text-xs font-mono text-white"
              >
                <Cpu className="w-3.5 h-3.5 text-[#FF2D75]" />
                <span>Spring Boot • FastAPI • ASP.NET</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

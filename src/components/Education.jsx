import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-14 xs:py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>ACADEMIC JOURNEY</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Education <span className="text-[var(--accent-primary)]">Timeline</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)]">
            Academic foundations in computer applications, algorithms, and software systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 timeline-line" />

          <div className="space-y-8 sm:space-y-10">
            {educationHistory.map((edu, index) => {
              const isCurrent = edu.status.toLowerCase().includes('pursuing');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className="relative pl-10 sm:pl-20"
                >
                  {/* Timeline Node Icon */}
                  <div
                    className={`absolute left-0 sm:left-4 top-5 sm:top-6 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all bg-[var(--bg-primary)] ${
                      isCurrent
                        ? 'border-[var(--accent-secondary)] text-[var(--accent-secondary)] shadow-md'
                        : 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full border border-[var(--accent-secondary)] animate-ping opacity-35" />
                    )}
                  </div>

                  {/* Education Card */}
                  <div className="premium-card rounded-2xl p-4 sm:p-8 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium mb-2 ${
                            isCurrent ? 'pink-badge' : 'ocean-badge'
                          }`}
                        >
                          {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />}
                          {edu.status}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[var(--accent-primary)] mt-1">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                        <span className="inline-flex items-center gap-1.5 bg-[var(--bg-primary)] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                          <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                          {edu.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-1 text-[var(--text-secondary)]">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] mb-4 flex items-start gap-2.5 text-xs sm:text-sm transition-colors duration-300">
                      <BookOpen className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[var(--text-primary)] mr-1.5">Key Focus:</span>
                        <span className="text-[var(--text-secondary)]">{edu.focus}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {edu.highlights.map((item, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#252525] text-[#007BA7] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>ACADEMIC JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education <span className="text-[#007BA7]">Timeline</span>
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Academic foundations in computer applications, algorithms, and software systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#007BA7] via-[#FF2D75]/60 to-transparent" />

          <div className="space-y-10">
            {educationHistory.map((edu, index) => {
              const isCurrent = edu.status.toLowerCase().includes('pursuing');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline Node Icon */}
                  <div
                    className={`absolute left-2 sm:left-4 top-6 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCurrent
                        ? 'bg-[#0A0A0A] border-[#FF2D75] text-[#FF2D75] shadow-[0_0_20px_rgba(255,45,117,0.35)]'
                        : 'bg-[#0A0A0A] border-[#007BA7] text-[#007BA7]'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full border border-[#FF2D75]/50 animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Education Card */}
                  <div className="premium-card rounded-2xl p-6 sm:p-8 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium mb-2 ${
                            isCurrent ? 'pink-badge' : 'ocean-badge'
                          }`}
                        >
                          {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D75] animate-pulse" />}
                          {edu.status}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#007BA7] transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[#007BA7] mt-1">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-[#A1A1AA]">
                        <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] px-3 py-1.5 rounded-lg border border-[#252525]">
                          <Calendar className="w-3.5 h-3.5 text-[#007BA7]" />
                          {edu.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-1 text-[#A1A1AA]">
                          <MapPin className="w-3.5 h-3.5 text-[#FF2D75]" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] mb-4 flex items-start gap-2.5 text-xs sm:text-sm">
                      <BookOpen className="w-4 h-4 text-[#007BA7] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white mr-1.5">Key Focus:</span>
                        <span className="text-[#A1A1AA]">{edu.focus}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {edu.highlights.map((item, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA]">
                          <CheckCircle2 className="w-4 h-4 text-[#007BA7] shrink-0 mt-0.5" />
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

import React from 'react';
import { GraduationCap, Target, MapPin, UserCheck, Code2, Sparkles } from 'lucide-react';
import { personalInfo, aboutHighlights, aboutStats } from '../data/portfolioData';

const iconMap = {
  GraduationCap: GraduationCap,
  Target: Target,
  Code2: Code2
};

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Engineering Mindset &amp; <span className="text-[var(--accent-primary)]">Background</span>
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Focused on practical software design, full-stack architecture, and continuous improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Professional Developer Profile Card */}
          <div className="lg:col-span-7 premium-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle top hairline accent */}
            <div
              className="absolute top-0 inset-x-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
              }}
            />

            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center text-[var(--accent-primary)]">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{personalInfo.name}</h3>
                    <p className="text-xs font-mono text-[var(--accent-primary)]">
                      {personalInfo.role} • {personalInfo.currentEducation}
                    </p>
                  </div>
                </div>
                <span className="pink-badge px-3 py-1 rounded-full text-xs font-mono font-medium">
                  GTU Student
                </span>
              </div>

              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                <p>
                  I am currently pursuing <span className="text-[var(--text-primary)] font-semibold">MCA Semester 3 at Gujarat Technological University (GTU)</span>, building on my undergraduate foundation in <span className="text-[var(--text-primary)] font-semibold">Bachelor of Computer Applications (BCA)</span>.
                </p>
                <p>
                  With a strong interest in <span className="text-[var(--accent-primary)] font-semibold">Full Stack Development</span>, I have gained hands-on experience designing and developing academic and personal software projects—from code analysis tools to e-commerce and healthcare management platforms.
                </p>
                <p>
                  I enjoy solving real-world engineering problems, crafting clean backend APIs, structuring reliable databases, and continuously learning modern web technologies.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-2 text-[var(--text-primary)] font-medium">
                <MapPin className="w-4 h-4 text-[var(--accent-secondary)]" />
                {personalInfo.location}
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--text-secondary)] font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                {personalInfo.careerGoal}
              </span>
            </div>
          </div>

          {/* Right Column: Education Highlight, Career Objective & Genuine Fact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">

            {/* Education Highlight & Career Objective Cards */}
            <div className="space-y-4">
              {aboutHighlights.map((item) => {
                const IconComponent = iconMap[item.icon] || Code2;
                const isSecondary = item.id === 'career-objective';
                return (
                  <div
                    key={item.id}
                    className="premium-card p-5 rounded-2xl flex items-start gap-4 group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center border ${
                        isSecondary
                          ? 'bg-[var(--accent-secondary-soft)] border-[var(--accent-secondary-border)] text-[var(--accent-secondary)]'
                          : 'bg-[var(--accent-primary-soft)] border-[var(--accent-primary-border)] text-[var(--accent-primary)]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {item.title}
                        </h4>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isSecondary ? 'pink-badge' : 'ocean-badge'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[var(--text-secondary)]">{item.subtitle}</p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small Genuine Facts Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="premium-card p-4 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span
                    className={`text-lg sm:text-xl font-extrabold mt-1 ${
                      stat.accent === 'pink'
                        ? 'text-[var(--accent-secondary)]'
                        : 'text-[var(--accent-primary)]'
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-0.5 truncate">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

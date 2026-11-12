import React, { useState } from 'react';
import {
  Code2, Layers, Database, Terminal, Wrench,
  Search, Sparkles, Server, GitBranch, Braces, Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

const categoryIcons = {
  "Programming Languages": Terminal,
  Frontend: Layers,
  Backend: Server,
  Databases: Database,
  Tools: Wrench,
};

const getSkillIcon = (iconKey, isSecondary) => {
  const colorClass = isSecondary
    ? 'text-[var(--accent-secondary)]'
    : 'text-[var(--accent-primary)]';
  switch (iconKey) {
    case 'react':
    case 'html':
    case 'css':
    case 'tailwind':
      return <Code2 className={`w-4 h-4 ${colorClass} shrink-0`} />;
    case 'javascript':
    case 'c':
    case 'cpp':
      return <Braces className={`w-4 h-4 ${colorClass} shrink-0`} />;
    case 'java':
    case 'python':
    case 'springboot':
    case 'fastapi':
    case 'nodejs':
    case 'express':
      return <Cpu className={`w-4 h-4 ${colorClass} shrink-0`} />;
    case 'mysql':
    case 'mongodb':
      return <Database className={`w-4 h-4 ${colorClass} shrink-0`} />;
    case 'git':
    case 'github':
      return <GitBranch className={`w-4 h-4 ${colorClass} shrink-0`} />;
    default:
      return <Wrench className={`w-4 h-4 ${colorClass} shrink-0`} />;
  }
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories = ['All', ...skillCategories.map((c) => c.name)];

  const filteredCategories = skillCategories
    .filter((cat) => selectedCategory === 'All' || cat.name === selectedCategory)
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>TECHNICAL STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Technical <span className="text-[var(--accent-primary)]">Skills</span>
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Technologies, frameworks, and tools I use to architect full-stack applications.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            {filterCategories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--accent-primary)] text-white shadow-md font-semibold'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. Java, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
            />
          </div>
        </div>

        {/* Categorized Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Code2;
            const isSecondary = category.accent === 'pink';

            return (
              <div
                key={category.name}
                className="premium-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                          isSecondary
                            ? 'bg-[var(--accent-secondary-soft)] border-[var(--accent-secondary-border)] text-[var(--accent-secondary)]'
                            : 'bg-[var(--accent-primary-soft)] border-[var(--accent-primary-border)] text-[var(--accent-primary)]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                          {category.skills.length} items
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] transition-all hover:-translate-y-0.5"
                      >
                        {getSkillIcon(skill.icon, isSecondary)}
                        <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 premium-card rounded-2xl">
            <p className="text-sm text-[var(--text-secondary)]">No skills found matching "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

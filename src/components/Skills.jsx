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

const getSkillIcon = (iconKey, isPink) => {
  const colorClass = isPink ? 'text-[#FF2D75]' : 'text-[#007BA7]';
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#252525] text-[#007BA7] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>TECHNICAL STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-[#007BA7]">Skills</span>
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Technologies, frameworks, and tools I use to architect full-stack applications.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#007BA7] text-white shadow-md shadow-[#007BA7]/30 font-semibold'
                    : 'bg-[#141414] text-[#A1A1AA] hover:text-white border border-[#252525] hover:border-[#007BA7]/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. Java, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141414] border border-[#252525] text-xs text-white placeholder-[#A1A1AA]/70 focus:outline-none focus:border-[#007BA7] focus:ring-1 focus:ring-[#007BA7] transition-all"
            />
          </div>
        </div>

        {/* Categorized Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Code2;
            const isPink = category.accent === 'pink';

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
                          isPink
                            ? 'bg-[#FF2D75]/10 border-[#FF2D75]/30 text-[#FF2D75]'
                            : 'bg-[#007BA7]/15 border-[#007BA7]/40 text-[#007BA7]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#007BA7] transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[#A1A1AA]">
                          {category.skills.length} items
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Grid (Clean badges, no fake percentages) */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#FF2D75]/60 transition-all hover:-translate-y-0.5 group/skill"
                      >
                        {getSkillIcon(skill.icon, isPink)}
                        <span className="text-xs sm:text-sm font-medium text-white group-hover/skill:text-white">
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
            <p className="text-sm text-[#A1A1AA]">No skills found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[#007BA7] hover:text-[#FF2D75] underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

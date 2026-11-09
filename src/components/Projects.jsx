import React, { useState } from 'react';
import { Github, ExternalLink, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectVisual from './ProjectVisual';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', 'React.js + Python', 'Java + Spring Boot', 'ASP.NET Core MVC'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'React.js + Python') {
      return project.technologies.includes('React.js') || project.technologies.includes('Python');
    }
    if (filter === 'Java + Spring Boot') {
      return project.technologies.includes('Java') || project.technologies.includes('Spring Boot');
    }
    if (filter === 'ASP.NET Core MVC') {
      return project.technologies.includes('ASP.NET Core MVC');
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#252525] text-[#007BA7] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>SELECTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-[#007BA7]">Projects</span>
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Software applications showcasing full-stack architectures, backend API development, and relational data design.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === option
                  ? 'bg-[#007BA7] text-white shadow-md shadow-[#007BA7]/30 font-semibold'
                  : 'bg-[#141414] text-[#A1A1AA] hover:text-white border border-[#252525] hover:border-[#007BA7]/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => {
            const targetGithubUrl = project.githubUrl || project.profileGithubFallback;

            return (
              <article
                key={project.id}
                className="premium-card rounded-2xl flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Project Screenshot / Interactive Visual Preview */}
                  <ProjectVisual
                    type={project.visualType}
                    screenshotUrl={project.screenshotUrl}
                    title={project.title}
                  />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md ocean-badge text-[11px] font-mono">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#007BA7] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Top Features */}
                    <ul className="mt-4 space-y-1.5">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D75] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technology Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border ${
                            idx % 2 === 0
                              ? 'bg-[#0A0A0A] text-white border-[#252525] group-hover:border-[#007BA7]/40'
                              : 'bg-[#0A0A0A] text-[#A1A1AA] border-[#252525] group-hover:border-[#FF2D75]/40'
                          } transition-colors`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-[#252525] flex flex-wrap items-center gap-2.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] text-white text-xs font-semibold shadow-md shadow-[#007BA7]/25 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  <a
                    href={targetGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#252525] hover:border-[#007BA7] text-white text-xs font-semibold transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{project.githubUrl ? 'GitHub' : 'GitHub Profile'}</span>
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF2D75]/10 hover:bg-[#FF2D75]/20 border border-[#FF2D75]/35 text-[#FF2D75] text-xs font-semibold transition-all ml-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

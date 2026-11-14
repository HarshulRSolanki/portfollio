import React, { useState, useEffect } from 'react';
import {
  Github, ExternalLink, Eye, Sparkles, CheckCircle2,
  Folder, GitBranch, AlertCircle
} from 'lucide-react';
import {
  projects,
  getProjectGitHubInfo,
  fetchGitHubDirectoryContents,
} from '../data/portfolioData';
import ProjectVisual from './ProjectVisual';

function ProjectRepoDirectories({ project }) {
  const ghInfo = getProjectGitHubInfo(project);
  const [state, setState] = useState({
    loading: ghInfo.isValid && ghInfo.isRepo,
    branch: ghInfo.branch || 'main',
    dirs: [],
    error: ghInfo.isValid && ghInfo.isRepo ? '' : ghInfo.error || 'Repository unavailable.',
  });

  useEffect(() => {
    let active = true;
    if (!ghInfo.isValid || !ghInfo.isRepo) {
      setState({
        loading: false,
        branch: 'main',
        dirs: [],
        error: ghInfo.error || 'Repository path unavailable.',
      });
      return () => {
        active = false;
      };
    }

    fetchGitHubDirectoryContents(ghInfo.owner, ghInfo.repo, ghInfo.branch, ghInfo.initialPath)
      .then((res) => {
        if (!active) return;
        if (!res.ok) {
          setState({
            loading: false,
            branch: res.branch || 'main',
            dirs: [],
            error: res.error || 'Unable to load repository folders.',
          });
          return;
        }
        setState({
          loading: false,
          branch: res.branch || 'main',
          dirs: res.items.filter((item) => item.type === 'dir'),
          error: '',
        });
      });

    return () => {
      active = false;
    };
  }, [ghInfo.owner, ghInfo.repo, ghInfo.branch, ghInfo.initialPath, ghInfo.isValid, ghInfo.isRepo, ghInfo.error]);

  return (
    <div className="px-4 sm:px-6 pb-4">
      <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 transition-colors duration-300">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>GitHub Folders</span>
          </span>
          {ghInfo.isRepo && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]">
              <GitBranch className="w-3 h-3 text-[var(--accent-secondary)]" />
              {state.branch}
            </span>
          )}
        </div>

        {state.loading ? (
          <p className="text-[11px] font-mono text-[var(--text-secondary)] animate-pulse">
            Loading repository directories...
          </p>
        ) : state.error ? (
          <p className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" />
            <span>{state.error}</span>
          </p>
        ) : state.dirs.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {state.dirs.map((dir) => (
              <a
                key={dir.path}
                href={dir.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Open ${dir.path} on GitHub (${state.branch})`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[11px] font-mono text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Folder className="w-3 h-3 text-[var(--accent-primary)] shrink-0" />
                <span>{dir.name}/</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-[11px] font-mono text-[var(--text-secondary)]">
            Files located at repository root.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', 'React.js + Python', 'Java + Spring Boot'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'React.js + Python') {
      return project.technologies.includes('React.js') || project.technologies.includes('Python');
    }
    if (filter === 'Java + Spring Boot') {
      return project.technologies.includes('Java') || project.technologies.includes('Spring Boot');
    }
    return true;
  });

  return (
    <section id="projects" className="py-14 xs:py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>SELECTED WORK</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Featured <span className="text-[var(--accent-primary)]">Projects</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)]">
            Software applications showcasing full-stack architectures, backend API development, and relational data design.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {filterOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${filter === option
                  ? 'bg-[var(--accent-primary)] text-white shadow-md font-semibold'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Responsive Project Grid */}
        <div
          className={`grid gap-6 sm:gap-7 ${
            filteredProjects.length === 1
              ? 'grid-cols-1 max-w-xl mx-auto'
              : filteredProjects.length === 2
              ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProjects.map((project) => {
            const ghInfo = getProjectGitHubInfo(project);
            const targetGithubUrl = ghInfo.repoUrl || ghInfo.canonicalUrl;

            return (
              <article
                key={project.id}
                className="premium-card rounded-2xl flex flex-col justify-between h-full group overflow-hidden"
              >
                <div className="flex-1 flex flex-col">
                  {/* Project Screenshot / Interactive Visual Preview */}
                  <ProjectVisual
                    type={project.visualType}
                    screenshotUrl={project.screenshotUrl}
                    title={project.title}
                  />

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md ocean-badge text-[11px] font-mono">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 sm:mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Top Features */}
                    <ul className="mt-4 space-y-2">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technology Tags */}
                    <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border bg-[var(--bg-primary)] border-[var(--border-color)] ${idx % 2 === 0
                              ? 'text-[var(--text-primary)] group-hover:border-[var(--accent-primary)]'
                              : 'text-[var(--text-secondary)] group-hover:border-[var(--accent-secondary)]'
                            } transition-colors`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Live GitHub Repository Directories */}
                  <ProjectRepoDirectories project={project} />

                  {/* Action Footer */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {ghInfo.isValid && targetGithubUrl ? (
                      <a
                        href={targetGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold transition-all"
                      >
                        <Github className="w-3.5 h-3.5 shrink-0" />
                        <span className="hidden xs:inline">{ghInfo.isRepo ? 'GitHub Repository' : 'GitHub Profile'}</span>
                        <span className="xs:hidden">GitHub</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-medium opacity-75">
                        <Github className="w-3.5 h-3.5 shrink-0" />
                        <span>Unavailable</span>
                      </span>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-xs font-semibold shadow-md transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[var(--accent-secondary-soft)] hover:bg-[var(--accent-secondary)] border border-[var(--accent-secondary-border)] text-[var(--accent-secondary-badge-text)] hover:text-white text-xs font-semibold transition-all ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 shrink-0" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

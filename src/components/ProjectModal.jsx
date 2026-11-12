import React, { useEffect, useState } from 'react';
import {
  X, Github, ExternalLink, Layers, CheckCircle2, Cpu,
  Folder, FileText, GitBranch, ChevronRight, ArrowLeft, AlertCircle
} from 'lucide-react';
import {
  getProjectGitHubInfo,
  buildGitHubTreeUrl,
  fetchGitHubDirectoryContents,
} from '../data/portfolioData';
import ProjectVisual from './ProjectVisual';

function formatFileSize(bytes) {
  if (!bytes || bytes < 1024) return `${bytes || 0} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const DETAIL_TABS = [
  { id: 'all', label: 'Overview & Stack' },
  { id: 'features', label: 'Features & Architecture' },
  { id: 'repository', label: 'GitHub Files' },
];

export default function ProjectModal({ project, onClose }) {
  const ghInfo = project ? getProjectGitHubInfo(project) : null;
  const [activeTab, setActiveTab] = useState('all');
  const [currentPath, setCurrentPath] = useState('');
  const [explorer, setExplorer] = useState({
    loading: false,
    branch: 'main',
    items: [],
    error: '',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const info = getProjectGitHubInfo(project);
    setActiveTab('all');
    setCurrentPath(info.initialPath || '');
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const info = getProjectGitHubInfo(project);
    if (!info.isValid || !info.isRepo) {
      setExplorer({
        loading: false,
        branch: 'main',
        items: [],
        error: info.error || 'GitHub repository path is unavailable.',
      });
      return;
    }

    let active = true;
    setExplorer((prev) => ({ ...prev, loading: true, error: '' }));

    fetchGitHubDirectoryContents(info.owner, info.repo, info.branch, currentPath)
      .then((res) => {
        if (!active) return;
        if (!res.ok) {
          setExplorer({
            loading: false,
            branch: res.branch || info.branch || 'main',
            items: [],
            error: res.error || 'Unable to load directory contents.',
          });
          return;
        }
        setExplorer({
          loading: false,
          branch: res.branch || 'main',
          items: res.items,
          error: '',
        });
      });

    return () => {
      active = false;
    };
  }, [project, currentPath]);

  if (!project || !ghInfo) return null;

  const targetGithubUrl = ghInfo.repoUrl || ghInfo.canonicalUrl;
  const currentTreeUrl =
    ghInfo.isRepo && ghInfo.owner && ghInfo.repo
      ? buildGitHubTreeUrl(ghInfo.owner, ghInfo.repo, explorer.branch, currentPath) || targetGithubUrl
      : targetGithubUrl;

  const pathSegments = currentPath ? currentPath.split('/').filter(Boolean) : [];

  const handleGoUp = () => {
    if (pathSegments.length === 0) return;
    setCurrentPath(pathSegments.slice(0, -1).join('/'));
  };

  const showOverview = activeTab === 'all';
  const showFeaturesAndArch = activeTab === 'all' || activeTab === 'features';
  const showRepository = activeTab === 'all' || activeTab === 'repository';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--modal-backdrop)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dedicated Modal Header (prevents close button from overlapping content) */}
        <header className="px-5 sm:px-7 py-4 sm:py-5 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-start justify-between gap-4 shrink-0 transition-colors duration-300">
          <div className="min-w-0 space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full ocean-badge text-[11px] font-mono">
              {project.category}
            </span>
            <h3
              id="project-modal-title"
              className="text-lg sm:text-2xl font-extrabold text-[var(--text-primary)] leading-snug"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-secondary)] transition-colors shrink-0"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Consistent Details Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Project details sections"
          className="px-5 sm:px-7 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex flex-wrap items-center gap-2 shrink-0 transition-colors duration-300"
        >
          {DETAIL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-white shadow-sm font-semibold'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Details Body with Uniform Margins & Section Spacing */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 space-y-6">
          {showOverview && (
            <>
              {/* Framed Project Visual Preview */}
              <div className="rounded-xl border border-[var(--border-color)] overflow-hidden">
                <ProjectVisual
                  type={project.visualType}
                  screenshotUrl={project.screenshotUrl}
                  title={project.title}
                />
              </div>

              {/* Project Description */}
              <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 transition-colors duration-300">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                  Project Overview
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <section className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                  <span>Technologies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border text-[var(--text-primary)] ${
                        idx % 2 === 0
                          ? 'bg-[var(--accent-primary-soft)] border-[var(--accent-primary-border)]'
                          : 'bg-[var(--accent-secondary-soft)] border-[var(--accent-secondary-border)]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}

          {showFeaturesAndArch && (
            <>
              {/* Key Features */}
              <section className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                  <span>Key Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture Overview */}
              {project.architecture && (
                <section className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                    <span>Architecture Overview</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(project.architecture).map(([layer, desc]) => (
                      <div
                        key={layer}
                        className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs sm:text-sm leading-relaxed"
                      >
                        <span className="font-mono font-semibold text-[var(--accent-primary)] capitalize mr-2">
                          {layer}:
                        </span>
                        <span className="text-[var(--text-secondary)]">{desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {showRepository && (
            /* Live GitHub Repository & Directory Explorer */
            <section className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                  <Folder className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                  <span>GitHub Repository &amp; Directory Explorer</span>
                </h4>
                {ghInfo.isRepo && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)]">
                      <GitBranch className="w-3 h-3 text-[var(--accent-secondary)] shrink-0" />
                      <span>{explorer.branch}</span>
                    </span>
                    {currentTreeUrl && (
                      <a
                        href={currentTreeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                      >
                        <span>Open Path on GitHub</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden">
                {/* Breadcrumb Toolbar */}
                <div className="px-4 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => setCurrentPath('')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        pathSegments.length === 0
                          ? 'text-[var(--text-primary)] font-semibold'
                          : 'text-[var(--accent-primary)] hover:underline'
                      }`}
                    >
                      {ghInfo.repo || 'repository'}
                    </button>
                    {pathSegments.map((segment, index) => {
                      const segPath = pathSegments.slice(0, index + 1).join('/');
                      const isLast = index === pathSegments.length - 1;
                      return (
                        <React.Fragment key={segPath}>
                          <ChevronRight className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                          <button
                            type="button"
                            onClick={() => setCurrentPath(segPath)}
                            className={`px-2 py-0.5 rounded transition-colors truncate max-w-[160px] ${
                              isLast
                                ? 'text-[var(--text-primary)] font-semibold'
                                : 'text-[var(--accent-primary)] hover:underline'
                            }`}
                          >
                            {segment}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {pathSegments.length > 0 && (
                    <button
                      type="button"
                      onClick={handleGoUp}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[11px] text-[var(--text-primary)] transition-colors shrink-0"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Up</span>
                    </button>
                  )}
                </div>

                {/* Explorer Body */}
                {explorer.loading ? (
                  <div className="p-4 text-xs font-mono text-[var(--text-secondary)] animate-pulse">
                    Loading directory contents from GitHub...
                  </div>
                ) : explorer.error ? (
                  <div className="p-4 text-xs text-[var(--text-secondary)] flex flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                      <span>{explorer.error}</span>
                    </span>
                    {currentPath && (
                      <button
                        type="button"
                        onClick={() => setCurrentPath('')}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] font-mono text-[11px]"
                      >
                        Back to Root
                      </button>
                    )}
                  </div>
                ) : explorer.items.length === 0 ? (
                  <div className="p-4 text-xs font-mono text-[var(--text-secondary)]">
                    This directory is empty.
                  </div>
                ) : (
                  <ul className="divide-y divide-[var(--border-color)] max-h-60 overflow-y-auto">
                    {explorer.items.map((item) => {
                      const isDir = item.type === 'dir';
                      return (
                        <li
                          key={item.path}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[var(--bg-card)] transition-colors"
                        >
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 min-w-0 flex-1 text-xs sm:text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors group/link"
                            title={`Open ${item.path} on GitHub`}
                          >
                            {isDir ? (
                              <Folder className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                            )}
                            <span className="truncate">
                              {item.name}
                              {isDir ? '/' : ''}
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-80 shrink-0 transition-opacity" />
                          </a>

                          {isDir ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPath(item.path);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                              title={`Inspect ${item.name} folder contents`}
                            >
                              <span>Browse</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0">
                              {formatFileSize(item.size)}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Dedicated Footer Action Bar with Symmetric Margins */}
        <footer className="px-5 sm:px-7 py-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 shrink-0 transition-colors duration-300">
          <div className="flex flex-wrap items-center gap-3">
            {ghInfo.isValid && targetGithubUrl ? (
              <a
                href={targetGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs sm:text-sm font-semibold transition-all"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>{ghInfo.isRepo ? 'GitHub Repository' : 'GitHub Profile'}</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs sm:text-sm font-semibold opacity-75">
                <Github className="w-4 h-4 shrink-0" />
                <span>Repository Unavailable</span>
              </span>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>Close</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

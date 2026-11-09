import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Layers, CheckCircle2, Cpu } from 'lucide-react';
import ProjectVisual from './ProjectVisual';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const targetGithubUrl = project.githubUrl || project.profileGithubFallback;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#141414] border border-[#252525] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#0A0A0A]/90 border border-[#252525] text-[#A1A1AA] hover:text-white hover:border-[#FF2D75] transition-colors"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Header */}
        <ProjectVisual
          type={project.visualType}
          screenshotUrl={project.screenshotUrl}
          title={project.title}
        />

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <span className="inline-block px-3 py-1 rounded-full ocean-badge text-xs font-mono mb-2">
              {project.category}
            </span>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#007BA7]" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border ${
                    idx % 2 === 0
                      ? 'bg-[#007BA7]/10 text-[#FFFFFF] border-[#007BA7]/40'
                      : 'bg-[#FF2D75]/10 text-[#FFFFFF] border-[#FF2D75]/35'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D75]" />
              Key Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs sm:text-sm text-white/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#007BA7] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Overview */}
          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#007BA7]" />
                Architecture Overview
              </h4>
              <div className="space-y-2.5">
                {Object.entries(project.architecture).map(([layer, desc]) => (
                  <div
                    key={layer}
                    className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs sm:text-sm"
                  >
                    <span className="font-mono font-semibold text-[#007BA7] capitalize mr-2">
                      {layer}:
                    </span>
                    <span className="text-[#A1A1AA]">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#252525] flex flex-wrap items-center gap-3">
            <a
              href={targetGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#252525] hover:border-[#007BA7] text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <Github className="w-4 h-4" />
              <span>{project.githubUrl ? 'GitHub Repository' : 'GitHub Profile'}</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#007BA7]/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

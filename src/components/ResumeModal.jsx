import React, { useEffect, useState } from 'react';
import {
  X, FileDown, ExternalLink, Printer, GraduationCap,
  Code2, FolderGit2, Info, CheckCircle2, Eye, FileText
} from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, onShowToast }) {
  const resumeUrl = (personalInfo.resume.downloadUrl || '').trim();
  const hasResumeUrl = Boolean(resumeUrl);
  const [activeTab, setActiveTab] = useState(hasResumeUrl ? 'pdf' : 'summary');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab(hasResumeUrl ? 'pdf' : 'summary');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, hasResumeUrl]);

  if (!isOpen) return null;

  const isExternalUrl = /^https?:\/\//i.test(resumeUrl) && !resumeUrl.startsWith(window.location.origin);

  const handleDownload = async () => {
    if (!hasResumeUrl) {
      onShowToast({
        type: 'info',
        title: 'Resume PDF Configurable',
        message: 'Set VITE_RESUME_URL in .env or place Resume.pdf in public/.'
      });
      return;
    }

    if (isExternalUrl) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
      onShowToast({
        type: 'success',
        title: 'Resume Opened',
        message: 'Opening your resume link in a new tab.'
      });
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(resumeUrl, { cache: 'no-cache' });
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!response.ok || contentType.includes('text/html')) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      if (!blob || blob.size === 0) {
        throw new Error('Empty PDF response');
      }
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = personalInfo.resume.fileName || 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1500);

      onShowToast({
        type: 'success',
        title: 'Resume Downloaded',
        message: `Downloading ${personalInfo.resume.fileName || 'Resume.pdf'}.`
      });
    } catch {
      onShowToast({
        type: 'info',
        title: 'Unable to Download Automatically',
        message: 'Please click "View PDF" to open and save the resume directly.'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--modal-backdrop)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] shrink-0 transition-colors duration-300">
          <div className="min-w-0">
            <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-[var(--text-primary)] truncate">
              Resume — {personalInfo.name}
            </h3>
            <p className="text-xs font-mono text-[var(--accent-primary)] truncate">
              {personalInfo.role} • {personalInfo.currentEducation}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-secondary)] transition-colors shrink-0"
            aria-label="Close resume modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Resume Tabs */}
        <div
          role="tablist"
          aria-label="Resume view options"
          className="px-5 sm:px-7 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex flex-wrap items-center gap-2 shrink-0 transition-colors duration-300"
        >
          {hasResumeUrl && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'pdf'}
              onClick={() => setActiveTab('pdf')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pdf'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm font-semibold'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
          )}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'summary'}
            onClick={() => setActiveTab('summary')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-[var(--accent-primary)] text-white shadow-sm font-semibold'
                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Summary</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-6">
          {activeTab === 'pdf' && hasResumeUrl ? (
            <div className="space-y-3">
              <div className="w-full h-[54vh] min-h-[340px] rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)]">
                <iframe
                  src={resumeUrl}
                  title={`${personalInfo.displayName} Resume PDF`}
                  className="w-full h-full border-0 bg-white"
                />
              </div>
              <p className="text-xs text-[var(--text-secondary)] flex flex-wrap items-center justify-between gap-2">
                <span>If the inline PDF preview does not display on your device, open it in a new tab or download it below.</span>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          ) : (
            <>
              {/* Header Block */}
              <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 transition-colors duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xl font-extrabold text-[var(--text-primary)]">{personalInfo.name}</h4>
                  <span className="px-2.5 py-1 rounded-full pink-badge text-xs font-mono">
                    {personalInfo.careerGoal}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {personalInfo.location} • {personalInfo.currentEducation}, {personalInfo.university}
                </p>
                <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-[var(--accent-primary)]">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-secondary)] flex items-center gap-1 transition-colors"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-secondary)] flex items-center gap-1 transition-colors"
                  >
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                  {personalInfo.social.email && (
                    <a
                      href={`mailto:${personalInfo.social.email}`}
                      className="hover:text-[var(--accent-secondary)] transition-colors"
                    >
                      {personalInfo.social.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Education Summary */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
                  Education
                </h5>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex flex-wrap justify-between gap-2 transition-colors duration-300">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">Master of Computer Applications (MCA)</p>
                      <p className="text-[var(--text-secondary)]">{personalInfo.university}</p>
                    </div>
                    <span className="text-xs font-mono text-[var(--accent-secondary)]">Semester 3 • Pursuing</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] transition-colors duration-300">
                    <p className="font-semibold text-[var(--text-primary)]">Bachelor of Computer Applications (BCA)</p>
                    <p className="text-[var(--text-secondary)]">Undergraduate Foundation in Computer Applications</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  Technical Stack
                </h5>
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs sm:text-sm space-y-2 text-[var(--text-secondary)] transition-colors duration-300">
                  <p><strong className="text-[var(--text-primary)]">Languages:</strong> Java, Python, C, C++, JavaScript</p>
                  <p><strong className="text-[var(--text-primary)]">Frontend:</strong> HTML, CSS, React.js, Tailwind CSS</p>
                  <p><strong className="text-[var(--text-primary)]">Backend:</strong> Spring Boot, FastAPI, Node.js, Express.js</p>
                  <p><strong className="text-[var(--text-primary)]">Databases &amp; Tools:</strong> MySQL, MongoDB, Git, GitHub, VS Code, Visual Studio</p>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5 flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-[var(--accent-secondary)]" />
                  Featured Projects
                </h5>
                <div className="space-y-2.5">
                  {projects.map((p) => (
                    <div key={p.id} className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] transition-colors duration-300">
                      <p className="font-semibold text-[var(--text-primary)] text-sm">{p.title}</p>
                      <p className="text-xs text-[var(--accent-primary)] font-mono mt-0.5">{p.technologies.join(' • ')}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {!hasResumeUrl && (
                <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>
                    To enable direct PDF downloads, set <code className="text-[var(--text-primary)]">VITE_RESUME_URL</code> in <code className="text-[var(--text-primary)]">.env</code> or place <code className="text-[var(--text-primary)]">Resume.pdf</code> in <code className="text-[var(--text-primary)]">public/</code>.
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="px-5 sm:px-7 py-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 shrink-0 transition-colors duration-300">
          <div className="flex flex-wrap items-center gap-2.5">
            {activeTab === 'summary' && (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-xs sm:text-sm font-semibold text-[var(--text-primary)] transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Summary</span>
              </button>
            )}

            {hasResumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-xs sm:text-sm font-semibold text-[var(--text-primary)] transition-colors"
              >
                <Eye className="w-4 h-4 text-[var(--accent-secondary)]" />
                <span>View PDF</span>
              </a>
            )}
          </div>

          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] border border-[var(--accent-primary)] hover:border-[var(--accent-secondary)] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all disabled:opacity-60"
          >
            {hasResumeUrl ? <CheckCircle2 className="w-4 h-4" /> : <FileDown className="w-4 h-4" />}
            <span>
              {isDownloading
                ? 'Downloading...'
                : hasResumeUrl
                ? 'Download Resume PDF'
                : 'Configure Resume PDF'}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}

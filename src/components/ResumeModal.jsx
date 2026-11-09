import React, { useEffect } from 'react';
import { X, FileDown, ExternalLink, Printer, GraduationCap, Code2, FolderGit2, Info, CheckCircle2 } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, onShowToast }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResumeUrl = Boolean(personalInfo.resume.downloadUrl);

  const handleDownload = () => {
    if (hasResumeUrl) {
      const link = document.createElement('a');
      link.href = personalInfo.resume.downloadUrl;
      link.download = personalInfo.resume.fileName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast({
        type: 'success',
        title: 'Resume Download Initiated',
        message: 'Opening / downloading the configured resume file.'
      });
    } else {
      onShowToast({
        type: 'info',
        title: 'Resume PDF Configurable',
        message: 'Set VITE_RESUME_URL in .env or place Harshul_R_Solanki_Resume.pdf in /public.'
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-[#252525] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0A] border-b border-[#252525]">
          <div>
            <h3 id="resume-modal-title" className="text-lg font-bold text-white">
              Resume Summary — {personalInfo.name}
            </h3>
            <p className="text-xs font-mono text-[#007BA7]">{personalInfo.role} • {personalInfo.currentEducation}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141414] border border-[#252525] text-[#A1A1AA] hover:text-white hover:border-[#FF2D75] transition-colors"
            aria-label="Close resume modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Content Summary */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Header Block */}
          <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#252525] space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xl font-extrabold text-white">{personalInfo.name}</h4>
              <span className="px-2.5 py-1 rounded-full pink-badge text-xs font-mono">
                {personalInfo.careerGoal}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              {personalInfo.location} • {personalInfo.currentEducation}, {personalInfo.university}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-[#007BA7]">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              {personalInfo.social.email && (
                <a href={`mailto:${personalInfo.social.email}`} className="hover:text-white transition-colors">
                  {personalInfo.social.email}
                </a>
              )}
            </div>
          </div>

          {/* Education Summary */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#007BA7]" />
              Education
            </h5>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-semibold text-white">Master of Computer Applications (MCA)</p>
                  <p className="text-[#A1A1AA]">{personalInfo.university}</p>
                </div>
                <span className="text-xs font-mono text-[#FF2D75]">Semester 3 • Pursuing</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525]">
                <p className="font-semibold text-white">Bachelor of Computer Applications (BCA)</p>
                <p className="text-[#A1A1AA]">Undergraduate Foundation in Computer Applications</p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#007BA7]" />
              Technical Stack
            </h5>
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs sm:text-sm space-y-2 text-[#A1A1AA]">
              <p><strong className="text-white">Languages:</strong> Java, Python, C, C++, JavaScript</p>
              <p><strong className="text-white">Frontend:</strong> HTML, CSS, React.js, Tailwind CSS</p>
              <p><strong className="text-white">Backend:</strong> Spring Boot, FastAPI, Node.js, Express.js</p>
              <p><strong className="text-white">Databases &amp; Tools:</strong> MySQL, MongoDB, Git, GitHub, VS Code, Visual Studio</p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2.5 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-[#FF2D75]" />
              Featured Projects
            </h5>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525]">
                  <p className="font-semibold text-white text-sm">{p.title}</p>
                  <p className="text-xs text-[#007BA7] font-mono mt-0.5">{p.technologies.join(' • ')}</p>
                  <p className="text-xs text-[#A1A1AA] mt-1.5">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {!hasResumeUrl && (
            <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs text-[#A1A1AA] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#007BA7] shrink-0 mt-0.5" />
              <span>
                To enable direct PDF downloads, set <code className="text-white">VITE_RESUME_URL</code> in <code className="text-white">.env</code> or place <code className="text-white">Harshul_R_Solanki_Resume.pdf</code> in <code className="text-white">public/</code>.
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0A0A0A] border-t border-[#252525] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#252525] hover:border-[#007BA7] text-xs sm:text-sm font-semibold text-white transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Summary</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] border border-[#007BA7] hover:border-[#FF2D75]/70 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#007BA7]/25 transition-all"
          >
            {hasResumeUrl ? <CheckCircle2 className="w-4 h-4" /> : <FileDown className="w-4 h-4" />}
            <span>{hasResumeUrl ? 'Download Resume PDF' : 'Configure Resume PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

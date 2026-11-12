import React, { useEffect, useState } from 'react';

export default function BackgroundGlow() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Subtle Mouse-Responsive Primary Accent Glow */}
      <div
        className="hidden md:block absolute w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.09] transition-transform duration-300 ease-out will-change-transform bg-[var(--accent-primary)]"
        style={{
          transform: `translate(${mousePos.x - 230}px, ${mousePos.y - 230}px)`,
        }}
      />

      {/* Restrained Atmospheric Accents */}
      <div className="absolute -top-48 left-1/4 w-[520px] h-[520px] bg-[var(--accent-primary)] opacity-[0.07] rounded-full blur-[150px] transition-colors duration-300" />
      <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] bg-[var(--accent-secondary)] opacity-[0.05] rounded-full blur-[150px] transition-colors duration-300" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[var(--accent-primary)] opacity-[0.04] rounded-full blur-[160px] transition-colors duration-300" />

      {/* Crisp Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-80" />
    </div>
  );
}

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#0A0A0A]">
      {/* Subtle Mouse-Responsive Ocean Blue Glow */}
      <div
        className="hidden md:block absolute w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.09] transition-transform duration-300 ease-out will-change-transform bg-[#007BA7]"
        style={{
          transform: `translate(${mousePos.x - 230}px, ${mousePos.y - 230}px)`,
        }}
      />

      {/* Restrained Atmospheric Accents (75% Deep Black dominant) */}
      <div className="absolute -top-48 left-1/4 w-[520px] h-[520px] bg-[#007BA7]/[0.07] rounded-full blur-[150px]" />
      <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] bg-[#FF2D75]/[0.05] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#007BA7]/[0.04] rounded-full blur-[160px]" />

      {/* Crisp Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-80" />
    </div>
  );
}

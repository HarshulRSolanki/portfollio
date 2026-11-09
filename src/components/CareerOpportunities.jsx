import React from 'react';
import { Briefcase, Layers, Terminal, Sparkles, ArrowUpRight } from 'lucide-react';
import { careerOpportunities } from '../data/portfolioData';

const iconMap = {
  Layers: Layers,
  Briefcase: Briefcase,
  Terminal: Terminal
};

export default function CareerOpportunities() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="career" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#252525] text-[#007BA7] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>CAREER &amp; OPPORTUNITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {careerOpportunities.headline.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-[#007BA7]">
              {careerOpportunities.headline.split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA] leading-relaxed">
            {careerOpportunities.description}
          </p>
        </div>

        {/* Three Opportunity Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerOpportunities.tracks.map((track, idx) => {
            const Icon = iconMap[track.icon] || Briefcase;
            const isPink = track.accent === 'pink';

            return (
              <div
                key={track.title}
                className="premium-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 inset-x-0 h-[2px] ${
                    isPink ? 'bg-[#FF2D75]' : 'bg-[#007BA7]'
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                        isPink
                          ? 'bg-[#FF2D75]/10 border-[#FF2D75]/35 text-[#FF2D75]'
                          : 'bg-[#007BA7]/15 border-[#007BA7]/40 text-[#007BA7]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${isPink ? 'pink-badge' : 'ocean-badge'}`}>
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#007BA7] transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#252525] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A1A1AA]">0{idx + 1} • Open to Roles</span>
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#FF2D75] transition-colors"
                  >
                    <span>Discuss Role</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


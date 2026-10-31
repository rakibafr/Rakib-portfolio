import React, { useEffect, useRef, useState } from 'react';
import { SiteConfig, EducationItem } from '../utils/portfolio-logic';
import { GraduationCap, Compass, Target, Sparkles } from 'lucide-react';

interface AboutViewProps {
  site: SiteConfig;
  education: EducationItem[];
}

export const AboutView: React.FC<AboutViewProps> = ({ site, education }) => {
  const tlRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0.65);

  useEffect(() => {
    const handleScroll = () => {
      if (!tlRef.current) return;
      const rect = tlRef.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - rect.top) / rect.height));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white mb-14">
          About <span className="text-[#19E3D0]">me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio, Approach, Goal */}
          <div className="lg:col-span-7 space-y-10">
            {/* Bio */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#19E3D0]">
                <Compass className="w-5 h-5" />
                <h3 className="text-2xl font-display text-[#19E3D0] uppercase">
                  Bio &amp; Journey
                </h3>
              </div>
              <p className="text-lg md:text-xl text-[#EDEDED]/90 leading-relaxed font-light border-l-2 border-[#19E3D0] pl-5 py-2.5 bg-gradient-to-r from-[#19E3D0]/[0.06] to-transparent rounded-r shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                {site.bio}
              </p>
            </div>

            {/* Creative Approach */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#19E3D0]">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-2xl font-display text-[#19E3D0] uppercase">
                  Creative Approach
                </h3>
              </div>
              <p className="text-lg md:text-xl text-[#EDEDED]/90 leading-relaxed font-light border-l-2 border-[#19E3D0]/70 pl-5 py-2.5 bg-gradient-to-r from-[#19E3D0]/[0.05] to-transparent rounded-r shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {site.approach}
              </p>
            </div>

            {/* Where I'm Heading */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#FF5A1F]">
                <Target className="w-5 h-5" />
                <h3 className="text-2xl font-display text-[#FF5A1F] uppercase">
                  Where I’m Heading
                </h3>
              </div>
              <div className="border-l-2 border-[#FF5A1F] pl-6 py-2 bg-white/[0.01] rounded-r">
                <p className="text-lg md:text-xl text-[#EDEDED]/95 leading-relaxed font-light tracking-wide bg-gradient-to-r from-[#FF5A1F]/[0.08] to-transparent -ml-6 pl-6 py-2.5 rounded-r shadow-[inset_0_1px_0_rgba(255,90,31,0.15)]">
                  {site.goal}
                </p>
              </div>
            </div>

            {/* Hardware & Tools Arsenal */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#19E3D0] mb-4">
                Core Production Arsenal
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Adobe After Effects', role: 'Motion Graphics & VFX' },
                  { name: 'Adobe Premiere Pro', role: 'Editing & Storytelling' },
                  { name: 'Blender', role: '3D & Visual Effects' },
                  { name: 'Adobe Photoshop', role: 'Matte Painting & Retouch' },
                  { name: 'Nuke (Learning)', role: 'Pro Compositing', isLearning: true },
                  { name: 'AI Content Creation', role: 'Ad Production & E-commerce' },
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border border-white/10 rounded-lg bg-white/[0.025] hover:border-[#19E3D0]/50 hover:bg-[#19E3D0]/[0.03] transition-all group shadow-sm"
                  >
                    <div className="text-xs font-semibold text-white font-mono group-hover:text-[#19E3D0] transition-colors flex items-center justify-between gap-1">
                      <span>{tool.name}</span>
                      {tool.isLearning && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#19E3D0]/15 text-[#19E3D0] border border-[#19E3D0]/40">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#EDEDED]/60 mt-1 tracking-wide font-sans">
                      {tool.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Education Timeline */}
          <div className="lg:col-span-5 bg-[#0c1117]/80 border border-white/15 p-8 rounded-xl backdrop-blur-md shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-8 text-[#19E3D0]">
              <GraduationCap className="w-6 h-6" />
              <h3 className="text-2xl md:text-3xl font-display text-[#19E3D0] uppercase">
                Education &amp; Background
              </h3>
            </div>

            <div ref={tlRef} className="relative pl-7 space-y-8">
              {/* Dynamic Gradient Vertical Timeline Line */}
              <div
                className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#19E3D0] via-[#FF5A1F] to-[#19E3D0] origin-top transition-all duration-300 shadow-[0_0_8px_rgba(25,227,208,0.4)]"
                style={{ transform: `scaleY(${progress})` }}
              />

              {education.map((item, idx) => {
                const isCurrent =
                  item.years.toLowerCase().includes('present') ||
                  item.years.includes('2026');
                return (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-[#07090D] border-2 transition-all ${
                        isCurrent
                          ? 'border-[#19E3D0] bg-[#19E3D0] shadow-[0_0_12px_#19E3D0]'
                          : 'border-[#19E3D0] group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F]'
                      }`}
                    />

                    <small
                      className={`text-xs font-mono uppercase tracking-wider block font-semibold mb-1.5 ${
                        isCurrent
                          ? 'text-[#19E3D0] inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#19E3D0]/10 border border-[#19E3D0]/40 shadow-[0_0_10px_rgba(25,227,208,0.2)]'
                          : 'text-[#FF5A1F] inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#FF5A1F]/10 border border-[#FF5A1F]/30'
                      }`}
                    >
                      {isCurrent && (
                        <i className="w-1.5 h-1.5 rounded-full bg-[#19E3D0] animate-pulse not-italic inline-block shrink-0" aria-hidden="true" />
                      )}
                      <span className="font-semibold tracking-wide">{item.years}</span>
                    </small>
                    <h4 className="text-lg md:text-xl font-medium text-white group-hover:text-[#19E3D0] transition-colors font-display tracking-wide leading-snug">
                      {item.school}
                    </h4>
                    <span className="text-sm text-[#EDEDED]/85 block mt-2 leading-relaxed font-light">
                      {item.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

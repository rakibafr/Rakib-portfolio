import React, { useState } from 'react';
import { BreakdownItem, calculateClipPathPercent } from '../utils/portfolio-logic';
import { Sliders, Wrench, Video, Eye } from 'lucide-react';

interface BreakdownViewProps {
  breakdowns: BreakdownItem[];
}

export const BreakdownView: React.FC<BreakdownViewProps> = ({ breakdowns }) => {
  // Store slider percentages for each breakdown item
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    breakdowns.forEach((b) => {
      initial[b.id] = 50;
    });
    return initial;
  });

  const handleSliderChange = (id: string, val: number) => {
    setSliderValues((prev) => ({
      ...prev,
      [id]: calculateClipPathPercent(val),
    }));
  };

  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white mb-4">
          VFX <span className="text-[#19E3D0]">breakdown</span>
        </h2>
        <p className="text-lg md:text-xl text-[#EDEDED]/65 font-light max-w-2xl mb-12">
          Drag the interactive split-slider to inspect original camera plates versus final multi-pass CG composites, deep tracking, and color grading.
        </p>

        {/* Breakdown Items List */}
        <div className="space-y-16">
          {breakdowns.map((bd, index) => {
            const splitPercent = sliderValues[bd.id] ?? 50;

            return (
              <div
                key={bd.id}
                className="bg-[#0c1117]/80 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-md shadow-2xl"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF5A1F] font-bold">
                      {bd.shotNumber || `SHOT_0${index + 1}`}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display text-white">
                      {bd.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#19E3D0]">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Split Position: {splitPercent}%</span>
                  </div>
                </div>

                {/* Interactive Split Stage */}
                <div
                  className="relative aspect-video md:aspect-[16/8] rounded-lg overflow-hidden border border-white/15 bg-black select-none touch-none shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                  style={{ '--x': `${splitPercent}%` } as React.CSSProperties}
                >
                  {/* Layer B: Before / Original Plate */}
                  <div className="absolute inset-0">
                    {bd.before ? (
                      <img
                        src={bd.before}
                        alt={bd.beforeLabel || 'Original Plate'}
                        className="w-full h-full object-cover filter contrast-90 brightness-95"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 shadow-2xl" />
                      </div>
                    )}
                  </div>

                  {/* Layer A: After / Final Composite (Clipped by Split Slider) */}
                  <div
                    className="absolute inset-0 transition-none"
                    style={{
                      clipPath: `inset(0 0 0 ${splitPercent}%)`,
                    }}
                  >
                    {bd.after ? (
                      <img
                        src={bd.after}
                        alt={bd.afterLabel || 'Final VFX Composite'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0a1a22] to-[#07090D] flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-white via-[#19E3D0] to-[#0a4d52] shadow-[0_0_80px_10px_rgba(25,227,208,0.55)]" />
                      </div>
                    )}
                  </div>

                  {/* Badges on stage */}
                  <span className="absolute top-4 left-4 z-20 text-[11px] font-mono tracking-wider px-3 py-1 rounded bg-[#07090D]/80 border border-white/20 text-white/90 backdrop-blur-md uppercase">
                    {bd.beforeLabel || 'ORIGINAL'}
                  </span>
                  <span className="absolute top-4 right-4 z-20 text-[11px] font-mono tracking-wider px-3 py-1 rounded bg-[#07090D]/80 border border-[#19E3D0]/40 text-[#19E3D0] backdrop-blur-md uppercase font-semibold">
                    {bd.afterLabel || 'FINAL VFX'}
                  </span>

                  {/* Split Handle Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[#FF5A1F] z-20 pointer-events-none shadow-[0_0_15px_#FF5A1F]"
                    style={{ left: `${splitPercent}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FF5A1F] text-[#07090D] flex items-center justify-center font-bold text-sm shadow-xl border-2 border-white">
                      ↔
                    </div>
                  </div>

                  {/* Invisible Range Slider Control covering stage */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={splitPercent}
                    onChange={(e) => handleSliderChange(bd.id, Number(e.target.value))}
                    aria-label={`Compare ${bd.beforeLabel || 'Original'} and ${bd.afterLabel || 'Final VFX'} for ${bd.title}`}
                    className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                  />
                </div>

                {/* Breakdown Description & Technique Pills */}
                <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <p className="text-sm md:text-base text-[#EDEDED]/75 max-w-3xl leading-relaxed font-light">
                    {bd.desc}
                  </p>

                  {bd.tools && bd.tools.length > 0 && (
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-[#EDEDED]/50 uppercase flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5 text-[#19E3D0]" />
                        <span>Pipeline:</span>
                      </span>
                      {bd.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[#19E3D0]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { SkillItem } from '../utils/portfolio-logic';
import { Layers, Cpu, Award } from 'lucide-react';

interface SkillsViewProps {
  skills: SkillItem[];
  now: string[];
  learning: string[];
  goalList: string[];
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  skills,
  now,
  learning,
  goalList,
}) => {
  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white mb-4">
          Skills &amp; <span className="text-[#19E3D0]">services</span>
        </h2>
        <p className="text-base md:text-lg text-[#EDEDED]/65 max-w-2xl font-light mb-12">
          End-to-end production capabilities covering direct live-action filmmaking through advanced procedural CG, neural video synthesis, and photoreal optical compositing.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-card p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#19E3D0] uppercase tracking-widest mb-2">
                  0{idx + 1} //
                </div>
                <h3 className="text-xl md:text-2xl font-display text-white mb-2.5">
                  {skill.t}
                </h3>
                <p className="text-sm text-[#EDEDED]/65 leading-relaxed font-light mb-4">
                  {skill.d}
                </p>
              </div>

              {skill.tags && skill.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.04] text-[#EDEDED]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toward VFX Section */}
        <h2 className="text-[clamp(34px,5vw,64px)] font-display uppercase tracking-tight leading-none text-white mt-24 mb-10">
          Toward <span className="text-[#19E3D0]">VFX</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Now */}
          <div className="border-t-2 border-[#19E3D0] pt-6 bg-white/[0.01] p-6 rounded-b">
            <div className="flex items-center gap-2 mb-2 text-[#19E3D0]">
              <Layers className="w-5 h-5" />
              <h3 className="text-2xl font-display text-white uppercase">Now</h3>
            </div>
            <ul className="space-y-3 mt-4">
              {now.map((item, idx) => (
                <li key={idx} className="text-sm text-[#EDEDED]/70 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19E3D0] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div className="border-t-2 border-[#FF5A1F] pt-6 bg-white/[0.01] p-6 rounded-b">
            <div className="flex items-center gap-2 mb-2 text-[#FF5A1F]">
              <Cpu className="w-5 h-5" />
              <h3 className="text-2xl font-display text-white uppercase">Learning</h3>
            </div>
            <ul className="space-y-3 mt-4">
              {learning.map((item, idx) => (
                <li key={idx} className="text-sm text-[#EDEDED]/70 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Goal */}
          <div className="border-t-2 border-white/30 pt-6 bg-white/[0.01] p-6 rounded-b">
            <div className="flex items-center gap-2 mb-2 text-white">
              <Award className="w-5 h-5 text-[#19E3D0]" />
              <h3 className="text-2xl font-display text-white uppercase">Goal</h3>
            </div>
            <ul className="space-y-3 mt-4">
              {goalList.map((item, idx) => (
                <li key={idx} className="text-sm text-[#EDEDED]/90 leading-relaxed font-medium flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { SiteConfig, ProjectItem, SkillItem } from '../utils/portfolio-logic';
import { HeroCanvas } from './HeroCanvas';
import { NavRoute } from './Navigation';
import { ArrowRight, Play, Film } from 'lucide-react';

interface HomeViewProps {
  site: SiteConfig;
  projects: ProjectItem[];
  skills: SkillItem[];
  now: string[];
  learning: string[];
  goalList: string[];
  onNavigate: (route: NavRoute) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  site,
  projects,
  skills,
  now,
  learning,
  goalList,
  onNavigate,
  onSelectProject,
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  // Periodic subtle cyberpunk glitch effect on hero title
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      const timer = setTimeout(() => setGlitchActive(false), 400);
      return () => clearTimeout(timer);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  // Split name into words & characters for staggered animation
  const nameWords = site.name.trim().split(/\s+/);
  let globalCharIndex = 0;

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <HeroCanvas isActive={true} />

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-[6vw] py-[100px] pointer-events-none">
          {/* Animated Name with Glitch */}
          <h1
            className={`font-display font-semibold leading-[0.9] text-[clamp(48px,11vw,160px)] tracking-tight text-white ${
              glitchActive ? 'glitch-text' : ''
            }`}
            aria-label={site.name}
          >
            {nameWords.map((word, wIdx) => (
              <span key={wIdx} className="inline-block mr-[0.25em] last:mr-0">
                {word.split('').map((char) => {
                  const currIndex = globalCharIndex++;
                  return (
                    <span
                      key={currIndex}
                      className="ch-in"
                      style={{ '--i': currIndex } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  );
                })}
                {wIdx < nameWords.length - 1 && ' '}
              </span>
            ))}
          </h1>

          {/* Role subtitle */}
          <p className="mt-6 font-display text-[clamp(15px,2vw,24px)] tracking-[0.22em] text-[#19E3D0] uppercase font-normal animate-fadeIn delay-500">
            {site.role}
          </p>

          {/* Tagline */}
          <p className="mt-3.5 max-w-[540px] text-base md:text-lg text-[#EDEDED]/70 leading-relaxed font-light">
            {site.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex items-center gap-4 flex-wrap pointer-events-auto">
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A1F] text-[#07090D] font-medium text-sm uppercase tracking-wider rounded transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,90,31,0.5)] active:translate-y-0"
            >
              <span>See my work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[#EDEDED] font-medium text-sm uppercase tracking-wider rounded border border-white/20 transition-all hover:border-[#19E3D0] hover:text-[#19E3D0]"
            >
              <span>Get in touch</span>
            </button>
          </div>
        </div>

        {/* Scroll hint line */}
        <div className="absolute bottom-7 left-[6vw] z-10 text-xs tracking-[0.25em] uppercase text-[#EDEDED]/50 flex items-center gap-3.5 pointer-events-none">
          <span className="w-14 h-[1px] bg-[#FF5A1F] origin-left animate-line-pulse" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* WHO I AM SECTION */}
      <section className="py-[110px] px-[6vw] border-t border-white/10 relative">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(36px,5.5vw,78px)] font-display uppercase tracking-tight leading-none text-white">
              Who <span className="text-[#19E3D0]">I am</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg md:text-2xl text-[#EDEDED]/90 leading-relaxed max-w-[58ch] mb-8 font-light border-l-2 border-[#19E3D0] pl-6 py-2 bg-gradient-to-r from-[#19E3D0]/[0.05] to-transparent rounded-r shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              {site.intro}
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-[#EDEDED] text-sm uppercase tracking-wider rounded hover:border-[#19E3D0] hover:text-[#19E3D0] transition"
            >
              <span>More about me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION */}
      <section className="py-[110px] px-[6vw] border-t border-white/10 bg-[#07090D]/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="text-[clamp(36px,5.5vw,78px)] font-display uppercase tracking-tight leading-none text-white">
              Selected <span className="text-[#19E3D0]">work</span>
            </h2>
            <button
              onClick={() => onNavigate('work')}
              className="hidden md:inline-flex items-center gap-2 text-sm text-[#19E3D0] hover:text-white transition font-mono uppercase tracking-wider"
            >
              <span>Explore all {projects.length} projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <div
                key={project.id}
                className="group text-left w-full cursor-pointer"
                onClick={() => onSelectProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                aria-label={`Open project video: ${project.title}`}
              >
                {/* Conic Border Card */}
                <div className="conic-border-glow aspect-video rounded-lg relative overflow-hidden">
                  <img
                    src={project.thumb}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition" />

                  {/* Play circle badge */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-14 h-14 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:scale-110 shadow-lg">
                      <Play className="w-6 h-6 text-white ml-0.5 fill-current group-hover:text-[#07090D] transition-colors" />
                    </div>
                  </div>

                  {/* Category & Type badges */}
                  <div className="absolute right-3 bottom-3 z-10 flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[#19E3D0] backdrop-blur-md">
                      {project.cat}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-white/70 backdrop-blur-md">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h3 className="text-xl md:text-2xl font-display text-white group-hover:text-[#19E3D0] transition">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#EDEDED]/60 line-clamp-2 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A1F] text-[#07090D] text-sm uppercase tracking-wider font-semibold rounded hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,90,31,0.45)] transition active:translate-y-0"
            >
              <span>See all work ({projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* WHAT I DO CHIPS SECTION */}
      <section className="py-[110px] px-[6vw] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(36px,5.5vw,78px)] font-display uppercase tracking-tight leading-none text-white mb-10">
            What I <span className="text-[#19E3D0]">do</span>
          </h2>

          <div className="flex flex-wrap gap-3.5 mb-11">
            {skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.02] text-sm md:text-base font-display uppercase tracking-wider text-[#EDEDED]/80 hover:text-[#19E3D0] hover:border-[#19E3D0] hover:shadow-[0_0_24px_rgba(25,227,208,0.25)] transition duration-300 cursor-default"
              >
                {skill.t}
              </span>
            ))}
          </div>

          <div>
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-[#EDEDED] text-sm uppercase tracking-wider rounded hover:border-[#19E3D0] hover:text-[#19E3D0] transition"
            >
              <span>All skills &amp; pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TOWARD VFX SECTION */}
      <section className="py-[110px] px-[6vw] border-t border-white/10 bg-[#07090D]/50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(36px,5.5vw,78px)] font-display uppercase tracking-tight leading-none text-white mb-12">
            Toward <span className="text-[#19E3D0]">VFX</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Now Column */}
            <div className="border-t-2 border-[#19E3D0] pt-6 bg-white/[0.01] p-6 rounded-b">
              <span className="text-xs font-mono text-[#19E3D0] uppercase tracking-widest block mb-1">
                Current Stack
              </span>
              <h3 className="text-2xl font-display text-white mb-4">Now</h3>
              <ul className="space-y-3">
                {now.map((item, idx) => (
                  <li key={idx} className="text-sm text-[#EDEDED]/70 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19E3D0] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Column */}
            <div className="border-t-2 border-[#FF5A1F] pt-6 bg-white/[0.01] p-6 rounded-b">
              <span className="text-xs font-mono text-[#FF5A1F] uppercase tracking-widest block mb-1">
                R&amp;D Roadmap
              </span>
              <h3 className="text-2xl font-display text-white mb-4">Learning</h3>
              <ul className="space-y-3">
                {learning.map((item, idx) => (
                  <li key={idx} className="text-sm text-[#EDEDED]/70 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goal Column */}
            <div className="border-t-2 border-white/30 pt-6 bg-white/[0.01] p-6 rounded-b">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-1">
                Vision
              </span>
              <h3 className="text-2xl font-display text-white mb-4">Goal</h3>
              <ul className="space-y-3">
                {goalList.map((item, idx) => (
                  <li key={idx} className="text-sm text-[#EDEDED]/90 leading-relaxed font-medium flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={() => onNavigate('breakdown')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-[#EDEDED] text-sm uppercase tracking-wider rounded hover:border-[#19E3D0] hover:text-[#19E3D0] transition"
            >
              <span>Interactive VFX breakdowns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* LET'S TALK SECTION */}
      <section className="py-[110px] px-[6vw] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(36px,5.5vw,78px)] font-display uppercase tracking-tight leading-none text-white mb-8">
            Let’s <span className="text-[#19E3D0]">talk</span>
          </h2>

          <a
            href={`mailto:${site.email}`}
            className="inline-block font-display text-[clamp(24px,5vw,64px)] text-[#FF5A1F] hover:text-[#19E3D0] border-b-2 border-[#FF5A1F] hover:border-[#19E3D0] pb-1 transition duration-200 break-all"
          >
            {site.email}
          </a>

          <div className="mt-11">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-[#EDEDED] text-sm uppercase tracking-wider rounded hover:border-[#19E3D0] hover:text-[#19E3D0] transition"
            >
              <span>Go to contact page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

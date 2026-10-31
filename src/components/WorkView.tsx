import React, { useState } from 'react';
import { ProjectItem, filterProjects } from '../utils/portfolio-logic';
import { Play, Sparkles, Filter } from 'lucide-react';

interface WorkViewProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const WorkView: React.FC<WorkViewProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Compute distinct categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.cat)))];
  const filteredProjects = filterProjects(projects, activeCategory);

  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white">
              All <span className="text-[#19E3D0]">work</span>
            </h2>
            <p className="text-base text-[#EDEDED]/60 mt-3 font-light">
              Directing, cinematography, holographic motion design, and high-end visual effects reels.
            </p>
          </div>

          <div className="text-xs font-mono text-[#EDEDED]/50 uppercase tracking-widest">
            Showing {filteredProjects.length} of {projects.length} works
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="flex items-center gap-2.5 flex-wrap mb-12"
        >
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#EDEDED]/50 uppercase font-mono mr-2">
            <Filter className="w-3.5 h-3.5 text-[#19E3D0]" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isSelected}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#19E3D0] text-[#07090D] border-[#19E3D0] shadow-[0_0_20px_rgba(25,227,208,0.4)] font-semibold'
                    : 'bg-transparent text-[#EDEDED]/70 border-white/15 hover:border-[#19E3D0] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group text-left w-full cursor-pointer transition-all duration-300"
              style={{ animationDelay: `${(idx % 6) * 70}ms` }}
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              aria-label={`Play: ${project.title}`}
            >
              {/* Conic Border Card */}
              <div className="conic-border-glow aspect-video rounded-lg relative overflow-hidden">
                <img
                  src={project.thumb}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-65 transition" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:scale-110 shadow-lg">
                    <Play className="w-6 h-6 text-white ml-0.5 fill-current group-hover:text-[#07090D] transition-colors" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute right-3 bottom-3 z-10 flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/85 border border-white/15 text-[#19E3D0] backdrop-blur-md">
                    {project.cat}
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/85 border border-white/15 text-white/70 backdrop-blur-md">
                    {project.type}
                  </span>
                </div>

                {project.featured && (
                  <div className="absolute left-3 top-3 z-10">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF5A1F] text-[#07090D] font-bold tracking-wider">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-[#EDEDED]/50 font-mono mb-1">
                  <span>{project.client || 'Original Production'}</span>
                  {project.year && <span>{project.year}</span>}
                </div>
                <h3 className="text-xl md:text-2xl font-display text-white group-hover:text-[#19E3D0] transition">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#EDEDED]/65 line-clamp-2 leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-lg">
            <p className="text-lg text-[#EDEDED]/60 font-light">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

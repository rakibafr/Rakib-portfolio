import React from 'react';
import { SiteConfig } from '../utils/portfolio-logic';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  site: SiteConfig;
  onUpdateSite: (newSite: SiteConfig) => void;
  onReset: () => void;
}

const PRESETS: Array<{ label: string; data: Partial<SiteConfig> }> = [
  {
    label: 'Cyberpunk VFX Supervisor',
    data: {
      name: 'Kairos Vance',
      role: 'Filmmaker · Motion Designer · VFX Artist',
      tagline: 'Directing, editing, and cinematic visual effects for high-concept sci-fi and immersive film.',
      email: 'kairos.vfx@studio.film',
      location: 'Los Angeles & Vancouver',
    },
  },
  {
    label: 'Anamorphic Cinematographer',
    data: {
      name: 'Elena Rostova',
      role: 'Director of Photography · Visual Storyteller',
      tagline: 'Capturing visceral light, shadow, and large-format anamorphic compositions.',
      email: 'elena@cinematography.art',
      location: 'Berlin & London',
    },
  },
  {
    label: 'Generative AI & 3D Artist',
    data: {
      name: 'Marcus Kaine',
      role: 'Houdini FX Artist · Neural Video Designer',
      tagline: 'Procedural particle physics, photoreal destruction, and generative plate extensions.',
      email: 'kaine@procedural.fx',
      location: 'Tokyo & San Francisco',
    },
  },
];

export const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  site,
  onUpdateSite,
  onReset,
}) => {
  if (!isOpen) return null;

  const handleChange = (field: keyof SiteConfig, val: string) => {
    onUpdateSite({
      ...site,
      [field]: val,
    });
  };

  const applyPreset = (preset: Partial<SiteConfig>) => {
    onUpdateSite({
      ...site,
      ...preset,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize Portfolio Profile"
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md h-full bg-[#07090D] border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 text-[#19E3D0]">
              <Sparkles className="w-5 h-5 text-[#FF5A1F]" />
              <h3 className="text-xl font-display uppercase tracking-wider text-white">
                Customize Portfolio
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-[#19E3D0] flex items-center justify-center transition"
              aria-label="Close customizer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Presets */}
          <div className="mb-6">
            <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-2">
              Quick Role Presets
            </label>
            <div className="flex flex-col gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(p.data)}
                  className="text-left px-3.5 py-2 rounded bg-white/[0.03] border border-white/10 hover:border-[#19E3D0] hover:text-[#19E3D0] text-xs font-mono transition"
                >
                  ⚡ {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={site.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19E3D0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-1">
                Role &amp; Disciplines
              </label>
              <input
                type="text"
                value={site.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19E3D0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-1">
                Tagline
              </label>
              <textarea
                rows={2}
                value={site.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19E3D0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={site.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19E3D0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/60 mb-1">
                Location
              </label>
              <input
                type="text"
                value={site.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#19E3D0]"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase text-[#EDEDED]/60 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#19E3D0] text-[#07090D] font-medium text-xs uppercase tracking-wider rounded font-mono font-semibold hover:bg-[#19E3D0]/90 transition"
          >
            <Check className="w-4 h-4" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};

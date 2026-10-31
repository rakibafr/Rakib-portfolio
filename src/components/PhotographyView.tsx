import React, { useState } from 'react';
import { PhotoItem } from '../utils/portfolio-logic';
import { Camera, Maximize2, X } from 'lucide-react';

interface PhotographyViewProps {
  photos: PhotoItem[];
}

export const PhotographyView: React.FC<PhotographyViewProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white">
              Photo<span className="text-[#19E3D0]">graphy</span>
            </h2>
            <p className="text-base text-[#EDEDED]/65 font-light mt-3">
              Location scouting, anamorphic lens studies, high-contrast night stills, and practical atmosphere references.
            </p>
          </div>

          <div className="text-xs font-mono text-[#19E3D0] uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#FF5A1F]" />
            <span>35mm &amp; Anamorphic Captures</span>
          </div>
        </div>

        {/* Masonry Columns */}
        <div className="masonry-grid">
          {photos.map((photo) => (
            <figure
              key={photo.id}
              className="masonry-item group relative overflow-hidden rounded-lg border border-white/10 bg-[#0c1117] cursor-pointer shadow-lg transition-all duration-300 hover:border-[#19E3D0]/60 hover:shadow-[0_0_25px_rgba(25,227,208,0.2)]"
              onClick={() => setActivePhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhoto(photo);
                }
              }}
              aria-label={`View photo: ${photo.t}`}
            >
              <img
                src={photo.src}
                alt={`${photo.t} - ${photo.m}`}
                loading="lazy"
                className="w-full block object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Caption Overlay */}
              <figcaption className="absolute inset-x-0 bottom-0 pt-10 pb-4 px-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-85 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display text-[#19E3D0] group-hover:text-white transition">
                    {photo.t}
                  </h3>
                  <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-[#19E3D0] transition" />
                </div>
                <small className="text-xs text-[#EDEDED]/60 font-mono block mt-1">
                  {photo.m}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.t}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActivePhoto(null);
            }
          }}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/60 text-white hover:text-[#19E3D0] hover:border-[#19E3D0] transition flex items-center justify-center"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activePhoto.src}
              alt={activePhoto.t}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded border border-white/10 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-display text-[#19E3D0]">{activePhoto.t}</h3>
              <p className="text-sm font-mono text-[#EDEDED]/60 mt-1">{activePhoto.m}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

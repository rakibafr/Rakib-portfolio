import React, { useEffect, useRef } from 'react';
import { ProjectItem, getEmbedOrDirectVideoUrl } from '../utils/portfolio-logic';
import { X, ExternalLink, Play, Film } from 'lucide-react';

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    // Prevent background scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const videoMeta = getEmbedOrDirectVideoUrl(project.video);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video player: ${project.title}`}
      className="fixed inset-0 z-[110] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close video player"
        className="absolute top-4 right-5 md:top-6 md:right-8 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/60 text-[#EDEDED] hover:text-[#19E3D0] hover:border-[#19E3D0] hover:scale-105 transition flex items-center justify-center"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-5xl rounded-lg overflow-hidden border border-[#19E3D0]/30 bg-[#07090D] shadow-[0_0_50px_rgba(25,227,208,0.2)] flex flex-col">
        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-black">
          {videoMeta.type === 'file' ? (
            <video
              src={videoMeta.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : videoMeta.type === 'iframe' ? (
            <iframe
              src={videoMeta.src}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#0c1117]">
              <Film className="w-16 h-16 text-[#FF5A1F] mb-4 opacity-80" />
              <h4 className="text-2xl font-display text-[#EDEDED] mb-2">{project.title}</h4>
              <p className="text-[#EDEDED]/60 max-w-md text-sm">
                High-definition reel preview available on request. Contact for private screening link.
              </p>
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="p-6 border-t border-white/10 bg-[#07090D] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#19E3D0]/40 text-[#19E3D0] bg-[#19E3D0]/10 font-mono">
                {project.cat}
              </span>
              <span className="text-xs text-[#EDEDED]/50 uppercase tracking-wider font-mono">
                {project.type} {project.year && `· ${project.year}`}
              </span>
              {project.client && (
                <span className="text-xs text-[#EDEDED]/50 uppercase tracking-wider font-mono">
                  · {project.client}
                </span>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-display text-white">
              {project.title}
            </h3>
            <p className="text-sm text-[#EDEDED]/70 mt-1 max-w-3xl">
              {project.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#19E3D0] border border-[#19E3D0]/30 rounded hover:border-[#19E3D0] hover:bg-[#19E3D0]/10 transition"
              >
                <span>Direct Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs uppercase tracking-wider font-medium bg-[#FF5A1F] text-[#07090D] rounded hover:bg-[#FF5A1F]/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

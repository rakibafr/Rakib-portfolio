/**
 * Pure portfolio business logic and utilities
 */

export interface ProjectItem {
  id: string;
  title: string;
  cat: string;
  type: string;
  desc: string;
  video: string;
  preview?: string;
  thumb: string;
  client?: string;
  year?: string;
  featured?: boolean;
}

export interface BreakdownItem {
  id: string;
  title: string;
  desc: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  tools?: string[];
  shotNumber?: string;
}

export interface PhotoItem {
  id: string;
  t: string;
  m: string;
  src: string;
  h: number;
}

export interface SkillItem {
  t: string;
  d: string;
  icon?: string;
  tags?: string[];
}

export interface EducationItem {
  years: string;
  school: string;
  detail: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  intro: string;
  bio: string;
  approach: string;
  goal: string;
  contactLead: string;
  closing: string;
  socials: Array<{ label: string; url: string }>;
}

export function generateInitials(name: string): string {
  if (!name.trim()) return 'VFX';
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export function filterProjects(projects: ProjectItem[], activeCat: string): ProjectItem[] {
  if (activeCat === 'All' || !activeCat) {
    return projects;
  }
  return projects.filter((p) => p.cat.toLowerCase() === activeCat.toLowerCase());
}

export function isDirectVideoFile(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);
}

export function getEmbedOrDirectVideoUrl(url: string): { type: 'file' | 'iframe' | 'none'; src: string } {
  if (!url) return { type: 'none', src: '' };
  const cleanUrl = url.trim();

  if (isDirectVideoFile(cleanUrl)) {
    return { type: 'file', src: cleanUrl };
  }

  // Handle YouTube links
  const ytMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Handle Vimeo links
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
    };
  }

  // Fallback as iframe
  return {
    type: 'iframe',
    src: cleanUrl.includes('?') ? `${cleanUrl}&autoplay=1` : `${cleanUrl}?autoplay=1`,
  };
}

export function buildMailtoUrl(email: string, name: string, message: string): string {
  const safeEmail = email.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim() || 'Visitor'}`);
  const body = encodeURIComponent(message.trim());
  return `mailto:${safeEmail}?subject=${subject}&body=${body}`;
}

export function calculateClipPathPercent(value: number): number {
  if (isNaN(value)) return 50;
  return Math.min(100, Math.max(0, Math.round(value)));
}

import React, { useState } from 'react';
import { generateInitials } from '../utils/portfolio-logic';
import { Menu, X, Sparkles } from 'lucide-react';

export type NavRoute = 'home' | 'about' | 'work' | 'skills' | 'breakdown' | 'photography' | 'contact';

interface NavigationProps {
  currentRoute: NavRoute;
  name: string;
  onNavigate: (route: NavRoute) => void;
  onOpenCustomizer?: () => void;
}

const ROUTES: { id: NavRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'breakdown', label: 'Breakdown' },
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  name,
  onNavigate,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const initials = generateInitials(name);

  const handleRouteClick = (route: NavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[6vw] py-4 backdrop-blur-xl bg-[#07090D]/70 border-b border-white/10"
    >
      {/* Monogram Logo */}
      <button
        onClick={() => handleRouteClick('home')}
        className="font-display font-semibold text-2xl tracking-wider text-[#19E3D0] hover:text-[#FF5A1F] transition text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19E3D0] px-1 py-0.5 rounded"
        aria-label={`Home: ${name}`}
      >
        {initials}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-7 text-sm tracking-wide">
        {ROUTES.map((route) => {
          const isActive = currentRoute === route.id;
          return (
            <li key={route.id}>
              <button
                onClick={() => handleRouteClick(route.id)}
                className={`py-1 relative font-medium transition-colors ${
                  isActive
                    ? 'text-[#19E3D0]'
                    : 'text-[#EDEDED]/65 hover:text-[#EDEDED]'
                }`}
              >
                {route.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-[#19E3D0] shadow-[0_0_8px_#19E3D0]"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Action CTA & Mobile Burger */}
      <div className="flex items-center gap-3">
        {onOpenCustomizer && (
          <button
            onClick={onOpenCustomizer}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-[#EDEDED]/80 hover:text-[#19E3D0] border border-white/10 hover:border-[#19E3D0]/50 rounded bg-white/[0.03] transition"
            title="Customize profile & content"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Customize</span>
          </button>
        )}

        <button
          onClick={() => handleRouteClick('contact')}
          className="hidden sm:inline-block px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#FF5A1F] text-[#07090D] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(255,90,31,0.45)] transition active:translate-y-0"
        >
          Hire Me
        </button>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden text-[#EDEDED] p-2 hover:text-[#19E3D0] transition focus-visible:outline-none"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[65px] inset-x-0 bg-[#07090D]/95 backdrop-blur-2xl border-b border-white/15 px-[6vw] py-6 shadow-2xl flex flex-col gap-4">
          <ul className="flex flex-col gap-2">
            {ROUTES.map((route) => {
              const isActive = currentRoute === route.id;
              return (
                <li key={route.id}>
                  <button
                    onClick={() => handleRouteClick(route.id)}
                    className={`w-full text-left py-3 text-lg font-display tracking-wider border-b border-white/5 transition flex items-center justify-between ${
                      isActive
                        ? 'text-[#19E3D0] font-semibold'
                        : 'text-[#EDEDED]/70 hover:text-white'
                    }`}
                  >
                    <span>{route.label}</span>
                    {isActive && <span className="text-xs text-[#19E3D0] font-mono">ACTIVE</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="pt-2 flex flex-col gap-2">
            {onOpenCustomizer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="w-full py-2.5 px-4 text-xs font-mono uppercase tracking-wider text-[#19E3D0] border border-[#19E3D0]/40 rounded bg-[#19E3D0]/10 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
                <span>Customize Profile Content</span>
              </button>
            )}
            <button
              onClick={() => handleRouteClick('contact')}
              className="w-full py-3 text-xs uppercase tracking-wider font-semibold rounded bg-[#FF5A1F] text-[#07090D] text-center"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

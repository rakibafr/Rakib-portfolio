/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { PageWipe } from './components/PageWipe';
import { Navigation, NavRoute } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { WorkView } from './components/WorkView';
import { SkillsView } from './components/SkillsView';
import { BreakdownView } from './components/BreakdownView';
import { PhotographyView } from './components/PhotographyView';
import { ContactView } from './components/ContactView';
import { VideoModal } from './components/VideoModal';
import { EditDrawer } from './components/EditDrawer';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_EDUCATION,
  INITIAL_SKILLS,
  INITIAL_NOW,
  INITIAL_LEARNING,
  INITIAL_GOAL_LIST,
  INITIAL_PROJECTS,
  INITIAL_BREAKDOWNS,
  INITIAL_PHOTOS,
} from './data/portfolioData';
import { ProjectItem, SiteConfig } from './utils/portfolio-logic';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('home');
  const [isWiping, setIsWiping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Portfolio Site Configuration
  const [site, setSite] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('vfx_portfolio_site');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.intro || parsed.intro.startsWith('I bridge live-action')) {
          parsed.intro = INITIAL_SITE_CONFIG.intro;
        }
        if (!parsed.bio || parsed.bio.startsWith('Starting in independent')) {
          parsed.bio = INITIAL_SITE_CONFIG.bio;
        }
        if (!parsed.approach || parsed.approach.startsWith('Pacing before pixels')) {
          parsed.approach = INITIAL_SITE_CONFIG.approach;
        }
        if (!parsed.goal || parsed.goal.startsWith('Directing live-action plates')) {
          parsed.goal = INITIAL_SITE_CONFIG.goal;
        }
        if (!parsed.email || parsed.email.includes('studio.film')) {
          parsed.email = INITIAL_SITE_CONFIG.email;
        }
        if (!parsed.location || parsed.location.includes('Los Angeles')) {
          parsed.location = INITIAL_SITE_CONFIG.location;
        }
        if (!parsed.contactLead || parsed.contactLead.startsWith('Open to feature')) {
          parsed.contactLead = INITIAL_SITE_CONFIG.contactLead;
        }
        return { ...INITIAL_SITE_CONFIG, ...parsed };
      }
    } catch {
      // fallback
    }
    return INITIAL_SITE_CONFIG;
  });

  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [education] = useState(INITIAL_EDUCATION);
  const [skills] = useState(INITIAL_SKILLS);
  const [now] = useState(INITIAL_NOW);
  const [learning] = useState(INITIAL_LEARNING);
  const [goalList] = useState(INITIAL_GOAL_LIST);
  const [breakdowns] = useState(INITIAL_BREAKDOWNS);
  const [photos] = useState(INITIAL_PHOTOS);

  // Sync route with URL hash on load and popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const validRoutes: NavRoute[] = ['home', 'about', 'work', 'skills', 'breakdown', 'photography', 'contact'];
      if (validRoutes.includes(hash as NavRoute)) {
        setCurrentRoute(hash as NavRoute);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update document title dynamically based on active route and artist name
  useEffect(() => {
    const routeTitles: Record<NavRoute, string> = {
      home: `${site.name} – ${site.role.split('·')[0].trim()}`,
      about: `${site.name} – About & Journey`,
      work: `${site.name} – Selected Works & Direction`,
      skills: `${site.name} – Skills & Production Arsenal`,
      breakdown: `${site.name} – Interactive VFX Breakdowns`,
      photography: `${site.name} – Anamorphic & 35mm Photography`,
      contact: `${site.name} – Let's Talk & Collaborate`,
    };

    document.title = routeTitles[currentRoute] || site.name;
  }, [currentRoute, site.name, site.role]);

  // Navigate with multi-stripe vertical wipe transition
  const handleNavigate = (targetRoute: NavRoute) => {
    if (targetRoute === currentRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setCurrentRoute(targetRoute);
      window.location.hash = `#/${targetRoute === 'home' ? '' : targetRoute}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    setIsWiping(true);
    setTimeout(() => {
      setCurrentRoute(targetRoute);
      window.location.hash = `#/${targetRoute === 'home' ? '' : targetRoute}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 330);

    setTimeout(() => {
      setIsWiping(false);
    }, 750);
  };

  const handleUpdateSite = (updated: SiteConfig) => {
    setSite(updated);
    try {
      localStorage.setItem('vfx_portfolio_site', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetSite = () => {
    setSite(INITIAL_SITE_CONFIG);
    try {
      localStorage.removeItem('vfx_portfolio_site');
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090D] text-[#EDEDED] selection:bg-[#19E3D0] selection:text-[#07090D]">
      {/* Film grain and CRT scanlines overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="scanlines-overlay" aria-hidden="true" />

      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Screen wipe transition */}
      <PageWipe isWiping={isWiping} />

      {/* Navigation bar */}
      <Navigation
        currentRoute={currentRoute}
        name={site.name}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Active Page View */}
      <main id="main-content" className="relative z-10">
        {currentRoute === 'home' && (
          <HomeView
            site={site}
            projects={projects}
            skills={skills}
            now={now}
            learning={learning}
            goalList={goalList}
            onNavigate={handleNavigate}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView site={site} education={education} />
        )}

        {currentRoute === 'work' && (
          <WorkView
            projects={projects}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentRoute === 'skills' && (
          <SkillsView
            skills={skills}
            now={now}
            learning={learning}
            goalList={goalList}
          />
        )}

        {currentRoute === 'breakdown' && (
          <BreakdownView breakdowns={breakdowns} />
        )}

        {currentRoute === 'photography' && (
          <PhotographyView photos={photos} />
        )}

        {currentRoute === 'contact' && <ContactView site={site} />}
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 py-10 px-[6vw] text-center text-xs font-mono text-[#EDEDED]/50 border-t border-white/10 bg-[#07090D]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavigate('home')}
              className="hover:text-[#19E3D0] transition"
            >
              Back to top
            </button>
            <span>·</span>
            <button
              onClick={() => setCustomizerOpen(true)}
              className="text-[#19E3D0] hover:underline"
            >
              Customize profile
            </button>
          </div>
        </div>
      </footer>

      {/* Fullscreen Video Modal */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Edit Drawer Modal */}
      <EditDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        site={site}
        onUpdateSite={handleUpdateSite}
        onReset={handleResetSite}
      />
    </div>
  );
}

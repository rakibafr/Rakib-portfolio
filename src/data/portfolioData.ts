import {
  SiteConfig,
  EducationItem,
  SkillItem,
  ProjectItem,
  BreakdownItem,
  PhotoItem,
} from '../utils/portfolio-logic';
import photo1 from '../assets/images/regenerated_image_1793090029318.jpg';
import photo2 from '../assets/images/regenerated_image_1793090028100.jpg';
import photo3 from '../assets/images/regenerated_image_1793090023765.jpg';
import photo4 from '../assets/images/regenerated_image_1793090022589.jpg';
import photo5 from '../assets/images/regenerated_image_1793090026529.jpg';
import photo6 from '../assets/images/regenerated_image_1793090030519.jpg';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  name: 'Kairos Vance',
  role: 'Filmmaker · Motion Designer · VFX Artist',
  tagline: 'Directing, editing, and cinematic visual effects for high-concept sci-fi and immersive film.',
  email: 'mail.rakibmia@gmail.com',
  location: 'North Badda, Dhaka-1212, Bangladesh',
  intro:
    'To begin my career in the creative media industry, where I can apply my skills in video editing, motion graphics, cinematography, and visual storytelling. I aim to contribute to meaningful and creative projects, learn from experienced professionals, and continuously enhance my creative and technical abilities.',
  bio:
    'Aspiring VFX artist with skills in video editing, motion graphics, and cinematography. I started with editing, grew through motion graphics and cinematography, and now I’m focused on creating immersive cinematic visuals for film.',
  approach:
    'I approach every project as a storyteller first and a technician second. Before creating any effect, I ask what the scene needs the audience to feel. My cinematography background helps me work with light, camera movement, and composition so visual effects blend naturally into the frame. I focus on seamless integration, fine detail, and strong pacing from the edit. I experiment, refine, and keep learning to make every visual feel immersive and cinematic.',
  goal:
    'Heading toward a career as a VFX artist in the film industry, creating immersive, cinematic visuals for meaningful projects. I’m committed to learning from the best and growing my craft with every frame.',
  contactLead: 'Have a project or an idea? Let’s create something cinematic together. I’m open to collaborations in video editing, motion graphics, and VFX',
  closing: '“If the world on screen doesn’t breathe, no amount of render time will save it.”',
  socials: [
    { label: 'Vimeo', url: 'https://vimeo.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'ArtStation', url: 'https://artstation.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ],
};

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    years: '26 Jul – 31 Oct 2026',
    school: 'The Art of Creation । As Sunnah Skill Development Institute',
    detail:
      'Hands-on training covering scriptwriting, cinematography, video editing, motion graphics, graphic design, branding, AI-assisted content creation, and ad production for e-commerce and F-commerce.',
  },
  {
    years: '2025 – Present',
    school: 'Political Science । Syed Ahmed College',
    detail:
      'Political Science has built my analytical thinking, research, and communication skills. I bring this perspective into my creative work to tell stories that are thoughtful and meaningful.',
  },
  {
    years: '2023 – 2024',
    school: 'Higher Secondary Certificate । Sundarganj DW Government College',
    detail:
      'Completed HSC at Sundarganj DW Government College, building a strong academic foundation along with discipline and teamwork. This is also where my interest in visual storytelling and creative media first began to grow.',
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  {
    t: 'Direction',
    d: 'Concept art, storyboarding, live-action blocking, actor direction, and comprehensive vision from script to delivery.',
    tags: ['Pre-viz', 'Blocking', 'Tone', 'Creative Direction'],
  },
  {
    t: 'Cinematography',
    d: 'ARRI Alexa 35 & RED Raptor operation, vintage anamorphic glass selection, high-contrast lighting setups, and camera movement.',
    tags: ['Anamorphic', 'Grip & Gaffer', 'Lighting', 'Color Contrast'],
  },
  {
    t: 'VFX Compositing',
    d: 'Deep compositing in Foundry Nuke, planar & 3D camera tracking, matte extraction, cleanup plates, and seamless CG integration.',
    tags: ['Nuke', 'Mocha Pro', 'Multi-pass EXR', 'Rotopaint'],
  },
  {
    t: 'Motion Design & Graphics',
    d: 'High-concept FUI (futuristic user interfaces), holographic HUD displays, 3D title sequences, and kinetic branding.',
    tags: ['After Effects', 'Cinema 4D', 'Redshift', 'FUI Design'],
  },
  {
    t: '3D Simulation & Environments',
    d: 'Houdini pyro and particle FX, photoreal environmental dressing, Unreal Engine 5 virtual production & Lumen lighting.',
    tags: ['Houdini', 'Unreal Engine 5', 'Blender', 'Substance Painter'],
  },
  {
    t: 'Video Editing & Rhythm',
    d: 'Narrative cutting, tension modulation, sound-driven rhythm, and emotional pacing that carries complex storytelling.',
    tags: ['Premiere Pro', 'DaVinci Resolve', 'Offline Editing', 'Pacing'],
  },
  {
    t: 'AI & Neural Video',
    d: 'Generative video plate extension, neural style transfer, Depth Anything / ControlNet workflows, and prompt-to-shot synthesis.',
    tags: ['ComfyUI', 'Runway Gen-3', 'Neural NeRF', 'AI Plate Extension'],
  },
  {
    t: 'Sound Design & Atmos',
    d: 'Sub-bass impact design, retro-futuristic synth risers, Foley manipulation, and Dolby Atmos audio staging.',
    tags: ['Ableton Live', 'Izotope RX', 'Sound Staging', 'Foley'],
  },
];

export const INITIAL_NOW: string[] = [
  'Direction & anamorphic cinematography',
  'Multi-pass CG compositing in Nuke',
  'Houdini pyro, smoke & destruction sims',
  'Real-time virtual production in Unreal Engine 5',
];

export const INITIAL_LEARNING: string[] = [
  'Gaussian Splatting & 3D neural scene captures',
  'Deep compositing volumetric lighting in ACES',
  'Custom Python pipeline tools for OpenUSD',
];

export const INITIAL_GOAL_LIST: string[] = [
  'VFX Artist & Sequence Director on visionary sci-fi feature films and prestige streaming series.',
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Aethelgard: The Orbital Breach',
    cat: 'VFX',
    type: 'Sci-Fi Feature Teaser',
    desc: '3D spacecraft entry into upper planetary atmosphere with re-entry plasma simulation, heat shield ablation, and deep compositing in Nuke.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    preview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop',
    client: 'Nebula Pictures',
    year: '2024',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Synthetica: Midnight Protocol',
    cat: 'Direction',
    type: 'Cyberpunk Short Film',
    desc: 'Live-action neo-noir filmed on location in rain-slicked Tokyo alleyways. Directed cast, engineered anamorphic neon flare lighting, and oversaw 14 VFX shots.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    client: 'Chroma Independent',
    year: '2024',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Ghost In The Voltage',
    cat: 'Motion',
    type: '3D Title Sequence',
    desc: 'Main title sequence for a cyberpunk thriller series featuring holographic wireframes, glowing phosphor CRT grids, and kinetic typography.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop',
    client: 'Horizon Stream',
    year: '2023',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Chrono Horizon: Time Dilated',
    cat: 'Cinematography',
    type: 'Music Video',
    desc: 'Captured on ARRI Alexa Mini LF with Cooke Anamorphic /i Full Frame Plus primes. High-speed 120fps motion tracking through particle storms.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumb: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=900&auto=format&fit=crop',
    client: 'Mute Records',
    year: '2023',
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'Neural Decay: Gen-3 Plate Study',
    cat: 'AI Video',
    type: 'Experimental AI Short',
    desc: 'Hybrid workflow uniting live camera plates with neural diffusion camera projections, ControlNet depth passes, and optical flow stabilization.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
    client: 'Synthetic Art Lab',
    year: '2024',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Obsidian Pulse: Precision Timepieces',
    cat: 'Editing',
    type: 'Luxury Commercial',
    desc: 'High-energy rhythmic editorial for a titanium watch release. Fast optical cuts, macro gear mechanics, custom Foley, and deep bass sound design.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop',
    client: 'Chronos Swiss',
    year: '2023',
    featured: false,
  },
];

export const INITIAL_BREAKDOWNS: BreakdownItem[] = [
  {
    id: 'bd-1',
    title: 'The Neural Citadel: Environmental Extension',
    desc: 'Converted raw daylight rooftop footage into a night-time dystopian megalopolis. Camera tracked in 3D, rotoscoped actor foreground, built multi-level futuristic skyscrapers with volumetric rain fog, and composited holographic advertisements.',
    before: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    beforeLabel: 'Raw Camera Plate',
    afterLabel: 'Final VFX Composite',
    tools: ['Nuke 15', 'Houdini Solaris', 'Mocha Pro', 'ACEScc'],
    shotNumber: 'SH_042',
  },
  {
    id: 'bd-2',
    title: 'Plasma Core Reactor: Pyro Simulation',
    desc: 'Composite comparison showing the untextured 3D gray render pass versus the final layered energy sphere with sub-surface plasma glow, electromagnetic sparks, and lens chromatic aberration.',
    before: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    beforeLabel: 'Gray Clay & Wireframe',
    afterLabel: 'Render & Optical Flares',
    tools: ['Blender Cycles', 'Houdini Pyro', 'DaVinci Resolve'],
    shotNumber: 'SH_118',
  },
  {
    id: 'bd-3',
    title: 'Cybernetic Optical Implant: Head Tracking',
    desc: 'Precise 3D facial mesh track attached to live-action eye movement. Integrated biometric telemetry UI HUD, sub-dermal glowing veins, and ocular lens refractions in Nuke.',
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    beforeLabel: 'Original Actor Plate',
    afterLabel: 'Biometric Cyberware FX',
    tools: ['KeenTools GeoTracker', 'Nuke', 'After Effects'],
    shotNumber: 'SH_089',
  },
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'ph-1',
    t: 'Production Crew & Field Studio',
    m: 'On-Location Cinematography Workshop · Dhaka, 2026',
    src: photo1,
    h: 420,
  },
  {
    id: 'ph-2',
    t: 'Camera Rig & Team Framing',
    m: 'Field Shoot & Direction · 2026',
    src: photo2,
    h: 300,
  },
  {
    id: 'ph-3',
    t: 'Visual Storytelling Workshop',
    m: 'Practical Lighting & Outdoor Production · 2026',
    src: photo3,
    h: 360,
  },
  {
    id: 'ph-4',
    t: 'Cinematic Atmosphere & Kashful Field',
    m: 'On-Location Camera Unit · Dhaka, 2026',
    src: photo4,
    h: 440,
  },
  {
    id: 'ph-5',
    t: 'Outdoor Production Unit',
    m: 'Lighting Setup & Sound Staging · 2026',
    src: photo5,
    h: 320,
  },
  {
    id: 'ph-6',
    t: 'Full Creative Collective',
    m: 'The Art of Creation Cohort · 2026',
    src: photo6,
    h: 400,
  },
];

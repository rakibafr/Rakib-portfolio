import React, { useState } from 'react';
import { SiteConfig, buildMailtoUrl } from '../utils/portfolio-logic';
import { Mail, Send, CheckCircle2, ArrowUpRight, MessageSquare, MapPin } from 'lucide-react';

interface ContactViewProps {
  site: SiteConfig;
}

export const ContactView: React.FC<ContactViewProps> = ({ site }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const mailto = buildMailtoUrl(site.email, name, message);
    window.location.href = mailto;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 6000);
  };

  return (
    <div className="pt-[140px] pb-[100px] px-[6vw] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(40px,6.5vw,92px)] font-display uppercase tracking-tight leading-none text-white mb-4">
          Let’s <span className="text-[#19E3D0]">talk</span>
        </h2>

        <p className="text-lg md:text-2xl text-[#EDEDED]/90 font-light max-w-3xl mb-8 leading-relaxed">
          {site.contactLead}
        </p>

        {/* Location & Direct Email */}
        <div className="mb-10 flex flex-col items-start gap-4">
          {site.location && (
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#19E3D0] uppercase tracking-wider bg-white/[0.04] px-3.5 py-1.5 rounded-lg border border-[#19E3D0]/30 shadow-[0_0_15px_rgba(25,227,208,0.1)]">
              <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
              <span>{site.location}</span>
            </div>
          )}

          <a
            href={`mailto:${site.email}`}
            className="inline-block font-display text-[clamp(24px,5vw,64px)] text-[#FF5A1F] hover:text-[#19E3D0] border-b-2 border-[#FF5A1F] hover:border-[#19E3D0] pb-1 transition duration-200 break-all leading-none"
          >
            {site.email}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-6 mb-16">
          {site.socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#EDEDED]/70 hover:text-[#19E3D0] border-b border-white/15 pb-0.5 transition"
            >
              <span>{soc.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-xl bg-[#0c1117]/80 border border-white/10 p-8 rounded-xl backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2 mb-6 text-[#19E3D0]">
            <MessageSquare className="w-5 h-5" />
            <h3 className="text-2xl font-display uppercase">Direct Inquiry</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/70 mb-2"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Producer, Director, or Studio"
                className="w-full bg-white/[0.04] border border-white/15 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#19E3D0] transition font-sans text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs uppercase font-mono tracking-wider text-[#EDEDED]/70 mb-2"
              >
                Project Brief or Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Details on scope, timeline, footage type, and creative vision..."
                className="w-full bg-white/[0.04] border border-white/15 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#19E3D0] transition font-sans text-sm resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#FF5A1F] text-[#07090D] font-medium text-xs uppercase tracking-wider rounded hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,90,31,0.5)] transition active:translate-y-0"
            >
              <Send className="w-4 h-4" />
              <span>Send by email</span>
            </button>

            {sentNotice && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#19E3D0] pt-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Launching default email client with your message drafted.</span>
              </div>
            )}
          </form>
        </div>

        {/* Closing Quote */}
        {site.closing && (
          <p className="mt-28 font-display text-[clamp(22px,4vw,44px)] uppercase leading-tight max-w-[20em] text-[#EDEDED]/45 italic">
            {site.closing}
          </p>
        )}
      </div>
    </div>
  );
};

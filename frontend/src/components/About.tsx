import { CheckCircle2 } from 'lucide-react';

const points = [
  'Founded by athletes who refused to compromise on quality',
  'Every formula clinically dosed and lab-verified',
  'Trusted by 50,000+ warriors across 24 cities',
  'Manufactured in GMP-certified facilities',
];

export default function About() {
  return (
    <section id="story" className="relative py-24 bg-[#0d0d0d] overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 left-0 w-1/3 h-[2px] bg-gradient-to-r from-[#e41e26] to-transparent" />
      <div className="absolute bottom-10 right-0 w-1/3 h-[2px] bg-gradient-to-l from-[#e41e26] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Athlete in the shadows"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#e41e26] p-6 red-glow hidden md:block">
              <div className="ghost-logo-text text-4xl text-white leading-none">EST.</div>
              <div className="ghost-logo-text text-4xl text-white leading-none">2019</div>
            </div>
            {/* Corner accent */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#e41e26]" />
          </div>

          {/* Text side */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#e41e26]" />
              <span className="section-label">Our Story</span>
            </div>
            <h2 className="ghost-logo-text text-5xl md:text-6xl text-white mb-6 leading-[0.9]">
              Built In
              <br />
              <span className="text-[#e41e26]">The Shadows</span>
            </h2>
            <div className="red-divider" />
            <p className="text-white/60 text-lg leading-relaxed mb-6">
               Axe Breaker was born from a singular obsession: to forge supplements
              that match the intensity of those who refuse to be average. We do not
              chase trends. We do not cut corners. We build fuel for the relentless.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              From the underground gyms to the competitive stage, our formulas are
              engineered for warriors who train when no one is watching and dominate
              when everyone is. This is not a brand. This is a brotherhood.
            </p>

            <ul className="space-y-3 mb-10">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#e41e26] flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{p}</span>
                </li>
              ))}
            </ul>

            <a href="#distribute" className="btn-primary">
              Join the Brotherhood
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
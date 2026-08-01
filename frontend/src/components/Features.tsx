import { Flame, Shield, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Explosive Energy',
    desc: 'Clinically-dosed formulas that ignite your training intensity.',
  },
  {
    icon: Shield,
    title: 'Lab Verified',
    desc: 'Every batch tested for purity and potency. Zero compromises.',
  },
  {
    icon: Flame,
    title: 'Forged for Warriors',
    desc: 'Built for athletes who train in the shadows and dominate in the light.',
  },
  {
    icon: Award,
    title: 'Premium Grade',
    desc: 'Pharmaceutical-grade ingredients sourced from trusted suppliers.',
  },
];

export default function Features() {
  return (
    <section className="relative py-20 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group text-center md:text-left animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border border-[#e41e26]/40 group-hover:bg-[#e41e26] group-hover:border-[#e41e26] transition-all duration-300">
                  <Icon size={24} className="text-[#e41e26] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-fire text-lg text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
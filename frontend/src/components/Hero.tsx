import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Athlete training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/70" />
      </div>

      {/* Diagonal stripe accent */}
      <div className="absolute top-1/3 -right-20 w-80 h-[2px] bg-[#e41e26] rotate-[-45deg] opacity-60" />
      <div className="absolute top-1/2 -right-10 w-60 h-[1px] bg-[#e41e26] rotate-[-45deg] opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fadeInLeft">
            <div className="w-10 h-[2px] bg-[#e41e26]" />
            <span className="section-label">Premium Sports Nutrition</span>
          </div>

          <h1 className="hero-title-text text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-6 animate-fadeInUp delay-100">
            Train Like
            <br />
            <span className="text-[#e41e26] red-glow-text">A GHOST.</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fadeInUp delay-200">
            Engineered for the relentless.  Axe Breaker delivers pharmaceutical-grade
            supplements forged for warriors who refuse to settle for ordinary.
          </p>

          <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
            <a href="#arsenal" className="btn-primary">
              Explore Arsenal
              <ArrowRight size={16} />
            </a>
            <a href="#story" className="btn-outline">
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg animate-fadeInUp delay-500">
            {[
              { num: '50K+', label: 'Warriors Fueled' },
              { num: '100%', label: 'Lab Tested' },
              { num: '24', label: 'Cities Served' },
            ].map((s) => (
              <div key={s.label}>
                <div className="ghost-logo-text text-3xl md:text-4xl text-white">
                  {s.num}
                </div>
                <div className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase mt-1 font-display">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#arsenal"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase font-display">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
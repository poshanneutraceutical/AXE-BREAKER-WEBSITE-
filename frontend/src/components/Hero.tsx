import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
     {/* Background image */}
     <div className="absolute inset-0 z-0 overflow-hidden">

       <img
         src="/axe-background-image.png"
         alt="Athlete training"
         className="
           absolute
           right-0
           top-[100px]
           w-[68%]
           h-[calc(100%-100px)]
           object-contain
           object-right-bottom
         "
       />

       {/* Overall dark overlay */}
       <div
         className="
           absolute
           inset-0
           bg-gradient-to-b
           from-black/20
           via-black/20
           to-black/70
           pointer-events-none
         "
       />

       {/* Darken left side so text remains readable */}
       <div
         className="
           absolute
           inset-0
           bg-gradient-to-r
           from-black
           via-black/60
           to-transparent
           pointer-events-none
         "
       />

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

          <h1
            className="
              hero-title-text
              text-5xl
              md:text-7xl
              lg:text-8xl
              leading-[0.78]
              mb-4
              font-black
              uppercase
              tracking-[-0.04em]
              max-w-[650px]
              animate-fadeInUp
              delay-100
            "
          >
            <span
              className="
                block
                origin-left
                scale-x-[0.84]
              "
            >
              STRONGER
            </span>

            <span className="text-[#e41e26] red-glow-text block">
              EVERYDAY.
            </span>
          </h1>

          <p className="text-white font-black uppercase tracking-[0.25em] text-sm md:text-base mb-4">
            FUEL. FOCUS. DOMINATE.
          </p>

          <p className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fadeInUp delay-200">
            Engineered for those who refuse to be ordinary. Axe Breaker delivers uncompromising, pharmaceutical-grade supplementation—precision-formulated
            to fuel relentless intensity, sharpen performance, and push you beyond every limit.
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
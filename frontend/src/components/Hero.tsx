import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#111111]

        max-md:min-h-0
        max-md:items-start
        max-md:justify-start
      "
    >
      {/* =====================================================
          HERO IMAGE
          Desktop: large image on the right
          Mobile: centered and enlarged
          ===================================================== */}
      <div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          pointer-events-none
        "
      >
        <img
          src="/WEB FRONT2 TRA.webp"
          alt="Axe Breaker Warriors"
          className="
            absolute
            right-0
            top-[100px]
            w-[73%]
            h-[calc(100%-100px)]
            object-contain
            object-right-bottom
            brightness-150
            contrast-110

            max-md:top-[78px]
            max-md:left-1/2
            max-md:right-auto
            max-md:-translate-x-1/2
            max-md:w-[105%]
            max-md:h-auto
            max-md:max-w-none
            max-md:object-contain
            max-md:object-center
            max-md:brightness-150
            max-md:contrast-110

            sm:max-md:w-[100%]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          w-full
          pt-20
          pb-24

          max-md:pt-[105px]
          max-md:pb-8
        "
      >
        <div className="max-w-3xl min-w-0">

          {/* =================================================
              SECTION LABEL
              ================================================= */}
          <div
            className="
              flex
              items-center
              gap-3
              mb-6
              animate-fadeInLeft
            "
          >
            <div
              className="
                w-10
                h-[2px]
                bg-[#e41e26]
                shrink-0
              "
            />

            <span className="section-label">
              Premium Sports Nutrition
            </span>
          </div>

          {/* =================================================
              MAIN HEADING
              ================================================= */}
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

              max-md:text-[2.65rem]
              max-md:leading-[0.82]
              max-md:max-w-full
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

            <span
              className="
                text-[#e41e26]
                red-glow-text
                block
              "
            >
              EVERYDAY.
            </span>
          </h1>

          {/* =================================================
              TAGLINE
              ================================================= */}
          <p
            className="
              text-white
              font-black
              uppercase
              tracking-[0.25em]
              text-sm
              md:text-base
              mb-4

              max-md:text-xs
              max-md:tracking-[0.18em]
            "
          >
            FUEL. FOCUS. DOMINATE.
          </p>

          {/* =================================================
              DESCRIPTION
              Desktop stays subdued.
              Mobile is brighter and stronger for readability.
              ================================================= */}
          <p
            className="
              text-white/60
              text-lg
              md:text-xl
              max-w-xl
              mb-10
              leading-relaxed
              animate-fadeInUp
              delay-200

              max-md:text-white
              max-md:text-[0.95rem]
              max-md:font-medium
              max-md:leading-[1.65]
              max-md:max-w-[95%]
              max-md:mb-8
              max-md:[text-shadow:0_1px_3px_rgba(0,0,0,0.9)]
            "
          >
            AXE BREAKER is precision-formulated for those who train harder,
            push further, and refuse to back down. Powered by
            performance-focused ingredients, it is designed to support
            maximum intensity, relentless energy, razor-sharp focus,
            endurance, and peak performance—so you can attack every set,
            overpower fatigue, crush every limit that hold back and dominate
            every session.
          </p>

          {/* =================================================
              BUTTONS
              ================================================= */}
          <div
            className="
              flex
              flex-wrap
              gap-4
              animate-fadeInUp
              delay-300

              max-md:flex-col
              max-md:items-stretch
              max-md:w-full
            "
          >
            <a
              href="#products"
              className="
                btn-primary
                max-md:w-full
                max-md:justify-center
              "
            >
              Explore Products
              <ArrowRight size={16} />
            </a>

            <a
              href="#story"
              className="
                btn-outline
                max-md:w-full
                max-md:justify-center
              "
            >
              Our Story
            </a>
          </div>

          {/* =================================================
              STATS
              ================================================= */}
          <div
            className="
              grid
              grid-cols-3
              gap-8
              mt-16
              max-w-lg
              animate-fadeInUp
              delay-500

              max-md:grid-cols-3
              max-md:gap-4
              max-md:mt-12
            "
          >
            {[
              { num: '50K+', label: 'Warriors Fueled' },
              { num: '100%', label: 'Lab Tested' },
              { num: '24', label: 'Cities Served' },
            ].map((s) => (
              <div
                key={s.label}
                className="min-w-0"
              >
                <div
                  className="
                    ghost-logo-text
                    text-3xl
                    md:text-4xl
                    text-white/80

                    max-md:text-2xl
                  "
                >
                  {s.num}
                </div>

                <div
                  className="
                    text-[0.65rem]
                    tracking-[0.2em]
                    text-white/30
                    uppercase
                    mt-1
                    font-display

                    max-md:text-[0.52rem]
                    max-md:tracking-[0.12em]
                  "
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
          Desktop only
          ===================================================== */}
      <a
        href="#products"
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          z-10
          flex
          flex-col
          items-center
          gap-2
          text-white/30
          hover:text-white
          transition-colors

          max-md:hidden
        "
      >
        <span
          className="
            text-[0.6rem]
            tracking-[0.3em]
            uppercase
            font-display
          "
        >
          Scroll
        </span>

        <ChevronDown
          size={20}
          className="animate-bounce"
        />
      </a>
    </section>
  );
}
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
        noise-overlay

        max-md:items-start
        max-md:justify-start
      "
    >

      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
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

            /* ================= MOBILE ================= */

            max-md:top-[70px]
            max-md:right-[-8%]
            max-md:w-[100%]
            max-md:h-[52%]
            max-md:object-contain
            max-md:object-right-top

            sm:max-md:right-[-5%]
            sm:max-md:w-[92%]
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

        {/* Desktop left darkening */}
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

        {/* Mobile darkening */}
        <div
          className="
            absolute
            inset-0
            hidden
            max-md:block
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/90
            pointer-events-none
          "
        />

      </div>


      {/* =====================================================
          DIAGONAL RED STRIPES
      ====================================================== */}

      <div
        className="
          absolute
          top-1/3
          -right-20
          w-80
          h-[2px]
          bg-[#e41e26]
          rotate-[-45deg]
          opacity-60
          z-[1]
        "
      />

      <div
        className="
          absolute
          top-1/2
          -right-10
          w-60
          h-[1px]
          bg-[#e41e26]
          rotate-[-45deg]
          opacity-40
          z-[1]
        "
      />


      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

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

          /* ================= MOBILE ================= */

          max-md:pt-[105px]
          max-md:pb-16
        "
      >

        <div
          className="
            max-w-3xl
            min-w-0
          "
        >

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

              max-md:mb-4
            "
          >

            <div
              className="
                w-10
                h-[2px]
                bg-[#e41e26]
                shrink-0

                max-md:w-8
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

              /* ================= MOBILE ================= */

              max-md:text-[2.65rem]
              max-md:leading-[0.82]
              max-md:max-w-full
              max-md:mb-3
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

              /* ================= MOBILE ================= */

              max-md:text-xs
              max-md:tracking-[0.18em]
              max-md:mb-3
            "
          >
            FUEL. FOCUS. DOMINATE.
          </p>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              text-white/70

              text-lg
              md:text-xl

              max-w-xl

              mb-10

              leading-relaxed

              animate-fadeInUp
              delay-200

              /* ================= MOBILE ================= */

              max-md:text-base
              max-md:leading-relaxed
              max-md:max-w-[95%]
              max-md:mb-7
            "
          >
            Engineered for those who refuse to be ordinary. Axe Breaker
            delivers uncompromising, pharmaceutical-grade
            supplementation—precision-formulated to fuel relentless
            intensity, sharpen performance, and push you beyond every
            limit.
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

              /* ================= MOBILE ================= */

              max-md:flex-col
              max-md:items-stretch
              max-md:w-full
              max-md:max-w-[470px]
              max-md:gap-3
            "
          >

            {/* Explore Arsenal */}
            <a
              href="#arsenal"
              className="
                btn-primary

                max-md:w-full
                max-md:justify-center
              "
            >
              Explore Arsenal

              <ArrowRight size={16} />
            </a>


            {/* Our Story */}
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

              /* ================= MOBILE ================= */

              max-md:gap-4
              max-md:mt-10
            "
          >

            {[
              {
                num: '50K+',
                label: 'Warriors Fueled',
              },
              {
                num: '100%',
                label: 'Lab Tested',
              },
              {
                num: '24',
                label: 'Cities Served',
              },
            ].map((s) => (

              <div
                key={s.label}
                className="min-w-0"
              >

                {/* Number */}
                <div
                  className="
                    ghost-logo-text

                    text-3xl
                    md:text-4xl

                    text-white

                    max-md:text-2xl
                  "
                >
                  {s.num}
                </div>


                {/* Label */}
                <div
                  className="
                    text-[0.65rem]

                    tracking-[0.2em]

                    text-white/40

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
      ====================================================== */}

      <a
        href="#arsenal"
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

          text-white/40

          hover:text-white

          transition-colors

          max-md:bottom-4
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
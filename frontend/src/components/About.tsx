export default function About() {
  return (
    <section
      id="story"
      className="relative py-24 bg-[#0d0d0d] overflow-visible"
    >
      {/* Decorative */}
      <div className="absolute top-10 left-0 w-1/3 h-[2px] bg-gradient-to-r from-[#e41e26] to-transparent" />

      <div className="absolute bottom-10 right-0 w-1/3 h-[2px] bg-gradient-to-l from-[#e41e26] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* ==================================================
              IMAGE SIDE
          ================================================== */}

          <div className="relative flex items-center justify-start">

            {/* Full original image */}
            <div className="relative w-full max-w-[680px] aspect-[4/5] -ml-4 lg:-ml-8">
              <img
                src="/WEB CARD2.png"
                alt="Our Story"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-contain
                  object-center
                  block
                "
              />
            </div>

            {/* Corner accent */}
            <div
              className="
                absolute
                -top-4
                left-0
                lg:-left-4
                w-16
                h-16
                border-t-2
                border-l-2
                border-[#e41e26]
                pointer-events-none
              "
            />

          </div>


          {/* ==================================================
              TEXT SIDE
          ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-start
              self-start
              lg:-ml-8
              lg:pt-10
              w-full
            "
          >

            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-[#e41e26]" />

              <span className="section-label">
                Our Story
              </span>
            </div>


            {/* Heading */}
            <h2
              className="
                ghost-logo-text
                text-5xl
                md:text-6xl
                lg:text-7xl
                text-white
                mb-7
                leading-[0.88]
              "
            >
              Built In
              <br />

              <span className="text-[#e41e26]">
                The Shadows
              </span>
            </h2>


            {/* Divider */}
            <div className="red-divider mb-8" />


            {/* First paragraph */}
            <p
              className="
                text-white/65
                text-lg
                md:text-xl
                leading-relaxed
                mb-7
              "
            >
              AXE BREAKER was built with one clear purpose: to develop
              performance-driven supplementation for those who demand more
              from themselves. We believe in disciplined formulation,
              uncompromising quality, and purposeful innovation—not passing
              trends or shortcuts.
            </p>


            {/* Second paragraph */}
            <p
              className="
                text-white/55
                text-base
                md:text-lg
                leading-relaxed
                mb-9
              "
            >
              From the underground gyms to the competitive stage, our
              formulas are engineered for warriors who train when no one
              is watching and dominate when everyone is. This is not a
              brand. This is a brotherhood.
            </p>


            {/* Button */}
            <a
              href="#distribute"
              className="btn-primary w-fit"
            >
              Join the Brotherhood
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
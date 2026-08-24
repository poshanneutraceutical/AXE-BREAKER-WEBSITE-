import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductCarousel({
  images,
  productName,
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrent((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="
        relative
        w-full
        aspect-square
        overflow-hidden
        bg-[#1a1a1a]
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full h-full"
        >
          <Zoom>
            <img
              src={images[current]}
              alt={`${productName} ${current + 1}`}
              draggable={false}
              className="
                w-full
                h-full
                object-cover
                cursor-zoom-in
                select-none
              "
            />
          </Zoom>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              z-30
              bg-black/50
              hover:bg-black/70
              text-white
              w-10
              h-10
              rounded-full
            "
          >
            ❮
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={next}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              z-30
              bg-black/50
              hover:bg-black/70
              text-white
              w-10
              h-10
              rounded-full
            "
          >
            ❯
          </button>
        </>
      )}

      {/* Gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-transparent
        "
      />

      {/* Dots */}
      {images.length > 1 && (
        <div
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            flex
            gap-2
            z-30
          "
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`
                rounded-full
                transition-all
                duration-300
                ${
                  current === index
                    ? "w-6 h-2 bg-red-600"
                    : "w-2 h-2 bg-white/60 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Grid2x2 } from "lucide-react";

export default function ImageGallery({ images, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const open = (i) => {
    setIndex(i);
    setLightboxOpen(true);
  };
  const close = () => setLightboxOpen(false);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, prev, next]);

  return (
    <section id="photos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 scroll-mt-32">
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] relative">
        <button className="col-span-2 row-span-2 relative group" onClick={() => open(0)}>
          <img
            src={images[0]}
            alt={`${title} photo 1`}
            className="w-full h-full object-cover group-hover:brightness-95 transition"
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button key={i} className="relative group overflow-hidden" onClick={() => open(i + 1)}>
            <img
              src={img}
              alt={`${title} photo ${i + 2}`}
              className="w-full h-full object-cover group-hover:brightness-95 transition"
            />
          </button>
        ))}
        <button
          onClick={() => open(0)}
          className="absolute bottom-4 right-4 bg-white text-sm font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-gray-100"
        >
          <Grid2x2 size={16} /> Show all photos
        </button>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl -mx-4 px-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="snap-center shrink-0 w-[88%] h-64 rounded-2xl overflow-hidden"
          >
            <img src={img} alt={`${title} photo ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <button onClick={close} className="p-2 hover:bg-white/10 rounded-full" aria-label="Close gallery">
              <X size={22} />
            </button>
            <span className="text-sm font-medium">
              {index + 1} / {images.length}
            </span>
            <span className="w-9" />
          </div>
          <div className="flex-1 flex items-center justify-center relative px-4">
            <button
              onClick={prev}
              className="absolute left-2 sm:left-6 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <img
              src={images[index]}
              alt={`${title} full photo ${index + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-md transition-opacity duration-300"
            />
            <button
              onClick={next}
              className="absolute right-2 sm:right-6 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="hidden sm:flex gap-2 overflow-x-auto no-scrollbar px-6 py-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                  i === index ? "border-white" : "border-transparent opacity-60"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

export default function NavTabs() {
  const [active, setActive] = useState("photos");
  const clickScroll = useRef(false);

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScroll.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function goTo(id) {
    setActive(id);
    clickScroll.current = true;
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.setTimeout(() => (clickScroll.current = false), 700);
  }

  return (
    <div className="sticky top-20 z-30 bg-white border-b border-gray-200 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => goTo(t.id)}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
                active === t.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

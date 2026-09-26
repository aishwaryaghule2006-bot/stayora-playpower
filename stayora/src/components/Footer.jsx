import { useEffect, useState } from "react";
import { ArrowUp, Home } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 800);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 lg:bottom-8 right-5 z-30 bg-white border border-gray-200 shadow-lg rounded-full p-3 hover:bg-gray-50"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default function Footer() {
  return (
    <footer id="become-host" className="border-t border-gray-200 mt-12 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-[var(--brand)] mb-3">
            <Home size={22} />
            <span className="font-bold text-lg">Stayora</span>
          </div>
          <p className="text-gray-500 text-xs">Book unique stays, wherever you're headed.</p>
        </div>
        <div>
          <p className="font-semibold mb-3">Support</p>
          <ul className="space-y-2 text-gray-600">
            <li>Help Center</li>
            <li>Safety information</li>
            <li>Cancellation options</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Hosting</p>
          <ul className="space-y-2 text-gray-600">
            <li>Become a host</li>
            <li>Host resources</li>
            <li>Community forum</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Stayora</p>
          <ul className="space-y-2 text-gray-600">
            <li>Newsroom</li>
            <li>Careers</li>
            <li>Investors</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500">
        © {new Date().getFullYear()} Stayora, Inc. This is a demo project and is not affiliated with Airbnb.
      </div>
    </footer>
  );
}

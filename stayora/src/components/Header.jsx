import { useState } from "react";
import { Menu, User, Globe, Search, Home } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 shrink-0 text-[var(--brand)]">
          <Home size={30} strokeWidth={2.2} />
          <span className="hidden sm:block text-2xl font-bold tracking-tight">Stayora</span>
        </a>

        {/* Search pill - desktop */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow divide-x divide-gray-300 text-sm"
        >
          <span className="px-4 py-2.5 font-semibold">Anywhere</span>
          <span className="px-4 py-2.5 font-semibold">Any week</span>
          <span className="px-4 py-2.5 text-gray-500 flex items-center gap-2">
            Add guests
            <span className="bg-[var(--brand)] text-white rounded-full p-2">
              <Search size={14} />
            </span>
          </span>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 shadow-sm text-sm font-medium flex-1 max-w-[220px]"
        >
          <Search size={16} />
          Where to?
        </button>

        {/* Right nav */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#become-host"
            className="hidden lg:block text-sm font-semibold px-3 py-2 rounded-full hover:bg-gray-100"
          >
            Become a host
          </a>
          <button className="hidden sm:flex p-2.5 rounded-full hover:bg-gray-100">
            <Globe size={18} />
          </button>
          <div className="relative">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center gap-2 border border-gray-300 rounded-full pl-2 pr-1 py-1 hover:shadow-md transition-shadow"
              aria-label="Open menu"
            >
              <Menu size={16} />
              <span className="bg-gray-500 text-white rounded-full p-1.5">
                <User size={16} />
              </span>
            </button>
            {mobileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 text-sm z-50">
                <a href="#become-host" className="block px-4 py-2.5 hover:bg-gray-50 font-medium">
                  Become a host
                </a>
                <a href="#" className="block px-4 py-2.5 hover:bg-gray-50">
                  Log in
                </a>
                <a href="#" className="block px-4 py-2.5 hover:bg-gray-50">
                  Sign up
                </a>
                <hr className="my-2" />
                <a href="#" className="block px-4 py-2.5 hover:bg-gray-50">
                  Help
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Search stays</h3>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded-xl px-4 py-3">
                <label className="text-xs font-bold">Where</label>
                <input
                  className="block w-full outline-none text-sm mt-0.5"
                  placeholder="Search destinations"
                  defaultValue="Candolim, Goa, India"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-300 rounded-xl px-4 py-3">
                  <label className="text-xs font-bold">Check-in</label>
                  <input type="date" className="block w-full outline-none text-sm mt-0.5" />
                </div>
                <div className="border border-gray-300 rounded-xl px-4 py-3">
                  <label className="text-xs font-bold">Check-out</label>
                  <input type="date" className="block w-full outline-none text-sm mt-0.5" />
                </div>
              </div>
              <div className="border border-gray-300 rounded-xl px-4 py-3">
                <label className="text-xs font-bold">Guests</label>
                <input className="block w-full outline-none text-sm mt-0.5" placeholder="Add guests" />
              </div>
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="brand-btn w-full rounded-xl py-3 font-semibold mt-5 flex items-center justify-center gap-2"
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

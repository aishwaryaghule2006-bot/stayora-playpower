import { useState } from "react";
import { Share2, Heart, Star, Check, Link as LinkIcon } from "lucide-react";

export default function PropertyHeader({ property }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  function handleShare() {
    setShareOpen((v) => !v);
  }

  function copyLink() {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 1200);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 relative">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{property.title}</h1>
      <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={14} className="fill-black" />
          <span className="font-semibold">{property.rating}</span>
          <span className="text-gray-500">·</span>
          <a href="#reviews" className="underline font-medium">
            {property.reviewCount} reviews
          </a>
          <span className="text-gray-500">·</span>
          <span className="underline font-medium">{property.location}</span>
        </div>
        <div className="flex items-center gap-1 relative">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <Share2 size={16} /> Share
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <Heart size={16} className={saved ? "fill-[var(--brand)] text-[var(--brand)]" : ""} />
            {saved ? "Saved" : "Save"}
          </button>

          {shareOpen && (
            <div className="absolute right-0 top-11 bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-56 z-40">
              <button
                onClick={copyLink}
                className="flex items-center gap-3 w-full text-sm px-3 py-2.5 rounded-lg hover:bg-gray-50"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
                {copied ? "Link copied!" : "Copy link"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Star, X } from "lucide-react";
import * as Icons from "lucide-react";

const CATEGORY_ICON = {
  Cleanliness: "Sparkles",
  Accuracy: "BadgeCheck",
  "Check-in": "KeyRound",
  Communication: "MessageCircle",
  Location: "MapPin",
  Value: "Tag",
};

function ReviewCard({ review }) {
  return (
    <div className="break-inside-avoid mb-6">
      <div className="flex items-center gap-3 mb-2">
        <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm">{review.name}</p>
          <p className="text-gray-500 text-xs">{review.country}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={11} className="fill-black" />
        ))}
        <span>· {review.date}</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  );
}

export default function Reviews({ property, reviews }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState("recent");

  const sorted = useMemo(() => {
    const copy = [...reviews];
    if (sort === "highest") return copy.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest") return copy.sort((a, b) => a.rating - b.rating);
    return copy; // 'recent' = as-is (data already ordered by date desc)
  }, [reviews, sort]);

  return (
    <div id="reviews" className="border-b border-gray-200 py-8 scroll-mt-32">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Star size={20} className="fill-black" /> {property.rating} · {property.reviewCount} reviews
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 mb-8 max-w-xl">
        {Object.entries(property.categoryRatings).map(([label, value]) => {
          const Icon = Icons[CATEGORY_ICON[label]] || Icons.Star;
          return (
            <div key={label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <Icon size={15} /> {label}
              </span>
              <span className="font-medium">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {reviews.slice(0, 4).map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="border border-black rounded-lg px-5 py-3 text-sm font-semibold hover:bg-gray-100"
      >
        Show all {property.reviewCount} reviews
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b z-10">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Star size={16} className="fill-black" /> {property.rating} · {property.reviewCount} reviews
              </h4>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-gray-500">Sort by:</span>
                {["recent", "highest", "lowest"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`text-xs px-3 py-1.5 rounded-full border ${
                      sort === s ? "bg-black text-white border-black" : "border-gray-300"
                    }`}
                  >
                    {s === "recent" ? "Most recent" : s === "highest" ? "Highest rated" : "Lowest rated"}
                  </button>
                ))}
              </div>
              <div className="columns-1 sm:columns-2 gap-8">
                {sorted.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Star } from "lucide-react";
import { formatCurrency } from "../utils/pricing";

export default function NearbyStays({ stays, onSelect }) {
  return (
    <div className="py-10">
      <h3 className="text-xl font-semibold mb-5">More stays near Candolim</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
        {stays.map((stay) => (
          <button
            key={stay.id}
            onClick={() => onSelect?.(stay)}
            className="text-left shrink-0 w-56 group"
          >
            <div className="w-56 h-40 rounded-xl overflow-hidden mb-2">
              <img
                src={stay.image}
                alt={stay.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start justify-between">
              <p className="font-medium text-sm line-clamp-1">{stay.title}</p>
              <span className="flex items-center gap-1 text-xs shrink-0 ml-1">
                <Star size={11} className="fill-black" /> {stay.rating}
              </span>
            </div>
            <p className="text-gray-500 text-xs">{stay.location}</p>
            <p className="text-sm mt-1">
              <span className="font-semibold">{formatCurrency(stay.price)}</span> for {stay.nights} nights
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

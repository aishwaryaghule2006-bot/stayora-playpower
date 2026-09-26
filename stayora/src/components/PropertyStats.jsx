import * as Icons from "lucide-react";
import { Star } from "lucide-react";

export default function PropertyStats({ property }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div>
          <h2 className="text-xl font-semibold">
            {property.type} in {property.location.split(",")[0]}, {property.location.split(",").slice(-1)}
          </h2>
          <p className="text-gray-600 mt-1">
            {property.guests} guests · {property.bedrooms} bedroom · {property.beds} bed · {property.bathrooms}{" "}
            bathroom
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={property.host.avatar}
            alt={property.host.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 mt-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Icons.Medal size={26} />
          <div className="text-sm">
            <p className="font-semibold">Guest favourite</p>
            <p className="text-gray-500">Top-rated on Stayora</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star size={22} className="fill-black" />
          <div className="text-sm">
            <p className="font-semibold">{property.rating}</p>
            <p className="text-gray-500">{property.reviewCount} reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {property.highlights.map((h, i) => {
          const Icon = Icons[h.icon] || Icons.Sparkles;
          return (
            <div key={i} className="flex gap-4">
              <Icon size={26} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-sm">{h.title}</p>
                <p className="text-gray-500 text-sm">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

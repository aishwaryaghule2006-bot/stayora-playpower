import { useState } from "react";
import { BedDouble } from "lucide-react";

export default function SleepingArrangements({ property }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 py-8">
      <p className={`text-gray-700 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>{property.description}</p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="underline font-semibold text-sm mt-2"
      >
        {expanded ? "Show less" : "Show more"}
      </button>

      <h3 className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
        <BedDouble size={22} /> Where you'll sleep
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {property.sleepingArrangements.map((room, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 sm:h-40 overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="font-semibold">{room.name}</p>
              <p className="text-gray-500 text-sm">{room.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

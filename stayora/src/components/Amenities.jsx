import { useState } from "react";
import * as Icons from "lucide-react";
import { X } from "lucide-react";

export default function Amenities({ property }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div id="amenities" className="border-b border-gray-200 py-8 scroll-mt-32">
      <h3 className="text-xl font-semibold mb-5">What this place offers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {property.amenitiesPreview.map((a, i) => {
          const Icon = Icons[a.icon] || Icons.Check;
          return (
            <div key={i} className="flex items-center gap-4 text-[15px]">
              <Icon size={22} strokeWidth={1.5} />
              <span>{a.label}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 border border-black rounded-lg px-5 py-3 text-sm font-semibold hover:bg-gray-100"
      >
        Show all amenities
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b">
              <h4 className="text-lg font-semibold">What this place offers</h4>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-6">
              {property.amenityGroups.map((group, i) => (
                <div key={i}>
                  <h5 className="font-semibold mb-3">{group.category}</h5>
                  <div className="space-y-3">
                    {group.items.map((item, j) => (
                      <div key={j} className={`flex items-center gap-4 text-sm ${group.category === "Not included" ? "text-gray-400 line-through" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

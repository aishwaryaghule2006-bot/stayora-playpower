import { Plus, Minus } from "lucide-react";
import { useBooking } from "../BookingContext";

const ROWS = [
  { key: "adults", label: "Adults", sub: "Ages 13 or above", min: 1 },
  { key: "children", label: "Children", sub: "Ages 2–12", min: 0 },
  { key: "infants", label: "Infants", sub: "Under 2", min: 0 },
  { key: "pets", label: "Pets", sub: "Bringing a service animal?", min: 0 },
];

export default function GuestSelector({ onClose }) {
  const { guests, updateGuestCount } = useBooking();

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-full sm:w-[360px] max-w-full">
      <div className="divide-y divide-gray-200">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="font-medium text-sm">{row.label}</p>
              <p className="text-gray-500 text-xs">{row.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateGuestCount(row.key, -1)}
                disabled={guests[row.key] <= row.min}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black"
                aria-label={`Decrease ${row.label}`}
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center text-sm">{guests[row.key]}</span>
              <button
                onClick={() => updateGuestCount(row.key, 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                aria-label={`Increase ${row.label}`}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-3">
        <button onClick={onClose} className="text-sm font-semibold underline">
          Close
        </button>
      </div>
    </div>
  );
}

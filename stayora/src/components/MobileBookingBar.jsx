import { useState } from "react";
import { useBooking } from "../BookingContext";
import { formatCurrency } from "../utils/pricing";
import { property } from "../data/properties";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import { X } from "lucide-react";

export default function MobileBookingBar() {
  const { nights, pricing, reserve, errors } = useBooking();
  const [sheet, setSheet] = useState(null); // 'dates' | 'guests' | null
  const [reserving, setReserving] = useState(false);
  const previewNights = nights || 5;

  async function handleReserve() {
    setReserving(true);
    await reserve();
    setReserving(false);
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div>
        <p className="font-semibold">
          {formatCurrency(pricing.total || property.pricePerNight * previewNights + property.cleaningFee + property.serviceFee + property.taxes)}
        </p>
        <button onClick={() => setSheet("dates")} className="text-xs underline text-gray-600">
          {previewNights} nights · dates & guests
        </button>
      </div>
      <button
        onClick={handleReserve}
        disabled={reserving}
        className="brand-btn rounded-xl px-6 py-3 font-semibold disabled:opacity-70"
      >
        {reserving ? "Reserving..." : "Reserve"}
      </button>

      {errors.dates && (
        <p className="absolute -top-6 left-4 text-red-600 text-xs bg-white px-1">{errors.dates}</p>
      )}

      {sheet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSheet(null)}>
          <div
            className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-4 text-sm font-semibold">
                <button
                  className={sheet === "dates" ? "underline" : "text-gray-500"}
                  onClick={() => setSheet("dates")}
                >
                  Dates
                </button>
                <button
                  className={sheet === "guests" ? "underline" : "text-gray-500"}
                  onClick={() => setSheet("guests")}
                >
                  Guests
                </button>
              </div>
              <button onClick={() => setSheet(null)} className="p-1.5 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            {sheet === "dates" ? (
              <DatePicker onClose={() => setSheet(null)} />
            ) : (
              <GuestSelector onClose={() => setSheet(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

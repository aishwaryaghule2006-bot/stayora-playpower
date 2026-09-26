import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { useBooking } from "../BookingContext";
import { formatCurrency } from "../utils/pricing";
import { formatShort } from "../utils/dateUtils";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import { property } from "../data/properties";

export default function BookingCard() {
  const { checkIn, checkOut, nights, pricing, totalGuests, reserve, errors } = useBooking();
  const [openPopover, setOpenPopover] = useState(null); // 'dates' | 'guests' | null
  const ref = useRef(null);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenPopover(null);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleReserve() {
    setReserving(true);
    await reserve();
    setReserving(false);
  }

  const previewNights = nights || 5;

  return (
    <div ref={ref} className="border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-28">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-lg">
          <span className="font-semibold text-xl">{formatCurrency(property.pricePerNight)}</span>
          <span className="text-gray-500"> / night</span>
        </p>
        <div className="flex items-center gap-1 text-sm">
          <Star size={13} className="fill-black" />
          <span className="font-semibold">{property.rating}</span>
          <span className="text-gray-500">· {property.reviewCount} reviews</span>
        </div>
      </div>

      <div className="relative">
        <div className="border border-gray-300 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setOpenPopover(openPopover === "dates" ? null : "dates")}
              className="text-left px-3 py-2.5 border-r border-b border-gray-300 hover:bg-gray-50"
            >
              <p className="text-[10px] font-bold uppercase">Check-in</p>
              <p className="text-sm">{checkIn ? formatShort(checkIn) : "Add date"}</p>
            </button>
            <button
              onClick={() => setOpenPopover(openPopover === "dates" ? null : "dates")}
              className="text-left px-3 py-2.5 border-b border-gray-300 hover:bg-gray-50"
            >
              <p className="text-[10px] font-bold uppercase">Checkout</p>
              <p className="text-sm">{checkOut ? formatShort(checkOut) : "Add date"}</p>
            </button>
          </div>
          <button
            onClick={() => setOpenPopover(openPopover === "guests" ? null : "guests")}
            className="w-full text-left px-3 py-2.5 hover:bg-gray-50"
            aria-label="Edit guests"
          >
            <p className="text-[10px] font-bold uppercase">Guests</p>
            <p className="text-sm">
              {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
            </p>
          </button>
        </div>

        {openPopover === "dates" && (
          <div className="absolute z-30 top-full left-1/2 -translate-x-1/2 mt-2">
            <DatePicker onClose={() => setOpenPopover(null)} />
          </div>
        )}
        {openPopover === "guests" && (
          <div className="absolute z-30 top-full right-0 mt-2">
            <GuestSelector onClose={() => setOpenPopover(null)} />
          </div>
        )}
      </div>

      {errors.dates && <p className="text-red-600 text-xs mt-2">{errors.dates}</p>}
      {errors.guests && <p className="text-red-600 text-xs mt-2">{errors.guests}</p>}

      <button
        onClick={handleReserve}
        disabled={reserving}
        className="brand-btn w-full rounded-xl py-3.5 font-semibold mt-4 disabled:opacity-70"
      >
        {reserving ? "Reserving..." : "Reserve"}
      </button>
      <p className="text-center text-xs text-gray-500 mt-3">You won't be charged yet</p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="underline">
            {formatCurrency(property.pricePerNight)} x {previewNights} nights
          </span>
          <span>{formatCurrency(pricing.nightsSubtotal || property.pricePerNight * previewNights)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Cleaning fee</span>
          <span>{formatCurrency(property.cleaningFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Service fee</span>
          <span>{formatCurrency(property.serviceFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Taxes</span>
          <span>{formatCurrency(property.taxes)}</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>
          {formatCurrency(
            pricing.total ||
              property.pricePerNight * previewNights + property.cleaningFee + property.serviceFee + property.taxes
          )}
        </span>
      </div>
    </div>
  );
}

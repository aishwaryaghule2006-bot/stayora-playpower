import { CheckCircle2, X } from "lucide-react";
import { useBooking } from "../../BookingContext";
import { formatCurrency } from "../../utils/pricing";
import { formatDate } from "../../utils/dateUtils";
import { property } from "../../data/properties";

export default function BookingConfirmation() {
  const { showConfirmation, setShowConfirmation, confirmation } = useBooking();
  if (!showConfirmation || !confirmation) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center px-4"
      onClick={() => setShowConfirmation(false)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowConfirmation(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={18} />
        </button>
        <div className="flex flex-col items-center text-center pt-4">
          <CheckCircle2 size={56} className="text-green-500 mb-3" />
          <h3 className="text-xl font-semibold">Your reservation is confirmed</h3>
          <p className="text-gray-500 text-sm mt-1">A confirmation email has been sent (demo mode).</p>
        </div>

        <div className="mt-6 border border-gray-200 rounded-xl divide-y divide-gray-200 text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Property</span>
            <span className="font-medium text-right max-w-[60%]">{property.title}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Dates</span>
            <span className="font-medium">
              {formatDate(confirmation.checkIn)} – {formatDate(confirmation.checkOut)}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Nights</span>
            <span className="font-medium">{confirmation.nights}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Guests</span>
            <span className="font-medium">
              {confirmation.guests.adults + confirmation.guests.children} guests
              {confirmation.guests.infants ? `, ${confirmation.guests.infants} infants` : ""}
              {confirmation.guests.pets ? `, ${confirmation.guests.pets} pets` : ""}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Total paid</span>
            <span className="font-semibold">{formatCurrency(confirmation.total)}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Confirmation #</span>
            <span className="font-mono font-semibold">{confirmation.bookingId}</span>
          </div>
        </div>

        <button
          onClick={() => setShowConfirmation(false)}
          className="brand-btn w-full rounded-xl py-3 font-semibold mt-6"
        >
          Done
        </button>
      </div>
    </div>
  );
}

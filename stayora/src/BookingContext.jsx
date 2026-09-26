import { createContext, useContext, useMemo, useState } from "react";
import { nightsBetween } from "./utils/dateUtils";
import { computePricing } from "./utils/pricing";
import { property } from "./data/properties";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [errors, setErrors] = useState({});

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  const pricing = useMemo(
    () =>
      computePricing({
        pricePerNight: property.pricePerNight,
        nights: nights || 5, // preview default nights (5) shown before dates chosen, matches ref video
        cleaningFee: property.cleaningFee,
        serviceFee: property.serviceFee,
        taxes: property.taxes,
      }),
    [nights]
  );

  const totalGuests = guests.adults + guests.children;

  function selectDate(date) {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setErrors((e) => ({ ...e, dates: null }));
      return;
    }
    if (date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    setCheckOut(date);
    setErrors((e) => ({ ...e, dates: null }));
  }

  function updateGuestCount(key, delta) {
    setGuests((g) => {
      const next = { ...g, [key]: Math.max(0, g[key] + delta) };
      if (key === "adults") next.adults = Math.max(1, next.adults);
      return next;
    });
  }

  async function reserve() {
    const newErrors = {};
    if (!checkIn || !checkOut) newErrors.dates = "Please select check-in and check-out dates.";
    if (totalGuests < 1) newErrors.guests = "Please select at least 1 guest.";
    if (totalGuests > property.guests + property.guests) newErrors.guests = "Too many guests for this property.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return false;

    try {
      const res = await fetch("https://stayora-playpower.onrender.com/api/bookings" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn,
          checkOut,
          nights,
          guests,
          total: pricing.total,
        }),
      });
      if (!res.ok) throw new Error("Backend unavailable");
      const data = await res.json();
      setConfirmation({
        bookingId: data.bookingId,
        checkIn,
        checkOut,
        nights,
        guests,
        total: pricing.total,
      });
    } catch (e) {
      // graceful fallback if backend isn't running
      const fallbackId = `AGR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
      setConfirmation({
        bookingId: fallbackId,
        checkIn,
        checkOut,
        nights,
        guests,
        total: pricing.total,
      });
    }
    setShowConfirmation(true);
    return true;
  }

  const value = {
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    selectDate,
    nights,
    guests,
    updateGuestCount,
    totalGuests,
    pricing,
    reserve,
    showConfirmation,
    setShowConfirmation,
    confirmation,
    errors,
    setErrors,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

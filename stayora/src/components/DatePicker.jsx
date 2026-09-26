import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMonthMatrix, isBefore, isSameDay, isWithin, startOfDay } from "../utils/dateUtils";
import { useBooking } from "../BookingContext";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MonthGrid({ year, month, checkIn, checkOut, hoverDate, setHoverDate, onSelect }) {
  const weeks = getMonthMatrix(year, month);
  const today = startOfDay(new Date());
  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="w-full">
      <p className="text-center font-semibold mb-3">{monthName}</p>
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {weeks.flat().map((date, i) => {
          if (!date) return <div key={i} />;
          const past = isBefore(date, today) && !isSameDay(date, today);
          const selectedStart = checkIn && isSameDay(date, checkIn);
          const selectedEnd = checkOut && isSameDay(date, checkOut);
          const inRange =
            checkIn && checkOut
              ? isWithin(date, checkIn, checkOut)
              : checkIn && hoverDate
              ? isWithin(date, checkIn, hoverDate) || isWithin(date, hoverDate, checkIn)
              : false;

          return (
            <button
              key={i}
              disabled={past}
              onMouseEnter={() => setHoverDate(date)}
              onClick={() => onSelect(date)}
              className={`relative h-10 text-sm rounded-full transition-colors
                ${past ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                ${selectedStart || selectedEnd ? "bg-black text-white hover:bg-black" : ""}
                ${inRange && !selectedStart && !selectedEnd ? "bg-gray-100 rounded-none" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DatePicker({ onClose }) {
  const { checkIn, checkOut, selectDate } = useBooking();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hoverDate, setHoverDate] = useState(null);

  function nextMonth() {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }
  function prevMonth() {
    const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return;
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  let secondMonth = viewMonth + 1;
  let secondYear = viewYear;
  if (secondMonth > 11) {
    secondMonth = 0;
    secondYear += 1;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-full sm:w-[640px] max-w-full">
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 ml-auto">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MonthGrid
          year={viewYear}
          month={viewMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          onSelect={selectDate}
        />
        <div className="hidden sm:block">
          <MonthGrid
            year={secondYear}
            month={secondMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            onSelect={selectDate}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="text-sm font-semibold underline">
          Close
        </button>
      </div>
    </div>
  );
}

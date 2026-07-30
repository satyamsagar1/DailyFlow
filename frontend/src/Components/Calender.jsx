import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

function TodoCalendar({
  selectedDate,
  setSelectedDate,
  disable,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
            <CalendarDays
              size={20}
              className="text-indigo-600"
            />
          </div>

          <div className="text-left">
            <h2 className="font-semibold text-slate-900">
              {expanded ? "Calendar" : "Selected Date"}
            </h2>

            <p className="text-sm text-slate-500">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {expanded ? (
          <ChevronUp className="text-slate-500" />
        ) : (
          <ChevronDown className="text-slate-500" />
        )}
      </button>

      {/* Expandable Calendar */}
      {expanded && (
        <div
          className={`border-t border-slate-100 p-5 transition-all ${
            disable ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      )}
    </div>
  );
}

export default TodoCalendar;
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

type HeroProps = {
  name: string;
  tagline: string;
  isOpen: boolean;
  message: string;
  specialItem?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    tags: string[];
  };
};

// ---- Reservation modal types & mock "busy" data -----------------------

type DayStatus = "available" | "limited" | "booked" | "closed" | "past";

const TIME_SLOTS = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "13:00 PM",
  "13:30 PM",
  "14:00 PM",
  "14:30 PM",
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Deterministic pseudo-randomness so the "busy" pattern is stable per day,
// without needing a backend — gives the calendar a lived-in, premium feel.
function statusForDate(d: Date, today: Date): DayStatus {
  if (d < today) return "past";
  const day = d.getDay(); // 0 Sun .. 6 Sat
  if (day === 1) return "closed"; // closed Mondays
  const seed =
    d.getFullYear() * 372 +
    d.getMonth() * 31 +
    d.getDate() +
    (day === 6 ? 7 : 0);
  const r = seed % 5;
  if (day === 5 || day === 6) {
    // Fri/Sat trend busier
    if (r === 0) return "booked";
    return "limited";
  }
  if (r === 0) return "booked";
  if (r === 1 || r === 2) return "limited";
  return "available";
}

const STATUS_STYLES: Record<
  DayStatus,
  { dot: string; label: string; selectable: boolean }
> = {
  available: { dot: "bg-emerald-500", label: "Open", selectable: true },
  limited: { dot: "bg-[#B45309]", label: "Filling up", selectable: true },
  booked: { dot: "bg-red-400", label: "Fully booked", selectable: false },
  closed: { dot: "bg-stone-300", label: "Closed", selectable: false },
  past: { dot: "bg-transparent", label: "", selectable: false },
};

// ---- Calendar -----------------------------------------------------------

function ReservationCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const monthLabel = viewMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weeks = useMemo(() => {
    const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const startOffset = firstDay.getDay(); // 0 = Sun
    const daysInMonth = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    ).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [viewMonth]);

  const isPastMonth =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between px-1 pb-3">
        <button
          type="button"
          aria-label="Previous month"
          disabled={isPastMonth}
          onClick={() =>
            setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
          }
          className="rounded-full p-1.5 text-stone-500 transition hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-sm font-semibold tracking-wide text-stone-900">
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() =>
            setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
          }
          className="rounded-full p-1.5 text-stone-500 transition hover:bg-stone-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 px-1 pb-1 text-center text-[11px] font-medium uppercase tracking-wide text-stone-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="flex flex-col gap-1 px-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((date, di) => {
              if (!date) return <div key={di} className="aspect-square" />;
              const status = statusForDate(date, today);
              const style = STATUS_STYLES[status];
              const selected =
                selectedDate && toKey(selectedDate) === toKey(date);
              const disabled = !style.selectable;

              return (
                <button
                  key={di}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelect(date)}
                  title={style.label}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition
                    ${
                      selected
                        ? "bg-[#B45309] text-white font-semibold shadow-sm"
                        : disabled
                          ? "text-stone-300 line-through"
                          : "text-stone-700 hover:bg-[#B45309]/10"
                    }`}
                >
                  {date.getDate()}
                  {status !== "past" && !selected && (
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${style.dot}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B45309]" /> Filling up
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" /> Closed
        </span>
      </div>
    </div>
  );
}

// ---- Reservation modal --------------------------------------------------

function ReservationModal({
  open,
  onClose,
  restaurantName,
}: {
  open: boolean;
  onClose: () => void;
  restaurantName: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);

  const [email, setEmail] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [sending, setSending] = useState(false);

  const [reservationId, setReservationId] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit = selectedDate && selectedTime && isValidEmail;

  if (!open) return null;

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  function handleClose() {
    setConfirmed(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setGuests(2);
    setEmail("");
    setReservationId("");
    setSending(false);

    onClose();
  }

  const confirmReservation = async () => {
    if (!canSubmit) return;

    try {
      setSending(true);

      const id = `CH-${Math.floor(10000 + Math.random() * 90000)}`;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          restaurant_name: restaurantName,
          reservation_id: id,
          guests,
          date: dateLabel,
          time: selectedTime,
          email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setReservationId(id);
      setConfirmed(true);
    } catch (error) {
      console.error(error);

      alert("Failed to send confirmation email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-stone-200">
        <button
          type="button"
          aria-label="Close reservation dialog"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-stone-500 shadow-sm ring-1 ring-stone-200 transition hover:bg-stone-100 hover:text-stone-900"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {confirmed ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center sm:px-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B45309]/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#B45309"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              Reservation Confirmed
            </h2>

            <div className="rounded-2xl bg-amber-50 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Reservation ID
              </p>

              <p className="text-xl font-bold text-[#B45309]">
                {reservationId}
              </p>
            </div>
            <p className="max-w-sm text-stone-600">
              We&apos;ve held a table for {guests}{" "}
              {guests === 1 ? "guest" : "guests"} at {restaurantName} on{" "}
              {dateLabel} at {selectedTime}. A confirmation will be sent
              shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-full bg-[#B45309] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#923f07]"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
            {/* Calendar side */}
            <div className="border-b border-stone-100 p-6 sm:p-8 md:border-b-0 md:border-r">
              <p
                id="reservation-title"
                className="text-xs font-semibold uppercase tracking-wider text-[#B45309]"
              >
                Reserve a Table
              </p>
              <h2 className="mt-1 text-2xl font-bold text-stone-900">
                {restaurantName}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Pick a date — availability updates in real time.
              </p>

              <div className="mt-5">
                <ReservationCalendar
                  selectedDate={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setSelectedTime(null);
                  }}
                />
              </div>
            </div>

            {/* Details side */}
            <div className="flex flex-col p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Party size
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {GUEST_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGuests(g)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                        guests === g
                          ? "bg-[#B45309] text-white shadow-sm"
                          : "bg-stone-100 text-stone-700 hover:bg-[#B45309]/10"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-stone-900">
                  {selectedDate
                    ? `Available times — ${dateLabel}`
                    : "Available times"}
                </p>
                {!selectedDate && (
                  <p className="mt-2 text-sm text-stone-400">
                    Choose a date to see open times.
                  </p>
                )}
                {selectedDate && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-lg px-2 py-2 text-xs font-medium transition sm:text-sm ${
                          selectedTime === t
                            ? "bg-[#B45309] text-white shadow-sm"
                            : "bg-stone-100 text-stone-700 hover:bg-[#B45309]/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`
    w-full
    rounded-xl
    border
    px-4
    py-3
    outline-none
    transition

    ${
      email.length > 0
        ? isValidEmail
          ? "border-green-500"
          : "border-red-500"
        : "border-stone-200"
    }
  `}
                />
              </div>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  disabled={!canSubmit || sending}
                  onClick={confirmReservation}
                  className="
    w-full
    rounded-full
    bg-[#B45309]
    px-6
    py-3
    text-sm
    font-medium
    text-white
    shadow-sm
    transition
    hover:bg-[#923f07]
    disabled:cursor-not-allowed
    disabled:bg-stone-200
    disabled:text-stone-400
  "
                >
                  {sending
                    ? "Sending Confirmation..."
                    : canSubmit
                      ? `Confirm for ${guests} · ${dateLabel} · ${selectedTime}`
                      : "Select date, time & email"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Hero ---------------------------------------------------------------

export default function Hero({
  name,
  tagline,
  isOpen,
  message,
  specialItem,
}: HeroProps) {
  const [reservationOpen, setReservationOpen] = useState(false);

  if (!specialItem) return null;
  return (
    <header className="relative overflow-hidden ">
      {/* Decorative background glow — brand-toned, not generic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full  opacity-[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full   "
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-12 lg:py-20">
        {/* Text column */}
        <div className="flex flex-col gap-4 sm:gap-5 order-2 md:order-1">
          {/* Accent line — small brand signature above the status badge */}

          <span
            role="status"
            aria-live="polite"
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-sm ring-1 transition-colors ${
              isOpen
                ? "bg-[#B45309]/10 text-[#B45309] ring-[#B45309]/30"
                : "bg-red-50 text-red-700 ring-red-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`relative flex h-2 w-2 rounded-full ${
                isOpen ? "bg-[#B45309]" : "bg-red-500"
              }`}
            >
              {isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B45309] opacity-60" />
              )}
            </span>
            <span className="sr-only">
              {isOpen ? "Status: Open. " : "Status: Closed. "}
            </span>
            {message}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-stone-900">
            {name}
          </h1>

          <p className="max-w-xl text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed">
            {tagline}
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#B45309] px-6 py-3 text-sm sm:text-base font-medium text-white shadow-sm transition hover:bg-[#923f07] focus:outline-none focus:ring-2 focus:ring-[#B45309]/40 focus:ring-offset-2">
              View Menu
            </button>
            <button
              onClick={() => setReservationOpen(true)}
              className="rounded-full bg-white px-6 py-3 text-sm sm:text-base font-medium text-stone-900 ring-1 ring-stone-200 transition hover:bg-[#B45309]/5 hover:ring-[#B45309]/40"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Image column */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-4/3 w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#B45309]/15 md:max-w-none">
            <Image
              src="/hero.png"
              alt={`${name} — signature dish preview`}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
            {/* Today's special badge floating on the image, brand-colored */}
            <div
              className="
  absolute
  left-3
  top-3

  sm:left-4
  sm:top-4

  rounded-xl
  bg-white/90
  backdrop-blur-sm

  px-3
  py-2

  sm:px-4
  sm:py-3

  shadow-lg
  border
  border-white/50

  max-w-45
  sm:max-w-55
  md:max-w-none
  "
            >
              <p
                className="
    text-[9px]
    sm:text-[10px]
    font-semibold
    uppercase
    tracking-wider
    text-[#B45309]
    "
              >
                Today&apos;s Special
              </p>

              <p
                className="
    mt-1
    text-[11px]
    sm:text-sm
    md:text-base
    font-semibold
    leading-tight
    text-stone-900
    "
              >
                {specialItem.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal
        open={reservationOpen}
        onClose={() => setReservationOpen(false)}
        restaurantName={name}
      />
    </header>
  );
}

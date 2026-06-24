type Props = {
  hours: Record<string, string>;
  currentDay?: string;
};

export default function HoursBlock({ hours, currentDay = "Tuesday" }: Props) {
  return (
    <section
      id="hours"
      aria-labelledby="hours-heading"
      className="scroll-mt-28 py-12"
    >
      <h2 id="hours-heading" className="mb-3 text-3xl font-bold text-stone-900">
        Opening Hours
      </h2>

      <p className="mb-6 text-stone-600">
        Visit us during our operating hours. Today&#39;s hours are highlighted
        below.
      </p>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <dl>
          {Object.entries(hours).map(([day, time]) => {
            const isToday = day.toLowerCase() === currentDay.toLowerCase();

            const isClosed = time.toLowerCase() === "closed";

            return (
              <div
                key={day}
                className={`flex items-center justify-between border-b border-stone-100 p-4 last:border-b-0 ${
                  isToday ? "bg-amber-50" : ""
                }`}
              >
                <dt
                  className={`font-medium capitalize ${
                    isToday ? "text-[#B45309]" : "text-stone-900"
                  }`}
                >
                  {day}

                  {isToday && <span className="sr-only"> (Today)</span>}
                </dt>

                <dd
                  className={
                    isClosed ? "font-medium text-red-600" : "text-stone-700"
                  }
                  aria-label={
                    isToday ? `Today's hours: ${time}` : `${day}: ${time}`
                  }
                >
                  {time}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

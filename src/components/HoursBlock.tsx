type Props = {
  hours: Record<string, string>;
  currentDay?: string;
};

export default function HoursBlock({ hours, currentDay = "Tuesday" }: Props) {
  return (
    <section id="hours" className="py-12 scroll-mt-28">
      <h2 className="mb-6 text-3xl font-bold">Opening Hours</h2>

      <div className="overflow-hidden rounded-2xl border bg-white">
        {Object.entries(hours).map(([day, time]) => {
          const isToday = day.toLowerCase() === currentDay.toLowerCase();

          const isClosed = time.toLowerCase() === "closed";

          return (
            <div
              key={day}
              className={`flex items-center justify-between border-b p-4 last:border-b-0 ${
                isToday ? "bg-amber-50" : ""
              }`}
            >
              <span
                className={`font-medium capitalize ${
                  isToday ? "text-[#B45309]" : ""
                }`}
              >
                {day}
              </span>

              <span
                className={`${
                  isClosed ? "font-medium text-red-600" : "text-gray-700"
                }`}
              >
                {time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useState } from "react";

interface DateBoxProps {
  day: Date;
  date: Date;
}

interface Appointment {
  date: Date;
  name: string;
}

function padNumberToString(n: number): string {
  return n.toString().padStart(2, "0");
}

export function DateBox({ day, date }: DateBoxProps) {
  const [appointment, addAppointment] = useState<Appointment[]>([
    {
      date: new Date("2025-08-11 12:00:00"),
      name: "Test-Vorlesung",
    },
    { date: new Date("2025-08-11 13:00:00"), name: "V2" },
    { date: new Date("2025-08-13 13:00:00"), name: "Valskdf" },
  ]);

  const dayOfMonth = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();
  const now = new Date();

  const dateIsToday: boolean =
    dayOfMonth == now.getDate() &&
    month == now.getMonth() &&
    year == now.getFullYear();

  const isSameMonth: boolean = month == date.getMonth();
  return (
    <div
      key={day.getTime()}
      className={`
          relative
          rounded-2xl 
              text-gray-800
              ${
                dateIsToday
                  ? "bg-amber-300"
                  : isSameMonth
                  ? "bg-emerald-100"
                  : "bg-emerald-50"
              }
              align-text-top
              w-23  md:w-28 xl:w-40 h-fit min-h-40 m-2 p-2`}
    >
      <p className="mb-4 border-1 rounded w-fit px-0.5 text-center">{`${dayOfMonth}`}</p>

      <div className="mb-6">
        {appointment
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((da) => {
            const isSameDate =
              dayOfMonth == da.date.getDate() &&
              month == da.date.getMonth() &&
              year == da.date.getFullYear();

            return (
              isSameDate && (
                <p className="m-1">{`${padNumberToString(
                  da.date.getHours()
                )}:${padNumberToString(da.date.getMinutes())}\t${da.name}`}</p>
              )
            );
          })}
      </div>

      <p
        className="cursor-default select-none absolute bottom-2 right-2 flex items-center justify-center border border-black rounded-full w-5 h-5 leading-none"
        onClick={() => {
          const dateString = `${year}-${month + 1}-${dayOfMonth} ${prompt(
            "hour"
          )}:${prompt("minute")}`;
          addAppointment((cur) => [
            ...cur,
            {
              date: new Date(dateString),
              name: "lsakdfj",
            },
          ]);
        }}
      >
        +
      </p>
    </div>
  );
}

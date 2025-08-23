import { useState } from "react";
import type { CalenderPresentationFunction } from "./CalenderPresentation";

interface Appointment {
  date: Date;
  name: string;
}

interface CalenderProps {
  date: Date;
  presentationFunction: CalenderPresentationFunction;
}

export function Calender({ date, presentationFunction }: CalenderProps) {
  const [dates, addDate] = useState<Appointment[]>([
    {
      date: new Date("2025-08-11 12:00:00"),
      name: "Test-Vorlesung",
    },
    { date: new Date("2025-08-11 13:00:00"), name: "V2" },
    { date: new Date("2025-08-13 13:00:00"), name: "Valskdf" },
  ]);

  const calenderDates = presentationFunction(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );

  return calenderDates.map((el) => (
    <div
      key={el.getTime()}
      className={`
          relative
          rounded-2xl 
              text-gray-800
              ${
                el.getDate() == new Date(Date.now()).getDate() &&
                el.getMonth() == new Date(Date.now()).getMonth() &&
                el.getFullYear() == new Date(Date.now()).getFullYear()
                  ? "bg-amber-300"
                  : el.getMonth() == date.getMonth()
                  ? "bg-emerald-100"
                  : "bg-emerald-50"
              }
              align-text-top
              w-23  md:w-28 xl:w-40 h-fit min-h-40 m-2 p-2`}
    >
      <p className="mb-4 border-1 rounded w-fit px-0.5 text-center">{`${el.getDate()}`}</p>

      <div className="mb-6">
        {dates
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map(
            (da) =>
              el.getDate() == da.date.getDate() &&
              el.getMonth() == da.date.getMonth() &&
              el.getFullYear() == da.date.getFullYear() && (
                <p className="m-1">{`${da.date
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${da.date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}\t${da.name}`}</p>
              )
          )}
      </div>

      <p
        className="cursor-default select-none absolute bottom-2 right-2 flex items-center justify-center border border-black rounded-full w-5 h-5 leading-none"
        onClick={() => {
          const dateString = `${el.getFullYear()}-${
            el.getMonth() + 1
          }-${el.getDate()} ${prompt("hour")}:${prompt("minute")}`;
          addDate((cur) => [
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
  ));
}

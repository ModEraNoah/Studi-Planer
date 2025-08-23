import { useState } from "react";
import { Appointment } from "./Appointment";

interface DateBoxProps {
  day: Date;
  date: Date;
}

export interface Appointment {
  date: Date;
  name: string;
}

export function DateBox({ day, date }: DateBoxProps) {
  const [appointments, addAppointment] = useState<Appointment[]>([]);

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

      <Appointment appointments={appointments} />

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

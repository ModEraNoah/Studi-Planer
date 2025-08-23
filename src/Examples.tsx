import { useState } from "react";
import { DateSelector } from "./DateSelector";
import { getAllDaysOfMonth, getAllDaysOfWeek } from "./CalenderPresentation";

interface Appointment {
  date: Date;
  name: string;
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Weekdays = () => {
  return weekday.map((el, index, arr) => (
    <div className="text-center w-full " key={arr[(index + 1) % 7]}>
      {arr[(index + 1) % 7]}
    </div>
  ));
};

function Examples() {
  const [showMonth, changeShowingDays] = useState(false);
  const presentationFunction = showMonth ? getAllDaysOfMonth : getAllDaysOfWeek;

  const [date, changeDate] = useState(new Date(Date.now()));

  const today = new Date(Date.now());

  const [dates, addDate] = useState<Appointment[]>([
    {
      date: new Date("2025-08-11 12:00:00"),
      name: "Test-Vorlesung",
    },
    { date: new Date("2025-08-11 13:00:00"), name: "V2" },
    { date: new Date("2025-08-13 13:00:00"), name: "Valskdf" },
  ]);

  const Calender = () => {
    return presentationFunction(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    ).map((el) => (
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
  };

  return (
    <div className="grid row justify-center">
      <div className="grid grid-cols-3 text-xl font-bold border-b pb-2 mx-7 mt-5">
        <DateSelector
          date={date}
          showMonth={showMonth}
          changeDate={changeDate}
        />
        <span
          className="text-center text-white bg-blue-300 hover:bg-blue-500 border-2 active:border-2 active:border-blue-700 rounded-4xl w-fit select-none cursor-pointer justify-self-center py-1 px-4"
          onClick={() => changeDate(today)}
        >
          {today.toDateString()}
        </span>
        <button
          className="text-right justify-self-end w-fit text-gray-100 bg-emerald-400 border-2 hover:bg-emerald-600 active:border-emerald-800 rounded-4xl py-1 px-4 cursor-pointer"
          onClick={() => changeShowingDays(!showMonth)}
        >
          {presentationFunction.name === "getAllDaysOfMonth" ? "Month" : "Week"}
        </button>
      </div>

      <div className="grid grid-cols-7 w-fit mt-2">
        <Weekdays />
        <Calender />
      </div>
    </div>
  );
}

export default Examples;

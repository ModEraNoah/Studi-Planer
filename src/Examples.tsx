import { useState } from "react";

const dayInMillisec = 3600 * 24 * 1000;

function getAllDaysOfMonth(day: number, month: number, year: number) {
  const days = [];
  // month + 1 as the months array is 0 based
  const baseDateString: string = `${month + 1}-${1}-${year}`;

  let firstOfMonth: number =
    (new Date(Date.parse(baseDateString)).getDay() + 6) % 7;

  while (firstOfMonth > 0) {
    const date = new Date(
      Date.parse(baseDateString) - firstOfMonth * dayInMillisec
    );
    if (date) days.push(date);
    firstOfMonth--;
  }

  for (let i = 1; i <= 31; i++) {
    const date = new Date(Date.parse(`${month + 1}-${i}-${year}`));
    if (date.getMonth() === month) {
      days.push(date);
    }
  }

  const endDate = days[days.length - 1];
  for (let i = 1; days.length % 7 != 0; i++) {
    const date = new Date(endDate.getTime() + i * dayInMillisec);
    days.push(date);
  }

  return days;
}

function getAllDaysOfWeek(day: number, month: number, year: number) {
  const days = [];

  const baseDateString: string = `${month + 1}-${day}-${year}`;
  const baseDate = (new Date(Date.parse(baseDateString)).getDay() + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      Date.parse(baseDateString) + (i - baseDate) * dayInMillisec
    );

    days.push(date);
  }

  return days;
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Examples() {
  const [showMonth, changeShowingDays] = useState(false);
  const presentationFunction = showMonth ? getAllDaysOfMonth : getAllDaysOfWeek;

  const [date, changeDate] = useState(new Date(Date.now()));

  const DateSelector = () => {
    return (
      <div className="text-left select-none">
        <span
          className="cursor-pointer"
          onClick={() =>
            changeDate(
              showMonth
                ? new Date(date.getTime() - 31 * dayInMillisec)
                : new Date(date.getTime() - 7 * dayInMillisec)
            )
          }
        >
          {"< "}
        </span>
        <span className="">
          {`${months[date.getMonth()]}
            ${date.getFullYear()}`}
        </span>
        <span
          className="cursor-pointer"
          onClick={() =>
            changeDate(
              showMonth
                ? new Date(date.getTime() + 31 * dayInMillisec)
                : new Date(date.getTime() + 7 * dayInMillisec)
            )
          }
        >
          {" >"}
        </span>
      </div>
    );
  };

  const Weekdays = () => {
    return weekday.map((el, index, arr) => (
      <div className="text-center w-full " key={arr[(index + 1) % 7]}>
        {arr[(index + 1) % 7]}
      </div>
    ));
  };

  const Calender = () => {
    return presentationFunction(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    ).map((el) => (
      <div
        key={el.getTime()}
        className={`rounded-2xl 
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
              w-23  md:w-28 xl:w-40 h-40 m-2 p-2`}
      >
        {`${el.getDate()}`}
      </div>
    ));
  };

  return (
    <div className="grid row justify-center">
      <div className="grid grid-cols-2 text-xl font-bold border-b pb-2 mx-7 mt-5">
        <DateSelector />
        <button
          className="text-right justify-self-end w-fit text-gray-100 bg-emerald-400 rounded-4xl py-1 px-4 cursor-pointer"
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

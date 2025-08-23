import { useState } from "react";

interface DateSelectorProps {
  showMonth: boolean;
  date: Date;
  changeDate: (b: Date) => unknown;
}

const dayInMillisec = 3600 * 24 * 1000;
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

export function DateSelector({
  showMonth,
  date,
  changeDate,
}: DateSelectorProps) {
  //   const [date, changeDate] = useState(new Date());
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
}

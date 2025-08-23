import type { CalenderPresentationFunction } from "./CalenderPresentation";
import { DateBox } from "./DateBox";

interface CalenderProps {
  date: Date;
  presentationFunction: CalenderPresentationFunction;
}

export function Calender({ date, presentationFunction }: CalenderProps) {
  const calenderDates = presentationFunction(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );

  return calenderDates.map((el) => {
    return <DateBox day={el} date={date} />;
  });
}

export type CalenderPresentationFunction = (
  day: number,
  month: number,
  year: number
) => Date[];

const dayInMillisec = 3600 * 24 * 1000;

export const getAllDaysOfMonth: CalenderPresentationFunction = (
  _day: number,
  month: number,
  year: number
) => {
  const days: Date[] = [];
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
};

export const getAllDaysOfWeek: CalenderPresentationFunction = (
  day: number,
  month: number,
  year: number
) => {
  const days: Date[] = [];

  const baseDateString: string = `${month + 1}-${day}-${year}`;
  const baseDate = (new Date(Date.parse(baseDateString)).getDay() + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      Date.parse(baseDateString) + (i - baseDate) * dayInMillisec
    );

    days.push(date);
  }

  return days;
};

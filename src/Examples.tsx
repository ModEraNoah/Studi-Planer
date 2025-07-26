function getAllDaysOfMonth(month: number, year: number) {
  const days = [];
  // month + 1 as the months array is 0 based
  const baseDateString: string = `${month + 1}-${1}-${year}`;

  let firstOfMonth: number = new Date(Date.parse(baseDateString)).getDay() - 1;

  const dayInMillisec = 3600 * 24 * 1000;
  while (firstOfMonth > 0) {
    const date = new Date(
      Date.parse(baseDateString) - firstOfMonth * dayInMillisec
    );
    days.push(date);
    firstOfMonth--;
  }

  for (let i = 1; i <= 31; i++) {
    const date = new Date(Date.parse(`${month + 1}-${i}-${year}`));
    if (date.getMonth() === month) {
      days.push(date);
    }
  }

  for (let i = 1; days.length % 7 != 0; i++) {
    const date = new Date(Date.parse(`${month + 1 + 1}-${i}-${year}`));
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
  const month = 6;
  const year = 2025;
  return (
    <>
      <div className="text-xl font-bold border-b pb-2 mx-7 mt-5">
        {months[month]}
      </div>
      <div className="grid grid-cols-7 place-items-center mt-2">
        {weekday.map((el, index, arr) => (
          <div>{arr[(index + 1) % 7]}</div>
        ))}

        {getAllDaysOfMonth(month, year).map((el) => (
          <div
            className={`rounded-2xl ${
              el.getMonth() == month ? "bg-amber-100" : "bg-amber-50"
            } 
              align-text-top
              w-9/12 h-40 m-2 p-2`}
          >
            {`${el.getDate()}`}
          </div>
        ))}
      </div>
    </>
  );
}

export default Examples;

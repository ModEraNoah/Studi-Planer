import { useState } from "react";
import { DateSelector } from "./DateSelector";
import { getAllDaysOfMonth, getAllDaysOfWeek } from "./CalenderPresentation";
import { Calender } from "./Calender";
import { spreadSeriesIntoAppointments } from "./Appointment";

const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Weekdays = () => {
  return weekday.map((el) => (
    <div className="text-center w-full " key={el}>
      {el}
    </div>
  ));
};

function CalenderMain() {
  const [appointments, addAppointment] = useState([
    {
      startDate: new Date("2025-10-18 12:09:00"),
      name: "some Test appointment",
      durationInMin: 60,
      appointmentId: (Math.floor(Math.random() * 1_000_000_000)).toString()
    },
    ...spreadSeriesIntoAppointments({
      startDate: new Date("2025-10-18 14:12:00"),
      endDate: new Date("2026-10-25 14:25:00"),
      name: "some test interval",
      durationInMin: 60,
      seriesId: 1,
      interval: "monthly",
    }),
  ]);
  const [showMonth, changeShowingDays] = useState(false);
  const presentationFunction = showMonth ? getAllDaysOfMonth : getAllDaysOfWeek;

  const [date, changeDate] = useState(new Date(Date.now()));

  const today = new Date(Date.now());

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
        <Calender
          date={date}
          presentationFunction={presentationFunction}
          appointments={appointments}
          addAppointment={addAppointment}
        />
      </div>
    </div>
  );
}

export default CalenderMain;

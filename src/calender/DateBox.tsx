import { useEffect, useRef, useState } from "react";
import { IAppointment } from "./Appointment";

interface DateBoxProps {
  day: Date;
  date: Date;
}

export function DateBox({ day, date }: DateBoxProps) {
  const [appointments, addAppointment] = useState<IAppointment[]>([]);
  const [popup, setPopup] = useState<boolean>(false);

  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopup(false); // Close popup if clicked outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <>
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

        <IAppointment appointments={appointments} />

        <p
          className="cursor-default select-none absolute bottom-2 right-2 flex items-center justify-center border border-black rounded-full w-5 h-5 leading-none"
          onClick={() => {
            setPopup(true);
          }}
        >
          +
        </p>
      </div>

      {popup && (
        <div
          ref={popupRef}
          className="absolute text-center right-0 left-0 m-auto z-100 top-1/7 bg-gray-400 w-120 h-80 px-10 rounded-xl"
        >
          <p>Creating new Appointment</p>
          <p className="relative text-left py-1">
            <span>Time of Appointment: </span>
            <input
              id="newAppointmentTime"
              type="time"
              className="bg-gray-50 rounded-md"
            />
          </p>
          <p className="relative text-left py-1">
            <span>Appointment Name: </span>
            <input
              id="newAppointmentName"
              type="text"
              className="bg-gray-50 rounded-md"
            />
          </p>
          <button
            onClick={() => {
              setPopup(false);
              const appTime =
                document.getElementById("newAppointmentTime").value;
              const appName =
                document.getElementById("newAppointmentName").value;
              console.log("appTime:", appTime);
              const dateString = `${year}-${
                month + 1
              }-${dayOfMonth} ${appTime}`;
              addAppointment((cur) => [
                ...cur,
                { date: new Date(dateString), name: appName },
              ]);
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

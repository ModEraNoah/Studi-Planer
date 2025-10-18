import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { IAppointment } from "./Appointment";
import { Appointment } from "./Appointment";
import { Popup } from "../Popup";

interface DateBoxProps {
  day: Date;
  date: Date;
  appointments: IAppointment[];
  addAppointment: any;
}

interface AddAppointmentProps {
  year: number;
  month: number;
  dayOfMonth: number;
  setPopup: Dispatch<SetStateAction<boolean>>;
  addAppointment: any;
}

function AddAppointment({
  year,
  month,
  dayOfMonth,
  setPopup,
  addAppointment,
}: AddAppointmentProps) {
  return (
    <div>
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
      <p className="relative text-left py-1">
        <span>Appointment Duration (in Minutes): </span>
        <input
          id="newAppointmentDuration"
          type="number"
          className="bg-gray-50 rounded-md"
        />
      </p>
      <button
        onClick={() => {
          setPopup(false);
          const timeInputElement: HTMLInputElement | null =
            document.getElementById(
              "newAppointmentTime"
            ) as HTMLInputElement | null;

          const nameInputElement: HTMLInputElement | null =
            document.getElementById(
              "newAppointmentName"
            ) as HTMLInputElement | null;

          const durationInputElement: HTMLInputElement | null =
            document.getElementById(
              "newAppointmentDuration"
            ) as HTMLInputElement | null;

          const appTime = timeInputElement?.value ?? "";
          const appName = nameInputElement?.value ?? "";
          const appDuration: string = durationInputElement?.value ?? "15";

          const dateString = `${year}-${month + 1}-${dayOfMonth} ${appTime}`;
          addAppointment((cur: IAppointment[]) => [
            ...cur,
            {
              startDate: new Date(dateString),
              name: appName,
              durationInMin: parseInt(appDuration),
            },
          ]);
        }}
      >
        Save
      </button>
    </div>
  );
}

export function DateBox({
  day,
  date,
  appointments,
  addAppointment,
}: DateBoxProps) {
  const [popup, setPopup] = useState<boolean>(false);

  const popupRef = useRef(null);

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

        <Appointment appointments={appointments} />

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
        <Popup
          ref={popupRef}
          setPopup={setPopup}
          element={
            <AddAppointment
              year={year}
              month={month}
              dayOfMonth={dayOfMonth}
              setPopup={setPopup}
              addAppointment={addAppointment}
            />
          }
        />
      )}
    </>
  );
}

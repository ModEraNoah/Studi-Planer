import { useState, type Dispatch, type SetStateAction } from "react";
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

export function LabelInputPair({
  inputLabel,
  inputType,
  inputId,
  inputText = "",
}: any) {
  return (
    <div className="relative text-left py-1">
      <span>{inputLabel}: </span>
      <input
        id={inputId}
        type={inputType}
        className="bg-gray-50 rounded-md"
        defaultValue={inputText}
      />
    </div>
  );
}

function AddAppointment({
  year,
  month,
  dayOfMonth,
  setPopup,
  addAppointment,
}: AddAppointmentProps) {
  function getInputValue(inputId: string, defaultVal: string): string {
    const element = document.getElementById(inputId) as HTMLInputElement | null;
    return element?.value ?? defaultVal;
  }

  const appTimeId = "newAppointmentTime";
  const appNameId = "newAppointmentName";
  const appDurationId = "newAppointmentDuration";

  function createAppointment() {
    const appTime = getInputValue(appTimeId, "");
    const appName = getInputValue(appNameId, "");
    const appDuration: string = getInputValue(appDurationId, "15");

    const dateString = `${year}-${month + 1}-${dayOfMonth} ${appTime}`;
    return {
      startDate: new Date(dateString),
      name: appName,
      durationInMin: parseInt(appDuration),
    };
  }

  const appointmentInputs = [
    {
      inputLabel: "Time of Appointment",
      inputType: "time",
      inputId: appTimeId,
      inputText: "",
    },
    {
      inputLabel: "Appointment Name",
      inputType: "text",
      inputId: appNameId,
      inputText: "",
    },
    {
      inputLabel: "Appointment Duration (in Minutes)",
      inputType: "number",
      inputId: appDurationId,
      inputText: 0,
    },
  ];

  return (
    <div>
      <p>Creating new Appointment</p>
      {appointmentInputs.map((el) => (
        <LabelInputPair {...el} />
      ))}

      <button
        onClick={() => {
          setPopup(false);
          const appointment = createAppointment();
          addAppointment((cur: IAppointment[]) => [...cur, appointment]);
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

        <Appointment
          appointments={appointments}
          addAppointment={addAppointment}
        />

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

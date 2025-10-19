import { useState } from "react";
import { Popup } from "../Popup";
import { getInputValue, LabelInputPair } from "./DateBox";

export type IAppointment = ISingelAppointment | IRecurringAppointment;

export interface ISingelAppointment {
  startDate: Date;
  name: string;
  durationInMin: number;
  appointmentId: string;
}

export interface IRecurringAppointment {
  startDate: Date;
  endDate: Date;
  curDate: Date;
  name: string;
  durationInMin: number;
  seriesId: number;
  appointmentId: string;
}

export function isSingleAppointment(obj: any): obj is ISingelAppointment {
  return (
    obj.startDate &&
    obj.name &&
    obj.durationInMin &&
    obj.seriesId === undefined &&
    obj.endDate === undefined &&
    obj.curDate === undefined
  );
}

export function isRecurringAppointment(obj: any): obj is IRecurringAppointment {
  return (
    obj.startDate &&
    obj.name &&
    obj.durationInMin &&
    obj.seriesId !== undefined &&
    obj.endDate !== undefined &&
    obj.curDate !== undefined
  );
}

interface AppointmentProps {
  appointments: IAppointment[];
  addAppointment: any;
}

export function spreadSeriesIntoAppointments(series: {
  startDate: Date;
  endDate: Date;
  name: string;
  durationInMin: number;
  seriesId: number;
  interval: "daily" | "weekly" | "monthly";
}): IRecurringAppointment[] {
  const res = [];
  let cur: Date = series.startDate;
  if (series.interval == "monthly") {
    for (let i = 0; cur < series.endDate; i++) {
      const date = new Date(cur);
      res.push({
        startDate: series.startDate,
        endDate: series.endDate,
        curDate: date,
        name: series.name,
        durationInMin: series.durationInMin,
        seriesId: series.seriesId,
        appointmentId: Math.floor(Math.random() * 1_000_000_000).toString(),
      });

      cur.setMonth(cur.getMonth() + 1);
    }
    return res;
  }

  let intervalFactor: number;
  switch (series.interval) {
    case "daily":
      intervalFactor = 24 * 3600 * 1000;
      break;
    case "weekly":
      intervalFactor = 7 * 24 * 3600 * 1000;
      break;
    default:
      intervalFactor = Infinity;
  }

  for (let i = 0; cur < series.endDate; i++) {
    cur = new Date(series.startDate.getTime() + i * intervalFactor);
    res.push({
      startDate: series.startDate,
      endDate: series.endDate,
      curDate: cur,
      name: series.name,
      durationInMin: series.durationInMin,
      seriesId: series.seriesId,
      appointmentId: Math.floor(Math.random() * 1_000_000_000).toString(),
    });
  }

  return res;
}

function padNumberToString(n: number): string {
  return n.toString().padStart(2, "0");
}

function toDatetimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function AppointmentItem({
  appointment,
  addAppointment,
}: {
  appointment: IAppointment;
  addAppointment: any;
}) {
  const [popup, setPopup] = useState(false);

  let startDate: Date;
  let isRecurring: boolean = false;

  if (isSingleAppointment(appointment)) {
    startDate = appointment.startDate;
  } else {
    const dat = appointment as IRecurringAppointment;
    startDate = dat.curDate;
    isRecurring = true;
  }

  const endDate = new Date(
    startDate.getTime() + appointment.durationInMin * 60 * 1000
  );

  const appTimeId = "newAppointmentTime";
  const appNameId = "newAppointmentName";
  const appDurationId = "newAppointmentDuration";

  const timeDefault = isRecurring
    ? (appointment as IRecurringAppointment).curDate
    : appointment.startDate;

  const appointmentInputs = [
    {
      inputLabel: "Time of Appointment",
      inputType: "datetime-local",
      inputId: appTimeId,
      inputText: toDatetimeLocal(timeDefault),
    },
    {
      inputLabel: "Appointment Name",
      inputType: "text",
      inputId: appNameId,
      inputText: appointment.name,
    },
    {
      inputLabel: "Appointment Duration (in Minutes)",
      inputType: "number",
      inputId: appDurationId,
      inputText: appointment.durationInMin,
    },
  ];

  return (
    <div
      className={`m-1 p-2 ${isRecurring ? "italic" : ""} border-1 rounded`}
      onClick={() => setPopup(true)}
    >
      {`${padNumberToString(startDate.getHours())}:${padNumberToString(
        startDate.getMinutes()
      )} - ${padNumberToString(endDate.getHours())}:${padNumberToString(
        endDate.getMinutes()
      )} \t${appointment.name}`}

      {popup && (
        <Popup
          setPopup={setPopup}
          element={
            <div className="grid">
              <h2 className="text-xl mb-2">Update Appointment</h2>

              {appointmentInputs.map((el) => (
                <LabelInputPair className="" {...el} />
              ))}

              <button
                className="bg-gray-100 rounded-xl"
                onClick={() => {
                  addAppointment((cur: IAppointment[]) =>
                    cur.filter((el) => el != appointment)
                  );
                  setPopup(false);
                }}
              >
                Delete Appointment
              </button>
              <button
                className="bg-gray-100 rounded-xl"
                onClick={() => {
                  addAppointment((cur: IAppointment[]) =>
                    cur.map((el) => {
                      if (el.appointmentId == appointment.appointmentId) {
                        el.name = getInputValue(appNameId, "");
                        el.durationInMin = parseInt(
                          getInputValue(appDurationId, "1")
                        );
                        el.startDate = new Date(
                          getInputValue(appTimeId, String(el.startDate))
                        );
                      }
                      return el;
                    })
                  );
                  setPopup(false);
                }}
              >
                Update Appointment
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}

export function Appointment({
  appointments,
  addAppointment,
}: AppointmentProps) {
  return (
    <div className="mb-6">
      {appointments
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .map((da) => (
          <AppointmentItem
            key={`${da.startDate.toISOString()}-${da.name}`}
            appointment={da}
            addAppointment={addAppointment}
          />
        ))}
    </div>
  );
}

import { useState } from "react";
import { Popup } from "../Popup";

export type IAppointment = ISingelAppointment | IRecurringAppointment;

export interface ISingelAppointment {
  startDate: Date;
  name: string;
  durationInMin: number;
}

export interface IRecurringAppointment {
  startDate: Date;
  endDate: Date;
  curDate: Date;
  name: string;
  durationInMin: number;
  seriesId: number;
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
    });
  }

  return res;
}

function padNumberToString(n: number): string {
  return n.toString().padStart(2, "0");
}

function AppointmentItem({ appointment, addAppointment }: any) {
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
            <div className="text">
              <p>Update Appointment</p>
              <button
                onClick={() => {
                  addAppointment((cur: IAppointment[]) =>
                    cur.filter((el) => el != appointment)
                  );
                  setPopup(false);
                }}
              >
                Delete Appointment
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

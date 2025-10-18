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

export function Appointment({ appointments }: AppointmentProps) {
  return (
    <div className="mb-6">
      {appointments
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .map((da) => {
          let startDate: Date;
          let isRecurring: boolean = false;
          if (isSingleAppointment(da)) {
            startDate = da.startDate;
          } else {
            const dat = da as IRecurringAppointment;
            startDate = dat.curDate;
            isRecurring = true;
          }

          const endDate = new Date(
            startDate.getTime() + da.durationInMin * 60 * 1000
          );
          return (
            <p
              className={`m-1 p-2 ${
                isRecurring ? "italic" : ""
              } border-1 rounded`}
            >{`${padNumberToString(startDate.getHours())}:${padNumberToString(
              startDate.getMinutes()
            )} - ${padNumberToString(endDate.getHours())}:${padNumberToString(
              endDate.getMinutes()
            )} \t${da.name}`}</p>
          );
        })}
    </div>
  );
}

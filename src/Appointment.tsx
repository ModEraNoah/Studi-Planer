import type { Appointment } from "./DateBox";

interface AppointmentProps {
  appointments: Appointment[];
  dayOfMonth: number;
  month: number;
  year: number;
}

function padNumberToString(n: number): string {
  return n.toString().padStart(2, "0");
}

export function Appointment({
  appointments,
  dayOfMonth,
  month,
  year,
}: AppointmentProps) {
  return (
    <div className="mb-6">
      {appointments
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((da) => {
          const isSameDate =
            dayOfMonth == da.date.getDate() &&
            month == da.date.getMonth() &&
            year == da.date.getFullYear();

          return (
            isSameDate && (
              <p className="m-1">{`${padNumberToString(
                da.date.getHours()
              )}:${padNumberToString(da.date.getMinutes())}\t${da.name}`}</p>
            )
          );
        })}
    </div>
  );
}

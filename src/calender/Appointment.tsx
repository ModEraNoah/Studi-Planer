export interface IAppointment {
  date: Date;
  name: string;
}

interface AppointmentProps {
  appointments: IAppointment[];
}

function padNumberToString(n: number): string {
  return n.toString().padStart(2, "0");
}

export function Appointment({ appointments }: AppointmentProps) {
  return (
    <div className="mb-6">
      {appointments
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((da) => {
          return (
            <p className="m-1">{`${padNumberToString(
              da.date.getHours()
            )}:${padNumberToString(da.date.getMinutes())}\t${da.name}`}</p>
          );
        })}
    </div>
  );
}

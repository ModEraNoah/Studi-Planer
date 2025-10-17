export interface ISingleAppointment {
  startDate: Date;
  name: string;
  durationInMin: number;
}

interface AppointmentProps {
  appointments: ISingleAppointment[];
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
          const startDate = da.startDate;
          const endDate = new Date(
            startDate.getTime() + da.durationInMin * 60 * 1000
          );
          return (
            <p className="m-1">{`${padNumberToString(
              startDate.getHours()
            )}:${padNumberToString(
              startDate.getMinutes()
            )} - ${padNumberToString(endDate.getHours())}:${padNumberToString(
              endDate.getMinutes()
            )} \t${da.name}`}</p>
          );
        })}
    </div>
  );
}

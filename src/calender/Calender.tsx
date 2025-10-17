import type { ISingleAppointment } from "./Appointment";
import type { CalenderPresentationFunction } from "./CalenderPresentation";
import { DateBox } from "./DateBox";

interface CalenderProps {
  date: Date;
  presentationFunction: CalenderPresentationFunction;
  appointments: ISingleAppointment[];
  addAppointment: any;
}

export function Calender({
  date,
  presentationFunction,
  appointments,
  addAppointment,
}: CalenderProps) {
  const calenderDates = presentationFunction(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );

  return calenderDates.map((el) => {
    return (
      <DateBox
        day={el}
        date={date}
        appointments={appointments.filter(
          (appointment) =>
            appointment.startDate.getDate() == el.getDate() &&
            appointment.startDate.getMonth() == el.getMonth() &&
            appointment.startDate.getFullYear() == el.getFullYear()
        )}
        addAppointment={addAppointment}
      />
    );
  });
}

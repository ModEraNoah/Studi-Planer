import {
  isRecurringAppointment,
  isSingleAppointment,
  type IAppointment,
  type IRecurringAppointment,
} from "./Appointment";
import type { CalenderPresentationFunction } from "./CalenderPresentation";
import { DateBox } from "./DateBox";

interface CalenderProps {
  date: Date;
  presentationFunction: CalenderPresentationFunction;
  appointments: IAppointment[];
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
        appointments={appointments.filter((appointment: IAppointment) => {
          if (isSingleAppointment(appointment)) {
            return (
              appointment.startDate.getDate() == el.getDate() &&
              appointment.startDate.getMonth() == el.getMonth() &&
              appointment.startDate.getFullYear() == el.getFullYear()
            );
          }

          if (isRecurringAppointment(appointment)) {
            const app = appointment as IRecurringAppointment;
            return (
              app.curDate.getDate() == el.getDate() &&
              app.curDate.getMonth() == el.getMonth() &&
              app.curDate.getFullYear() == el.getFullYear()
            );
          }
        })}
        addAppointment={addAppointment}
      />
    );
  });
}

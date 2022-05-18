import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "pt-BR": ptBR,
  },
});

const myEventsList = [
  {
    title: "Luis Renato Tatuagem",
    allDay: true,
    start: new Date(2022, 5, 12),
    end: new Date(2022, 5, 12),
  },
  {
    title: "Vacation",
    start: new Date(2022, 6, 7),
    end: new Date(2022, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2022, 6, 20),
    end: new Date(2022, 6, 23),
  },
];

function MyCalendar(props) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;

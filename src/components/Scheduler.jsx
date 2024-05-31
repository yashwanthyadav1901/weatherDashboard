import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Scheduler() {
  return (
    <section className="scheduler bg">
      <div>
        <h1>Event scheduler</h1>
        <p>
          Note: For enhanced event management, integrating future weather data
          into the calendar can provide valuable insights. However, the
          implementation cannot proceed at this time because access to future
          climate data from the API requires a subscription.
        </p>
      </div>
      <div className="calendar">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"90vh"}
        />
      </div>
    </section>
  );
}

export default Scheduler;

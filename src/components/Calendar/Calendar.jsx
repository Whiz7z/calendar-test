import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarRewrite.scss";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [isToday, setIsToday] = useState(true);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Morning Meeting",
      start: "2024-10-29T09:00:00",
      end: "2024-10-29T10:00:00",
    },
    {
      id: "2",
      title: "Lunch Break",
      start: "2024-10-29T12:00:00",
      end: "2024-10-29T13:00:00",
    },
    {
      id: "3",
      title: "Project Discussion",
      start: "2024-10-30T14:00:00",
      end: "2024-10-30T15:30:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    notes: "",
  });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    setIsToday(true);
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setIsToday(false);
  };

  const handleBackClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setIsToday(false);
  };

  const handleViewChange = (viewType) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewType);
  };

  const handleDateClick = (arg) => {
    const { clientX, clientY } = arg.jsEvent;
    const date = arg.dateStr;
    setNewEvent({
      title: "",
      start: `${date}T09:00:00`,
      end: `${date}T10:00:00`,
      notes: "",
    });
    setModalPosition({ top: clientY - 60, left: clientX - 100 });
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setNewEvent({
        title: event.title,
        start: event.start,
        end: event.end,
        notes: event.notes,
      });
      setSelectedEventId(event.id);
      setIsModalOpen(true);
      setIsEditMode(true);
      setModalPosition({
        top: info.jsEvent.clientY - 60,
        left: info.jsEvent.clientX - 100,
      });
    }
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.startStr,
            end: info.event.endStr || info.event.startStr,
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleEventSubmit = () => {
    if (newEvent.title) {
      if (isEditMode) {
        const updatedEvents = events.map((event) =>
          event.id === selectedEventId
            ? {
                ...event,
                title: newEvent.title,
                start: newEvent.start,
                end: newEvent.end,
                notes: newEvent.notes,
              }
            : event
        );
        setEvents(updatedEvents);
      } else {
        setEvents([
          ...events,
          {
            id: String(events.length + 1),
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            notes: newEvent.notes,
          },
        ]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }} className="calendar-container">
      <h3>Calendar View</h3>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        eventDrop={handleEventDrop}
        eventClick={handleEventClick}
        headerToolbar={{
          left: `${
            isToday ? "customTodayActive" : "customToday"
          },customBack,customNext`,
          center: "title",
          right:
            "customDayGridMonth,customTimeGridWeek,customTimeGridDay,customAgenda",
        }}
        customButtons={{
          customToday: {
            text: "Today",
            click: handleTodayClick,
          },
          customTodayActive: {
            text: "Today",
            click: handleTodayClick,
          },
          customBack: {
            text: "Back",
            click: handleBackClick,
          },
          customNext: {
            text: "Next",
            click: handleNextClick,
          },
          customDayGridMonth: {
            text: "Month",
            click: () => handleViewChange("dayGridMonth"),
          },
          customTimeGridWeek: {
            text: "Week",
            click: () => handleViewChange("timeGridWeek"),
          },
          customTimeGridDay: {
            text: "Day",
            click: () => handleViewChange("timeGridDay"),
          },
          customAgenda: {
            text: "Agenda",
            click: () => handleViewChange("dayGridMonth"),
          },
        }}
        events={events}
        dateClick={handleDateClick}
        buttonText={{
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        height="auto"
        contentHeight={500}
      />

      {isModalOpen && (
        <div
          className="modal"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h4>{isEditMode ? "Edit Event" : "Add Event"}</h4>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="datetime-local"
              placeholder="Start Date & Time"
              value={newEvent.start}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
            />
            <input
              type="datetime-local"
              placeholder="End Date & Time"
              value={newEvent.end}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: e.target.value })
              }
            />
            <textarea
              placeholder="Notes"
              value={newEvent.notes}
              onChange={(e) =>
                setNewEvent({ ...newEvent, notes: e.target.value })
              }
            />
            <div className="modal-actions">
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-cancel"
              >
                Cancel
              </button>
              <button onClick={handleEventSubmit} className="modal-save">
                {isEditMode ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

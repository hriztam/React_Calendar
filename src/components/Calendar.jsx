// import axios from "axios";
import React, { useState } from "react";
import dayjs from "dayjs";
import EventDetails from "./EventDetails";
import EventForm from "./EventForm";
import "./CalendarApp.css"; // Include the CSS file

const Calendar = ({ events, onEventAdded }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to handle the "Today" button click
  const goToToday = () => {
    setCurrentMonth(dayjs()); // Set the current month to today's month
    setSelectedDate(dayjs().format("YYYY-MM-DD")); // Optionally, set selected date to today
  };

  const renderDays = () => {
    const startDay = currentMonth.startOf("month").startOf("week");
    const endDay = currentMonth.endOf("month").endOf("week");
    const days = [];
    let day = startDay;

    while (day.isBefore(endDay, "day")) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days.map((dayItem, index) => {
      const isCurrentMonth = dayItem.isSame(currentMonth, "month");

      return (
        <div
          key={index}
          className={`day ${!isCurrentMonth ? "outside-month" : ""} ${
            dayjs().isSame(dayItem, "day") ? "today" : ""
          }`}
          onClick={() => handleDayClick(dayItem)}
        >
          <div>{dayItem.format("D")}</div>
          {events
            .filter((event) => dayjs(event.date).isSame(dayItem, "day"))
            .map((event) => (
              <div
                key={event.id}
                className="event"
                onClick={(e) => handleEventClick(e, event)}
              >
                {event.title}
              </div>
            ))}
        </div>
      );
    });
  };

  const handleDayClick = (dayItem) => {
    setSelectedDate(dayItem.format("YYYY-MM-DD"));
    setShowForm(true);
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation(); // Prevent triggering the day click event
    setSelectedEvent(event);
    setShowDetails(true);
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent]; // Add new event to the list of events
    onEventAdded(updatedEvents); // Pass the updated array to the parent
    setShowForm(false);
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      // await axios.put(
      //   `https://calendar-api.free.beeceptor.com/events/${updatedEvent.id}`,
      //   updatedEvent
      // );
      const updatedEvents = events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      onEventAdded(updatedEvents); // Update the event list with the edited event
      setShowDetails(false); // Close the event details after saving
      setShowForm(false); // Close the form after saving
    } catch (error) {
      console.error("Error updating the event: ", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      // await axios.delete(
      //   `https://calendar-api.free.beeceptor.com/events/${id}`
      // );
      const updatedEvents = events.filter((event) => event.id !== id);
      onEventAdded(updatedEvents); // Pass the updated list to the parent
      setShowDetails(false); // Close the event details after deletion
    } catch (error) {
      console.error("Error deleting the event: ", error);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-controls">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          Previous
        </button>
        <div className="calendar-today">
          <h3>{currentMonth.format("MMMM YYYY")}</h3>
          <button onClick={goToToday}>Today</button> {/* Today button */}
        </div>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
          Next
        </button>
      </div>
      <div className="weeks">
        {WEEKDAYS.map((day) => {
          return (
            <div className="week" key={day}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="days-grid">{renderDays()}</div>

      {showForm && (
        <EventForm
          date={selectedDate}
          onSubmit={handleAddEvent}
          onClose={() => setShowForm(false)}
        />
      )}

      {showDetails && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          date={selectedEvent.date}
          onEdit={handleEditEvent} // Pass the edit function
          onDelete={handleDeleteEvent} // Pass the delete function
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Calendar;

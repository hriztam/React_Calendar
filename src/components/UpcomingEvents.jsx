import React from "react";
import "./CalendarApp.css"; // Import your styles

const UpcomingEvents = ({ events }) => {
  // Helper function to filter and sort upcoming events by date
  const getUpcomingEvents = () => {
    return events
      .filter((event) => new Date(event.date) >= new Date()) // Only upcoming events
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  };

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <ul>
        {getUpcomingEvents().map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> on{" "}
            {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;

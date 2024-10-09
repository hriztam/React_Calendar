import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar"; // Adjust the path as needed
import UpcomingEvents from "./components/UpcomingEvents";
import "./components/CalendarApp.css"; // Adjust the path as needed

const App = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://calendar-api.free.beeceptor.com/events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventAdded = async (updatedEvents) => {
    // Update the event list (after add/edit/delete)
    try {
      // const response = await axios.post("https://calendar-api.free.beeceptor.com/events", updatedEvents);
      // setEvents([...events, response.data]);

      // Making requests without api
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
    setEvents(updatedEvents);
  };

  return (
    <div className="App">
      <h1 className="title">Events Calendar</h1>
      <div className="app-container">
        {/* Calendar Component */}
        <Calendar events={events} onEventAdded={handleEventAdded} />

        {/* Upcoming Events Section */}
        <UpcomingEvents events={events} />
      </div>
    </div>
  );
};

export default App;

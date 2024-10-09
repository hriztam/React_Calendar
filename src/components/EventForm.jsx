import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CalendarApp.css"; // Include the CSS file
import useOutsideClick from "../hooks/useOutsideClick";

const EventForm = ({ date, onSubmit, onClose, isOpen, event }) => {
  // Pre-fill the form fields if an event is being edited, otherwise start with empty fields
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [category, setCategory] = useState(event ? event.category : "Work");

  const formRef = useOutsideClick(onClose);

  useEffect(() => {
    // If editing, populate form fields with event data
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setCategory(event.category || "Work");
    } else {
      // Reset form for a new event
      setTitle("");
      setDescription("");
      setCategory("Work");
    }
  }, [event]); // Re-run when the event prop changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the original event date when editing; otherwise, use the provided date
    const eventDate = event ? event.date : date;

    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      description,
      date: eventDate,
      category,
    };
    try {
      // await axios.post(
      //   "https://calendar-api.free.beeceptor.com/events",
      //   newEvent
      // );

      // Without api
      onSubmit(newEvent); // Add new event to state
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  if (isOpen) return null;

  return (
    <div className="event-form" ref={formRef}>
      <h2>{event ? `Edit Event on ${date}` : `Add Event on ${date}`}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button type="submit">{event ? "Save Changes" : "Add Event"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EventForm;

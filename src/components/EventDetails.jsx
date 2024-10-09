import React, { useState } from "react";
import "./CalendarApp.css"; // Import the CSS file
import useOutsideClick from "../hooks/useOutsideClick";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import EventForm from "./EventForm";

const EventDetails = ({ date, event, onEdit, onDelete, onClose, cardOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const detailRef = useOutsideClick(onClose);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  // Handle the "Edit" button click
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleFormClose = () => {
    setIsEditing(false); // Close the form after editing
  };

  if (cardOpen) return null;

  return (
    <div className="event-container" ref={detailRef}>
      <h2>Upcoming Events on {date}</h2>
      <div className="event-card" onClick={toggleDetails}>
        <div>
          <h3 className="event-title">{event.title}</h3>
          <p className="event-date">{event.date}</p>
        </div>
        <div className="event-edit">
          <div>
            <Fab size="small" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon></DeleteIcon>
            </Fab>
          </div>
          <div>
            <Fab size="small" aria-label="edit" onClick={handleEditClick}>
              <EditIcon></EditIcon>
            </Fab>
          </div>
        </div>
      </div>

      {/* If editing is enabled, show the EventForm with pre-filled data */}
      {isEditing ? (
        <EventForm
          event={event}
          date={event.date}
          onSubmit={onEdit}
          onClose={handleFormClose}
        />
      ) : (
        <div className={`event-details ${isOpen ? "open" : ""}`}>
          <h4 className="details-title">Event Details</h4>
          <div className="details">
            <p className="details-item">
              <strong>Title:</strong> {event.title}
            </p>
            <p className="details-item">
              <strong>Description:</strong> {event.description}
            </p>
            <p className="details-item">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="details-item">
              <strong>Category:</strong> {event.category}
            </p>
          </div>
          <button className="close-button" onClick={toggleDetails}>
            <CloseIcon fontSize="small"></CloseIcon>
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;

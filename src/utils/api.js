import axios from "axios";

// Base URL for your Beeceptor endpoint (replace with your actual Beeceptor URL)
const API_BASE_URL = "https://calendar-api.free.beeceptor.com/";

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Add a new event
export const addEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Edit an existing event
export const editEvent = async (eventId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/events/${eventId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing event:", error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

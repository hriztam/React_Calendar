import { render, fireEvent, screen } from "@testing-library/react";
import Calendar from "../components/Calendar";

describe("Calendar Component", () => {
  const mockEvents = [
    { id: 1, title: "Event 1", description: "First event", date: "2024-10-05" },
    {
      id: 2,
      title: "Event 2",
      description: "Second event",
      date: "2024-10-06",
    },
  ];

  test("renders calendar with events", () => {
    render(<Calendar events={mockEvents} onEventAdded={() => {}} />);
    expect(screen.getByText("October 2024")).toBeInTheDocument();
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });

  test("navigates between months", () => {
    render(<Calendar events={mockEvents} onEventAdded={() => {}} />);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("November 2024")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("October 2024")).toBeInTheDocument();
  });

  test("opens form on clicking a date", () => {
    render(<Calendar events={mockEvents} onEventAdded={() => {}} />);
    fireEvent.click(screen.getByText("5"));
    expect(screen.getByText("Add Event on 2024-10-05")).toBeInTheDocument();
  });
});

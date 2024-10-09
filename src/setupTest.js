import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";
import dayjs from "dayjs";

const mockEvents = [
  { id: 1, title: "Meeting", date: dayjs().format("YYYY-MM-DD") },
  { id: 2, title: "Workout", date: dayjs().add(1, "day").format("YYYY-MM-DD") },
];

describe("Calendar", () => {
  test("renders calendar with the correct month", () => {
    render(<Calendar events={mockEvents} onEventAdded={jest.fn()} />);
    const monthTitle = screen.getByText(dayjs().format("MMMM YYYY"));
    expect(monthTitle).toBeInTheDocument();
  });

  test("renders days of the week", () => {
    render(<Calendar events={mockEvents} onEventAdded={jest.fn()} />);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});

describe("Event Display", () => {
  test("displays events on correct date", () => {
    render(<Calendar events={mockEvents} onEventAdded={jest.fn()} />);
    const todayEvent = screen.getByText("Meeting");
    expect(todayEvent).toBeInTheDocument();
  });

  test("shortens event title on calendar view if it exceeds length", () => {
    const longEventTitle =
      "This is a very long event title that should be shortened";
    const longEvent = {
      id: 3,
      title: longEventTitle,
      date: dayjs().format("YYYY-MM-DD"),
    };
    render(<Calendar events={[longEvent]} onEventAdded={jest.fn()} />);

    expect(screen.getByText("This is a very long...")).toBeInTheDocument();
  });
});

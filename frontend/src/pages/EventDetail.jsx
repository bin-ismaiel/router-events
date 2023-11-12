import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetail() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  return <EventItem event={event} />;
}

export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );
  if (!response.ok) {
    throw json({ message: "error" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw json({ message: "could not delete event" });
  }

  return redirect("/events");
}

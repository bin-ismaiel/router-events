import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import EventsRoot from "./pages/EventsRoot";
import { loader as eventsLoader } from "./pages/Events";
import {
  loader as eventLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import Error from "./pages/Error";
import { action as maniuplateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              index: true,
              element: <Events />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              loader: eventLoader,

              id: "event-detail",
              children: [
                {
                  element: <EventDetail />,
                  index: true,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: maniuplateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEvent />,
              action: maniuplateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

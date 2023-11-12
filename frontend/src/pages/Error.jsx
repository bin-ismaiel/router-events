import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/pageContent";
import { useRouteError } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  let title = "an error occured";
  let message = "error";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    message = "page not found";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

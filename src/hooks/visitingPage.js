import { useEffect } from "react";

const serverURL = process.env.REACT_APP_SERVER_URL;

function useVisitingPage(postID) {
  const visitingPage = (postID) => {
    fetch(`${serverURL}/pageStatistics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postID: postID }),
    });
  };

  useEffect(() => {
    visitingPage(postID);
  }, [postID]);
}

export default useVisitingPage;

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import DrugaStranica from "./pages/DrugaStranica";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorLayout />, TODO: Add ErrorLayout
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "drugaStranica",
        element: <DrugaStranica />,
      },
      {
        path: "detailPage/:postID",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

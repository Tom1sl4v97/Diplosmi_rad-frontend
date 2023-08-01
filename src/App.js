import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useLocalStorage, defaultPageSettings } from "./hooks/SessionStorage";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PageNotFound from "./pages/PageNotFound";
import UserSettingPage from "./pages/UserSettingPage";
import SearchedContentPage from "./pages/SearchedContentPage";
import PageSettings from "./pages/PageSettings";

import "./app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "AboutPage",
        element: <AboutPage />,
      },
      {
        path: "detailPage/:postID",
        element: <DetailPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
      },
      {
        path: "userSetting",
        element: <UserSettingPage />,
      },
      {
        path: "searchedContent/:searchedContent",
        element: <SearchedContentPage />,
      },
      {
        path: "pageSettings",
        element: <PageSettings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

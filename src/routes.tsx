import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Landing from "./components/LandingPage";
import Activities from "./components/Activities";
import CreateActivities from "./components/CreateActivity";
import RedirectedLoader from "./components/RedirectedLoader";
import {
  AuthenticatedRoute,
  UnAuthenticatedRoute,
} from "./components/common/Route";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "RedirectedLoader",
        element: <RedirectedLoader />,
      },
      {
        path: "authentication",
        element: (
          <UnAuthenticatedRoute>
            <Outlet />
          </UnAuthenticatedRoute>
        ),
        children: [
          {
            path: "landing/*",
            element: <Landing />,
          },
        ],
      },
      {
        path: "user",
        element: (
          <AuthenticatedRoute>
            <Outlet />
          </AuthenticatedRoute>
        ),
        children: [
          {
            path: "activities",
            element: <Activities />,
          },
          {
            path: "create-activities",
            element: <CreateActivities />,
          },
        ],
      },
      {
        path: "/",
        element: <Navigate to="/authentication/landing" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/authentication/landing" replace />,
      },
    ],
  },
]);

export default routes;

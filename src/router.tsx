import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Network from "./pages/networks";
import { Private } from "./Private";
import { ErrorPage } from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Network />
      </Private>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export { router };

import { createBrowserRouter } from "react-router-dom";
import Drivers from "../components/Drivers";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  { path: "/login", element: <h1>Login</h1> },
  { path: "/logout", element: <h1>Logout</h1> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "drivers", element: <Drivers /> },
      { path: "trucks", element: <h1>trucks</h1> },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Drivers from "../components/Drivers";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
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

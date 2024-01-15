import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Drivers from "../components/Drivers";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "drivers", element: <Drivers /> },
      { path: "trucks", element: <h1>trucks</h1> },
    ],
  },
]);

export default router;

import Layout from "./pages/layout";
import Main from "./pages/main";
import Dashboard from "./pages/dashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/messages",
        element: <Main />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

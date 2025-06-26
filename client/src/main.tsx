import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import OfferDetailPage from "./pages/OfferDetailsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/offer/:id",
        element: <OfferDetailPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") || document.body,
);

root.render(<RouterProvider router={router} />);

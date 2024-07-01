import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, useNavigate, RouterProvider, useOutletContext } from "react-router-dom";

import App from "./App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

const PrivateRoute = ({children}) => {
  const { auth, isLoading } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!auth.isLogged) navigate("/login");
    }
  }, [auth, children, isLoading, navigate])

  if (!isLoading && auth.isLogged) return children;
  return "...loading";
}

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
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

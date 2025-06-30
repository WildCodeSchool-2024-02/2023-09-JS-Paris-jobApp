import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter, useNavigate } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import OfferDetailPage from "./pages/OfferDetailsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { type ReactNode, useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./contexts/user.context";

const PrivateRoute = ({children}: {children: ReactNode}) => {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userContext?.user) navigate("/login");
	}, [userContext, navigate]);

	return children;
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
      {
        path: "/offer/:id",
        element: (
          <PrivateRoute>
            <OfferDetailPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") || document.body,
);

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
);

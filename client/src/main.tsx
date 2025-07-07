import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter, useNavigate } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import OfferDetailPage from "./pages/OfferDetailsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { UserContext, UserProvider } from "./contexts/user.context";
import { useContext, useEffect, type ReactNode } from 'react';
import Favorites from "./pages/Favorites";

const PrivateRoute = ({children}: {children: ReactNode}) => {
	const context = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!context?.user) navigate("/login");
	}, [context, navigate]);


	return <>{children}</>;
}

const CandidateRoute = ({children}: {children: ReactNode}) => {
	const context = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		
		const role = context?.user?.role as unknown as string
		console.log(role);
		if (role !== "candidate") navigate("/");
	}, [context, navigate]);


	return <>{children}</>;
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
						<CandidateRoute>
							<OfferDetailPage />
						</CandidateRoute>
					</PrivateRoute>
				)
      },
			{
				path: "/profile",
				element: (
					<PrivateRoute>
						<Favorites />
					</PrivateRoute>
				)
			}
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

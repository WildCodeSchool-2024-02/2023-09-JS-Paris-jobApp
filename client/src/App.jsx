import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [auth, setAuth] = useState({isLogged: false, user: null, token: null});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { credentials: "include" }
        );
        if (response.ok) {
          const token = response.headers.get("Authorization");
          const user = await response.json();
          setAuth({ isLogged: true, user, token });
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("Une erreur est survenue");
        setIsLoading(false);
      }
    }
    getAuth();
  }, []);

  return (
    <main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar auth={auth} setAuth={setAuth} />

      <Outlet context={{auth, setAuth, isLoading}} />

      <Footer />
    </main>
  );
}

export default App;

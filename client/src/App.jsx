import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
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

      <Navbar />

      <Outlet />

      <Footer />
    </main>
  );
}

export default App;
